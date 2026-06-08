<?php

namespace Database\Seeders;

use App\Models\Company\Mitra;
use Illuminate\Database\Seeder;

class MitraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 11; $i++) {
            Mitra::create([
                'name' => 'mitra-' . $i
            ]);
        }
    }
}
