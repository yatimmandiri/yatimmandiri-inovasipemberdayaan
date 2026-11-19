<?php

use App\Models\Company\Branch;
use App\Models\Company\CashTransaction;
use App\Models\Company\Group;
use App\Models\Core\User;
use App\Settings\SiteSettings;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    SiteSettings::fake([
        'site_name' => 'Yatim Mandiri',
        'site_description' => 'Inovasi Pemberdayaan',
    ]);

    $this->seed(UserRolePermissionSeeder::class);
    $this->seed(BranchSeeder::class);

    $this->admin = User::factory()->create()->assignRole('Administrators');
    $this->fasilitator = User::factory()->create()->assignRole('Fasilitator');

    $this->branch = Branch::query()->first();
    $this->group = Group::create([
        'branch_id' => $this->branch->id,
        'name' => 'BISA WONOSARI',
        'fasilitator_id' => $this->fasilitator->id,
    ]);
});

function adminKasPayload(array $overrides = []): array
{
    return array_merge([
        'transaction_date' => now()->toDateString(),
        'group_id' => 1,
        'description' => 'Entri admin: kas kegiatan',
        'debit' => 75000,
        'credit' => null,
    ], $overrides);
}

test('admin can create a cash transaction for any group and owner follows the group facilitator', function () {
    $response = $this->actingAs($this->admin)->post(
        route('admin.kas.store'),
        adminKasPayload(['group_id' => $this->group->id]),
    );

    $response->assertRedirect(route('admin.kas.index'));

    $this->assertDatabaseHas('cash_transactions', [
        'description' => 'Entri admin: kas kegiatan',
        'branch_id' => $this->branch->id,
        'group_id' => $this->group->id,
        // Snapshot pemilik = fasil pemegang kelompok, bukan admin yang mengentri.
        'fasilitator_id' => $this->fasilitator->id,
        'created_by' => $this->admin->id,
        'debit' => 75000,
    ]);
});

test('admin store rejects debit and credit filled together', function () {
    $response = $this->actingAs($this->admin)->post(
        route('admin.kas.store'),
        adminKasPayload(['debit' => 10000, 'credit' => 5000]),
    );

    $response->assertSessionHasErrors('debit');

    $this->assertDatabaseMissing('cash_transactions', [
        'description' => 'Entri admin: kas kegiatan',
    ]);
});

test('admin can edit another facilitators cash transaction and saldo follows on the fly', function () {
    $transaction = CashTransaction::create([
        'transaction_date' => now()->toDateString(),
        'branch_id' => $this->branch->id,
        'group_id' => $this->group->id,
        'fasilitator_id' => $this->fasilitator->id,
        'description' => 'Salah tulis nominal',
        'debit' => 10000,
        'credit' => 0,
    ]);

    $response = $this->actingAs($this->admin)->put(
        route('admin.kas.update', $transaction),
        adminKasPayload([
            'group_id' => $this->group->id,
            'description' => 'Nominal dikoreksi admin',
            'debit' => 25000,
            'credit' => null,
        ]),
    );

    $response->assertRedirect(route('admin.kas.index'));

    $this->assertDatabaseHas('cash_transactions', [
        'id' => $transaction->id,
        'description' => 'Nominal dikoreksi admin',
        'debit' => 25000,
        // group_id/fasilitator_id snapshot tetap milik kelompok fasil.
        'group_id' => $this->group->id,
        'fasilitator_id' => $this->fasilitator->id,
    ]);

    // Saldo on-the-fly: rekap admin langsung mengikuti nominal baru.
    $saldo = CashTransaction::query()->where('group_id', $this->group->id)
        ->get(['debit', 'credit'])
        ->sum(fn ($row) => $row->debit - $row->credit);

    expect((float) $saldo)->toBe(25000.0);
});

test('facilitator gets 403 on all admin kas crud routes', function () {
    $transaction = CashTransaction::create([
        'transaction_date' => now()->toDateString(),
        'branch_id' => $this->branch->id,
        'group_id' => $this->group->id,
        'fasilitator_id' => $this->fasilitator->id,
        'description' => 'Milik fasil',
        'debit' => 10000,
        'credit' => 0,
    ]);

    $this->actingAs($this->fasilitator)
        ->get(route('admin.kas.create'))
        ->assertForbidden();

    $this->actingAs($this->fasilitator)
        ->post(route('admin.kas.store'), adminKasPayload())
        ->assertForbidden();

    $this->actingAs($this->fasilitator)
        ->get(route('admin.kas.edit', $transaction))
        ->assertForbidden();

    $this->actingAs($this->fasilitator)
        ->put(route('admin.kas.update', $transaction), adminKasPayload())
        ->assertForbidden();

    $this->actingAs($this->fasilitator)
        ->delete(route('admin.kas.destroy', $transaction))
        ->assertForbidden();
});
