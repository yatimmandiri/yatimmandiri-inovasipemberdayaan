<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreMitraRequest;
use App\Http\Requests\Company\UpdateMitraRequest;
use App\Models\Company\Mitra;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MitraController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Mitra::class);

        $data = [];

        return Inertia::render('admin/company/mitra/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Mitra::class);

        $data = [];

        return Inertia::render('admin/company/mitra/create', $data);
    }

    /**
     * Store a newly Created resource in storage.
     */
    public function store(StoreMitraRequest $request)
    {
        $this->authorize('create', Mitra::class);

        $data = [
            'name' => $request->name,
        ];

        if ($request->hasFile('logo')) {
            $data['logo'] = $this->uploadFile(null, $request->file('logo'), 'uploads/mitra');
        }

        $mitra = Mitra::create($data);

        if ($mitra) {
            $this->logSuccess('create-mitra', "Created Mitra: {$mitra->name}", [
                'mitra_id' => $mitra->id,
                'new_data' => $mitra->toArray(),
            ]);
        } else {
            $this->logError('create-mitra', "Failed to create Mitra: {$mitra->name}", [
                'mitra_id' => $mitra->id,
                'new_data' => $mitra->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.mitras.index')->with('success', 'Mitra Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Mitra $mitra)
    {
        $this->authorize('view', $mitra);

        $data = [
            'mitra' => $mitra,
        ];

        return Inertia::render('admin/company/mitra/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mitra $mitra)
    {
        $this->authorize('update', $mitra);

        $data = [
            'mitra' => $mitra,
        ];

        return Inertia::render('admin/company/mitra/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMitraRequest $request, Mitra $mitra)
    {
        $this->authorize('update', $mitra);

        $data = $request->only(['name']);

        $oldData = $mitra->replicate();

        if ($request->hasFile('logo')) {
            $this->deleteFile($oldData->logo);

            $data['logo'] = $this->uploadFile($mitra->logo, $request->file('logo'), 'uploads/mitra');
        }

        $mitra->update($data);

        if ($mitra) {
            $this->logSuccess('update-mitra', "Update Mitra: {$mitra->name}", [
                'mitra_id' => $mitra->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $mitra->toArray(),
            ]);
        } else {
            $this->logError('update-mitra', "Failed to update mitra: {$mitra->name}", [
                'mitra_id' => $mitra->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $mitra->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.mitras.index')->with('success', 'Mitra Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mitra $mitra)
    {
        $this->authorize('delete', $mitra);

        $mitra->delete();

        if ($mitra) {
            $this->logSuccess('delete-mitra', "Delete Mitra: {$mitra->name}", ['mitra_id' => $mitra->id]);
        } else {
            $this->logError('delete-mitra', "Failed to delete mitra: {$mitra->name}", ['mitra_id' => $mitra->id]);
        }

        return redirect()->route('admin.companies.mitras.index')->with('success', 'Mitra Deleted Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-mitra', Mitra::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');
        $filterValue = $request->input('filterValue', []);

        $query = Mitra::query()
            ->latest()
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
