<?php

namespace App\Http\Controllers\Fasilitator;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreVisitReportRequest;
use App\Http\Requests\Company\UpdateVisitReportRequest;
use App\Models\Company\Group;
use App\Models\Company\Program;
use App\Models\Company\VisitReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitReportController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Daftar laporan pendampingan milik fasilitator yang login.
     */
    public function index()
    {
        $this->authorize('viewAny', VisitReport::class);

        return Inertia::render('fasilitator/visit-reports/list', [
            'pageTitle' => 'Laporan Monitoring Evaluasi Saya',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', VisitReport::class);

        return Inertia::render('fasilitator/visit-reports/create', [
            'pageTitle' => 'Buat Monev',
            'program' => Program::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVisitReportRequest $request)
    {
        $this->authorize('create', VisitReport::class);

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

        // fasilitator_id selalu dari user login — tidak pernah dari input.
        $data['fasilitator_id'] = auth()->id();
        // Kelompok wajib tercatat tapi tidak diinput manual: otomatis dari kelompok fasil (admin menugaskan).
        $data['group_id'] = Group::query()->ownedBy(auth()->id())->value('id');
        $data['status'] = $request->boolean('submit') ? VisitReport::STATUS_SUBMITTED : VisitReport::STATUS_DRAFT;

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->uploadFile(null, $request->file('photo'), 'VisitReports');
        }

        $visitReport = VisitReport::create($data);

        if ($visitReport) {
            $this->logSuccess('create-visit-report', "Created Monitoring Evaluation Report #{$visitReport->id} (Program: {$visitReport->program->name})", [
                'visit_report_id' => $visitReport->id,
                'new_data' => $visitReport->toArray(),
            ]);
        } else {
            $this->logError('create-visit-report', 'Failed to create Monitoring Evaluation Report', [
                'new_data' => $data,
            ]);
        }

        return redirect()->route('fasilitator.visit-reports.index')
            ->with('success', $visitReport->status === VisitReport::STATUS_SUBMITTED
                ? 'Laporan Monitoring Evaluasi Berhasil Diajukan'
                : 'Laporan Monitoring Evaluasi Berhasil Disimpan sebagai Draft');
    }

    /**
     * Display the specified resource.
     */
    public function show(VisitReport $visitReport)
    {
        $this->authorize('view', $visitReport);

        $visitReport->load(['program', 'facilitator', 'reviewer']);

        return Inertia::render('fasilitator/visit-reports/show', [
            'visitReport' => $visitReport,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VisitReport $visitReport)
    {
        $this->authorize('update', $visitReport);

        $visitReport->load(['program']);

        return Inertia::render('fasilitator/visit-reports/edit', [
            'visitReport' => $visitReport,
            'program' => Program::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
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

        // Kelompok mengikuti penugasan admin saat ini — riwayat lama tetap memakai group_id tersimpan.
        $data['group_id'] = Group::query()->ownedBy(auth()->id())->value('id');

        $oldData = $visitReport->replicate();

        // Setelah edit, fasilitator bisa langsung mengajukan ulang (draft/revised -> submitted).
        if ($request->boolean('submit') && $visitReport->status !== VisitReport::STATUS_REVIEWED) {
            $data['status'] = VisitReport::STATUS_SUBMITTED;
        }

        if ($request->hasFile('photo')) {
            $this->deleteFile($visitReport->photo);
            $data['photo'] = $this->uploadFile($visitReport->photo, $request->file('photo'), 'VisitReports');
        }

        $visitReport->update($data);

        if ($visitReport) {
            $this->logSuccess('update-visit-report', "Updated Monitoring Evaluation Report #{$visitReport->id}", [
                'visit_report_id' => $visitReport->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $visitReport->toArray(),
            ]);
        } else {
            $this->logError('update-visit-report', "Failed to update Monitoring Evaluation Report #{$visitReport->id}", [
                'visit_report_id' => $visitReport->id,
                'old_data' => $oldData->toArray(),
            ]);
        }

        return redirect()->route('fasilitator.visit-reports.index')
            ->with('success', 'Laporan Monitoring Evaluasi Berhasil Diperbarui');
    }

    /**
     * Remove the specified resource from storage (hanya draft milik sendiri).
     */
    public function destroy(VisitReport $visitReport)
    {
        $this->authorize('delete', $visitReport);

        $this->deleteFile($visitReport->photo);

        $visitReport->delete();

        if ($visitReport) {
            $this->logSuccess('delete-visit-report', "Delete Monitoring Evaluation Report #{$visitReport->id}", [
                'visit_report_id' => $visitReport->id,
                'old_data' => $visitReport->toArray(),
            ]);
        } else {
            $this->logError('delete-visit-report', "Failed to delete Monitoring Evaluation Report #{$visitReport->id}", [
                'visit_report_id' => $visitReport->id,
            ]);
        }

        return redirect()->route('fasilitator.visit-reports.index')
            ->with('success', 'Laporan Monitoring Evaluasi Berhasil Dihapus');
    }

    /**
     * Endpoint DataTable: hanya laporan milik fasilitator yang login.
     */
    public function getData(Request $request)
    {
        $this->authorize('data-visit-report', VisitReport::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'desc'));

        $allowedSorts = ['id', 'event_name', 'visit_date', 'start_time', 'end_time', 'pm_count', 'status', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'desc';
        }

        $filterValue = (array) $request->input('filterValue', []);

        $query = VisitReport::query()
            ->with(['program'])
            ->ownedBy(auth()->id())
            ->search($globalSearch)
            ->when($filterValue['status'] ?? null, fn ($q, $status) => $q->where('status', $status))
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }
}
