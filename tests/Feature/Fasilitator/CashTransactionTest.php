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
    $this->fasilitatorLain = User::factory()->create()->assignRole('Fasilitator');

    $this->branch = Branch::query()->first();
    $this->group = Group::create([
        'branch_id' => $this->branch->id,
        'name' => 'BISA WONOSARI',
        'fasilitator_id' => $this->fasilitator->id,
    ]);
    $this->groupLain = Group::create([
        'branch_id' => $this->branch->id,
        'name' => 'BISA WONOAYU',
        'fasilitator_id' => $this->fasilitatorLain->id,
    ]);
});

function cashPayload(array $overrides = []): array
{
    return array_merge([
        'transaction_date' => now()->toDateString(),
        'branch_id' => 1,
        'group_id' => 1,
        'description' => 'Pembelian alat tulis kegiatan',
        'debit' => 150000,
        'credit' => null,
    ], $overrides);
}

test('fasilitator can record a cash transaction and branch/group follow their own group', function () {
    $response = $this->actingAs($this->fasilitator)->post(
        route('fasilitator.kas.store'),
        cashPayload(),
    );

    $response->assertRedirect(route('fasilitator.kas.index'));

    $this->assertDatabaseHas('cash_transactions', [
        'description' => 'Pembelian alat tulis kegiatan',
        'branch_id' => $this->branch->id,
        'group_id' => $this->group->id,
        'fasilitator_id' => $this->fasilitator->id,
        'debit' => 150000,
        'credit' => 0,
    ]);
});

test('cash transaction requires debit xor credit', function () {
    // Keduanya terisi -> ditolak.
    $response = $this->actingAs($this->fasilitator)->post(
        route('fasilitator.kas.store'),
        cashPayload(['credit' => 50000]),
    );

    $response->assertSessionHasErrors('debit');

    // Keduanya kosong -> ditolak.
    $response = $this->actingAs($this->fasilitator)->post(
        route('fasilitator.kas.store'),
        cashPayload(['debit' => null, 'credit' => null]),
    );

    $response->assertSessionHasErrors('debit');

    expect(CashTransaction::count())->toBe(0);
});

test('cash transaction date cannot be in the future but backdate is allowed', function () {
    // Backdate sah.
    $response = $this->actingAs($this->fasilitator)->post(
        route('fasilitator.kas.store'),
        cashPayload(['transaction_date' => now()->subDays(30)->toDateString()]),
    );

    $response->assertRedirect(route('fasilitator.kas.index'));

    // Masa depan ditolak.
    $response = $this->actingAs($this->fasilitator)->post(
        route('fasilitator.kas.store'),
        cashPayload(['transaction_date' => now()->addDay()->toDateString()]),
    );

    $response->assertSessionHasErrors('transaction_date');
});

test('fasilitator cannot edit or delete the cash transaction of another fasilitator', function () {
    $transaction = CashTransaction::create([
        'transaction_date' => now()->toDateString(),
        'branch_id' => $this->branch->id,
        'group_id' => $this->groupLain->id,
        'fasilitator_id' => $this->fasilitatorLain->id,
        'description' => 'Transaksi milik fasil lain.',
        'debit' => 100000,
        'credit' => 0,
        'created_by' => $this->fasilitatorLain->id,
    ]);

    $response = $this->actingAs($this->fasilitator)->put(
        route('fasilitator.kas.update', $transaction),
        cashPayload(['description' => 'Diubah orang lain']),
    );

    $response->assertForbidden();
    expect($transaction->fresh()->description)->toBe('Transaksi milik fasil lain.');

    $response = $this->actingAs($this->fasilitator)->delete(
        route('fasilitator.kas.destroy', $transaction),
    );

    $response->assertForbidden();
    expect($transaction->fresh())->not->toBeNull();
});

