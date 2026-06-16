<?php

namespace Database\Seeders;

use App\Models\Company\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'title' => 'Panen Harapan, Menuai Kesejahteraan',
                'subtitle' => 'Mengembangkan sektor pertanian yang produktif dan berkelanjutan.',
                'category_id' => 1,
                'url' => route('home.categories.detail', ['category' => 'pertanian-dan-perkebunan']),
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI'
            ],
            [
                'title' => 'Ternak Berkembang, Ekonomi Gemilang',
                'subtitle' => 'Menciptakan peluang usaha peternakan yang mandiri dan menguntungkan.',
                'category_id' => 2,
                'url' => route('home.categories.detail', ['category' => 'peternakan']),
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI'
            ],
            [
                'title' => 'Berdaya Bersama, Maju Bersama',
                'subtitle' => 'Menggerakkan potensi masyarakat menuju kesejahteraan.',
                'category_id' => 3,
                'url' => route('home.categories.detail', ['category' => 'pemberdayaan-masyarakat']),
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI'
            ],
            [
                'title' => 'Saatnya UMKM Naik Kelas',
                'subtitle' => 'Mendorong UMKM menjadi lebih kuat, inovatif, dan kompetitif.',
                'category_id' => 4,
                'url' => route('home.categories.detail', ['category' => 'umkm-bangkit']),
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI'
            ],
            [
                'title' => 'Belajar Hari Ini, Sukses Esok Hari',
                'subtitle' => 'Membekali keterampilan untuk masa depan yang lebih baik.',
                'category_id' => 5,
                'url' => route('home.categories.detail', ['category' => 'pendidikan-dan-pelatihan']),
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI'
            ],
        ])->each(fn($data) => Slider::create($data));
    }
}
