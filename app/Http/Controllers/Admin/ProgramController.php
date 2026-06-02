<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProgramController extends Controller
{
    use LogActivity, UploadFiles;

    public function index()
    {
        $this->authorize('viewAny', Program::class);

        return Inertia::render('admin/programs/list');
    }

    public function create()
    {
        $this->authorize('create', Program::class);

        return Inertia::render('admin/programs/create');
    }

    public function store(StoreProgramRequest $request)
    {
        $this->authorize('create', Program::class);

        $data = $request->only(['name', 'description']);
        $data['status'] = $request->boolean('status', true);
        $data['excerpt'] = Str::limit(strip_tags($request->description), 140);

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $this->uploadFile(null, $request->file('featured_image'), 'programs');
        }

        $program = Program::create($data);

        $this->logSuccess('create-program', "Created Program: {$program->name}", [
            'program_id' => $program->id,
            'new_data' => $program->toArray(),
        ]);

        return redirect()->route('admin.programs.index')->with('success', 'Program Created Successfully');
    }

    public function show(Program $program)
    {
        $this->authorize('view', $program);

        return Inertia::render('admin/programs/show', [
            'program' => $program,
        ]);
    }

    public function edit(Program $program)
    {
        $this->authorize('update', $program);

        return Inertia::render('admin/programs/edit', [
            'program' => $program,
        ]);
    }

    public function update(UpdateProgramRequest $request, Program $program)
    {
        $this->authorize('update', $program);

        $oldData = $program->replicate();

        $data = $request->only(['name', 'description']);
        $data['status'] = $request->boolean('status');
        $data['excerpt'] = Str::limit(strip_tags($request->description), 140);

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $this->replaceFile($program->featured_image, $request->file('featured_image'), 'programs');
        }

        $program->update($data);

        $this->logSuccess('update-program', "Updated Program: {$program->name}", [
            'program_id' => $program->id,
            'old_data' => $oldData->toArray(),
            'new_data' => $program->toArray(),
        ]);

        return redirect()->route('admin.programs.index')->with('success', 'Program Updated Successfully');
    }

    public function destroy(Program $program)
    {
        $this->authorize('delete', $program);

        $program->delete();

        $this->logSuccess('delete-program', "Deleted Program: {$program->name}", [
            'program_id' => $program->id,
        ]);

        return redirect()->route('admin.programs.index')->with('success', 'Program Deleted Successfully');
    }

    public function status(Program $program)
    {
        $this->authorize('update', $program);

        $program->update([
            'status' => ! $program->status,
        ]);

        return redirect()->route('admin.programs.index')->with('success', 'Program Status Updated Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-program', Program::class);

        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');
        $allowedSorts = ['id', 'name', 'status', 'created_at', 'updated_at'];

        $query = Program::query()
            ->search($globalSearch)
            ->orderBy(in_array($orderBy, $allowedSorts, true) ? $orderBy : 'id', $orderDirection === 'asc' ? 'asc' : 'desc');

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
