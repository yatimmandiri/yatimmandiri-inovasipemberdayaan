<?php

namespace Database\Seeders;

use App\Models\Company\Slider;
use App\Models\Core\Permission;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            ['name' => 'view-slider', 'guard_name' => 'web'],
            ['name' => 'create-slider', 'guard_name' => 'web'],
            ['name' => 'update-slider', 'guard_name' => 'web'],
            ['name' => 'delete-slider', 'guard_name' => 'web'],
            ['name' => 'data-slider', 'guard_name' => 'web'],
        ])->each(fn($permission) => Permission::create($permission)->assignRole(['Administrators', 'Editors']));

        collect([
            [
                'title' => 'Panen Harapan, Menuai Kesejahteraan',
                'subtitle' => 'Mengembangkan sektor pertanian yang produktif dan berkelanjutan.',
                'category_id' => 1,
            ],
            [
                'title' => 'Ternak Berkembang, Ekonomi Gemilang',
                'subtitle' => 'Menciptakan peluang usaha peternakan yang mandiri dan menguntungkan.',
                'category_id' => 2
            ],
            [
                'title' => 'Berdaya Bersama, Maju Bersama',
                'subtitle' => 'Menggerakkan potensi masyarakat menuju kesejahteraan.',
                'category_id' => 3
            ],
            [
                'title' => 'Saatnya UMKM Naik Kelas',
                'subtitle' => 'Mendorong UMKM menjadi lebih kuat, inovatif, dan kompetitif.',
                'category_id' => 4
            ],
            [
                'title' => 'Belajar Hari Ini, Sukses Esok Hari',
                'subtitle' => 'Membekali keterampilan untuk masa depan yang lebih baik.',
                'category_id' => 5
            ],
            [
                'title' => 'Karya Terbaik, Kebanggaan Bangsa',
                'subtitle' => 'Menghadirkan produk unggulan yang bernilai dan berdaya saing.',
                'category_id' => 6
            ]
        ])->each(fn($data) => Slider::create($data));
    }
}
