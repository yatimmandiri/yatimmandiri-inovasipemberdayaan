<?php

use App\Models\Company\Branch;
use App\Models\Company\Category;
use App\Models\Company\Group;
use App\Models\Company\Program;
use App\Models\Company\VisitReport;
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

    $this->category = Category::create(['name' => 'Pendidikan']);
    $this->program = Program::create([
        'name' => 'Program Beasiswa',
        'category_id' => $this->category->id,
    ]);

    $this->admin = User::factory()->create()->assignRole('Administrators');
    $this->fasilitator = User::factory()->create()->assignRole('Fasilitator');

    $this->branch = Branch::query()->first();
    $this->group = Group::create([
        'branch_id' => $this->branch->id,
        'name' => 'BISA WONOSARI',
        'fasilitator_id' => $this->fasilitator->id,
    ]);
});

function adminMonevPayload(array $overrides = []): array
{
    return array_merge([
        'program_id' => Program::query()->first()->id,
        'event_name' => 'Nama event dikoreksi admin',
        'visit_date' => now()->toDateString(),
        'start_time' => '08:00',
        'end_time' => '11:00',
        'activity_description' => 'Koreksi isi kegiatan oleh administrator.',
        'obstacles' => null,
        'pm_count' => 30,
        'submit' => '0',
    ], $overrides);
}

test('admin can edit a facilitators report and ownership snapshot is preserved', function () {
    $report = VisitReport::create([
        'program_id' => $this->program->id,
        'fasilitator_id' => $this->fasilitator->id,
        'group_id' => $this->group->id,
        'event_name' => 'Nama salah ketik',
        'visit_date' => now()->subDays(10)->toDateString(),
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Pendampingan rutin bimbingan belajar anak binaan.',
        'obstacles' => 'Beberapa PM belum memiliki jadwal tetap.',
        'pm_count' => 25,
        'status' => VisitReport::STATUS_SUBMITTED,
    ]);

    $response = $this->actingAs($this->admin)->put(
        route('admin.visit-reports.update', $report),
        adminMonevPayload(['visit_date' => now()->subDays(10)->toDateString()]),
    );

    $response->assertRedirect(route('admin.visit-reports.show', $report->id));

    $this->assertDatabaseHas('visit_reports', [
        'id' => $report->id,
        'event_name' => 'Nama event dikoreksi admin',
        'pm_count' => 30,
        // Status TIDAK berubah oleh koreksi admin (status lewat review).
        'status' => VisitReport::STATUS_SUBMITTED,
        // Snapshot milik fasil dipertahankan apa adanya.
        'fasilitator_id' => $this->fasilitator->id,
        'group_id' => $this->group->id,
    ]);
});

test('admin can change an old visit date while facilitator window rule still applies', function () {
    $oldDate = now()->subDays(10)->toDateString();

    $report = VisitReport::create([
        'program_id' => $this->program->id,
        'fasilitator_id' => $this->fasilitator->id,
        'event_name' => 'Event lama',
        'visit_date' => $oldDate,
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Pendampingan rutin bimbingan belajar anak binaan.',
        'obstacles' => null,
        'pm_count' => 25,
        'status' => VisitReport::STATUS_REVIEWED,
    ]);

    // Admin: tanggal lama boleh diganti ke tanggal lama lain (koreksi historis).
    $this->actingAs($this->admin)->put(
        route('admin.visit-reports.update', $report),
        adminMonevPayload(['visit_date' => now()->subDays(7)->toDateString(), 'event_name' => 'Event lama']),
    )->assertRedirect(route('admin.visit-reports.show', $report->id));

    $this->assertDatabaseHas('visit_reports', [
        'id' => $report->id,
        'visit_date' => now()->subDays(7)->toDateString(),
    ]);

    // Fasil: window 3 hari tetap ditegakkan (tanggal DIUBAH ke yang lama).
    $reportFasil = VisitReport::create([
        'program_id' => $this->program->id,
        'fasilitator_id' => $this->fasilitator->id,
        'event_name' => 'Event fasil',
        'visit_date' => $oldDate,
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Pendampingan rutin bimbingan belajar anak binaan.',
        'obstacles' => null,
        'pm_count' => 25,
        'status' => VisitReport::STATUS_DRAFT,
    ]);

    $this->actingAs($this->fasilitator)->put(
        route('fasilitator.visit-reports.update', $reportFasil),
        adminMonevPayload(['visit_date' => now()->subDays(5)->toDateString(), 'event_name' => 'Event fasil']),
    )->assertSessionHasErrors('visit_date');
});

