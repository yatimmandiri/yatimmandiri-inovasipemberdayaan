import {
    ArrowRight,
    Handshake,
    Leaf,
    Lightbulb,
    ShieldCheck,
} from 'lucide-react';

export default function AboutPage() {
    const timeline = [
        {
            year: '2020',
            title: 'Pendirian Organisasi',
            description:
                'Memulai langkah pemberdayaan masyarakat melalui program sosial dan ekonomi.',
        },
        {
            year: '2021',
            title: 'Peluncuran Program BISA',
            description:
                'Program pemberdayaan perempuan dan keluarga mulai dijalankan.',
        },
        {
            year: '2022',
            title: 'Ekspansi Desa Dampingan',
            description:
                'Menjangkau lebih banyak desa untuk penguatan ekonomi masyarakat.',
        },
        {
            year: '2023',
            title: 'Pengembangan Desa Wisata',
            description:
                'Mendorong potensi wisata berbasis masyarakat dan kearifan lokal.',
        },
        {
            year: '2024',
            title: 'Kolaborasi Nasional',
            description:
                'Berkolaborasi dengan berbagai lembaga untuk memperluas dampak.',
        },
    ];

    const values = [
        {
            title: 'Integritas',
            icon: ShieldCheck,
            description:
                'Menjalankan amanah dengan jujur, transparan, dan bertanggung jawab.',
        },
        {
            title: 'Inovasi',
            icon: Lightbulb,
            description:
                'Menghadirkan solusi kreatif untuk menjawab tantangan masyarakat.',
        },
        {
            title: 'Kolaborasi',
            icon: Handshake,
            description:
                'Membangun sinergi dengan berbagai pihak untuk dampak yang lebih luas.',
        },
        {
            title: 'Keberlanjutan',
            icon: Leaf,
            description:
                'Menciptakan perubahan yang berkelanjutan dan berdampak jangka panjang.',
        },
    ];

    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-500 py-28 text-white">
                <div className="absolute inset-0">
                    <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                </div>

                <div className="relative container mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
                            Tentang Kami
                        </span>

                        <h1 className="mt-8 text-5xl font-bold md:text-7xl">
                            Membangun
                            <span className="block text-emerald-200">
                                Kemandirian Masyarakat
                            </span>
                        </h1>

                        <p className="mt-8 text-lg leading-relaxed text-emerald-50 md:text-xl">
                            Mengembangkan potensi masyarakat melalui program
                            ekonomi, pendidikan, sosial, dan lingkungan yang
                            berkelanjutan.
                        </p>
                    </div>
                </div>
            </section>

            {/* Profile */}
            <section className="py-24">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div>
                            <img
                                src="https://picsum.photos/700/500"
                                alt="Tentang Kami"
                                className="w-full rounded-3xl shadow-2xl"
                            />
                        </div>

                        <div>
                            <span className="font-semibold text-emerald-600">
                                Siapa Kami
                            </span>

                            <h2 className="mt-4 text-4xl font-bold text-slate-900">
                                Menggerakkan Perubahan Melalui Pemberdayaan
                            </h2>

                            <p className="mt-6 leading-relaxed text-slate-600">
                                Kami hadir untuk membantu masyarakat
                                mengembangkan potensi yang dimiliki melalui
                                program-program pemberdayaan yang inovatif,
                                berkelanjutan, dan berdampak nyata.
                            </p>

                            <p className="mt-4 leading-relaxed text-slate-600">
                                Dengan pendekatan kolaboratif, kami percaya
                                setiap individu memiliki kesempatan untuk tumbuh
                                menjadi lebih mandiri dan sejahtera.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto max-w-5xl px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold text-slate-900">
                            Perjalanan Kami
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Perjalanan menuju dampak yang lebih luas.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute top-0 left-4 h-full w-1 bg-emerald-200" />

                        {timeline.map((item) => (
                            <div
                                key={item.year}
                                className="relative mb-10 pl-16"
                            >
                                <div className="absolute top-2 left-0 h-8 w-8 rounded-full bg-emerald-600 ring-8 ring-emerald-100" />

                                <div className="rounded-2xl bg-white p-6 shadow-sm">
                                    <span className="font-bold text-emerald-600">
                                        {item.year}
                                    </span>

                                    <h3 className="mt-2 text-xl font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-slate-600">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Mission */}
            <section className="py-24">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="rounded-3xl bg-linear-to-br from-emerald-600 to-emerald-500 p-10 text-white shadow-xl">
                            <h3 className="text-3xl font-bold">Visi</h3>

                            <p className="mt-6 text-lg leading-relaxed">
                                Menjadi lembaga pemberdayaan masyarakat yang
                                inovatif, profesional, dan berkelanjutan dalam
                                menciptakan dampak sosial yang luas.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
                            <h3 className="text-3xl font-bold text-slate-900">
                                Misi
                            </h3>

                            <ul className="mt-6 space-y-4 text-slate-600">
                                <li>✓ Mengembangkan potensi lokal.</li>
                                <li>✓ Memberdayakan masyarakat dan UMKM.</li>
                                <li>✓ Membangun kolaborasi lintas sektor.</li>
                                <li>✓ Menciptakan dampak berkelanjutan.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold text-slate-900">
                            Nilai-Nilai Kami
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group rounded-3xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                                        <Icon className="h-8 w-8 text-emerald-600" />
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-sm text-slate-600">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-linear-to-r from-emerald-700 to-emerald-500 py-24 text-white">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <span className="text-4xl font-bold">
                        Mari Berkolaborasi Bersama Kami
                    </span>

                    <p className="mt-6 text-lg text-emerald-50">
                        Bersama kita dapat menciptakan dampak yang lebih luas
                        dan berkelanjutan bagi masyarakat Indonesia.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button className="rounded-xl bg-white px-8 py-4 font-semibold text-emerald-600 transition hover:scale-105">
                            Ajukan Kerja Sama
                        </button>

                        <button className="flex items-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-emerald-600">
                            Lihat Program
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
