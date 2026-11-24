<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreBeneficiaryRequest;
use App\Http\Requests\Company\UpdateBeneficiaryRequest;
use App\Models\Company\Beneficiary;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use App\Models\Company\Program;
use App\Models\Core\Region\Province;
use App\Services\KantorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeneficiaryController extends Controller
{
    use LogActivity;

    /**
     * Display a listing of beneficiaries.
     */
    public function index()
    {
        $this->authorize('viewAny', Beneficiary::class);

        return Inertia::render('admin/beneficiaries/list', [
            'pageTitle' => 'Master Data Penerima Manfaat',
            'kantors' => KantorService::getActive(),
        ]);
    }

    /**
     * Endpoint DataTable.
     */
    public function getData(Request $request)
    {
        $this->authorize('data-beneficiary', Beneficiary::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'asc'));

        $allowedSorts = ['id', 'name', 'nik', 'kantor_name', 'phone', 'status', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'asc';
        }

        $filterValue = $request->input('filterValue', []);
        if (is_string($filterValue)) {
            $filterValue = json_decode($filterValue, true) ?? [];
        }

        $query = Beneficiary::query()
            ->with(['programs:id,name', 'fasilitator:id,name', 'group:id,name', 'province:id,name', 'regency:id,name'])
            ->search($globalSearch)
            ->when(! empty($filterValue['kantor_id']), function ($q) use ($filterValue) {
                $q->where('kantor_id', $filterValue['kantor_id']);
            })
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Show the form for creating a new beneficiary.
     */
    public function create()
    {
        $this->authorize('create', Beneficiary::class);

        return Inertia::render('admin/beneficiaries/create', [
            'pageTitle' => 'Tambah Penerima Manfaat',
            'programs' => Program::query()->select(['id', 'name'])->orderBy('name')->get(),
            'fasilitators' => Fasilitator::query()->active()->select(['id', 'name'])->orderBy('name')->get(),
            'groups' => Group::query()->active()->select(['id', 'name'])->orderBy('name')->get(),
            'provinces' => Province::query()->select(['id', 'name'])->orderBy('name')->get(),
            'kantors' => KantorService::getActive(),
        ]);
    }

    /**
     * Store a newly created beneficiary.
     */
    public function store(StoreBeneficiaryRequest $request)
    {
        $this->authorize('create', Beneficiary::class);

        $data = $request->validated();
        $programIds = $data['program_ids'] ?? [];
        unset($data['program_ids']);
        $data['status'] = $request->boolean('status', true);

        $beneficiary = Beneficiary::create($data);

        if ($beneficiary) {
            $beneficiary->programs()->sync($programIds);

            $this->logSuccess('create-beneficiary', "Created Beneficiary #{$beneficiary->id} ({$beneficiary->name})", [
                'beneficiary_id' => $beneficiary->id,
                'programs' => $programIds,
                'new_data' => $beneficiary->toArray(),
            ]);
        } else {
            $this->logError('create-beneficiary', 'Failed to create Beneficiary', [
                'new_data' => $data,
            ]);
        }

        return redirect()->route('admin.beneficiaries.index')
            ->with('success', 'Penerima Manfaat Berhasil Ditambahkan');
    }

    /**
     * Display the specified beneficiary.
     */
    public function show(Beneficiary $beneficiary)
    {
        $this->authorize('view', $beneficiary);

        return Inertia::render('admin/beneficiaries/show', [
            'pageTitle' => 'Detail Penerima Manfaat: '.$beneficiary->name,
            'beneficiary' => $beneficiary->load([
                'programs:id,name',
                'fasilitator:id,name,phone',
                'group:id,name',
                'province:id,name',
                'regency:id,name',
                'district:id,name',
                'village:id,name',
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified beneficiary.
     */
    public function edit(Beneficiary $beneficiary)
    {
        $this->authorize('update', $beneficiary);

        return Inertia::render('admin/beneficiaries/edit', [
            'pageTitle' => 'Edit Penerima Manfaat: '.$beneficiary->name,
            'beneficiary' => $beneficiary->load('programs:id,name'),
            'programs' => Program::query()->select(['id', 'name'])->orderBy('name')->get(),
            'fasilitators' => Fasilitator::query()->active()->select(['id', 'name'])->orderBy('name')->get(),
            'groups' => Group::query()->active()->select(['id', 'name'])->orderBy('name')->get(),
            'provinces' => Province::query()->select(['id', 'name'])->orderBy('name')->get(),
            'kantors' => KantorService::getActive(),
        ]);
    }

    /**
     * Update the specified beneficiary.
     */
    public function update(UpdateBeneficiaryRequest $request, Beneficiary $beneficiary)
    {
        $this->authorize('update', $beneficiary);

        $data = $request->validated();
        $programIds = $data['program_ids'] ?? [];
        unset($data['program_ids']);
        $data['status'] = $request->boolean('status', true);

        $oldData = $beneficiary->replicate();
        $beneficiary->update($data);

        if ($beneficiary) {
            $beneficiary->programs()->sync($programIds);

            $this->logSuccess('update-beneficiary', "Updated Beneficiary #{$beneficiary->id} ({$beneficiary->name})", [
                'beneficiary_id' => $beneficiary->id,
                'programs' => $programIds,
                'old_data' => $oldData->toArray(),
                'new_data' => $beneficiary->toArray(),
            ]);
        } else {
            $this->logError('update-beneficiary', "Failed to update Beneficiary #{$beneficiary->id}", [
                'beneficiary_id' => $beneficiary->id,
                'old_data' => $oldData->toArray(),
            ]);
        }

        return redirect()->route('admin.beneficiaries.index')
            ->with('success', 'Penerima Manfaat Berhasil Diperbarui');
    }

    /**
     * Remove the specified beneficiary.
     */
    public function destroy(Beneficiary $beneficiary)
    {
        $this->authorize('delete', $beneficiary);

        $oldData = $beneficiary->replicate();
        $beneficiary->delete();

        if ($beneficiary) {
            $this->logSuccess('delete-beneficiary', "Deleted Beneficiary #{$beneficiary->id} ({$beneficiary->name})", [
                'beneficiary_id' => $beneficiary->id,
                'old_data' => $oldData->toArray(),
            ]);
        } else {
            $this->logError('delete-beneficiary', "Failed to delete Beneficiary #{$beneficiary->id}", [
                'beneficiary_id' => $beneficiary->id,
            ]);
        }

        return redirect()->route('admin.beneficiaries.index')
            ->with('success', 'Penerima Manfaat Berhasil Dihapus');
    }

    /**
     * Toggle status aktif penerima manfaat.
     */
    public function status(Beneficiary $beneficiary)
    {
        $this->authorize('update', $beneficiary);

        $beneficiary->update(['status' => ! $beneficiary->status]);

        return redirect()->back()->with('success', 'Status Penerima Manfaat Berhasil Diperbarui');
    }
}
