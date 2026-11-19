<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreGroupRequest;
use App\Http\Requests\Company\UpdateGroupRequest;
use App\Models\Company\Branch;
use App\Models\Company\Group;
use App\Models\Core\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    use LogActivity;

    /**
     * Display a listing of kelompok.
     */
    public function index()
    {
        $this->authorize('viewAny', Group::class);

        return Inertia::render('admin/groups/list', [
            'pageTitle' => 'Kelompok Fasilitator',
            'filterBranches' => Branch::query()->orderBy('name')->get(['id', 'name', 'label']),
        ]);
    }

    /**
     * Show the form for creating a new kelompok.
     */
    public function create()
    {
        $this->authorize('create', Group::class);

        return Inertia::render('admin/groups/create', [
            'pageTitle' => 'Buat Kelompok',
            'branches' => Branch::query()->orderBy('name')->get(['id', 'name', 'label']),
            'fasilitators' => $this->fasilitatorOptions(),
        ]);
    }

    /**
     * Store a newly created kelompok.
     */
    public function store(StoreGroupRequest $request)
    {
        $this->authorize('create', Group::class);

        $data = $request->only(['branch_id', 'name', 'fasilitator_id']);

        $group = Group::create($data);

        $this->syncPms($group, $request->input('pms', []));

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
     * Display the specified kelompok.
     */
    public function show(Group $group)
    {
        $this->authorize('view', $group);

        $group->load(['branch', 'facilitator', 'pms']);

        return Inertia::render('admin/groups/show', [
            'group' => $group,
            'pageTitle' => 'Kelompok: '.$group->name,
        ]);
    }

    /**
     * Show the form for editing the specified kelompok.
     */
    public function edit(Group $group)
    {
        $this->authorize('update', $group);

        $group->load(['pms']);

        return Inertia::render('admin/groups/edit', [
            'group' => $group,
            'pageTitle' => 'Edit Kelompok',
            'branches' => Branch::query()->orderBy('name')->get(['id', 'name', 'label']),
            'fasilitators' => $this->fasilitatorOptions(),
        ]);
    }

    /**
     * Update the specified kelompok.
     */
    public function update(UpdateGroupRequest $request, Group $group)
    {
        $this->authorize('update', $group);

        $data = $request->only(['branch_id', 'name', 'fasilitator_id']);

        $oldData = $group->replicate();

        $group->update($data);

        $this->syncPms($group, $request->input('pms'));

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
     * Remove the specified kelompok (diblokir bila masih dipakai laporan/kas).
     */
    public function destroy(Group $group)
    {
        $this->authorize('delete', $group);

        $group->delete();

        if ($group) {
            $this->logSuccess('delete-group', "Delete Group #{$group->id} ({$group->name})", [
                'group_id' => $group->id,
                'old_data' => $group->toArray(),
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

        $allowedSorts = ['id', 'name', 'branch_id', 'fasilitator_id', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'asc';
        }

        $filterValue = (array) $request->input('filterValue', []);

        $query = Group::query()
            ->with(['branch', 'facilitator'])
            ->withCount('pms')
            ->search($globalSearch)
            ->when($filterValue['branch_id'] ?? null, fn ($q, $branchId) => $q->where('branch_id', $branchId))
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Opsi fasilitator untuk dropdown assign (role Fasilitator).
     */
    private function fasilitatorOptions()
    {
        return User::query()
            ->whereHas('roles', fn ($q) => $q->where('name', 'Fasilitator'))
            ->orderBy('name')
            ->get(['id', 'name']);
    }

    /**
     * Sinkronkan daftar nama PM kelompok.
     */
    private function syncPms(Group $group, mixed $pms): void
    {
        if (! is_array($pms)) {
            return;
        }

        $names = collect($pms)
            ->map(fn ($pm) => trim((string) ($pm['name'] ?? $pm ?? '')))
            ->filter(fn ($name) => $name !== '')
            ->unique()
            ->values();

        $group->pms()->whereNotIn('name', $names->all())->delete();

        foreach ($names as $name) {
            $group->pms()->firstOrCreate(['name' => $name]);
        }
    }
}
