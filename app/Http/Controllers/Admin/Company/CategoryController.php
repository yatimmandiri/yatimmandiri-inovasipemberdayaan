<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCategoryRequest;
use App\Http\Requests\Company\UpdateCategoryRequest;
use App\Models\Company\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Category::class);

        $data = [
            'pageTitle' => 'Categories',
        ];

        return Inertia::render('admin/company/categories/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Category::class);

        $data = ['
            pageTitle' => 'Create Category',];

        return Inertia::render('admin/company/categories/create', $data);
    }

    /**
     * Store a newly Created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $this->authorize('create', Category::class);

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'excerpt' => Str::limit($request->description, 100),
            'benefits' => $request->benefits,
        ];

        if ($request->hasFile('icon')) {
            $data['icon'] = $this->uploadFile(null, $request->file('icon'), 'uploads');
        }

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $this->uploadFile(null, $request->file('featured_image'), 'uploads');
        }

        $category = Category::create($data);

        if ($category) {
            $this->logSuccess('create-category', "Created Category: {$category->name}", [
                'category_id' => $category->id,
                'new_data' => $category->toArray(),
            ]);
        } else {
            $this->logError('create-category', "Failed to create category: {$category->name}", [
                'category_id' => $category->id,
                'new_data' => $category->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.categories.index')->with('success', 'Category Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $this->authorize('view', $category);

        $data = [
            'pageTitle' => 'Edit Category',
            'category' => $category,
        ];

        return Inertia::render('admin/company/categories/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $this->authorize('update', $category);

        $data = [
            'category' => $category,
        ];

        return Inertia::render('admin/company/categories/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->authorize('update', $category);

        $data = $request->only(['name', 'description', 'benefits']);

        $data['excerpt'] = Str::limit($request->description, 100);

        $oldData = $category->replicate();

        if ($request->hasFile('icon')) {
            $this->deleteFile($oldData->icon);

            $data['icon'] = $this->uploadFile($category->icon, $request->file('icon'), 'uploads');
        }

        if ($request->hasFile('featured_image')) {
            $this->deleteFile($oldData->featured_image);

            $data['featured_image'] = $this->uploadFile($category->featured_image, $request->file('featured_image'), 'uploads');
        }

        $category->update($data);

        if ($category) {
            $this->logSuccess('update-category', "Update Category: {$category->name}", [
                'category_id' => $category->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $category->toArray(),
            ]);
        } else {
            $this->logError('update-category', "Failed to update category: {$category->name}", [
                'category_id' => $category->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $category->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.categories.index')->with('success', 'Category Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        $this->deleteFile($category->icon);
        $this->deleteFile($category->featured_image);

        $category->delete();

        if ($category) {
            $this->logSuccess('delete-category', "Delete category: {$category->name}", ['category_id' => $category->id]);
        } else {
            $this->logError('delete-category', "Failed to delete category: {$category->name}", ['category_id' => $category->id]);
        }

        return redirect()->route('admin.companies.categories.index')->with('success', 'Category Deleted Successfully');
    }

    public function status(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $this->authorize('update', $category);

        if (!$category) {
            return redirect()->back()->with('error', 'Category not found');
        }

        $category->status = $category->status ? false : true;
        $category->save();

        if ($category) {
            $this->logSuccess('change-status-category', "Change status category: {$category->name}", ['category_id' => $category->id]);
        } else {
            $this->logError('change-status-category', "Failed to change status category: {$category->name}", ['category_id' => $category->id]);
        }

        return redirect()->route('admin.companies.categories.index')->with('success', 'Change Status Successfully');
    }

    public function recommended(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $this->authorize('update', $category);

        if (!$category) {
            return redirect()->back()->with('error', 'Category not found');
        }

        $category->recommended = $category->recommended ? false : true;
        $category->save();

        if ($category) {
            $this->logSuccess('change-recommended-category', "Change recommended category: {$category->name}", ['category_id' => $category->id]);
        } else {
            $this->logError('change-recommended-category', "Failed to change recommended category: {$category->name}", ['category_id' => $category->id]);
        }

        return redirect()->route('admin.companies.categories.index')->with('success', 'Change Recommended Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-category', Category::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');

        $query = Category::query()
            ->latest()
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
