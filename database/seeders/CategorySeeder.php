<?php

namespace Database\Seeders;

use App\Models\Company\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'name' => 'Pertanian dan Perkebunan',
                'description' => 'Program pemberdayaan di sektor pertanian dan perkebunan yang bertujuan meningkatkan produktivitas lahan, kualitas hasil panen, serta pendapatan petani melalui penerapan teknologi, pelatihan, dan pendampingan berkelanjutan.',
                'benefits' => 'Pelatihan Budidaya; Pendampingan Petani; Peningkatan Produktivitas; Penguatan Ketahanan Pangan'
            ],
            [
                'name' => 'Peternakan',
                'description' => 'Program pengembangan usaha peternakan untuk meningkatkan kapasitas peternak dalam pengelolaan ternak, produksi hasil peternakan, dan pengembangan usaha yang berkelanjutan.',
                'benefits' => 'Pelatihan Peternakan; Pendampingan Usaha Ternak; Peningkatan Produksi; Penguatan Ekonomi Peternak'
            ],
            [
                'name' => 'Pemberdayaan Masyarakat',
                'description' => 'Program penguatan kapasitas masyarakat melalui berbagai kegiatan sosial, ekonomi, dan lingkungan untuk menciptakan kemandirian, kesejahteraan, dan pembangunan berbasis potensi lokal.',
                'benefits' => 'Pengembangan Kapasitas Masyarakat; Pelatihan Keterampilan; Penguatan Kelompok Komunitas; Pendampingan Berkelanjutan'
            ],
            [
                'name' => 'UMKM Bangkit',
                'description' => 'Program pengembangan usaha mikro, kecil, dan menengah (UMKM) melalui pelatihan, pendampingan, serta akses pemasaran guna meningkatkan daya saing dan keberlanjutan usaha.',
                'benefits' => 'Pelatihan Manajemen Usaha; Pengembangan Produk; Digital Marketing; Pendampingan UMKM'
            ],
            [
                'name' => 'Pendidikan dan Pelatihan',
                'description' => 'Program peningkatan kompetensi dan keterampilan masyarakat melalui pendidikan nonformal, pelatihan kerja, serta pengembangan kapasitas sumber daya manusia untuk mendukung kemandirian ekonomi.',
                'benefits' => 'Pelatihan Keterampilan; Sertifikasi Kompetensi; Pengembangan SDM; Peningkatan Peluang Kerja'
            ],
            [
                'name' => 'Produk Unggulan',
                'description' => 'Program pengembangan produk unggulan daerah dan komunitas untuk meningkatkan kualitas, nilai tambah, serta akses pasar sehingga mampu bersaing di tingkat regional maupun nasional.',
                'benefits' => 'Pengembangan Produk; Peningkatan Kualitas; Branding dan Packaging; Akses Pasar yang Lebih Luas'
            ]
        ])->each(fn($data) => Category::create($data));
    }
}
