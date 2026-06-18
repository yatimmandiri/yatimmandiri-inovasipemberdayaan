<?php

namespace Database\Seeders;

use App\Models\Company\Location;
use App\Models\Company\Mitra;
use App\Models\Company\Product;
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
        collect([
            [
                'name' => 'Prof. Dr. Ir. Budi Santoso',
                'position' => 'Akademisi dan Pengamat Pemberdayaan Masyarakat',
                'description' => 'Program-program inovasi yang dijalankan mampu menghadirkan solusi nyata bagi masyarakat melalui pendekatan yang terukur, berkelanjutan, dan berorientasi pada dampak sosial.',
            ],
            [
                'name' => 'Dr. H. Ahmad Fauzi',
                'position' => 'Kepala Dinas Pertanian',
                'description' => 'Kolaborasi dalam sektor pertanian telah membantu meningkatkan kapasitas petani dan mendorong produktivitas yang lebih baik di wilayah binaan.',
            ],
            [
                'name' => 'Ir. Siti Rahmawati',
                'position' => 'Praktisi Pemberdayaan Ekonomi',
                'description' => 'Pendekatan pemberdayaan yang dilakukan tidak hanya memberikan bantuan, tetapi juga membangun kemandirian dan keberlanjutan usaha masyarakat.',
            ],
            [
                'name' => 'Dr. Muhammad Ridwan',
                'position' => 'Pakar Ekonomi Syariah',
                'description' => 'Program ini menunjukkan bahwa pemberdayaan ekonomi berbasis komunitas dapat menjadi instrumen efektif dalam meningkatkan kesejahteraan masyarakat.',
            ],
            [
                'name' => 'H. Agus Setiawan',
                'position' => 'Direktur Mitra CSR Nasional',
                'description' => 'Kami melihat dampak yang nyata dari implementasi program, baik dari sisi ekonomi, sosial, maupun peningkatan kapasitas penerima manfaat.',
            ],
            [
                'name' => 'Prof. Dr. Nur Aisyah',
                'position' => 'Guru Besar Sosiologi',
                'description' => 'Program pemberdayaan yang berfokus pada penguatan komunitas merupakan langkah strategis dalam menciptakan perubahan sosial yang berkelanjutan.',
            ],
            [
                'name' => 'R. Hermawan Prasetyo',
                'position' => 'Ketua Kamar Dagang Daerah',
                'description' => 'Pengembangan UMKM melalui pendampingan dan peningkatan akses pasar menjadi salah satu faktor penting dalam mendorong pertumbuhan ekonomi lokal.',
            ],
            [
                'name' => 'Dr. Ir. Dewi Kartika',
                'position' => 'Pakar Agribisnis',
                'description' => 'Program pertanian produktif yang dijalankan berhasil mengintegrasikan aspek budidaya, pemasaran, dan penguatan kelembagaan petani secara baik.',
            ],
            [
                'name' => 'H. Abdul Karim',
                'position' => 'Tokoh Masyarakat',
                'description' => 'Kehadiran program ini memberikan manfaat yang luas bagi masyarakat serta mendorong lahirnya berbagai inisiatif positif di tingkat komunitas.',
            ],
            [
                'name' => 'Dr. Fitri Handayani',
                'position' => 'Konsultan Pengembangan SDM',
                'description' => 'Investasi pada pendidikan, pelatihan, dan pengembangan keterampilan merupakan fondasi penting untuk membangun masyarakat yang mandiri dan berdaya saing.',
            ],
        ])->each(fn($data) => Review::create($data));

        collect([
            [
                'name' => 'Ahmad Fauzi',
                'position' => 'Petani Binaan - Program Pertanian dan Perkebunan',
                'description' => 'Pendampingan yang diberikan sangat membantu kami meningkatkan hasil panen padi dan jagung. Selain mendapatkan ilmu baru, kami juga lebih mudah mengakses pasar hasil pertanian.',
                'category_id' => 1,
            ],
            [
                'name' => 'Siti Rahmawati',
                'position' => 'Ketua Kelompok Tani',
                'description' => 'Program ini memberikan dampak nyata bagi kelompok tani kami. Produktivitas meningkat dan anggota kelompok menjadi lebih mandiri dalam mengelola usaha pertanian.',
                'category_id' => 1,
            ],
            [
                'name' => 'Budi Santoso',
                'position' => 'Peternak Kambing',
                'description' => 'Melalui pelatihan dan pendampingan, kami memahami cara beternak yang lebih baik sehingga kualitas ternak dan pendapatan keluarga meningkat.',
                'category_id' => 2,
            ],
            [
                'name' => 'Nur Aisyah',
                'position' => 'Peternak Ayam Kampung',
                'description' => 'Program peternakan membantu kami mengembangkan usaha secara berkelanjutan. Kini usaha yang kami jalankan mampu memberikan penghasilan yang lebih stabil.',
                'category_id' => 2,
            ],
            [
                'name' => 'Moch. Ridwan',
                'position' => 'Pelaku UMKM',
                'description' => 'Berkat pendampingan yang diberikan, produk kami menjadi lebih menarik dan mampu menjangkau pasar yang lebih luas melalui pemasaran digital.',
                'category_id' => 3,
            ],
            [
                'name' => 'Dewi Kartika',
                'position' => 'Pengusaha Makanan Rumahan',
                'description' => 'Saya mendapatkan banyak ilmu tentang pengelolaan usaha dan strategi pemasaran. Omzet usaha meningkat sejak mengikuti program ini.',
                'category_id' => 3,
            ],
            [
                'name' => 'Abdul Karim',
                'position' => 'Penerima Manfaat Program',
                'description' => 'Program yang dijalankan memberikan kesempatan bagi masyarakat untuk berkembang dan meningkatkan taraf hidup melalui kegiatan yang produktif.',
                'category_id' => 1,
            ],
            [
                'name' => 'Sri Wahyuni',
                'position' => 'Anggota Kelompok Pemberdayaan',
                'description' => 'Kami merasa lebih percaya diri dalam mengembangkan potensi yang dimiliki karena adanya pendampingan dan dukungan yang berkelanjutan.',
                'category_id' => 3,
            ],
            [
                'name' => 'Rudi Hartono',
                'position' => 'Peternak Sapi',
                'description' => 'Program ini tidak hanya meningkatkan kemampuan beternak, tetapi juga membantu kami memahami cara mengelola usaha secara profesional.',
                'category_id' => 2,
            ],
            [
                'name' => 'Fitri Handayani',
                'position' => 'Pelaku Usaha Mikro',
                'description' => 'Pendampingan yang diberikan sangat bermanfaat. Saya mampu meningkatkan kualitas produk dan memperluas jaringan pemasaran.',
                'category_id' => 3,
            ],
        ])->each(fn($data) => Testimonial::create($data));

        collect([
            [
                'pic' => 'Ahmad Fauzi',
                'address' => 'Desa Sumberrejo, Kecamatan Ngimbang, Kabupaten Lamongan',
                'phone' => '081234567801',
                'province_id' => 1,
                'regency_id' => 1,
                'district_id' => 1,
                'village_id' => 1,
                'program_id' => 1,
            ],
            [
                'pic' => 'Siti Rahmawati',
                'address' => 'Desa Sukamaju, Kecamatan Babat, Kabupaten Lamongan',
                'phone' => '081234567802',
                'province_id' => 1,
                'regency_id' => 1,
                'district_id' => 2,
                'village_id' => 2,
                'program_id' => 1,
            ],
            [
                'pic' => 'Budi Santoso',
                'address' => 'Desa Karanganyar, Kecamatan Driyorejo, Kabupaten Gresik',
                'phone' => '081234567803',
                'province_id' => 1,
                'regency_id' => 2,
                'district_id' => 3,
                'village_id' => 3,
                'program_id' => 2,
            ],
            [
                'pic' => 'Nur Aisyah',
                'address' => 'Desa Kedungrejo, Kecamatan Waru, Kabupaten Sidoarjo',
                'phone' => '081234567804',
                'province_id' => 1,
                'regency_id' => 3,
                'district_id' => 4,
                'village_id' => 4,
                'program_id' => 2,
            ],
            [
                'pic' => 'Moch. Ridwan',
                'address' => 'Desa Tanggulangin, Kecamatan Tanggulangin, Kabupaten Sidoarjo',
                'phone' => '081234567805',
                'province_id' => 1,
                'regency_id' => 3,
                'district_id' => 5,
                'village_id' => 5,
                'program_id' => 3,
            ],
            [
                'pic' => 'Dewi Kartika',
                'address' => 'Desa Balongpanggang, Kecamatan Balongpanggang, Kabupaten Gresik',
                'phone' => '081234567806',
                'province_id' => 1,
                'regency_id' => 2,
                'district_id' => 6,
                'village_id' => 6,
                'program_id' => 3,
            ],
            [
                'pic' => 'Abdul Karim',
                'address' => 'Desa Sambeng, Kecamatan Sambeng, Kabupaten Lamongan',
                'phone' => '081234567807',
                'province_id' => 1,
                'regency_id' => 1,
                'district_id' => 7,
                'village_id' => 7,
                'program_id' => 1,
            ],
            [
                'pic' => 'Sri Wahyuni',
                'address' => 'Desa Krian, Kecamatan Krian, Kabupaten Sidoarjo',
                'phone' => '081234567808',
                'province_id' => 1,
                'regency_id' => 3,
                'district_id' => 8,
                'village_id' => 8,
                'program_id' => 3,
            ],
            [
                'pic' => 'Rudi Hartono',
                'address' => 'Desa Cerme, Kecamatan Cerme, Kabupaten Gresik',
                'phone' => '081234567809',
                'province_id' => 1,
                'regency_id' => 2,
                'district_id' => 9,
                'village_id' => 9,
                'program_id' => 2,
            ],
            [
                'pic' => 'Fitri Handayani',
                'address' => 'Desa Mantup, Kecamatan Mantup, Kabupaten Lamongan',
                'phone' => '081234567810',
                'province_id' => 1,
                'regency_id' => 1,
                'district_id' => 10,
                'village_id' => 10,
                'program_id' => 3,
            ],
        ])->each(fn($data) => Location::create($data));

        collect([
            [
                'name' => 'Beras Premium Nusantara',
                'unit' => 'Kg',
                'price' => 15000,
                'stock' => 250,
                'program_id' => 1,
            ],
            [
                'name' => 'Beras Organik Sejahtera',
                'unit' => 'Kg',
                'price' => 18000,
                'stock' => 180,
                'program_id' => 1,
            ],
            [
                'name' => 'Jagung Pipil Kering',
                'unit' => 'Kg',
                'price' => 7000,
                'stock' => 500,
                'program_id' => 1,
            ],
            [
                'name' => 'Jagung Manis Segar',
                'unit' => 'Kg',
                'price' => 12000,
                'stock' => 150,
                'program_id' => 1,
            ],
            [
                'name' => 'Pupuk Organik Cair',
                'unit' => 'Botol',
                'price' => 35000,
                'stock' => 75,
                'program_id' => 1,
            ],
            [
                'name' => 'Telur Ayam Kampung',
                'unit' => 'Pack',
                'price' => 32000,
                'stock' => 120,
                'program_id' => 2,
            ],
            [
                'name' => 'Ayam Kampung Siap Konsumsi',
                'unit' => 'Ekor',
                'price' => 85000,
                'stock' => 60,
                'program_id' => 2,
            ],
            [
                'name' => 'Susu Kambing Etawa',
                'unit' => 'Botol',
                'price' => 25000,
                'stock' => 90,
                'program_id' => 2,
            ],
            [
                'name' => 'Keripik Jagung Original',
                'unit' => 'Pack',
                'price' => 18000,
                'stock' => 200,
                'program_id' => 3,
            ],
            [
                'name' => 'Keripik Pisang Coklat',
                'unit' => 'Pack',
                'price' => 20000,
                'stock' => 170,
                'program_id' => 3,
            ],
            [
                'name' => 'Sambal Nusantara',
                'unit' => 'Botol',
                'price' => 25000,
                'stock' => 110,
                'program_id' => 3,
            ],
            [
                'name' => 'Madu Hutan Asli',
                'unit' => 'Botol',
                'price' => 85000,
                'stock' => 50,
                'program_id' => 3,
            ],
        ])->each(fn($data) => Product::create($data));

        for ($i = 0; $i < 11; $i++) {
            Mitra::create([
                'name' => 'mitra-' . $i
            ]);
        }
    }
}
