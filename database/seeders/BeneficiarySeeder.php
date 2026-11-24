<?php

namespace Database\Seeders;

use App\Models\Company\Beneficiary;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use App\Models\Company\Program;
use Illuminate\Database\Seeder;

class BeneficiarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultProgram = Program::query()->first();

        // Data penerima manfaat terdistribusi per kelompok
        $beneficiariesByGroup = [
            'KUBE Mandiri Barokah' => [
                [
                    'name' => 'Siti Aminah',
                    'nik' => '3578014508820001',
                    'phone' => '082198765431',
                    'address' => 'Jl. Kebonsari Tengah No. 25 RT 02 RW 03, Jambangan, Surabaya',
                    'notes' => 'Ketua kelompok binaan KUBE, usaha utama produksi keripik tempe aneka rasa.',
                ],
                [
                    'name' => 'Rukmini Wulandari',
                    'nik' => '3578015504850002',
                    'phone' => '082144556677',
                    'address' => 'Jl. Kebonsari Timur No. 10 RT 01 RW 03, Jambangan, Surabaya',
                    'notes' => 'Anggota aktif bagian penggorengan dan pengemasan keripik.',
                ],
                [
                    'name' => 'Dewi Sartika',
                    'nik' => '3578016212870003',
                    'phone' => '082133445566',
                    'address' => 'Jl. Jambangan Kebon Agung No. 04, Jambangan, Surabaya',
                    'notes' => 'Anggota bagian pemasaran dan rekap pesanan online/bazar.',
                ],
                [
                    'name' => 'Sri Wahyuni',
                    'nik' => '3578014809830004',
                    'phone' => '082122334455',
                    'address' => 'Jl. Kebonsari Manunggal No. 18, Jambangan, Surabaya',
                    'notes' => 'Bunda binaan mandiri, penanggung jawab stok bahan baku kedelai.',
                ],
            ],
            'Kelompok Tani Hidroponik Berdaya' => [
                [
                    'name' => 'Bambang Supriyanto',
                    'nik' => '3578011203790001',
                    'phone' => '082198765432',
                    'address' => 'Jl. Pagesangan Asri No. 12 RT 04 RW 01, Jambangan, Surabaya',
                    'notes' => 'Ketua kelompok tani hidroponik, teknisi instalasi DFT dan nutrisi tanaman.',
                ],
                [
                    'name' => 'Agus Priyono',
                    'nik' => '3578011907810002',
                    'phone' => '085711223344',
                    'address' => 'Jl. Pagesangan Timur Gang 3 No. 08, Jambangan, Surabaya',
                    'notes' => 'Penanggung jawab pembibitan dan pengecekan kadar pH & PPM air.',
                ],
                [
                    'name' => 'Miftahul Huda',
                    'nik' => '3578012401860003',
                    'phone' => '085755667788',
                    'address' => 'Jl. Pagesangan Baru No. 19 RT 02 RW 02, Jambangan, Surabaya',
                    'notes' => 'Anggota bagian panen, sortasi sayur selada, dan packing sayur fresh.',
                ],
            ],
            'Kreatif Menjahit Bunda Mandiri' => [
                [
                    'name' => 'Endang Sulastri',
                    'nik' => '3515015106800001',
                    'phone' => '082198765433',
                    'address' => 'Desa Sepande RT 04 RW 02, Candi, Sidoarjo',
                    'notes' => 'Ketua kelompok konveksi Bunda Mandiri, spesialis pola dan pemotongan bahan.',
                ],
                [
                    'name' => 'Umi Kulsum',
                    'nik' => '3515014302840002',
                    'phone' => '081399887766',
                    'address' => 'Desa Sepande RT 03 RW 02, Candi, Sidoarjo',
                    'notes' => 'Penjahit terampil seragam sekolah dan tas totebag spunbond.',
                ],
                [
                    'name' => 'Mar’atun Sholihah',
                    'nik' => '3515016508880003',
                    'phone' => '081377889900',
                    'address' => 'Desa Larangan RT 01 RW 03, Candi, Sidoarjo',
                    'notes' => 'Operator mesin obras dan penanggung jawab quality control (QC).',
                ],
                [
                    'name' => 'Khotimah',
                    'nik' => '3515015911820004',
                    'phone' => '081366554433',
                    'address' => 'Desa Sugihwaras RT 02 RW 01, Candi, Sidoarjo',
                    'notes' => 'Anggota penjahit mukena bordir dan finishing kancing pakaian.',
                ],
            ],
            'Peternak Puyuh Berkah Bersama' => [
                [
                    'name' => 'Supriyadi',
                    'nik' => '3573011405780001',
                    'phone' => '082198765434',
                    'address' => 'Kelurahan Tlogomas RT 02 RW 05, Lowokwaru, Malang',
                    'notes' => 'Ketua kelompok ternak puyuh petelur, pengelola pakan dan perawatan kesehatan kandang.',
                ],
                [
                    'name' => 'Hadi Sucipto',
                    'nik' => '3573012209800002',
                    'phone' => '087811224455',
                    'address' => 'Kelurahan Tlogomas RT 03 RW 05, Lowokwaru, Malang',
                    'notes' => 'Pengumpul telur harian, pembersih baki kotoran puyuh, dan pengolah pupuk kandang.',
                ],
                [
                    'name' => 'Wahyudi Santoso',
                    'nik' => '3573010508850003',
                    'phone' => '087899001122',
                    'address' => 'Kelurahan Merjosari RT 01 RW 04, Lowokwaru, Malang',
                    'notes' => 'Penanggung jawab distribusi dan pengiriman telur ke lapak pedagang pasar.',
                ],
            ],
        ];

        foreach ($beneficiariesByGroup as $groupName => $beneficiaries) {
            $group = Group::where('name', $groupName)->first();
            if (! $group) {
                continue;
            }

            foreach ($beneficiaries as $data) {
                $beneficiary = Beneficiary::firstOrCreate(
                    [
                        'nik' => $data['nik'],
                    ],
                    [
                        'fasilitator_id' => $group->fasilitator_id,
                        'group_id' => $group->id,
                        'kantor_id' => $group->kantor_id,
                        'kantor_name' => $group->kantor_name,
                        'name' => $data['name'],
                        'phone' => $data['phone'],
                        'address' => $data['address'],
                        'province_id' => $group->province_id,
                        'regency_id' => $group->regency_id,
                        'district_id' => $group->district_id,
                        'village_id' => $group->village_id,
                        'status' => true,
                        'notes' => $data['notes'],
                    ]
                );

                // Hubungkan dengan program binaan jika ada
                if ($defaultProgram && ! $beneficiary->programs()->where('programs.id', $defaultProgram->id)->exists()) {
                    $beneficiary->programs()->attach($defaultProgram->id);
                }
            }
        }
    }
}
