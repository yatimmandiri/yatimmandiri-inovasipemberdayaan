<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            IndoRegionSeeder::class,
            UserRolePermissionSeeder::class,
            CategorySeeder::class,
            ProgramSeeder::class,
            MitraSeeder::class,
            SliderSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
