<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Requests\UpdateTestimonialRequest;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    use LogActivity, UploadFiles;

    public function index()
    {
        $this->authorize('viewAny', Testimonial::class);

        return Inertia::render('admin/testimonials/list');
    }

    public function create()
    {
        $this->authorize('create', Testimonial::class);

        return Inertia::render('admin/testimonials/create');
    }

    public function store(StoreTestimonialRequest $request)
    {
        $this->authorize('create', Testimonial::class);

        $data = $request->only(['name', 'position', 'description', 'rating']);
        $data['status'] = $request->boolean('status', true);

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->uploadFile(null, $request->file('photo'), 'testimonials');
        }

        $testimonial = Testimonial::create($data);

        $this->logSuccess('create-testimonial', "Created Testimonial: {$testimonial->name}", [
            'testimonial_id' => $testimonial->id,
            'new_data' => $testimonial->toArray(),
        ]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial Created Successfully');
    }

    public function show(Testimonial $testimonial)
    {
        $this->authorize('view', $testimonial);

        return Inertia::render('admin/testimonials/show', [
            'testimonial' => $testimonial,
        ]);
    }

    public function edit(Testimonial $testimonial)
    {
        $this->authorize('update', $testimonial);

        return Inertia::render('admin/testimonials/edit', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
    {
        $this->authorize('update', $testimonial);

        $oldData = $testimonial->replicate();

        $data = $request->only(['name', 'position', 'description', 'rating']);
        $data['status'] = $request->boolean('status');

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->replaceFile($testimonial->photo, $request->file('photo'), 'testimonials');
        }

        $testimonial->update($data);

        $this->logSuccess('update-testimonial', "Updated Testimonial: {$testimonial->name}", [
            'testimonial_id' => $testimonial->id,
            'old_data' => $oldData->toArray(),
            'new_data' => $testimonial->toArray(),
        ]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial Updated Successfully');
    }

    public function destroy(Testimonial $testimonial)
    {
        $this->authorize('delete', $testimonial);

        $this->deleteFile($testimonial->photo);
        $testimonial->delete();

        $this->logSuccess('delete-testimonial', "Deleted Testimonial: {$testimonial->name}", [
            'testimonial_id' => $testimonial->id,
        ]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial Deleted Successfully');
    }

    public function status(Testimonial $testimonial)
    {
        $this->authorize('update', $testimonial);

        $testimonial->update([
            'status' => ! $testimonial->status,
        ]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial Status Updated Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-testimonial', Testimonial::class);

        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');
        $allowedSorts = ['id', 'name', 'position', 'rating', 'status', 'created_at', 'updated_at'];

        $query = Testimonial::query()
            ->search($globalSearch)
            ->orderBy(in_array($orderBy, $allowedSorts, true) ? $orderBy : 'id', $orderDirection === 'asc' ? 'asc' : 'desc');

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
