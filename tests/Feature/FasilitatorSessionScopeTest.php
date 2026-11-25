<?php

use App\Models\Company\ActivityReport;
use App\Models\Company\Beneficiary;
use App\Models\Company\CashTransaction;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use App\Models\Core\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    $role = Role::firstOrCreate(['name' => 'Fasilitator', 'guard_name' => 'web']);
    $permissions = [
        'view-fasilitator', 'data-fasilitator',
        'view-group', 'create-group', 'update-group', 'data-group',
        'view-beneficiary', 'create-beneficiary', 'update-beneficiary', 'delete-beneficiary', 'data-beneficiary',
        'view-activity-report', 'create-activity-report', 'update-activity-report', 'delete-activity-report', 'data-activity-report',
        'view-cash-transaction', 'create-cash-transaction', 'update-cash-transaction', 'delete-cash-transaction', 'data-cash-transaction',
    ];

    foreach ($permissions as $perm) {
        $p = Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        $role->givePermissionTo($p);
    }

    $this->userA = User::factory()->create();
    $this->userA->assignRole($role);
    $this->fasilitatorA = Fasilitator::create([
        'user_id' => $this->userA->id,
        'name' => 'Fasilitator A',
        'status' => true,
    ]);

    $this->userB = User::factory()->create();
    $this->userB->assignRole($role);
    $this->fasilitatorB = Fasilitator::create([
        'user_id' => $this->userB->id,
        'name' => 'Fasilitator B',
        'status' => true,
    ]);

    $this->groupA = Group::create([
        'fasilitator_id' => $this->fasilitatorA->id,
        'name' => 'Kelompok A',
        'status' => true,
    ]);

    $this->groupB = Group::create([
        'fasilitator_id' => $this->fasilitatorB->id,
        'name' => 'Kelompok B',
        'status' => true,
    ]);

    $this->beneficiaryA = Beneficiary::create([
        'fasilitator_id' => $this->fasilitatorA->id,
        'group_id' => $this->groupA->id,
        'name' => 'PM A',
        'status' => true,
    ]);

    $this->beneficiaryB = Beneficiary::create([
        'fasilitator_id' => $this->fasilitatorB->id,
        'group_id' => $this->groupB->id,
        'name' => 'PM B',
        'status' => true,
    ]);

    $this->reportA = ActivityReport::create([
        'fasilitator_id' => $this->fasilitatorA->id,
        'group_id' => $this->groupA->id,
        'title' => 'Laporan A',
        'activity_date' => now()->toDateString(),
        'status' => true,
    ]);

    $this->reportB = ActivityReport::create([
        'fasilitator_id' => $this->fasilitatorB->id,
        'group_id' => $this->groupB->id,
        'title' => 'Laporan B',
        'activity_date' => now()->toDateString(),
        'status' => true,
    ]);

    $this->cashA = CashTransaction::create([
        'fasilitator_id' => $this->fasilitatorA->id,
        'group_id' => $this->groupA->id,
        'type' => 'income',
        'amount' => 100000,
        'transaction_date' => now()->toDateString(),
        'status' => true,
    ]);

    $this->cashB = CashTransaction::create([
        'fasilitator_id' => $this->fasilitatorB->id,
        'group_id' => $this->groupB->id,
        'type' => 'income',
        'amount' => 200000,
        'transaction_date' => now()->toDateString(),
        'status' => true,
    ]);
});

test('fasilitator only sees their own data in datatable endpoints', function () {
    $this->actingAs($this->userA);

    $this->getJson(route('admin.fasilitators.data'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.id', $this->fasilitatorA->id);

    $this->getJson(route('admin.groups.data'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.id', $this->groupA->id);

    $this->getJson(route('admin.beneficiaries.data'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.id', $this->beneficiaryA->id);

    $this->getJson(route('admin.activity-reports.data'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.id', $this->reportA->id);

    $this->getJson(route('admin.cash-transactions.data'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.id', $this->cashA->id);
});

test('fasilitator cannot view or edit another fasilitator records', function () {
    $this->actingAs($this->userA);

    $this->get(route('admin.fasilitators.show', $this->fasilitatorB))->assertForbidden();
    $this->get(route('admin.groups.show', $this->groupB))->assertForbidden();
    $this->get(route('admin.groups.edit', $this->groupB))->assertForbidden();
    $this->get(route('admin.beneficiaries.show', $this->beneficiaryB))->assertForbidden();
    $this->get(route('admin.beneficiaries.edit', $this->beneficiaryB))->assertForbidden();
    $this->get(route('admin.activity-reports.show', $this->reportB))->assertForbidden();
    $this->get(route('admin.activity-reports.edit', $this->reportB))->assertForbidden();
    $this->get(route('admin.cash-transactions.show', $this->cashB))->assertForbidden();
    $this->get(route('admin.cash-transactions.edit', $this->cashB))->assertForbidden();
});
