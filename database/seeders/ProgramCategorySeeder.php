<?php

namespace Database\Seeders;

use App\Models\ProgramCategory;
use Illuminate\Database\Seeder;

class ProgramCategorySeeder extends Seeder
{
    public function run(): void
    {
        collect([
            [
                'name' => 'Ekonomi',
                'description' => 'Program pemberdayaan ekonomi masyarakat dan keluarga.',
            ],
            [
                'name' => 'Pendidikan',
                'description' => 'Program peningkatan kapasitas, literasi, dan pembinaan generasi muda.',
            ],
            [
                'name' => 'Komunitas',
                'description' => 'Program penguatan komunitas dan kolaborasi sosial.',
            ],
            [
                'name' => 'Wisata',
                'description' => 'Program pengembangan potensi wisata dan desa dampingan.',
            ],
            [
                'name' => 'UMKM',
                'description' => 'Program pendampingan usaha mikro, kecil, dan menengah.',
            ],
        ])->each(fn (array $category) => ProgramCategory::firstOrCreate(
            ['name' => $category['name']],
            $category,
        ));
    }
}
