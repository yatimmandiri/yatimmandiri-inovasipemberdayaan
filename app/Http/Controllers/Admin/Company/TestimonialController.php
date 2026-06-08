<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreTestimonialRequest;
use App\Http\Requests\Company\UpdateTestimonialRequest;
use App\Models\Company\Category;
use App\Models\Company\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    use UploadFiles, LogActivity;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Testimonial::class);

        $data = [];

        return Inertia::render('admin/company/testimonials/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Testimonial::class);

        $category = Category::query()->get();

        $data = [
            'category' => $category,
        ];

        return Inertia::render('admin/company/testimonials/create', $data);
    }

    /**
     * Store a newly Created resource in storage.
     */
    public function store(StoreTestimonialRequest $request)
    {
        $this->authorize('create', Testimonial::class);

        $data = [
            'name' => $request->name,
            'position' => $request->position,
            'description' => $request->description,
            'categories_id' => $request->categories_id,
        ];

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->uploadFile(null, $request->file('photo'), 'Testimonials');
        }

        $testimonial = Testimonial::create($data);

        if ($testimonial) {
            $this->logSuccess('create-testimonial', "Created Testimonial: {$testimonial->name}", [
                'testimonial_id' => $testimonial->id,
                'new_data' => $testimonial->toArray(),
            ]);
        } else {
            $this->logError('create-testimonial', "Failed to create testimonial: {$testimonial->name}", [
                'testimonial_id' => $testimonial->id,
                'new_data' => $testimonial->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.testimonials.index')->with('success', 'Testimonial Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        $this->authorize('view', $testimonial);

        $testimonial->load(['categories']);

        $data = [
            'testimonial' => $testimonial,
        ];

        return Inertia::render('admin/company/testimonials/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Testimonial $testimonial)
    {
        $this->authorize('update', $testimonial);

        $category = Category::query()->get();

        $testimonial->load(['categories']);

        $data = [
            'testimonial' => $testimonial,
            'category' => $category,
        ];

        return Inertia::render('admin/company/testimonials/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
    {
        $this->authorize('update', $testimonial);

        $data = $request->only([
            'name',
            'position',
            'description',
            'categories_id',
        ]);

        $oldData = $testimonial->replicate();

        if ($request->hasFile('photo')) {
            $this->deleteFile($oldData->photo);
            $data['photo'] = $this->uploadFile($testimonial->photo, $request->file('photo'), 'Testimonials');
        }

        $testimonial->update($data);

        if ($testimonial) {
            $this->logSuccess('update-testimonial', "Updated Testimonial: {$testimonial->name}", [
                'testimonial_id' => $testimonial->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $testimonial->toArray(),
            ]);
        } else {
            $this->logError('update-testimonial', "Failed to update testimonial: {$testimonial->name}", [
                'testimonial_id' => $testimonial->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $testimonial->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.testimonials.index')->with('success', 'Testimonial Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        $this->authorize('delete', $testimonial);

        $this->deleteFile($testimonial->photo);

        $testimonial->delete();

        if ($testimonial) {
            $this->logSuccess('delete-testimonial', "Delete Testimonial: {$testimonial->name}", ['testimonial_id' => $testimonial->id]);
        } else {
            $this->logError('delete-testimonial', "Failed to delete Testimonial: {$testimonial->name}", ['testimonial_id' => $testimonial->id]);
        }

        return redirect()->route('admin.companies.testimonials.index')->with('success', 'Testimonial Deleted Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-testimonial-company', Testimonial::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');

        $query = Testimonial::query()
            ->with(['categories'])
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
