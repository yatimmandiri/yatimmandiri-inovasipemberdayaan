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
                'excerpt' => '<p>Program Pertanian dan Perkebunan merupakan inisiatif pemberdayaan masyarakat yang bertujuan menin...',
                'description' => '<p>Program Pertanian dan Perkebunan merupakan inisiatif pemberdayaan masyarakat yang bertujuan meningkatkan produktivitas, pendapatan, dan kesejahteraan petani melalui pengelolaan sektor agrikultur yang berkelanjutan. Program ini mendukung pengembangan komoditas pertanian dan perkebunan melalui penyediaan sarana produksi, pelatihan teknis, pendampingan usaha tani, serta penerapan teknologi dan praktik budidaya yang baik.</p><p>Berbagai kegiatan yang dilakukan meliputi pengolahan lahan, penanaman, pemupukan, perawatan tanaman, pengendalian hama dan penyakit, hingga pendampingan panen dan pascapanen. Selain meningkatkan hasil produksi dan kualitas komoditas, program ini juga membantu petani memperkuat akses pasar, meningkatkan nilai tambah produk, serta mengembangkan kelembagaan kelompok tani yang mandiri dan berdaya saing.</p><p>Melalui pendekatan yang terintegrasi dan berkelanjutan, Program Pertanian dan Perkebunan diharapkan mampu menciptakan kemandirian ekonomi masyarakat, membuka peluang usaha dan lapangan kerja, serta memberikan dampak sosial yang positif bagi keluarga dan komunitas di wilayah binaan. Program ini tidak hanya berfokus pada peningkatan hasil panen, tetapi juga pada pembangunan ekosistem pertanian yang produktif, tangguh, dan berkelanjutan untuk masa depan.</p>',
                'benefits' => 'Pelatihan Budidaya; Pendampingan Petani; Peningkatan Produktivitas; Penguatan Ketahanan Pangan',
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI',
            ],
            [
                'name' => 'Peternakan',
                'excerpt' => '<p>Program Peternakan merupakan program pemberdayaan ekonomi masyarakat yang berfokus pada pengemban...',
                'description' => '<p>Program Peternakan merupakan program pemberdayaan ekonomi masyarakat yang berfokus pada pengembangan usaha peternakan yang produktif, mandiri, dan berkelanjutan. Melalui penyediaan sarana usaha, pelatihan teknis, pendampingan intensif, serta penguatan manajemen peternakan, program ini membantu masyarakat meningkatkan kemampuan dalam mengelola ternak secara efektif dan bernilai ekonomi tinggi.</p><p>Kegiatan yang dilaksanakan meliputi pemilihan bibit unggul, pengelolaan kandang, penyediaan pakan dan nutrisi, perawatan kesehatan ternak, pengendalian penyakit, hingga pendampingan pascapanen dan pemasaran hasil peternakan. Selain meningkatkan produktivitas dan kualitas hasil ternak, program ini juga mendorong terbentuknya kelompok peternak yang mampu berkolaborasi, berbagi pengetahuan, serta memperkuat akses terhadap pasar dan peluang usaha.</p><p>Melalui pendekatan yang terintegrasi, Program Peternakan tidak hanya berupaya meningkatkan pendapatan peternak, tetapi juga memperkuat ketahanan ekonomi keluarga, menciptakan lapangan kerja, serta mendorong pertumbuhan ekonomi lokal yang berkelanjutan. Dengan demikian, masyarakat binaan dapat mencapai kemandirian ekonomi dan meningkatkan kualitas hidup secara berkelanjutan.</p>',
                'benefits' => 'Pelatihan Peternakan; Pendampingan Usaha Ternak; Peningkatan Produksi; Penguatan Ekonomi Peternak',
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI',
            ],
            [
                'name' => 'Pemberdayaan Masyarakat',
                'excerpt' => '<p>Program Pemberdayaan Masyarakat merupakan upaya pengembangan kapasitas individu, keluarga, dan ko...',
                'description' => '<p>Program Pemberdayaan Masyarakat merupakan upaya pengembangan kapasitas individu, keluarga, dan komunitas agar mampu mengoptimalkan potensi yang dimiliki untuk mencapai kemandirian dan kesejahteraan yang berkelanjutan. Program ini dirancang untuk memperkuat kemampuan masyarakat dalam menghadapi berbagai tantangan sosial dan ekonomi melalui pendekatan partisipatif yang melibatkan masyarakat sebagai pelaku utama perubahan.</p><p>Berbagai kegiatan yang dilaksanakan meliputi pelatihan keterampilan, pengembangan usaha produktif, pendampingan kelompok masyarakat, penguatan kelembagaan komunitas, serta peningkatan kapasitas kepemimpinan dan kewirausahaan. Selain itu, program juga mendorong terbentuknya kolaborasi dan jejaring antaranggota masyarakat sehingga tercipta lingkungan yang saling mendukung dalam proses pembangunan dan pemberdayaan.</p><p>Melalui pendampingan yang berkelanjutan, Program Pemberdayaan Masyarakat bertujuan membangun masyarakat yang lebih mandiri, produktif, dan berdaya saing. Program ini tidak hanya berfokus pada peningkatan kemampuan ekonomi, tetapi juga memperkuat aspek sosial, kepemimpinan, dan partisipasi masyarakat dalam pembangunan lingkungan sekitarnya. Dengan demikian, masyarakat diharapkan mampu menjadi agen perubahan yang aktif, menciptakan solusi atas berbagai permasalahan yang dihadapi, serta berkontribusi dalam mewujudkan kehidupan yang lebih sejahtera dan berkelanjutan.</p>',
                'benefits' => 'Pengembangan Kapasitas Masyarakat; Pelatihan Keterampilan; Penguatan Kelompok Komunitas; Pendampingan Berkelanjutan',
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI',
            ],
            [
                'name' => 'UMKM Bangkit',
                'excerpt' => '<p>Program UMKM Bangkit merupakan program pemberdayaan ekonomi yang berfokus pada penguatan dan peng...',
                'description' => '<p>Program UMKM Bangkit merupakan program pemberdayaan ekonomi yang berfokus pada penguatan dan pengembangan usaha mikro, kecil, dan menengah (UMKM) agar mampu tumbuh secara mandiri, berdaya saing, dan berkelanjutan. Program ini hadir untuk membantu pelaku usaha meningkatkan kapasitas bisnis melalui pendampingan yang terarah, pengembangan keterampilan kewirausahaan, serta penguatan aspek manajemen usaha.</p><p>Berbagai kegiatan dalam program ini meliputi pelatihan pengelolaan usaha, pengembangan produk, peningkatan kualitas produksi, penguatan branding dan pemasaran, hingga pemanfaatan teknologi digital untuk memperluas jangkauan pasar. Selain itu, pelaku UMKM juga mendapatkan pendampingan dalam pengelolaan keuangan, penyusunan strategi bisnis, serta peningkatan akses terhadap peluang kemitraan dan jaringan usaha.</p><p>Melalui pendekatan yang berkelanjutan, Program UMKM Bangkit tidak hanya membantu meningkatkan omzet dan produktivitas usaha, tetapi juga mendorong terciptanya lapangan kerja baru dan pertumbuhan ekonomi di tingkat komunitas. Dengan UMKM yang lebih kuat, inovatif, dan kompetitif, masyarakat memiliki peluang yang lebih besar untuk mencapai kemandirian ekonomi serta meningkatkan kesejahteraan keluarga dan lingkungan sekitarnya. Program ini menjadi salah satu upaya nyata dalam membangun ekosistem usaha yang inklusif, produktif, dan mampu memberikan dampak sosial yang lebih luas bagi masyarakat.</p>',
                'benefits' => 'Pelatihan Manajemen Usaha; Pengembangan Produk; Digital Marketing; Pendampingan UMKM',
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI',
            ],
            [
                'name' => 'Pendidikan dan Pelatihan',
                'excerpt' => '<p>Program Pendidikan dan Pelatihan merupakan program pengembangan sumber daya manusia yang dirancan...',
                'description' => '<p>Program Pendidikan dan Pelatihan merupakan program pengembangan sumber daya manusia yang dirancang untuk meningkatkan pengetahuan, keterampilan, dan kompetensi masyarakat agar mampu menghadapi tantangan dunia kerja maupun peluang usaha yang terus berkembang. Melalui pendekatan yang praktis dan berorientasi pada kebutuhan masyarakat, program ini membantu peserta memperoleh kemampuan yang relevan untuk meningkatkan kualitas hidup dan kemandirian ekonomi.</p><p>Berbagai kegiatan yang dilaksanakan meliputi pelatihan keterampilan teknis dan vokasional, pengembangan kompetensi kerja, pelatihan kewirausahaan, peningkatan literasi digital, serta pendampingan dalam penerapan keterampilan yang telah diperoleh. Selain itu, program ini juga mendorong penguatan karakter, kepemimpinan, dan kemampuan beradaptasi sehingga peserta memiliki kesiapan yang lebih baik dalam menghadapi perubahan sosial dan ekonomi.</p><p>Melalui proses pembelajaran dan pendampingan yang berkelanjutan, Program Pendidikan dan Pelatihan bertujuan membuka akses yang lebih luas terhadap kesempatan kerja, meningkatkan produktivitas individu, serta mendorong lahirnya wirausaha baru yang mampu menciptakan peluang ekonomi bagi diri sendiri dan lingkungan sekitarnya. Dengan sumber daya manusia yang lebih kompeten, mandiri, dan berdaya saing, program ini diharapkan dapat memberikan kontribusi nyata dalam meningkatkan kesejahteraan masyarakat dan mendukung pembangunan yang berkelanjutan.</p>',
                'benefits' => 'Pelatihan Keterampilan; Sertifikasi Kompetensi; Pengembangan SDM; Peningkatan Peluang Kerja',
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI',
            ],
        ])->each(fn($data) => Category::create($data));
    }
}
