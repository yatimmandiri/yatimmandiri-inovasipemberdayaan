<?php

namespace Database\Seeders;

use App\Models\Company\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'name' => 'Agro Produktif Nusantara',
                'description' => 'Agro Produktif Nusantara merupakan program pemberdayaan berbasis pertanian dan perkebunan yang bertujuan meningkatkan produktivitas lahan serta kesejahteraan petani dan keluarga yatim dhuafa. Melalui pelatihan, pendampingan, penyediaan sarana produksi, dan penguatan akses pasar, program ini mendorong terciptanya usaha pertanian yang berkelanjutan, mandiri, dan mampu memberikan manfaat ekonomi jangka panjang bagi masyarakat.',
                'category_id' => 1,
                'video_url' => 'https://www.youtube.com/watch?v=jX5FV-786cI',
            ],
            [
                'name' => 'Peternakan Terpadu',
                'description' => 'Peternakan Terpadu merupakan program pemberdayaan ekonomi yang mengembangkan usaha peternakan secara terintegrasi dan berkelanjutan. Program ini memberikan dukungan berupa bibit ternak, pelatihan, serta pendampingan pengelolaan usaha sehingga penerima manfaat dapat meningkatkan produktivitas, memperoleh sumber penghasilan yang stabil, dan membangun kemandirian ekonomi keluarga.',
                'category_id' => 2,
            ],
            [
                'name' => 'Bunda Mandiri Sejahtera (BISA)',
                'description' => 'Bunda Mandiri Sejahtera (BISA) adalah program pemberdayaan perempuan yang bertujuan meningkatkan kapasitas dan kemandirian ekonomi para ibu, khususnya keluarga yatim dan dhuafa. Melalui pelatihan keterampilan, pengembangan usaha, serta pendampingan berkelanjutan, program ini membantu para bunda memiliki sumber penghasilan yang lebih baik sehingga mampu meningkatkan kesejahteraan keluarga secara mandiri.',
                'category_id' => 3,
            ],
            [
                'name' => 'Kampung Mandiri',
                'description' => 'Kampung Mandiri merupakan program pemberdayaan masyarakat berbasis komunitas yang mengoptimalkan potensi lokal untuk menciptakan lingkungan yang produktif, mandiri, dan berkelanjutan. Melalui penguatan ekonomi, pendidikan, sosial, dan lingkungan, program ini mendorong masyarakat untuk berpartisipasi aktif dalam pembangunan serta meningkatkan kualitas hidup secara bersama-sama.',
                'category_id' => 3,
            ],
            [
                'name' => 'Mandiri Entrepreneur Center',
                'description' => 'Mandiri Entrepreneur Center merupakan program pendidikan dan pelatihan kewirausahaan yang dirancang untuk mencetak generasi muda yang kompeten, produktif, dan siap berwirausaha. Melalui pembekalan keterampilan, pengembangan karakter, pendampingan bisnis, serta praktik langsung di dunia usaha, program ini membantu peserta membangun kemandirian ekonomi dan menciptakan peluang kerja bagi dirinya maupun masyarakat sekitar.',
                'category_id' => 5,
            ],
            // [
            //     'name' => 'Karya Unggulan Mandiri',
            //     'description' => 'Karya Unggulan Mandiri',
            //     'category_id' => 6
            // ]
        ])->each(fn($data) => Program::create($data));
    }
}
