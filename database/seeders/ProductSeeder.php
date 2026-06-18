<?php

namespace Database\Seeders;

use App\Models\Company\Product;
use App\Models\Company\Program;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productNames = [
            'Beras Premium',
            'Beras Organik',
            'Beras Medium',
            'Jagung Pipil',
            'Jagung Manis',
            'Benih Jagung',
            'Pupuk Organik',
            'Pupuk Kompos',
            'Pupuk Cair',
            'Keripik Jagung',
            'Keripik Singkong',
            'Keripik Pisang',
            'Sambal Kemasan',
            'Madu Hutan',
            'Madu Kelulut',
            'Telur Ayam Kampung',
            'Telur Bebek',
            'Ayam Kampung',
            'Lele Segar',
            'Nila Segar',
            'Kopi Arabika',
            'Kopi Robusta',
            'Bubuk Kopi',
            'Teh Herbal',
            'Jahe Instan',
            'Kunyit Instan',
            'Gula Aren',
            'Gula Kelapa',
            'Kerajinan Anyaman',
            'Tas Anyaman',
            'Topi Anyaman',
            'Dompet Anyaman',
            'Batik Tulis',
            'Batik Cap',
            'Kain Tenun',
            'Mukena Bordir',
            'Sarung Tenun',
            'Bantal Handmade',
            'Boneka Kain',
            'Lilin Aromaterapi',
        ];

        $programIds = Program::pluck('id')->toArray();

        if (empty($programIds)) {
            $this->command->warn('Program tidak ditemukan.');
            return;
        }

        for ($i = 1; $i <= 100; $i++) {
            $name = fake()->randomElement($productNames) . ' ' . fake()->randomElement([
                'Premium',
                'Unggulan',
                'Nusantara',
                'Mandiri',
                'Sejahtera',
                'Berkah',
                'Alami',
                'Organik',
                'Super',
                'Pilihan',
            ]);

            Product::create([
                'name' => $name,
                'link' => fake()->optional()->url(),
                'slug' => Str::slug($name . '-' . $i),
                'description' => fake()->paragraphs(
                    rand(2, 4),
                    true
                ),
                'unit' => fake()->randomElement([
                    'Kg',
                    'Pcs',
                    'Pack',
                    'Box',
                    'Liter',
                    'Karung',
                ]),
                'price' => fake()->numberBetween(
                    10000,
                    500000
                ),
                'stock' => fake()->numberBetween(
                    0,
                    500
                ),
                'status' => fake()->boolean(90),
                'recommended' => fake()->boolean(30),
                'program_id' => fake()->randomElement($programIds),
            ]);
        }
    }
}
