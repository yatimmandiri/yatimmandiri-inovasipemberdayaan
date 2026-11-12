<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Models\Company\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class BranchController extends Controller
{
    use LogActivity;

    /**
     * Display a listing of branch offices (master data).
     */
    public function index()
    {
        $this->authorize('viewAny', Branch::class);

        return Inertia::render('admin/branches/list', [
            'pageTitle' => 'Cabang',
        ]);
    }

    /**
     * Endpoint DataTable.
     */
    public function getData(Request $request)
    {
        $this->authorize('data-branch', Branch::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'asc'));

        $allowedSorts = ['id', 'name', 'label', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'asc';
        }

        $query = Branch::query()
            ->withCount('groups')
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Store a newly created branch.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Branch::class);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:branches,name'],
            'label' => ['nullable', 'string', 'max:255'],
        ]);

        $branch = Branch::create($data);

        if ($branch) {
            $this->logSuccess('manage-branch', "Created Branch #{$branch->id} ({$branch->name})", [
                'branch_id' => $branch->id,
                'new_data' => $branch->toArray(),
            ]);
        } else {
            $this->logError('manage-branch', 'Failed to create Branch', [
                'new_data' => $data,
            ]);
        }

        return redirect()->route('admin.branches.index')
            ->with('success', 'Cabang Berhasil Ditambahkan');
    }

    /**
     * Update the specified branch.
     */
    public function update(Request $request, Branch $branch)
    {
        $this->authorize('update', $branch);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:branches,name,'.$branch->id],
            'label' => ['nullable', 'string', 'max:255'],
        ]);

        $oldData = $branch->replicate();

        $branch->update($data);

        if ($branch) {
            $this->logSuccess('manage-branch', "Updated Branch #{$branch->id} ({$branch->name})", [
                'branch_id' => $branch->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $branch->toArray(),
            ]);
        } else {
            $this->logError('manage-branch', "Failed to update Branch #{$branch->id}", [
                'branch_id' => $branch->id,
                'old_data' => $oldData->toArray(),
            ]);
        }

        return redirect()->route('admin.branches.index')
            ->with('success', 'Cabang Berhasil Diperbarui');
    }

    /**
     * Remove the specified branch (diblokir bila masih dipakai kelompok/kas).
     */
    public function destroy(Branch $branch)
    {
        $this->authorize('delete', $branch);

        $branch->delete();

        if ($branch) {
            $this->logSuccess('manage-branch', "Delete Branch #{$branch->id} ({$branch->name})", [
                'branch_id' => $branch->id,
                'old_data' => $branch->toArray(),
            ]);
        } else {
            $this->logError('manage-branch', "Failed to delete Branch #{$branch->id}", [
                'branch_id' => $branch->id,
            ]);
        }

        return redirect()->route('admin.branches.index')
            ->with('success', 'Cabang Berhasil Dihapus');
    }

    /**
     * Import / bulk update dari file JSON berformat {id, name, label?} seperti branch-offices.json.
     * Id dari JSON dipertahankan agar referensi FK tetap stabil.
     */
    public function import(Request $request)
    {
        $this->authorize('create', Branch::class);

        $request->validate([
            'file' => ['required', 'file', 'mimetypes:application/json,text/plain', 'max:2048'],
        ]);

        $content = json_decode($request->file('file')->getContent(), true);

        if (! is_array($content)) {
            return back()->with('error', 'File JSON tidak valid.');
        }

        $imported = 0;
        $skipped = 0;

        foreach ($content as $row) {
            if (! isset($row['id'], $row['name']) || ! is_string($row['name']) || $row['name'] === '') {
                $skipped++;

                continue;
            }

            Branch::updateOrCreate(
                ['id' => (int) $row['id']],
                [
                    'name' => $row['name'],
                    'label' => $row['label'] ?? null,
                ]
            );
            $imported++;
        }

        $this->logSuccess('manage-branch', "Import Branches from JSON: {$imported} imported, {$skipped} skipped", [
            'imported' => $imported,
            'skipped' => $skipped,
        ]);

        return redirect()->route('admin.branches.index')
            ->with('success', "Import cabang selesai: {$imported} ter-impor, {$skipped} dilewati.");
    }
}
