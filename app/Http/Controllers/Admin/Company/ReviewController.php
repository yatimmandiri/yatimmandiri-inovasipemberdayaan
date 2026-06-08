<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreReviewRequest;
use App\Http\Requests\Company\UpdateReviewRequest;
use App\Models\Company\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    use UploadFiles, LogActivity;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Review::class);

        $data = [];

        return Inertia::render('admin/company/reviews/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Review::class);

        $data = [];

        return Inertia::render('admin/company/reviews/create', $data);
    }

    /**
     * Store a newly Created resource in storage.
     */
    public function store(StoreReviewRequest $request)
    {
        $this->authorize('create', Review::class);

        $data = [
            'name' => $request->name,
            'position' => $request->position,
            'description' => $request->description,
        ];

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->uploadFile(null, $request->file('photo'), 'Reviews');
        }

        $review = Review::create($data);

        if ($review) {
            $this->logSuccess('create-review', "Created Review: {$review->name}", [
                'review_id' => $review->id,
                'new_data' => $review->toArray(),
            ]);
        } else {
            $this->logError('create-review', "Failed to create review: {$review->name}", [
                'review_id' => $review->id,
                'new_data' => $review->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.reviews.index')->with('success', 'Review Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        $this->authorize('view', $review);

        $data = [
            'review' => $review,
        ];

        return Inertia::render('admin/company/reviews/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        $this->authorize('update', $review);

        $data = [
            'review' => $review,
        ];

        return Inertia::render('admin/company/reviews/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review)
    {
        $this->authorize('update', $review);

        $data = $request->only([
            'name',
            'position',
            'description',
        ]);

        $oldData = $review->replicate();

        if ($request->hasFile('photo')) {
            $this->deleteFile($oldData->photo);
            $data['photo'] = $this->uploadFile($review->photo, $request->file('photo'), 'Reviews');
        }

        $review->update($data);

        if ($review) {
            $this->logSuccess('update-review', "Updated Review: {$review->name}", [
                'review_id' => $review->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $review->toArray(),
            ]);
        } else {
            $this->logError('update-review', "Failed to update review: {$review->name}", [
                'review_id' => $review->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $review->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.reviews.index')->with('success', 'Review Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $this->authorize('delete', $review);

        $this->deleteFile($review->photo);

        $review->delete();

        if ($review) {
            $this->logSuccess('delete-review', "Delete Review: {$review->name}", ['review_id' => $review->id]);
        } else {
            $this->logError('delete-review', "Failed to delete Review: {$review->name}", ['review_id' => $review->id]);
        }

        return redirect()->route('admin.companies.reviews.index')->with('success', 'Review Deleted Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-review', Review::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');

        $query = Review::query()
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
