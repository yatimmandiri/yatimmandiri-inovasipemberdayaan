<?php

namespace Database\Seeders;

use App\Models\Company\Mitra;
use App\Models\Company\Review;
use App\Models\Company\Testimonial;
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

            Review::create([
                'name' => 'review-' . $i,
                'position' => 'position-' . $i,
                'description' => 'description-' . $i,
            ]);

            Testimonial::create([
                'name' => 'testimonial-' . $i,
                'position' => 'position-' . $i,
                'description' => 'description-' . $i,
                'category_id' => rand(1, 3),
            ]);
        }
    }
}
