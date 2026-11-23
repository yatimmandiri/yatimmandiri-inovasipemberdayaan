<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreActivityReportRequest;
use App\Http\Requests\Company\UpdateActivityReportRequest;
use App\Models\Company\ActivityReport;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityReportController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Pilihan jenis kegiatan yang dipakai pada form laporan.
     *
     * @var list<string>
     */
    private const ACTIVITY_TYPES = [
        'Pertemuan Rutin',
        'Pelatihan',
        'Pendampingan',
        'Kunjungan Lapangan',
        'Lainnya',
    ];

    /**
     * Display a listing of activity reports.
     */
    public function index()
    {
        $this->authorize('viewAny', ActivityReport::class);

        return Inertia::render('admin/activity-reports/list', [
            'pageTitle' => 'Laporan Aktivitas',
        ]);
    }

    /**
     * Endpoint DataTable.
     */
    public function getData(Request $request)
    {
        $this->authorize('data-activity-report', ActivityReport::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'asc'));

        $allowedSorts = ['id', 'title', 'type', 'activity_date', 'participants_count', 'status', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'asc';
        }

        $query = ActivityReport::query()
            ->with(['fasilitator:id,name', 'group:id,name'])
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Show the form for creating a new activity report.
     */
    public function create()
    {
        $this->authorize('create', ActivityReport::class);

        return Inertia::render('admin/activity-reports/create', [
            'pageTitle' => 'Tambah Laporan Aktivitas',
            ...$this->formOptions(),
        ]);
    }

    /**
     * Store a newly created activity report.
     */
    public function store(StoreActivityReportRequest $request)
    {
        $this->authorize('create', ActivityReport::class);

        $data = $request->validated();
        $data['status'] = $request->boolean('status', true);
        $data['participants_count'] = (int) ($data['participants_count'] ?? 0);
        $data = $this->resolveFasilitator($data);

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->uploadFile(null, $request->file('photo'), 'uploads/activity-reports');
        } else {
            unset($data['photo']);
        }

        $activityReport = ActivityReport::create($data);

        if ($activityReport) {
            $this->logSuccess('create-activity-report', "Created Activity Report #{$activityReport->id} ({$activityReport->title})", [
                'activity_report_id' => $activityReport->id,
                'new_data' => $activityReport->toArray(),
            ]);
        } else {
            $this->logError('create-activity-report', 'Failed to create Activity Report', [
                'new_data' => $data,
            ]);
        }

        return redirect()->route('admin.activity-reports.index')
            ->with('success', 'Laporan Aktivitas Berhasil Ditambahkan');
    }

    /**
     * Display the specified activity report.
     */
    public function show(ActivityReport $activityReport)
    {
        $this->authorize('view', $activityReport);

        return Inertia::render('admin/activity-reports/show', [
            'pageTitle' => 'Detail Laporan Aktivitas: '.$activityReport->title,
            'activityReport' => $activityReport->load([
                'fasilitator:id,name,phone',
                'group:id,name,leader_name',
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified activity report.
     */
    public function edit(ActivityReport $activityReport)
    {
        $this->authorize('update', $activityReport);

        return Inertia::render('admin/activity-reports/edit', [
            'pageTitle' => 'Edit Laporan Aktivitas: '.$activityReport->title,
            'activityReport' => $activityReport,
            ...$this->formOptions(),
        ]);
    }

    /**
     * Update the specified activity report.
     */
    public function update(UpdateActivityReportRequest $request, ActivityReport $activityReport)
    {
        $this->authorize('update', $activityReport);

        $data = $request->validated();
        $data['status'] = $request->boolean('status', true);
        $data['participants_count'] = (int) ($data['participants_count'] ?? 0);
        $data = $this->resolveFasilitator($data);

        unset($data['photo']);
        if ($request->hasFile('photo')) {
            $data['photo'] = $this->uploadFile($activityReport->photo, $request->file('photo'), 'uploads/activity-reports');
        }

        $oldData = $activityReport->replicate();
        $activityReport->update($data);

        if ($activityReport) {
            $this->logSuccess('update-activity-report', "Updated Activity Report #{$activityReport->id} ({$activityReport->title})", [
                'activity_report_id' => $activityReport->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $activityReport->toArray(),
            ]);
        } else {
            $this->logError('update-activity-report', "Failed to update Activity Report #{$activityReport->id}", [
                'activity_report_id' => $activityReport->id,
                'old_data' => $oldData->toArray(),
            ]);
        }

        return redirect()->route('admin.activity-reports.index')
            ->with('success', 'Laporan Aktivitas Berhasil Diperbarui');
    }

    /**
     * Remove the specified activity report.
     */
    public function destroy(ActivityReport $activityReport)
    {
        $this->authorize('delete', $activityReport);

        $oldData = $activityReport->replicate();
        $this->deleteFile($activityReport->photo);
        $activityReport->delete();

        if ($activityReport) {
            $this->logSuccess('delete-activity-report', "Deleted Activity Report #{$activityReport->id} ({$activityReport->title})", [
                'activity_report_id' => $activityReport->id,
                'old_data' => $oldData->toArray(),
            ]);
        } else {
            $this->logError('delete-activity-report', "Failed to delete Activity Report #{$activityReport->id}", [
                'activity_report_id' => $activityReport->id,
            ]);
        }

        return redirect()->route('admin.activity-reports.index')
            ->with('success', 'Laporan Aktivitas Berhasil Dihapus');
    }

    /**
     * Toggle status aktif laporan aktivitas.
     */
    public function status(ActivityReport $activityReport)
    {
        $this->authorize('update', $activityReport);

        $activityReport->update(['status' => ! $activityReport->status]);

        return redirect()->back()->with('success', 'Status Laporan Aktivitas Berhasil Diperbarui');
    }

    /**
     * Pastikan fasilitator pada laporan sesuai dengan fasilitator kelompok.
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function resolveFasilitator(array $data): array
    {
        $group = Group::query()->find($data['group_id'] ?? null);

        if ($group?->fasilitator_id) {
            $data['fasilitator_id'] = $group->fasilitator_id;
        }

        return $data;
    }

    /**
     * Data pendukung form laporan aktivitas.
     *
     * @return array<string, mixed>
     */
    private function formOptions(): array
    {
        return [
            'fasilitators' => Fasilitator::query()->active()->select(['id', 'name'])->orderBy('name')->get(),
            'groups' => Group::query()->active()->select(['id', 'name', 'fasilitator_id'])->orderBy('name')->get(),
            'types' => self::ACTIVITY_TYPES,
        ];
    }
}
