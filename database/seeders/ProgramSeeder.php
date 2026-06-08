<?php

namespace Database\Seeders;

use App\Models\Company\Program;
use App\Models\Core\Permission;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            ['name' => 'view-program', 'guard_name' => 'web'],
            ['name' => 'create-program', 'guard_name' => 'web'],
            ['name' => 'update-program', 'guard_name' => 'web'],
            ['name' => 'delete-program', 'guard_name' => 'web'],
            ['name' => 'data-program', 'guard_name' => 'web'],
        ])->each(fn($permission) => Permission::create($permission)->assignRole(['Administrators', 'Editors']));

        collect([
            [
                'name' => 'Agro Produktif Nusantara',
                'description' => 'Agro Produktif Nusantara',
                'category_id' => 1,
            ],
            [
                'name' => 'Peternakan Terpadu',
                'description' => 'Peternakan Terpadu',
                'category_id' => 2
            ],
            [
                'name' => 'Bunda Mandiri Sejahtera (BISA)',
                'description' => 'Bunda Mandiri Sejahtera (BISA)',
                'category_id' => 3
            ],
            [
                'name' => 'Kampung Mandiri',
                'description' => 'Kampung Mandiri',
                'category_id' => 3
            ],
            [
                'name' => 'Mandiri Enterpreneur Center',
                'description' => 'Mandiri Enterpreneur Center',
                'category_id' => 5
            ],
            [
                'name' => 'Karya Unggulan Mandiri',
                'description' => 'Karya Unggulan Mandiri',
                'category_id' => 6
            ]
        ])->each(fn($data) => Program::create($data));
    }
}