test('admin monev getData applies whitelisted status program and branch filters', function () {
    foreach (
        [
            ['event_name' => 'Laporan A', 'visit_date' => now()->subDays(2)->toDateString(), 'status' => 'submitted'],
            ['event_name' => 'Laporan B', 'visit_date' => now()->subDays(1)->toDateString(), 'status' => 'draft'],
        ] as $row
    ) {
        VisitReport::create(array_merge($row, [
            'program_id' => $this->program->id,
            'fasilitator_id' => $this->fasilitator->id,
            'group_id' => $this->group->id,
            'start_time' => '09:00',
            'end_time' => '12:00',
            'activity_description' => 'Pendampingan rutin bimbingan belajar anak binaan.',
            'obstacles' => null,
            'pm_count' => 25,
        ]));
    }

    // Filter status: hanya submitted yang lolos.
    $rows = $this->actingAs($this->admin)->get(
        route('admin.visit-reports.data', ['filterValue' => ['status' => 'submitted']]),
    )->json();

    expect(collect($rows)->pluck('event_name')->all())->toBe(['Laporan A']);

    // Filter program: keduanya satu program.
    $rows = $this->actingAs($this->admin)->get(
        route('admin.visit-reports.data', ['filterValue' => ['program_id' => $this->program->id]]),
    )->json();

    expect(count($rows))->toBe(2);

    // Filter cabang via kelompok laporan.
    $rows = $this->actingAs($this->admin)->get(
        route('admin.visit-reports.data', ['filterValue' => ['branch_id' => $this->branch->id]]),
    )->json();

    expect(count($rows))->toBe(2);

    // Kunci di luar whitelist diabaikan (bukan error 500).
    $rows = $this->actingAs($this->admin)->get(
        route('admin.visit-reports.data', ['filterValue' => ['fasilitator_id' => $this->fasilitator->id, 'password' => 'injected']]),
    )->json();

    expect(count($rows))->toBe(2);
});

test('admin can delete a facilitators report and facilitator gets 403 on admin routes', function () {
    $report = VisitReport::create([
        'program_id' => $this->program->id,
        'fasilitator_id' => $this->fasilitator->id,
        'group_id' => $this->group->id,
        'event_name' => 'Laporan salah entri',
        'visit_date' => now()->toDateString(),
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Pendampingan rutin bimbingan belajar anak binaan.',
        'obstacles' => null,
        'pm_count' => 25,
        'status' => VisitReport::STATUS_REVIEWED,
    ]);

    // Fasil tidak boleh menyentuh route admin.
    $this->actingAs($this->fasilitator)
        ->get(route('admin.visit-reports.edit', $report))
        ->assertForbidden();
    $this->actingAs($this->fasilitator)
        ->put(route('admin.visit-reports.update', $report), adminMonevPayload())
        ->assertForbidden();
    $this->actingAs($this->fasilitator)
        ->delete(route('admin.visit-reports.destroy', $report))
        ->assertForbidden();

    // Admin boleh menghapus laporan fasil apa pun statusnya.
    $this->actingAs($this->admin)
        ->delete(route('admin.visit-reports.destroy', $report))
        ->assertRedirect(route('admin.visit-reports.index'));

    $this->assertSoftDeleted('visit_reports', ['id' => $report->id]);
});
