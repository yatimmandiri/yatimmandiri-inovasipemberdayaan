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

    $this->fasilitator = User::factory()->create()->assignRole('Fasilitator');
    $this->fasilitatorLain = User::factory()->create()->assignRole('Fasilitator');

    $this->branch = Branch::query()->first();
    $this->group = Group::create([
        'branch_id' => $this->branch->id,
        'name' => 'BISA WONOSARI',
        'fasilitator_id' => $this->fasilitator->id,
    ]);
});

test('facilitator kas getData applies whitelisted period filter', function () {
    foreach (
        [
            ['transaction_date' => now()->subDays(10)->toDateString(), 'description' => 'Lama', 'debit' => 10000, 'credit' => 0],
            ['transaction_date' => now()->toDateString(), 'description' => 'Baru', 'debit' => 20000, 'credit' => 0],
        ] as $row
    ) {
        CashTransaction::create(array_merge($row, [
            'branch_id' => $this->branch->id,
            'group_id' => $this->group->id,
            'fasilitator_id' => $this->fasilitator->id,
        ]));
    }

    // Filter periode: hanya transaksi hari ini yang lolos.
    $response = $this->actingAs($this->fasilitator)->get(
        route('fasilitator.kas.data', [
            'filterValue' => [
                'date_from' => now()->toDateString(),
                'date_to' => now()->toDateString(),
            ],
        ]),
    );

    $rows = collect($response->json());

    expect($rows->pluck('description')->all())->toBe(['Baru']);

    // Kunci di luar whitelist diabaikan (bukan error 500, bukan kolom bebas).
    $response = $this->actingAs($this->fasilitator)->get(
        route('fasilitator.kas.data', [
            'filterValue' => [
                'fasilitator_id' => $this->fasilitatorLain->id,
                'password' => 'injected',
            ],
        ]),
    );

    expect(count($response->json()))->toBe(2);

    // Format tanggal sampah diabaikan (bukan error, bukan data kosong palsu)
    // — sesuai catatan review ARC-001.
    $response = $this->actingAs($this->fasilitator)->get(
        route('fasilitator.kas.data', [
            'filterValue' => [
                'date_from' => 'not-a-date',
                'date_to' => '13/45/2026',
            ],
        ]),
    );

    expect(count($response->json()))->toBe(2);
});
