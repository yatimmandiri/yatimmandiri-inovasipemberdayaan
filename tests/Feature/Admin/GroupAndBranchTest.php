<?php

use App\Models\Company\Branch;
use App\Models\Company\Category;
use App\Models\Company\Group;
use App\Models\Company\Program;
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
});

test('branch seeder preserves the json ids and the display label', function () {
    $pusat2 = Branch::query()->find(49);

    expect(Branch::count())->toBe(53)
        ->and($pusat2?->name)->toBe('PUSAT 2')
        ->and($pusat2?->label)->toBe('SURABAYA')
        ->and($pusat2?->display_name)->toBe('SURABAYA');
});

test('administrator can create a group and assign a fasilitator', function () {
    $response = $this->actingAs($this->admin)->post(
        route('admin.groups.store'),
        [
            'branch_id' => $this->branch->id,
            'name' => 'BISA WONOSARI',
            'fasilitator_id' => $this->fasilitator->id,
            'pms' => ['PM Satu', 'PM Dua'],
        ],
    );

    $response->assertRedirect(route('admin.groups.index'));

    $group = Group::query()->where('name', 'BISA WONOSARI')->first();

    expect($group->branch_id)->toBe($this->branch->id)
        ->and($group->fasilitator_id)->toBe($this->fasilitator->id)
        ->and($group->pms()->pluck('name')->all())->toBe(['PM Satu', 'PM Dua']);
});

test('one fasilitator can only hold one group', function () {
    Group::create([
        'branch_id' => $this->branch->id,
        'name' => 'Kelompok Pertama',
        'fasilitator_id' => $this->fasilitator->id,
    ]);

    $response = $this->actingAs($this->admin)->post(
        route('admin.groups.store'),
        [
            'branch_id' => $this->branch->id,
            'name' => 'Kelompok Kedua',
            'fasilitator_id' => $this->fasilitator->id,
        ],
    );

    $response->assertSessionHasErrors('fasilitator_id');
});

test('group name must be unique within the same branch', function () {
    Group::create([
        'branch_id' => $this->branch->id,
        'name' => 'BISA WONOSARI',
    ]);

    $response = $this->actingAs($this->admin)->post(
        route('admin.groups.store'),
        [
            'branch_id' => $this->branch->id,
            'name' => 'BISA WONOSARI',
        ],
    );

    $response->assertSessionHasErrors('name');

    // Nama sama di cabang lain tetap sah.
    $otherBranch = Branch::query()->where('id', '!=', $this->branch->id)->first();

    $response = $this->actingAs($this->admin)->post(
        route('admin.groups.store'),
        [
            'branch_id' => $otherBranch->id,
            'name' => 'BISA WONOSARI',
        ],
    );

    $response->assertRedirect(route('admin.groups.index'));
});

test('fasilitator is blocked from the admin group pages', function () {
    $response = $this->actingAs($this->fasilitator)->get(
        route('admin.groups.index'),
    );

    $response->assertForbidden();
});

test('fasilitator can manage the pm roster of their own group only', function () {
    $group = Group::create([
        'branch_id' => $this->branch->id,
        'name' => 'BISA WONOSARI',
        'fasilitator_id' => $this->fasilitator->id,
    ]);

    $response = $this->actingAs($this->fasilitator)->post(
        route('fasilitator.group.pms.store'),
        ['name' => 'PM Baru'],
    );

    $response->assertRedirect();
    expect($group->pms()->where('name', 'PM Baru')->exists())->toBeTrue();

    // Fasil lain tidak bisa menambah PM ke kelompok orang lain.
    $response = $this->actingAs($this->fasilitatorLain)->post(
        route('fasilitator.group.pms.store'),
        ['name' => 'PM Lain'],
    );

    $response->assertNotFound();
    expect($group->pms()->where('name', 'PM Lain')->exists())->toBeFalse();
});

test('visit report store auto fills group_id from the fasilitator group', function () {
    $group = Group::create([
        'branch_id' => $this->branch->id,
        'name' => 'BISA WONOSARI',
        'fasilitator_id' => $this->fasilitator->id,
    ]);

    $category = Category::create(['name' => 'Pendidikan']);
    $program = Program::create([
        'name' => 'Program Beasiswa',
        'category_id' => $category->id,
    ]);

    $response = $this->actingAs($this->fasilitator)->post(
        route('fasilitator.visit-reports.store'),
        [
            'program_id' => $program->id,
            'event_name' => 'Bimtek Batch 1',
            'visit_date' => now()->toDateString(),
            'start_time' => '09:00',
            'end_time' => '12:00',
            'activity_description' => 'Pendampingan rutin bimbingan belajar anak binaan.',
            'pm_count' => 10,
            'submit' => '1',
        ],
    );

    $response->assertRedirect(route('fasilitator.visit-reports.index'));

    $this->assertDatabaseHas('visit_reports', [
        'program_id' => $program->id,
        'fasilitator_id' => $this->fasilitator->id,
        'group_id' => $group->id,
    ]);
});
