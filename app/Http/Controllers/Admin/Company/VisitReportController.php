<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Models\Company\VisitReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VisitReportController extends Controller
{
    use LogActivity;

    /**
     * Display a listing of the resource (monitoring laporan pendampingan).
     */
    public function index()
    {
        $this->authorize('viewAny', VisitReport::class);

        return Inertia::render('admin/company/visit-reports/list');
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
}
