<?php

namespace Database\Seeders;

use App\Models\Company\Mitra;
use App\Models\Core\Permission;
use Illuminate\Database\Seeder;

class MitraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            ['name' => 'view-mitra', 'guard_name' => 'web'],
            ['name' => 'create-mitra', 'guard_name' => 'web'],
            ['name' => 'update-mitra', 'guard_name' => 'web'],
            ['name' => 'delete-mitra', 'guard_name' => 'web'],
            ['name' => 'data-mitra', 'guard_name' => 'web'],
        ])->each(fn($permission) => Permission::create($permission)->assignRole(['Administrators', 'Editors']));

        for ($i = 0; $i < 11; $i++) {
            Mitra::create([
                'name' => 'mitra-' . $i
            ]);
        }
    }
}
