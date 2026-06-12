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
                'description' => 'Program Pertanian dan Perkebunan berfokus pada pemberdayaan masyarakat melalui pengembangan sektor agrikultur yang produktif dan berkelanjutan. Melalui pelatihan, pendampingan, serta penerapan praktik pertanian yang baik, program ini membantu meningkatkan hasil produksi, kualitas panen, dan kesejahteraan petani sehingga mampu menciptakan kemandirian ekonomi bagi keluarga dan komunitas.',
                'benefits' => 'Pelatihan Budidaya; Pendampingan Petani; Peningkatan Produktivitas; Penguatan Ketahanan Pangan'
            ],
            [
                'name' => 'Peternakan',
                'description' => 'Program Peternakan bertujuan meningkatkan kapasitas masyarakat dalam mengelola usaha peternakan yang produktif dan berkelanjutan. Melalui penyediaan pelatihan, pendampingan, dan penguatan manajemen usaha, program ini membantu peternak meningkatkan hasil produksi, memperluas peluang usaha, serta memperkuat ketahanan ekonomi keluarga dan masyarakat.',
                'benefits' => 'Pelatihan Peternakan; Pendampingan Usaha Ternak; Peningkatan Produksi; Penguatan Ekonomi Peternak'
            ],
            [
                'name' => 'Pemberdayaan Masyarakat',
                'description' => 'Program Pemberdayaan Masyarakat dirancang untuk meningkatkan kapasitas individu dan kelompok dalam mengembangkan potensi yang dimiliki secara mandiri. Melalui berbagai kegiatan pelatihan, pendampingan, dan penguatan kelembagaan komunitas, program ini mendorong terciptanya masyarakat yang lebih berdaya, mandiri, serta mampu berkontribusi dalam pembangunan sosial dan ekonomi di lingkungannya.',
                'benefits' => 'Pengembangan Kapasitas Masyarakat; Pelatihan Keterampilan; Penguatan Kelompok Komunitas; Pendampingan Berkelanjutan'
            ],
            [
                'name' => 'UMKM Bangkit',
                'description' => 'Program UMKM Bangkit hadir untuk mendukung pertumbuhan usaha mikro, kecil, dan menengah melalui penguatan kapasitas pelaku usaha, pengembangan produk, serta peningkatan akses pasar. Dengan pendampingan yang berkelanjutan, program ini membantu UMKM menjadi lebih kompetitif, inovatif, dan mampu berkembang secara berkelanjutan sehingga memberikan dampak ekonomi yang lebih luas bagi masyarakat.',
                'benefits' => 'Pelatihan Manajemen Usaha; Pengembangan Produk; Digital Marketing; Pendampingan UMKM'
            ],
            [
                'name' => 'Pendidikan dan Pelatihan',
                'description' => 'Program Pendidikan dan Pelatihan berfokus pada peningkatan kualitas sumber daya manusia melalui pengembangan pengetahuan, keterampilan, dan kompetensi yang relevan dengan kebutuhan masyarakat. Melalui berbagai pelatihan dan pendampingan, program ini membuka peluang yang lebih besar bagi peserta untuk meningkatkan produktivitas, memperoleh pekerjaan, maupun mengembangkan usaha secara mandiri.',
                'benefits' => 'Pelatihan Keterampilan; Sertifikasi Kompetensi; Pengembangan SDM; Peningkatan Peluang Kerja'
            ],
            // [
            //     'name' => 'Produk Unggulan',
            //     'description' => 'Program pengembangan produk unggulan daerah dan komunitas untuk meningkatkan kualitas, nilai tambah, serta akses pasar sehingga mampu bersaing di tingkat regional maupun nasional.',
            //     'benefits' => 'Pengembangan Produk; Peningkatan Kualitas; Branding dan Packaging; Akses Pasar yang Lebih Luas'
            // ]
        ])->each(fn($data) => Category::create($data));
    }
}
