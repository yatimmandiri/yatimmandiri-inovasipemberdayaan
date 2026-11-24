<?php

namespace Database\Seeders;

use App\Models\Company\ActivityReport;
use App\Models\Company\CashTransaction;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use App\Models\Company\Program;
use App\Models\Core\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class PemberdayaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Pastikan role Fasilitator ada
        $fasilitatorRole = Role::firstOrCreate(['name' => 'Fasilitator']);

        // Data akun fasilitator pendamping
        $fasilitatorData = [
            [
                'user_name' => 'Ahmad Fauzi, S.E.',
                'email' => 'ahmad.fauzi@yatimmandiri.org',
                'phone' => '081234567891',
                'kantor_id' => 1,
                'kantor_name' => 'Cabang Surabaya',
                'province_id' => '35', // Jawa Timur
                'regency_id' => '3578', // Kota Surabaya
                'district_id' => '3578010',
                'village_id' => '3578010001',
                'address' => 'Jl. Ketintang Baru No. 14, Gayungan, Surabaya',
                'groups' => [
                    [
                        'name' => 'KUBE Mandiri Barokah',
                        'leader_name' => 'Siti Aminah',
                        'phone' => '082198765431',
                        'address' => 'Jl. Kebonsari Tengah No. 25, Jambangan, Surabaya',
                        'description' => 'Kelompok Usaha Bersama pengolahan makanan ringan (keripik tempe & sambal kemasan)',
                        'activities' => [
                            [
                                'activity_date' => Carbon::now()->subDays(18)->format('Y-m-d'),
                                'title' => 'Pelatihan Pengemasan & Higienitas Produk Pangan',
                                'type' => 'Pelatihan & Workshop',
                                'location' => 'Balai Pertemuan RW 03 Kebonsari',
                                'participants_count' => 14,
                                'description' => 'Edukasi standardisasi kemasan standing pouch berlabel halal dan sanitasi ruang produksi.',
                            ],
                            [
                                'activity_date' => Carbon::now()->subDays(7)->format('Y-m-d'),
                                'title' => 'Monitoring Produksi & Pendampingan Sertifikasi P-IRT',
                                'type' => 'Monitoring & Evaluasi',
                                'location' => 'Rumah Produksi Ibu Siti Aminah',
                                'participants_count' => 12,
                                'description' => 'Pemeriksaan kelengkapan dokumen pengajuan nomor P-IRT ke Dinas Kesehatan setempat.',
                            ],
                            [
                                'activity_date' => Carbon::now()->subDays(2)->format('Y-m-d'),
                                'title' => 'Pertemuan Rutin & Evaluasi Penjualan Mingguan',
                                'type' => 'Pertemuan Rutin',
                                'location' => 'Sekretariat KUBE Mandiri Barokah',
                                'participants_count' => 15,
                                'description' => 'Rekapitulasi penjualan konsinyasi di minimarket lokal dan perencanaan pesanan bazar.',
                            ],
                        ],
                        'transactions' => [
                            [
                                'transaction_date' => Carbon::now()->subDays(25)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 5000000,
                                'category' => 'Bantuan Modal / Hibah',
                                'description' => 'Penyaluran bantuan modal bergulir tahap 1 dari program pemberdayaan Yatim Mandiri',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(20)->format('Y-m-d'),
                                'type' => 'out',
                                'amount' => 1850000,
                                'category' => 'Pembelian Bahan Baku',
                                'description' => 'Pembelian kedelai, minyak goreng, dan bumbu rempah untuk stok produksi 1 bulan',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(18)->format('Y-m-d'),
                                'type' => 'out',
                                'amount' => 650000,
                                'category' => 'Biaya Operasional',
                                'description' => 'Cetak standing pouch aluminium foil dan stiker kemasan 1.000 pcs',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(10)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 1450000,
                                'category' => 'Penjualan Produk',
                                'description' => 'Hasil penjualan keripik tempe pada bazar UMKM Balai Pemuda',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(5)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 300000,
                                'category' => 'Iuran Anggota',
                                'description' => 'Iuran kas bulanan 15 anggota kelompok (@ Rp 20.000)',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(2)->format('Y-m-d'),
                                'type' => 'out',
                                'amount' => 250000,
                                'category' => 'Biaya Operasional',
                                'description' => 'Biaya transportasi pengiriman konsinyasi dan operasional rapat kelompok',
                            ],
                        ],
                    ],
                    [
                        'name' => 'Kelompok Tani Hidroponik Berdaya',
                        'leader_name' => 'Bambang Supriyanto',
                        'phone' => '082198765432',
                        'address' => 'Jl. Pagesangan Asri No. 12, Jambangan, Surabaya',
                        'description' => 'Kelompok binaan urban farming budidaya sayuran hidroponik selada, pakcoy, dan bayam brazil',
                        'activities' => [
                            [
                                'activity_date' => Carbon::now()->subDays(15)->format('Y-m-d'),
                                'title' => 'Penyemaian Serentak Bibit Selada & Pakcoy',
                                'type' => 'Praktik Lapangan',
                                'location' => 'Greenhouse Komunal Pagesangan',
                                'participants_count' => 10,
                                'description' => 'Praktik semai bibit pada media rockwool dan pengaturan nutrisi AB Mix fase awal.',
                            ],
                            [
                                'activity_date' => Carbon::now()->subDays(3)->format('Y-m-d'),
                                'title' => 'Pengecekan TDS & pH Air Nutrisi Instalasi Hidroponik',
                                'type' => 'Monitoring & Evaluasi',
                                'location' => 'Greenhouse Komunal Pagesangan',
                                'participants_count' => 8,
                                'description' => 'Pemeriksaan berkala sirkulasi air, pembersihan pipa paralon, dan sterilisasi tandon nutrisi.',
                            ],
                        ],
                        'transactions' => [
                            [
                                'transaction_date' => Carbon::now()->subDays(22)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 3500000,
                                'category' => 'Bantuan Modal / Hibah',
                                'description' => 'Bantuan sarana greenhouse dan pipa instalasi DFT hidroponik',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(19)->format('Y-m-d'),
                                'type' => 'out',
                                'amount' => 950000,
                                'category' => 'Pembelian Bahan Baku',
                                'description' => 'Pembelian benih berkualitas, nutrisi hidroponik AB Mix 10 liter, dan netpot',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(6)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 820000,
                                'category' => 'Penjualan Produk',
                                'description' => 'Panen perdana 40 kg sayur pakcoy dan selada ke warung makan mitra',
                            ],
                        ],
                    ],
                ],
            ],
            [
                'user_name' => 'Nurul Hidayati, S.Pd.',
                'email' => 'nurul.hidayati@yatimmandiri.org',
                'phone' => '081234567892',
                'kantor_id' => 2,
                'kantor_name' => 'Cabang Sidoarjo',
                'province_id' => '35',
                'regency_id' => '3515', // Kab Sidoarjo
                'district_id' => '3515010',
                'village_id' => '3515010001',
                'address' => 'Perum Pondok Jati Blok AL-08, Sidoarjo',
                'groups' => [
                    [
                        'name' => 'Kreatif Menjahit Bunda Mandiri',
                        'leader_name' => 'Endang Sulastri',
                        'phone' => '082198765433',
                        'address' => 'Desa Sepande RT 04 RW 02, Candi, Sidoarjo',
                        'description' => 'Pemberdayaan bunda binaan dalam industri konveksi rumahan, tas spunbond, dan pakaian anak',
                        'activities' => [
                            [
                                'activity_date' => Carbon::now()->subDays(20)->format('Y-m-d'),
                                'title' => 'Pelatihan Pola & Teknik Menjahit Lanjutan',
                                'type' => 'Pelatihan & Workshop',
                                'location' => 'Workshop Bunda Mandiri Sepande',
                                'participants_count' => 16,
                                'description' => 'Materi teknik pemotongan bahan kain efisien dan penjahitan resleting jepang.',
                            ],
                            [
                                'activity_date' => Carbon::now()->subDays(12)->format('Y-m-d'),
                                'title' => 'Pemeriksaan Quality Control Pesanan Seragam',
                                'type' => 'Monitoring & Evaluasi',
                                'location' => 'Workshop Bunda Mandiri Sepande',
                                'participants_count' => 14,
                                'description' => 'QC jahitan 200 stel seragam TPA sebelum diserahkan kepada pemesan.',
                            ],
                            [
                                'activity_date' => Carbon::now()->subDays(1)->format('Y-m-d'),
                                'title' => 'Penyusunan Rencana Produksi Mukena Hari Raya',
                                'type' => 'Pertemuan Rutin',
                                'location' => 'Workshop Bunda Mandiri Sepande',
                                'participants_count' => 15,
                                'description' => 'Pembagian tugas penjahitan dan estimasi kebutuhan bahan kain katun rayon.',
                            ],
                        ],
                        'transactions' => [
                            [
                                'transaction_date' => Carbon::now()->subDays(30)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 7500000,
                                'category' => 'Bantuan Modal / Hibah',
                                'description' => 'Bantuan sarana 3 unit mesin jahit portable dan 1 mesin obras',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(24)->format('Y-m-d'),
                                'type' => 'out',
                                'amount' => 2400000,
                                'category' => 'Pembelian Bahan Baku',
                                'description' => 'Pembelian 4 roll kain seragam, benang jahit, dan resleting',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(11)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 4800000,
                                'category' => 'Penjualan Produk',
                                'description' => 'Pelunasan pembayaran pesanan seragam 200 pcs dari yayasan sekolah',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(8)->format('Y-m-d'),
                                'type' => 'out',
                                'amount' => 2000000,
                                'category' => 'Bagi Hasil / Simpanan',
                                'description' => 'Pembagian upah jahit tahap 1 kepada 10 penjahit anggota kelompok',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(4)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 250000,
                                'category' => 'Iuran Anggota',
                                'description' => 'Iuran kas kelompok dan dana sosial anggota bulan berjalan',
                            ],
                        ],
                    ],
                ],
            ],
            [
                'user_name' => 'Rahmat Hidayat, S.Tr.Kom.',
                'email' => 'rahmat.hidayat@yatimmandiri.org',
                'phone' => '081234567893',
                'kantor_id' => 3,
                'kantor_name' => 'Cabang Malang',
                'province_id' => '35',
                'regency_id' => '3573', // Kota Malang
                'district_id' => '3573010',
                'village_id' => '3573010001',
                'address' => 'Jl. Soekarno Hatta No. 45, Lowokwaru, Malang',
                'groups' => [
                    [
                        'name' => 'Peternak Puyuh Berkah Bersama',
                        'leader_name' => 'Supriyadi',
                        'phone' => '082198765434',
                        'address' => 'Kelurahan Tlogomas RT 02 RW 05, Lowokwaru, Malang',
                        'description' => 'Kelompok budidaya burung puyuh petelur mandiri dengan kapasitas 1.500 ekor',
                        'activities' => [
                            [
                                'activity_date' => Carbon::now()->subDays(14)->format('Y-m-d'),
                                'title' => 'Vaksinasi & Penyemprotan Disinfektan Kandang',
                                'type' => 'Praktik Lapangan',
                                'location' => 'Kandang Komunal Tlogomas',
                                'participants_count' => 9,
                                'description' => 'Pencegahan penyakit unggas melalui vaksinasi tetes mata dan sterilisasi area kandang.',
                            ],
                            [
                                'activity_date' => Carbon::now()->subDays(4)->format('Y-m-d'),
                                'title' => 'Monitoring Bobot Telur & Rasio Pakan FCR',
                                'type' => 'Monitoring & Evaluasi',
                                'location' => 'Kandang Komunal Tlogomas',
                                'participants_count' => 8,
                                'description' => 'Evaluasi produktivitas harian telur mencapai rata-rata 1.100 butir/hari.',
                            ],
                        ],
                        'transactions' => [
                            [
                                'transaction_date' => Carbon::now()->subDays(28)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 6000000,
                                'category' => 'Bantuan Modal / Hibah',
                                'description' => 'Bantuan pengadaan bibit puyuh (DOQ) 1.500 ekor dan kandang baterai',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(21)->format('Y-m-d'),
                                'type' => 'out',
                                'amount' => 1750000,
                                'category' => 'Pembelian Bahan Baku',
                                'description' => 'Pembelian konsentrat pakan puyuh 5 sak dan vitamin penambah nafsu makan',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(10)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 2100000,
                                'category' => 'Penjualan Produk',
                                'description' => 'Penjualan telur puyuh 60 kg kepada pedagang pasar Dinoyo',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(3)->format('Y-m-d'),
                                'type' => 'in',
                                'amount' => 2350000,
                                'category' => 'Penjualan Produk',
                                'description' => 'Penjualan telur puyuh periode kedua dan limbah kotoran pupuk organik',
                            ],
                            [
                                'transaction_date' => Carbon::now()->subDays(2)->format('Y-m-d'),
                                'type' => 'out',
                                'amount' => 300000,
                                'category' => 'Biaya Operasional',
                                'description' => 'Biaya listrik kandang pemanas dan air minum kandang',
                            ],
                        ],
                    ],
                ],
            ],
        ];

        // Cari atau gunakan program default bila ada
        $defaultProgram = Program::query()->first();
        $programId = $defaultProgram ? $defaultProgram->id : null;

        foreach ($fasilitatorData as $fData) {
            // 1. Buat / Ambil User
            $user = User::firstOrCreate(
                ['email' => $fData['email']],
                [
                    'name' => $fData['user_name'],
                    'password' => Hash::make('password123'),
                    'email_verified_at' => now(),
                ]
            );

            // Assign role Fasilitator ke user
            if (! $user->hasRole('Fasilitator')) {
                $user->assignRole($fasilitatorRole);
            }

            // 2. Buat / Ambil record Fasilitator
            $fasilitator = Fasilitator::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'kantor_id' => $fData['kantor_id'],
                    'kantor_name' => $fData['kantor_name'],
                    'name' => $fData['user_name'],
                    'phone' => $fData['phone'],
                    'email' => $fData['email'],
                    'address' => $fData['address'],
                    'province_id' => $fData['province_id'],
                    'regency_id' => $fData['regency_id'],
                    'district_id' => $fData['district_id'],
                    'village_id' => $fData['village_id'],
                    'status' => true,
                ]
            );

            // 3. Buat Kelompok binaan
            foreach ($fData['groups'] as $gData) {
                $group = Group::firstOrCreate(
                    [
                        'fasilitator_id' => $fasilitator->id,
                        'name' => $gData['name'],
                    ],
                    [
                        'program_id' => $programId,
                        'kantor_id' => $fData['kantor_id'],
                        'kantor_name' => $fData['kantor_name'],
                        'leader_name' => $gData['leader_name'],
                        'phone' => $gData['phone'],
                        'address' => $gData['address'],
                        'province_id' => $fData['province_id'],
                        'regency_id' => $fData['regency_id'],
                        'district_id' => $fData['district_id'],
                        'village_id' => $fData['village_id'],
                        'status' => true,
                        'description' => $gData['description'],
                    ]
                );

                // 4. Buat Aktivitas Laporan
                foreach ($gData['activities'] as $act) {
                    ActivityReport::firstOrCreate(
                        [
                            'fasilitator_id' => $fasilitator->id,
                            'group_id' => $group->id,
                            'title' => $act['title'],
                            'activity_date' => $act['activity_date'],
                        ],
                        [
                            'type' => $act['type'],
                            'location' => $act['location'],
                            'participants_count' => $act['participants_count'],
                            'description' => $act['description'],
                            'status' => true,
                        ]
                    );
                }

                // 5. Buat Transaksi Kas Masuk / Keluar
                foreach ($gData['transactions'] as $tx) {
                    CashTransaction::firstOrCreate(
                        [
                            'fasilitator_id' => $fasilitator->id,
                            'group_id' => $group->id,
                            'transaction_date' => $tx['transaction_date'],
                            'type' => $tx['type'],
                            'amount' => $tx['amount'],
                            'category' => $tx['category'],
                        ],
                        [
                            'description' => $tx['description'],
                            'status' => true,
                        ]
                    );
                }
            }
        }
    }
}