test('running balance is computed on the fly and correct after edit and delete', function () {
    $first = CashTransaction::create([
        'transaction_date' => now()->subDays(2)->toDateString(),
        'branch_id' => $this->branch->id,
        'group_id' => $this->group->id,
        'fasilitator_id' => $this->fasilitator->id,
        'description' => 'Kas masuk pertama',
        'debit' => 100000,
        'credit' => 0,
        'created_by' => $this->fasilitator->id,
    ]);

    $second = CashTransaction::create([
        'transaction_date' => now()->subDays(1)->toDateString(),
        'branch_id' => $this->branch->id,
        'group_id' => $this->group->id,
        'fasilitator_id' => $this->fasilitator->id,
        'description' => 'Kas keluar pertama',
        'debit' => 0,
        'credit' => 40000,
        'created_by' => $this->fasilitator->id,
    ]);

    $rows = collect($this->actingAs($this->fasilitator)
        ->get(route('fasilitator.kas.data'))
        ->assertOk()
        ->json())->sortBy('transaction_date')->values();

    expect((float) $rows[0]['running_balance'])->toBe(100000.0)
        ->and((float) $rows[1]['running_balance'])->toBe(60000.0);

    // Edit: kredit pertama jadi 60000 -> saldo baris kedua turun.
    $this->actingAs($this->fasilitator)->put(
        route('fasilitator.kas.update', $second),
        [
            'transaction_date' => now()->subDays(1)->toDateString(),
            'branch_id' => $this->branch->id,
            'group_id' => $this->group->id,
            'description' => 'Kas keluar pertama',
            'debit' => null,
            'credit' => 60000,
        ],
    )->assertRedirect(route('fasilitator.kas.index'));

    $rows = collect($this->actingAs($this->fasilitator)
        ->get(route('fasilitator.kas.data'))
        ->assertOk()
        ->json())->sortBy('transaction_date')->values();

    expect((float) $rows[1]['running_balance'])->toBe(40000.0);

    // Delete: hapus baris kedua -> saldo hanya dari baris pertama.
    $this->actingAs($this->fasilitator)->delete(
        route('fasilitator.kas.destroy', $second),
    )->assertRedirect(route('fasilitator.kas.index'));

    $rows = $this->actingAs($this->fasilitator)
        ->get(route('fasilitator.kas.data'))
        ->assertOk()
        ->json();

    expect(count($rows))->toBe(1)
        ->and((float) $rows[0]['running_balance'])->toBe(100000.0);
});

test('fasilitator sees only their own cash transactions on the data endpoint', function () {
    CashTransaction::create([
        'transaction_date' => now()->toDateString(),
        'branch_id' => $this->branch->id,
        'group_id' => $this->group->id,
        'fasilitator_id' => $this->fasilitator->id,
        'description' => 'Milik fasil pertama',
        'debit' => 100000,
        'credit' => 0,
    ]);

    CashTransaction::create([
        'transaction_date' => now()->toDateString(),
        'branch_id' => $this->branch->id,
        'group_id' => $this->groupLain->id,
        'fasilitator_id' => $this->fasilitatorLain->id,
        'description' => 'Milik fasil kedua',
        'debit' => 50000,
        'credit' => 0,
    ]);

    $rows = $this->actingAs($this->fasilitator)
        ->get(route('fasilitator.kas.data'))
        ->assertOk()
        ->json();

    expect(count($rows))->toBe(1)
        ->and($rows[0]['fasilitator_id'])->toBe($this->fasilitator->id);
});

test('administrator can see all cash transactions but fasilitator is blocked from admin kas', function () {
    $rows = $this->actingAs($this->admin)
        ->get(route('admin.kas.data'))
        ->assertOk()
        ->json();

    expect($rows)->toBeArray();

    $response = $this->actingAs($this->fasilitator)->get(
        route('admin.kas.index'),
    );

    $response->assertForbidden();
});

test('administrator can delete any cash transaction', function () {
    $transaction = CashTransaction::create([
        'transaction_date' => now()->toDateString(),
        'branch_id' => $this->branch->id,
        'group_id' => $this->group->id,
        'fasilitator_id' => $this->fasilitator->id,
        'description' => 'Transaksi yang dihapus admin',
        'debit' => 100000,
        'credit' => 0,
    ]);

    $this->from('/admin/kas')->actingAs($this->admin)->delete(
        route('admin.kas.destroy', $transaction),
    )->assertRedirect('/admin/kas');

    expect($transaction->fresh()->deleted_at)->not->toBeNull();
});

test('fasilitator without an assigned group cannot see or count other groups cash', function () {
    // Kas milik kelompok fasil lain.
    CashTransaction::create([
        'transaction_date' => now()->toDateString(),
        'branch_id' => $this->branch->id,
        'group_id' => $this->groupLain->id,
        'fasilitator_id' => $this->fasilitatorLain->id,
        'description' => 'Milik kelompok lain',
        'debit' => 10000,
        'credit' => 0,
    ]);

    // Fasil baru TANPA penugasan kelompok.
    $fasilTanpaKelompok = User::factory()->create()->assignRole('Fasilitator');

    $rows = $this->actingAs($fasilTanpaKelompok)
        ->get(route('fasilitator.kas.data'))
        ->assertOk()
        ->json();

    expect($rows)->toBe([]);

    $page = $this->actingAs($fasilTanpaKelompok)
        ->get(route('fasilitator.kas.index'))
        ->assertOk();

    $page->assertInertia(fn ($page) => $page
        ->component('fasilitator/cash-transactions/list')
        ->where('summary.saldo', 0)
        ->where('summary.total_debit', 0)
        ->where('myGroup', null));
});
