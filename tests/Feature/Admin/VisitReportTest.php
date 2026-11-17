<?php

use App\Models\Company\Category;
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

    $this->category = Category::create(['name' => 'Pendidikan']);
    $this->program = Program::create([
        'name' => 'Program Beasiswa',
        'category_id' => $this->category->id,
    ]);

    $this->admin = User::factory()->create()->assignRole('Administrators');
    $this->fasilitator = User::factory()->create()->assignRole('Fasilitator');
    $this->fasilitatorLain = User::factory()->create()->assignRole('Fasilitator');
});

function visitReportPayload(array $overrides = []): array
{
    return array_merge([
        'program_id' => Program::query()->first()->id,
        'event_name' => 'Bimtek Kewirausahaan Batch 1',
        'visit_date' => now()->toDateString(),
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Pendampingan rutin bimbingan belajar anak binaan.',
        'obstacles' => 'Beberapa PM belum memiliki jadwal tetap.',
        'pm_count' => 25,
        'submit' => '1',
    ], $overrides);
}

test('fasilitator can submit a visit report owned by their own account', function () {
    $response = $this->actingAs($this->fasilitator)->post(
        route('fasilitator.visit-reports.store'),
        visitReportPayload(),
    );

    $response->assertRedirect(route('fasilitator.visit-reports.index'));

    $this->assertDatabaseHas('visit_reports', [
        'program_id' => $this->program->id,
        'event_name' => 'Bimtek Kewirausahaan Batch 1',
        'fasilitator_id' => $this->fasilitator->id,
        'status' => VisitReport::STATUS_SUBMITTED,
        'pm_count' => 25,
    ]);
});

test('visit report cannot use a visit date older than three days', function () {
    $response = $this->actingAs($this->fasilitator)->post(
        route('fasilitator.visit-reports.store'),
        visitReportPayload(['visit_date' => now()->subDays(4)->toDateString()]),
    );

    $response->assertSessionHasErrors('visit_date');
});

test('revised report older than three days keeps its original visit date on resubmit', function () {
    $oldDate = now()->subDays(5)->toDateString();

    $report = VisitReport::create([
        'program_id' => $this->program->id,
        'event_name' => 'Event Test',
        'fasilitator_id' => $this->fasilitator->id,
        'visit_date' => $oldDate,
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Laporan lama yang diminta revisi oleh admin.',
        'pm_count' => 10,
        'status' => VisitReport::STATUS_REVISED,
    ]);

    // Tanggal tidak diubah -> tetap sah meski sudah di luar window 3 hari.
    $response = $this->actingAs($this->fasilitator)->put(
        route('fasilitator.visit-reports.update', $report),
        visitReportPayload(['visit_date' => $oldDate, 'submit' => '0']),
    );

    $response->assertRedirect();
    expect((string) $report->fresh()->visit_date)->toBe($oldDate);

    // Tanggal diubah ke nilai lain di luar window -> ditolak.
    $response = $this->actingAs($this->fasilitator)->put(
        route('fasilitator.visit-reports.update', $report),
        visitReportPayload(['visit_date' => now()->subDays(4)->toDateString(), 'submit' => '0']),
    );

    $response->assertSessionHasErrors('visit_date');
});

test('fasilitator cannot edit the report of another fasilitator', function () {
    $report = VisitReport::create([
        'program_id' => $this->program->id,
        'event_name' => 'Event Test',
        'fasilitator_id' => $this->fasilitatorLain->id,
        'visit_date' => now()->toDateString(),
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Laporan milik fasilitator lain.',
        'pm_count' => 10,
        'status' => VisitReport::STATUS_DRAFT,
    ]);

    $response = $this->actingAs($this->fasilitator)->put(
        route('fasilitator.visit-reports.update', $report),
        visitReportPayload(['submit' => '0']),
    );

    $response->assertForbidden();

    expect($report->fresh()->pm_count)->toBe(10);
    expect($report->fresh()->fasilitator_id)->toBe($this->fasilitatorLain->id);
});

