<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\UpdateVisitReportRequest;
use App\Models\Company\Branch;
use App\Models\Company\Program;
use App\Models\Company\VisitReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VisitReportController extends Controller
{
    use LogActivity;
    use UploadFiles;

    /**
     * Display a listing of the resource (monitoring laporan pendampingan).
     */
    public function index()
    {
        $this->authorize('viewAny', VisitReport::class);

        return Inertia::render('admin/company/visit-reports/list', [
            'programs' => Program::query()->orderBy('name')->get(['id', 'name']),
            'branches' => Branch::query()->orderBy('name')->get(['id', 'name', 'label']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(VisitReport $visitReport)
    {
        $this->authorize('view', $visitReport);

        $visitReport->load(['program', 'facilitator', 'reviewer', 'group.branch']);

        return Inertia::render('admin/company/visit-reports/show', [
            'visitReport' => $visitReport,
        ]);
    }

    /**
     * Endpoint DataTable: whitelist orderBy, filter status, tanpa N+1 (program + fasilitator).
     */
    public function getData(Request $request)
    {
        $this->authorize('data-visit-report', VisitReport::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'desc'));

        // Whitelist kolom sort & arah — jangan langsung pakai input user.
        $allowedSorts = ['id', 'event_name', 'visit_date', 'start_time', 'end_time', 'pm_count', 'status', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'desc';
        }

        $filterValue = (array) $request->input('filterValue', []);

        $query = VisitReport::query()
            ->with(['program', 'facilitator', 'group.branch'])
            ->search($globalSearch)
            ->when($filterValue['status'] ?? null, fn ($q, $status) => $q->where('status', $status))
            // Whitelist filter: program & cabang (cabang lewat kelompok laporan).
            ->when($filterValue['program_id'] ?? null, fn ($q, $programId) => $q->where('program_id', $programId))
            ->when($filterValue['branch_id'] ?? null, fn ($q, $branchId) => $q->whereHas(
                'group',
                fn ($group) => $group->where('branch_id', $branchId),
            ))
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Administrator memeriksa laporan: reviewed (disetujui) atau revised (minta perbaikan).
     */
    public function review(Request $request, VisitReport $visitReport)
    {
        $this->authorize('review', $visitReport);

        $data = $request->validate([
            'status' => ['required', 'in:reviewed,revised'],
            'review_notes' => ['required_if:status,revised', 'nullable', 'string', 'max:5000'],
        ]);

        $oldStatus = $visitReport->status;

        $visitReport->update([
            'status' => $data['status'],
            'review_notes' => $data['review_notes'] ?? null,
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
        ]);

        if ($visitReport) {
            $this->logSuccess('review-visit-report', "Review Monitoring Evaluation Report #{$visitReport->id}: {$oldStatus} -> {$visitReport->status}", [
                'visit_report_id' => $visitReport->id,
                'old_status' => $oldStatus,
                'new_status' => $visitReport->status,
            ]);
        } else {
            $this->logError('review-visit-report', "Failed to review Monitoring Evaluation Report #{$visitReport->id}", [
                'visit_report_id' => $visitReport->id,
            ]);
        }

        return back()
            ->with('success', 'Monitoring Evaluasi Berhasil Direview');
    }

    /**
     * Form edit laporan oleh admin (koreksi data milik fasil).
     */
    public function edit(VisitReport $visitReport)
    {
        $this->authorize('update', $visitReport);

        return Inertia::render('admin/company/visit-reports/edit', [
            'pageTitle' => 'Edit Laporan Monitoring Evaluasi',
            'visitReport' => $visitReport,
            'program' => Program::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Update admin: koreksi data, status TIDAK berubah (status lewat review),
     * snapshot milik fasil (group_id/fasilitator_id) dipertahankan apa adanya.
     */
    public function update(UpdateVisitReportRequest $request, VisitReport $visitReport)
    {
        $this->authorize('update', $visitReport);

        $data = $request->only([
            'program_id',
            'event_name',
            'visit_date',
            'start_time',
            'end_time',
            'activity_description',
            'obstacles',
            'pm_count',
        ]);

        $oldData = $visitReport->replicate();

        if ($request->hasFile('photo')) {
            $this->deleteFile($visitReport->photo);
            $data['photo'] = $this->uploadFile($visitReport->photo, $request->file('photo'), 'VisitReports');
        }

        $visitReport->update($data);

        if ($visitReport) {
            $this->logSuccess('update-visit-report', "Admin updated Monitoring Evaluation Report #{$visitReport->id}", [
                'visit_report_id' => $visitReport->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $visitReport->toArray(),
            ]);
        } else {
            $this->logError('update-visit-report', "Failed to update Monitoring Evaluation Report #{$visitReport->id} (admin)", [
                'visit_report_id' => $visitReport->id,
            ]);
        }

        return redirect()->route('admin.visit-reports.show', $visitReport->id)
            ->with('success', 'Laporan Monitoring Evaluasi Berhasil Diubah');
    }

    /**
     * Delete admin: berlaku untuk laporan milik fasil apa pun statusnya.
     */
    public function destroy(VisitReport $visitReport)
    {
        $this->authorize('delete', $visitReport);

        $this->deleteFile($visitReport->photo);

        $visitReport->delete();

        if ($visitReport) {
            $this->logSuccess('delete-visit-report', "Admin deleted Monitoring Evaluation Report #{$visitReport->id}", [
                'visit_report_id' => $visitReport->id,
                'old_data' => $visitReport->toArray(),
            ]);
        } else {
            $this->logError('delete-visit-report', "Failed to delete Monitoring Evaluation Report #{$visitReport->id} (admin)", [
                'visit_report_id' => $visitReport->id,
            ]);
        }

        return redirect()->route('admin.visit-reports.index')
            ->with('success', 'Laporan Monitoring Evaluasi Berhasil Dihapus');
    }
}
