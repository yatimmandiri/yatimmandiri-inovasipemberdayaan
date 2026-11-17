<?php

namespace Database\Seeders;

use App\Models\Core\Permission;
use App\Models\Core\Region\District;
use App\Models\Core\Region\Province;
use App\Models\Core\Region\Regency;
use App\Models\Core\Region\Village;
use App\Models\Core\Role;
use App\Models\Core\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\PermissionRegistrar;

class UserRolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        collect([
            ['name' => 'Administrators', 'guard_name' => 'web'],
            ['name' => 'Editors', 'guard_name' => 'web'],
            ['name' => 'Users', 'guard_name' => 'web'],
            ['name' => 'Fasilitator', 'guard_name' => 'web'],
        ])->each(fn ($role) => Role::firstOrCreate($role));

        collect([
            ['name' => 'view-permission', 'guard_name' => 'web'],
            ['name' => 'create-permission', 'guard_name' => 'web'],
            ['name' => 'update-permission', 'guard_name' => 'web'],
            ['name' => 'delete-permission', 'guard_name' => 'web'],
            ['name' => 'data-permission', 'guard_name' => 'web'],
            ['name' => 'view-role', 'guard_name' => 'web'],
            ['name' => 'create-role', 'guard_name' => 'web'],
            ['name' => 'update-role', 'guard_name' => 'web'],
            ['name' => 'delete-role', 'guard_name' => 'web'],
            ['name' => 'data-role', 'guard_name' => 'web'],
            ['name' => 'view-user', 'guard_name' => 'web'],
            ['name' => 'create-user', 'guard_name' => 'web'],
            ['name' => 'update-user', 'guard_name' => 'web'],
            ['name' => 'delete-user', 'guard_name' => 'web'],
            ['name' => 'data-user', 'guard_name' => 'web'],
            ['name' => 'bulk-user', 'guard_name' => 'web'],
            ['name' => 'view-settings-site', 'guard_name' => 'web'],
            ['name' => 'update-settings-site', 'guard_name' => 'web'],
            ['name' => 'view-province', 'guard_name' => 'web'],
            ['name' => 'create-province', 'guard_name' => 'web'],
            ['name' => 'update-province', 'guard_name' => 'web'],
            ['name' => 'delete-province', 'guard_name' => 'web'],
            ['name' => 'data-province', 'guard_name' => 'web'],
            ['name' => 'view-regency', 'guard_name' => 'web'],
            ['name' => 'create-regency', 'guard_name' => 'web'],
            ['name' => 'update-regency', 'guard_name' => 'web'],
            ['name' => 'delete-regency', 'guard_name' => 'web'],
            ['name' => 'data-regency', 'guard_name' => 'web'],
            ['name' => 'view-district', 'guard_name' => 'web'],
            ['name' => 'create-district', 'guard_name' => 'web'],
            ['name' => 'update-district', 'guard_name' => 'web'],
            ['name' => 'delete-district', 'guard_name' => 'web'],
            ['name' => 'data-district', 'guard_name' => 'web'],
            ['name' => 'view-village', 'guard_name' => 'web'],
            ['name' => 'create-village', 'guard_name' => 'web'],
            ['name' => 'update-village', 'guard_name' => 'web'],
            ['name' => 'delete-village', 'guard_name' => 'web'],
            ['name' => 'data-village', 'guard_name' => 'web'],
            ['name' => 'view-log-activity', 'guard_name' => 'web'],
            ['name' => 'data-log-activity', 'guard_name' => 'web'],
        ])->each(fn ($permission) => Permission::firstOrCreate($permission)->assignRole('Administrators'));

        collect([
            ['name' => 'view-category', 'guard_name' => 'web'],
            ['name' => 'create-category', 'guard_name' => 'web'],
            ['name' => 'update-category', 'guard_name' => 'web'],
            ['name' => 'delete-category', 'guard_name' => 'web'],
            ['name' => 'data-category', 'guard_name' => 'web'],
            ['name' => 'view-mitra', 'guard_name' => 'web'],
            ['name' => 'create-mitra', 'guard_name' => 'web'],
            ['name' => 'update-mitra', 'guard_name' => 'web'],
            ['name' => 'delete-mitra', 'guard_name' => 'web'],
            ['name' => 'data-mitra', 'guard_name' => 'web'],
            ['name' => 'view-program', 'guard_name' => 'web'],
            ['name' => 'create-program', 'guard_name' => 'web'],
            ['name' => 'update-program', 'guard_name' => 'web'],
            ['name' => 'delete-program', 'guard_name' => 'web'],
            ['name' => 'data-program', 'guard_name' => 'web'],
            ['name' => 'view-slider', 'guard_name' => 'web'],
            ['name' => 'create-slider', 'guard_name' => 'web'],
            ['name' => 'update-slider', 'guard_name' => 'web'],
            ['name' => 'delete-slider', 'guard_name' => 'web'],
            ['name' => 'data-slider', 'guard_name' => 'web'],
            ['name' => 'view-review'],
            ['name' => 'create-review'],
            ['name' => 'update-review'],
            ['name' => 'delete-review'],
            ['name' => 'data-review'],
            ['name' => 'view-testimonial'],
            ['name' => 'create-testimonial'],
            ['name' => 'update-testimonial'],
            ['name' => 'delete-testimonial'],
            ['name' => 'data-testimonial'],
            ['name' => 'view-location'],
            ['name' => 'create-location'],
            ['name' => 'update-location'],
            ['name' => 'delete-location'],
            ['name' => 'data-location'],
            ['name' => 'view-product'],
            ['name' => 'create-product'],
            ['name' => 'update-product'],
            ['name' => 'delete-product'],
            ['name' => 'data-product'],
            ['name' => 'view-gallery'],
            ['name' => 'create-gallery'],
            ['name' => 'update-gallery'],
            ['name' => 'delete-gallery'],
            ['name' => 'data-gallery'],
        ])->each(fn ($permission) => Permission::firstOrCreate($permission)->assignRole(['Administrators', 'Editors']));

        // Permission laporan pendampingan (visit_reports) — blok ini idempoten agar aman dijalankan ulang
        // di database yang sudah hidup (pola firstOrCreate, bukan Permission::create).
        collect([
            'view-visit-report',
            'create-visit-report',
            'update-visit-report',
            'delete-visit-report',
            'data-visit-report',
        ])->each(function (string $name) {
            $permission = Permission::firstOrCreate([
                'name' => $name,
                'guard_name' => 'web',
            ]);

            $permission->assignRole(['Administrators', 'Fasilitator']);
        });

        Permission::firstOrCreate([
            'name' => 'review-visit-report',
            'guard_name' => 'web',
        ])->assignRole('Administrators');

        // Permission master cabang & kelompok + modul kas — blok idempoten (firstOrCreate + assignRole),
        // aman dijalankan ulang pada database produksi yang sudah hidup.
        collect([
            'view-group',
            'data-group',
        ])->each(function (string $name) {
            Permission::firstOrCreate([
                'name' => $name,
                'guard_name' => 'web',
            ])->assignRole(['Administrators', 'Fasilitator']);
        });

        collect([
            'create-group',
            'update-group',
            'delete-group',
        ])->each(function (string $name) {
            // Master kelompok dikelola admin; fasil hanya pemakai data kelompoknya.
            Permission::firstOrCreate([
                'name' => $name,
                'guard_name' => 'web',
            ])->assignRole('Administrators');
        });

        Permission::firstOrCreate([
            'name' => 'manage-branch',
            'guard_name' => 'web',
        ])->assignRole('Administrators');

        collect([
            'view-cash-transaction',
            'create-cash-transaction',
            'update-cash-transaction',
            'delete-cash-transaction',
            'data-cash-transaction',
        ])->each(function (string $name) {
            Permission::firstOrCreate([
                'name' => $name,
                'guard_name' => 'web',
            ])->assignRole(['Administrators', 'Fasilitator']);
        });

        // Admin default: idempoten by email agar seeder aman dijalankan ulang di DB hidup.
        User::firstOrCreate(
            ['email' => 'scrum@yatimmandiri.org'],
            [
                'name' => 'Administrator',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ]
        )->assignRole('Administrators');

        Province::query()->update([
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Regency::query()->update([
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        District::query()->update([
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Village::query()->update([
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