test('fasilitator cannot edit a reviewed report', function () {
    $report = VisitReport::create([
        'program_id' => $this->program->id,
        'event_name' => 'Event Test',
        'fasilitator_id' => $this->fasilitator->id,
        'visit_date' => now()->toDateString(),
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Laporan yang sudah direview administrator.',
        'pm_count' => 10,
        'status' => VisitReport::STATUS_REVIEWED,
    ]);

    $response = $this->actingAs($this->fasilitator)->put(
        route('fasilitator.visit-reports.update', $report),
        visitReportPayload(['submit' => '0', 'pm_count' => 99]),
    );

    $response->assertForbidden();

    expect($report->fresh()->pm_count)->toBe(10);
});

test('fasilitator sees only their own reports on the data endpoint', function () {
    foreach ([$this->fasilitator, $this->fasilitatorLain] as $facilitator) {
        VisitReport::create([
            'program_id' => $this->program->id,
            'event_name' => 'Event Test',
            'fasilitator_id' => $facilitator->id,
            'visit_date' => now()->toDateString(),
            'start_time' => '09:00',
            'end_time' => '12:00',
            'activity_description' => "Laporan milik {$facilitator->name}.",
            'pm_count' => 10,
            'status' => VisitReport::STATUS_DRAFT,
        ]);
    }

    $response = $this->actingAs($this->fasilitator)->get(
        route('fasilitator.visit-reports.data', ['perPage' => 10, 'page' => 1]),
    );

    $response->assertOk();

    $rows = collect($response->json('data'));

    expect($rows)->toHaveCount(1)
        ->and($rows->first()['fasilitator_id'])->toBe($this->fasilitator->id);
});

test('fasilitator is blocked from admin monitoring pages', function () {
    $response = $this->actingAs($this->fasilitator)->get(
        route('admin.visit-reports.index'),
    );

    $response->assertForbidden();
});

test('administrator can review a submitted report', function () {
    $report = VisitReport::create([
        'program_id' => $this->program->id,
        'event_name' => 'Event Test',
        'fasilitator_id' => $this->fasilitator->id,
        'visit_date' => now()->toDateString(),
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Laporan siap direview administrator.',
        'pm_count' => 10,
        'status' => VisitReport::STATUS_SUBMITTED,
    ]);

    $response = $this->from('/')->actingAs($this->admin)->put(
        route('admin.visit-reports.review', $report),
        ['status' => VisitReport::STATUS_REVIEWED, 'review_notes' => null],
    );

    $response->assertRedirect('/');

    $this->assertDatabaseHas('visit_reports', [
        'id' => $report->id,
        'status' => VisitReport::STATUS_REVIEWED,
        'reviewed_by' => $this->admin->id,
    ]);
});

test('admin review requires notes when requesting a revision', function () {
    $report = VisitReport::create([
        'program_id' => $this->program->id,
        'event_name' => 'Event Test',
        'fasilitator_id' => $this->fasilitator->id,
        'visit_date' => now()->toDateString(),
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Laporan yang diminta revisi tanpa catatan.',
        'pm_count' => 10,
        'status' => VisitReport::STATUS_SUBMITTED,
    ]);

    $response = $this->from('/')->actingAs($this->admin)->put(
        route('admin.visit-reports.review', $report),
        ['status' => VisitReport::STATUS_REVISED, 'review_notes' => null],
    );

    $response->assertSessionHasErrors('review_notes');

    expect($report->fresh()->status)->toBe(VisitReport::STATUS_SUBMITTED);
});

test('administrator cannot review a draft report', function () {
    $report = VisitReport::create([
        'program_id' => $this->program->id,
        'event_name' => 'Event Test',
        'fasilitator_id' => $this->fasilitator->id,
        'visit_date' => now()->toDateString(),
        'start_time' => '09:00',
        'end_time' => '12:00',
        'activity_description' => 'Laporan masih draft, belum bisa direview.',
        'pm_count' => 10,
        'status' => VisitReport::STATUS_DRAFT,
    ]);

    $response = $this->actingAs($this->admin)->put(
        route('admin.visit-reports.review', $report),
        ['status' => VisitReport::STATUS_REVIEWED, 'review_notes' => null],
    );

    $response->assertForbidden();

    expect($report->fresh()->status)->toBe(VisitReport::STATUS_DRAFT);
});

test('unauthenticated visitors are redirected away from the fasilitator portal', function () {
    $response = $this->get(route('fasilitator.visit-reports.index'));

    $response->assertRedirect(route('login'));
});
