<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreGalleryRequest;
use App\Http\Requests\UpdateGalleryRequest;
use App\Models\Company\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Gallery::class);

        $data = [];

        return Inertia::render('admin/company/gallery/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Gallery::class);

        $data = [];

        return Inertia::render('admin/company/gallery/create', $data);
    }

    /**
     * Store a newly Created resource in storage.
     */
    public function store(StoreGalleryRequest $request)
    {
        $this->authorize('create', Gallery::class);

        $data = [
            'name' => $request->name,
            'program_id' => $request->program_id,
        ];

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->uploadFile(null, $request->file('photo'), 'uploads/gallery');
        }

        $gallery = Gallery::create($data);

        if ($gallery) {
            $this->logSuccess('create-gallery', "Created Gallery: {$gallery->name}", [
                'gallery_id' => $gallery->id,
                'new_data' => $gallery->toArray(),
            ]);
        } else {
            $this->logError('create-gallery', "Failed to create Gallery: {$gallery->name}", [
                'gallery_id' => $gallery->id,
                'new_data' => $gallery->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.galleries.index')->with('success', 'Gallery Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        $this->authorize('view', $gallery);

        $gallery->load(['programs']);

        $data = [
            'gallery' => $gallery,
        ];

        return Inertia::render('admin/company/gallery/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {
        $this->authorize('update', $gallery);

        $gallery->load(['programs']);

        $data = [
            'gallery' => $gallery,
        ];

        return Inertia::render('admin/company/gallery/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGalleryRequest $request, Gallery $gallery)
    {
        $this->authorize('update', $gallery);

        $data = $request->only(['name', 'program_id']);

        $oldData = $gallery->replicate();

        if ($request->hasFile('photo')) {
            $this->deleteFile($oldData->photo);

            $data['photo'] = $this->uploadFile($gallery->photo, $request->file('photo'), 'uploads/gallery');
        }

        $gallery->update($data);

        if ($gallery) {
            $this->logSuccess('update-gallery', "Update Gallery: {$gallery->name}", [
                'gallery_id' => $gallery->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $gallery->toArray(),
            ]);
        } else {
            $this->logError('update-gallery', "Failed to update Gallery: {$gallery->name}", [
                'gallery_id' => $gallery->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $gallery->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.galleries.index')->with('success', 'Gallery Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        $this->authorize('delete', $gallery);

        $gallery->delete();

        if ($gallery) {
            $this->logSuccess('delete-gallery', "Delete Gallery: {$gallery->name}", ['gallery_id' => $gallery->id]);
        } else {
            $this->logError('delete-gallery', "Failed to delete Gallery: {$gallery->name}", ['gallery_id' => $gallery->id]);
        }

        return redirect()->route('admin.companies.galleries.index')->with('success', 'Gallery Deleted Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-gallery', Gallery::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');
        $filterValue = $request->input('filterValue', []);

        $query = Gallery::query()
            ->latest()
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
