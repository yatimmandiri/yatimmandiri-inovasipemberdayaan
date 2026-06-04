<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProgramCategoryRequest;
use App\Http\Requests\UpdateProgramCategoryRequest;
use App\Models\ProgramCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramCategoryController extends Controller
{
    use LogActivity;

    public function index()
    {
        $this->authorize('viewAny', ProgramCategory::class);

        return Inertia::render('admin/program-categories/list');
    }

    public function create()
    {
        $this->authorize('create', ProgramCategory::class);

        return Inertia::render('admin/program-categories/create');
    }

    public function store(StoreProgramCategoryRequest $request)
    {
        $this->authorize('create', ProgramCategory::class);

        $category = ProgramCategory::create([
            ...$request->only(['name', 'description']),
            'status' => $request->boolean('status', true),
        ]);

        $this->logSuccess('create-program-category', "Created Program Category: {$category->name}", [
            'program_category_id' => $category->id,
            'new_data' => $category->toArray(),
        ]);

        return redirect()->route('admin.program-categories.index')->with('success', 'Program Category Created Successfully');
    }

    public function show(ProgramCategory $programCategory)
    {
        $this->authorize('view', $programCategory);

        return Inertia::render('admin/program-categories/show', [
            'category' => $programCategory->loadCount('programs'),
        ]);
    }

    public function edit(ProgramCategory $programCategory)
    {
        $this->authorize('update', $programCategory);

        return Inertia::render('admin/program-categories/edit', [
            'category' => $programCategory,
        ]);
    }

    public function update(UpdateProgramCategoryRequest $request, ProgramCategory $programCategory)
    {
        $this->authorize('update', $programCategory);

        $oldData = $programCategory->replicate();

        $programCategory->update([
            ...$request->only(['name', 'description']),
            'status' => $request->boolean('status'),
        ]);

        $this->logSuccess('update-program-category', "Updated Program Category: {$programCategory->name}", [
            'program_category_id' => $programCategory->id,
            'old_data' => $oldData->toArray(),
            'new_data' => $programCategory->toArray(),
        ]);

        return redirect()->route('admin.program-categories.index')->with('success', 'Program Category Updated Successfully');
    }

    public function destroy(ProgramCategory $programCategory)
    {
        $this->authorize('delete', $programCategory);

        $programCategory->delete();

        $this->logSuccess('delete-program-category', "Deleted Program Category: {$programCategory->name}", [
            'program_category_id' => $programCategory->id,
        ]);

        return redirect()->route('admin.program-categories.index')->with('success', 'Program Category Deleted Successfully');
    }

    public function status(ProgramCategory $programCategory)
    {
        $this->authorize('update', $programCategory);

        $programCategory->update([
            'status' => ! $programCategory->status,
        ]);

        return redirect()->route('admin.program-categories.index')->with('success', 'Program Category Status Updated Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data', ProgramCategory::class);

        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');
        $allowedSorts = ['id', 'name', 'status', 'created_at', 'updated_at'];

        $query = ProgramCategory::query()
            ->withCount('programs')
            ->when($globalSearch, function ($query, string $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy(in_array($orderBy, $allowedSorts, true) ? $orderBy : 'id', $orderDirection === 'asc' ? 'asc' : 'desc');

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
