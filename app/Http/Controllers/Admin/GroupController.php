<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreGroupRequest;
use App\Http\Requests\Company\UpdateGroupRequest;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use App\Models\Company\Program;
use App\Models\Core\Region\Province;
use App\Services\KantorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    use LogActivity;

    /**
     * Display a listing of groups.
     */
    public function index()
    {
        $this->authorize('viewAny', Group::class);

        return Inertia::render('admin/groups/list', [
            'pageTitle' => 'Master Data Kelompok',
            'kantors' => KantorService::getActive(),
        ]);
    }

    /**
     * Endpoint DataTable.
     */
    public function getData(Request $request)
    {
        $this->authorize('data-group', Group::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'asc'));

        $allowedSorts = ['id', 'name', 'kantor_name', 'leader_name', 'phone', 'status', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'asc';
        }

        $filterValue = $request->input('filterValue', []);
        if (is_string($filterValue)) {
            $filterValue = json_decode($filterValue, true) ?? [];
        }

        $query = Group::query()
            ->with(['fasilitator:id,name', 'program:id,name', 'province:id,name', 'regency:id,name'])
            ->withCount('beneficiaries')
            ->search($globalSearch)
            ->when(! empty($filterValue['kantor_id']), function ($q) use ($filterValue) {
                $q->where('kantor_id', $filterValue['kantor_id']);
            })
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Show the form for creating a new group.
     */
    public function create()
    {
        $this->authorize('create', Group::class);

        return Inertia::render('admin/groups/create', [
            'pageTitle' => 'Tambah Kelompok',
            'fasilitators' => Fasilitator::query()->active()->select(['id', 'name'])->orderBy('name')->get(),
            'programs' => Program::query()->select(['id', 'name'])->orderBy('name')->get(),
            'provinces' => Province::query()->select(['id', 'name'])->orderBy('name')->get(),
            'kantors' => KantorService::getActive(),
        ]);
    }

    /**
     * Store a newly created group.
     */
    public function store(StoreGroupRequest $request)
    {
        $this->authorize('create', Group::class);

        $data = $request->validated();
        $data['status'] = $request->boolean('status', true);

        $group = Group::create($data);

        if ($group) {
            $this->logSuccess('create-group', "Created Group #{$group->id} ({$group->name})", [
                'group_id' => $group->id,
                'new_data' => $group->toArray(),
            ]);
        } else {
            $this->logError('create-group', 'Failed to create Group', [
                'new_data' => $data,
            ]);
        }

        return redirect()->route('admin.groups.index')
            ->with('success', 'Kelompok Berhasil Ditambahkan');
    }

    /**
     * Display the specified group.
     */
    public function show(Group $group)
    {
        $this->authorize('view', $group);

        return Inertia::render('admin/groups/show', [
            'pageTitle' => 'Detail Kelompok: '.$group->name,
            'group' => $group->load([
                'fasilitator:id,name,phone',
                'program:id,name',
                'province:id,name',
                'regency:id,name',
                'district:id,name',
                'village:id,name',
                'beneficiaries' => fn ($q) => $q->with('programs:id,name')->latest(),
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified group.
     */
    public function edit(Group $group)
    {
        $this->authorize('update', $group);

        return Inertia::render('admin/groups/edit', [
            'pageTitle' => 'Edit Kelompok: '.$group->name,
            'group' => $group,
            'fasilitators' => Fasilitator::query()->active()->select(['id', 'name'])->orderBy('name')->get(),
            'programs' => Program::query()->select(['id', 'name'])->orderBy('name')->get(),
            'provinces' => Province::query()->select(['id', 'name'])->orderBy('name')->get(),
            'kantors' => KantorService::getActive(),
        ]);
    }

    /**
     * Update the specified group.
     */
    public function update(UpdateGroupRequest $request, Group $group)
    {
        $this->authorize('update', $group);

        $data = $request->validated();
        $data['status'] = $request->boolean('status', true);

        $oldData = $group->replicate();
        $group->update($data);

        if ($group) {
            $this->logSuccess('update-group', "Updated Group #{$group->id} ({$group->name})", [
                'group_id' => $group->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $group->toArray(),
            ]);
        } else {
            $this->logError('update-group', "Failed to update Group #{$group->id}", [
                'group_id' => $group->id,
                'old_data' => $oldData->toArray(),
            ]);
        }

        return redirect()->route('admin.groups.index')
            ->with('success', 'Kelompok Berhasil Diperbarui');
    }

    /**
     * Remove the specified group.
     */
    public function destroy(Group $group)
    {
        $this->authorize('delete', $group);

        $oldData = $group->replicate();
        $group->delete();

        if ($group) {
            $this->logSuccess('delete-group', "Deleted Group #{$group->id} ({$group->name})", [
                'group_id' => $group->id,
                'old_data' => $oldData->toArray(),
            ]);
        } else {
            $this->logError('delete-group', "Failed to delete Group #{$group->id}", [
                'group_id' => $group->id,
            ]);
        }

        return redirect()->route('admin.groups.index')
            ->with('success', 'Kelompok Berhasil Dihapus');
    }

    /**
     * Toggle status aktif kelompok.
     */
    public function status(Group $group)
    {
        $this->authorize('update', $group);

        $group->update(['status' => ! $group->status]);

        return redirect()->back()->with('success', 'Status Kelompok Berhasil Diperbarui');
    }
}
