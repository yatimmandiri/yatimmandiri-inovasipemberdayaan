<?php

namespace App\Http\Controllers\Admin\Company;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreLocationRequest;
use App\Http\Requests\Company\UpdateLocationRequest;
use App\Models\Company\Location;
use App\Models\Company\Program;
use App\Models\Core\Region\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    use LogActivity;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Location::class);

        $data = [];

        return Inertia::render('admin/company/locations/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Location::class);

        $provinces = Province::query()->select(['id', 'name'])->get();
        $programs = Program::query()->select(['id', 'name'])->get();

        $data = [
            'provinces' => $provinces,
            'programs' => $programs,
        ];

        return Inertia::render('admin/company/locations/create', $data);
    }

    /**
     * Store a newly Created resource in storage.
     */
    public function store(StoreLocationRequest $request)
    {
        $this->authorize('create', Location::class);

        $data = [
            'pic' => $request->name,
            'address' => $request->address,
            'phone' => $request->phone,
            'province_id' => $request->province_id,
            'regency_id' => $request->regency_id,
            'district_id' => $request->district_id,
            'village_id' => $request->village_id,
            'program_id' => $request->program_id,
        ];

        $location = Location::create($data);

        if ($location) {
            $this->logSuccess('create-location', "Created Location: {$location->name}", [
                'location_id' => $location->id,
                'new_data' => $location->toArray(),
            ]);
        } else {
            $this->logError('create-location', "Failed to create Location: {$location->name}", [
                'location_id' => $location->id,
                'new_data' => $location->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.locations.index')->with('success', 'Location Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        $this->authorize('view', $location);

        $data = [
            'location' => $location,
        ];

        return Inertia::render('admin/company/locations/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        $this->authorize('update', $location);

        $provinces = Province::query()->select(['id', 'name'])->get();
        $programs = Program::query()->select(['id', 'name'])->get();

        $data = [
            'location' => $location,
            'provinces' => $provinces,
            'programs' => $programs,
        ];

        return Inertia::render('admin/company/locations/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, Location $location)
    {
        $this->authorize('update', $location);

        $data = $request->only([
            'pic',
            'address',
            'phone',
            'province_id',
            'regency_id',
            'district_id',
            'village_id',
            'program_id',
        ]);

        $data['pic'] = $request->name;

        $oldData = $location->replicate();

        $location->update($data);

        if ($location) {
            $this->logSuccess('update-location', "Updated Location: {$location->name}", [
                'location_id' => $location->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $location->toArray(),
            ]);
        } else {
            $this->logError('update-location', "Failed to update location: {$location->name}", [
                'location_id' => $location->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $location->toArray(),
            ]);
        }

        return redirect()->route('admin.companies.locations.index')->with('success', 'Location Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        $this->authorize('delete', $location);

        $location->delete();

        if ($location) {
            $this->logSuccess('delete-location', "Delete Location: {$location->name}", ['location_id' => $location->id]);
        } else {
            $this->logError('delete-location', "Failed to delete Location: {$location->name}", ['location_id' => $location->id]);
        }

        return redirect()->route('admin.companies.locations.index')->with('success', 'location Deleted Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-location', Location::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');

        $query = Location::query()
            ->with(['program'])
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
