<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreFasilitatorRequest;
use App\Http\Requests\Company\UpdateFasilitatorRequest;
use App\Models\Company\Fasilitator;
use App\Models\Company\Program;
use App\Models\Core\Region\Province;
use App\Models\Core\Role;
use App\Models\Core\User;
use App\Services\KantorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class FasilitatorController extends Controller
{
    use LogActivity;

    /**
     * Display a listing of fasilitators.
     */
    public function index()
    {
        $this->authorize('viewAny', Fasilitator::class);

        return Inertia::render('admin/fasilitators/list', [
            'pageTitle' => 'Master Data Fasilitator',
        ]);
    }

    /**
     * Endpoint DataTable.
     */
    public function getData(Request $request)
    {
        $this->authorize('data-fasilitator', Fasilitator::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'asc'));

        $allowedSorts = ['id', 'name', 'kantor_name', 'email', 'phone', 'status', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'asc';
        }

        $query = Fasilitator::query()
            ->with(['programs:id,name', 'user:id,name,email', 'province:id,name', 'regency:id,name'])
            ->withCount('beneficiaries')
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Show the form for creating a new fasilitator.
     */
    public function create()
    {
        $this->authorize('create', Fasilitator::class);

        return Inertia::render('admin/fasilitators/create', [
            'pageTitle' => 'Tambah Fasilitator',
            'programs' => Program::query()->select(['id', 'name'])->orderBy('name')->get(),
            'users' => User::query()->select(['id', 'name', 'email'])->orderBy('name')->get(),
            'provinces' => Province::query()->select(['id', 'name'])->orderBy('name')->get(),
            'kantors' => KantorService::getActive(),
        ]);
    }

    /**
     * Store a newly created fasilitator.
     */
    public function store(StoreFasilitatorRequest $request)
    {
        $this->authorize('create', Fasilitator::class);

        $data = $request->validated();
        $programIds = $data['program_ids'] ?? [];
        unset($data['program_ids']);
        $data['status'] = $request->boolean('status', true);

        $fasilitator = Fasilitator::create($data);

        if ($fasilitator) {
            $fasilitator->programs()->sync($programIds);

            $this->logSuccess('create-fasilitator', "Created Fasilitator #{$fasilitator->id} ({$fasilitator->name})", [
                'fasilitator_id' => $fasilitator->id,
                'programs' => $programIds,
                'new_data' => $fasilitator->toArray(),
            ]);
        } else {
            $this->logError('create-fasilitator', 'Failed to create Fasilitator', [
                'new_data' => $data,
            ]);
        }

        return redirect()->route('admin.fasilitators.index')
            ->with('success', 'Fasilitator Berhasil Ditambahkan');
    }

    /**
     * Display the specified fasilitator.
     */
    public function show(Fasilitator $fasilitator)
    {
        $this->authorize('view', $fasilitator);

        return Inertia::render('admin/fasilitators/show', [
            'pageTitle' => 'Detail Fasilitator: '.$fasilitator->name,
            'fasilitator' => $fasilitator->load([
                'programs:id,name',
                'user:id,name,email',
                'province:id,name',
                'regency:id,name',
                'district:id,name',
                'village:id,name',
                'groups:id,name,leader_name,phone',
                'beneficiaries' => fn ($q) => $q->with('programs:id,name')->latest(),
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified fasilitator.
     */
    public function edit(Fasilitator $fasilitator)
    {
        $this->authorize('update', $fasilitator);

        return Inertia::render('admin/fasilitators/edit', [
            'pageTitle' => 'Edit Fasilitator: '.$fasilitator->name,
            'fasilitator' => $fasilitator->load('programs:id,name'),
            'programs' => Program::query()->select(['id', 'name'])->orderBy('name')->get(),
            'users' => User::query()->select(['id', 'name', 'email'])->orderBy('name')->get(),
            'provinces' => Province::query()->select(['id', 'name'])->orderBy('name')->get(),
            'kantors' => KantorService::getActive(),
        ]);
    }

    /**
     * Update the specified fasilitator.
     */
    public function update(UpdateFasilitatorRequest $request, Fasilitator $fasilitator)
    {
        $this->authorize('update', $fasilitator);

        $data = $request->validated();
        $programIds = $data['program_ids'] ?? [];
        unset($data['program_ids']);
        $data['status'] = $request->boolean('status', true);

        $oldData = $fasilitator->replicate();
        $fasilitator->update($data);

        if ($fasilitator) {
            $fasilitator->programs()->sync($programIds);

            $this->logSuccess('update-fasilitator', "Updated Fasilitator #{$fasilitator->id} ({$fasilitator->name})", [
                'fasilitator_id' => $fasilitator->id,
                'programs' => $programIds,
                'old_data' => $oldData->toArray(),
                'new_data' => $fasilitator->toArray(),
            ]);
        } else {
            $this->logError('update-fasilitator', "Failed to update Fasilitator #{$fasilitator->id}", [
                'fasilitator_id' => $fasilitator->id,
                'old_data' => $oldData->toArray(),
            ]);
        }

        return redirect()->route('admin.fasilitators.index')
            ->with('success', 'Fasilitator Berhasil Diperbarui');
    }

    /**
     * Remove the specified fasilitator.
     */
    public function destroy(Fasilitator $fasilitator)
    {
        $this->authorize('delete', $fasilitator);

        $oldData = $fasilitator->replicate();
        $fasilitator->delete();

        if ($fasilitator) {
            $this->logSuccess('delete-fasilitator', "Deleted Fasilitator #{$fasilitator->id} ({$fasilitator->name})", [
                'fasilitator_id' => $fasilitator->id,
                'old_data' => $oldData->toArray(),
            ]);
        } else {
            $this->logError('delete-fasilitator', "Failed to delete Fasilitator #{$fasilitator->id}", [
                'fasilitator_id' => $fasilitator->id,
            ]);
        }

        return redirect()->route('admin.fasilitators.index')
            ->with('success', 'Fasilitator Berhasil Dihapus');
    }

    /**
     * Toggle status aktif fasilitator.
     */
    public function status(Fasilitator $fasilitator)
    {
        $this->authorize('update', $fasilitator);

        $fasilitator->update(['status' => ! $fasilitator->status]);

        return redirect()->back()->with('success', 'Status Fasilitator Berhasil Diperbarui');
    }

    /**
     * Buat akun user login untuk fasilitator.
     */
    public function createUser(Request $request, Fasilitator $fasilitator)
    {
        $this->authorize('createUser', $fasilitator);

        if ($fasilitator->user_id) {
            return redirect()->back()->with('error', 'Fasilitator ini sudah memiliki akun login.');
        }

        $validated = $request->validate([
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email'),
            ],
            'password' => [
                'required',
                'string',
                Password::defaults(),
                'confirmed',
            ],
        ]);

        DB::transaction(function () use ($fasilitator, $validated) {
            $user = User::create([
                'name' => $fasilitator->name,
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'email_verified_at' => now(),
            ]);

            // Pastikan role Fasilitator ada
            Role::firstOrCreate(['name' => 'Fasilitator', 'guard_name' => 'web']);
            $user->assignRole('Fasilitator');

            $fasilitator->update([
                'user_id' => $user->id,
                'email' => $validated['email'],
            ]);

            $this->logSuccess('create-user-fasilitator', "Created user account for Fasilitator #{$fasilitator->id} ({$user->email})", [
                'fasilitator_id' => $fasilitator->id,
                'user_id' => $user->id,
                'email' => $user->email,
            ]);
        });

        return redirect()->back()->with('success', 'Akun user untuk fasilitator berhasil dibuat.');
    }
}
