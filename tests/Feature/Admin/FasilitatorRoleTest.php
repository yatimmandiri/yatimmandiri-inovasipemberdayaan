<?php

use App\Models\Core\Role;
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
});

test('seeder creates the Fasilitator role alongside existing roles', function () {
    $fasilitator = Role::query()->where('name', 'Fasilitator')->first();

    expect($fasilitator)->not->toBeNull()
        ->and($fasilitator->guard_name)->toBe('web')
        ->and(Role::query()->whereIn('name', ['Administrators', 'Editors', 'Users'])->count())->toBe(3);
});

test('fasilitators are blocked from the admin dashboard', function () {
    $fasilitator = User::factory()->create()->assignRole('Fasilitator');

    $response = $this->actingAs($fasilitator)->get(route('admin.dashboard'));

    $response->assertForbidden();
});

test('regular users remain blocked from the admin dashboard', function () {
    $user = User::factory()->create()->assignRole('Users');

    $response = $this->actingAs($user)->get(route('admin.dashboard'));

    $response->assertForbidden();
});

test('administrators can still access the admin dashboard', function () {
    $admin = User::factory()->create()->assignRole('Administrators');

    $response = $this->actingAs($admin)->get(route('admin.dashboard'));

    $response->assertOk();
});
