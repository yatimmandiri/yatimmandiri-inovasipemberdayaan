<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreProgramRequest;
use App\Http\Requests\Company\UpdateProgramRequest;
use App\Models\Company\Category;
use App\Models\Company\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProgramController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Program::class);

        $categories = Category::select(['id', 'name'])->get();

        $data = [
            'categories' => $categories
        ];

        return Inertia::render('admin/company/program/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Program::class);

        $categories = Category::select(['id', 'name'])->get();

        $data = [
            'categories' => $categories
        ];

        return Inertia::render('admin/company/program/create', $data);
    }

    /**
     * Store a newly Created resource in storage.
     */
    public function store(StoreProgramRequest $request)
    {
        $this->authorize('create', Program::class);

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'activities' => $request->benefits,
        ];

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $this->uploadFile(null, $request->file('featured_image'), 'uploads/program');
        }

        $program = Program::create($data);

        if ($program) {
            $this->logSuccess('create-program', "Created Program: {$program->name}", [
                'program_id' => $program->id,
                'new_data' => $program->toArray(),
            ]);
        } else {
            $this->logError('create-program', "Failed to create Program: {$program->name}", [
                'program_id' => $program->id,
                'new_data' => $program->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.programs.index')->with('success', 'Program Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Program $program)
    {
        $this->authorize('view', $program);

        $program->load('category');

        $data = [
            'program' => $program,
        ];

        return Inertia::render('admin/company/program/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Program $program)
    {
        $this->authorize('update', $program);

        $categories = Category::select(['id', 'name'])->get();

        $data = [
            'program' => $program,
            'categories' => $categories
        ];

        return Inertia::render('admin/company/program/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgramRequest $request, Program $program)
    {
        $this->authorize('update', $program);

        $data = $request->only(['name', 'description', 'category_id', 'benefits']);
        $data['activities'] = $request->benefits;
        $data['excerpt'] = Str::limit($request->description, 100);

        $oldData = $program->replicate();

        if ($request->hasFile('featured_image')) {
            $this->deleteFile($oldData->featured_image);

            $data['featured_image'] = $this->uploadFile($program->featured_image, $request->file('featured_image'), 'uploads/program');
        }

        $program->update($data);

        if ($program) {
            $this->logSuccess('update-program', "Update Program: {$program->name}", [
                'program_id' => $program->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $program->toArray(),
            ]);
        } else {
            $this->logError('update-program', "Failed to update Program: {$program->name}", [
                'program_id' => $program->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $program->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.programs.index')->with('success', 'Program Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Program $program)
    {
        $this->authorize('delete', $program);

        $program->delete();

        if ($program) {
            $this->logSuccess('delete-program', "Delete Program: {$program->name}", ['program_id' => $program->id]);
        } else {
            $this->logError('delete-program', "Failed to delete Program: {$program->name}", ['program_id' => $program->id]);
        }

        return redirect()->route('admin.companies.programs.index')->with('success', 'Program Deleted Successfully');
    }

    public function status(Request $request, string $id)
    {
        $program = Program::findOrFail($id);

        $this->authorize('update', $program);

        if (!$program) {
            return redirect()->back()->with('error', 'Program not found');
        }

        $program->status = $program->status ? false : true;
        $program->save();

        if ($program) {
            $this->logSuccess('change-status-program', "Change status program: {$program->name}", ['program_id' => $program->id]);
        } else {
            $this->logError('change-status-program', "Failed to change status program: {$program->name}", ['program_id' => $program->id]);
        }

        return redirect()->route('admin.companies.programs.index')->with('success', 'Change Status Successfully');
    }

    public function recommended(Request $request, string $id)
    {
        $program = program::findOrFail($id);

        $this->authorize('update', $program);

        if (!$program) {
            return redirect()->back()->with('error', 'Program not found');
        }

        $program->recommended = $program->recommended ? false : true;
        $program->save();

        if ($program) {
            $this->logSuccess('change-recommended-program', "Change recommended program: {$program->name}", ['program_id' => $program->id]);
        } else {
            $this->logError('change-recommended-program', "Failed to change recommended program: {$program->name}", ['program_id' => $program->id]);
        }

        return redirect()->route('admin.companies.programs.index')->with('success', 'Change Recommended Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-program', Program::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');
        $filterValue = $request->input('filterValue', []);

        $query = Program::query()
            ->with(['category'])
            ->latest()
            ->search($globalSearch)
            ->when(
                data_get($filterValue, 'category_id'),
                fn($q, $category_id) => $q->where('category_id', $category_id)
            )
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
