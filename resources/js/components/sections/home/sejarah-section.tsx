import {
    GraduationCap,
    Handshake,
    Leaf,
    Lightbulb,
    ShieldCheck,
    TrendingUp,
} from 'lucide-react';

export const TimelineSection = () => {
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

    return (
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
                        <div key={item.year} className="relative mb-10 pl-16">
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
    );
};

export const SejarahSection = () => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative">
                        <img
                            src="https://picsum.photos/700/500"
                            alt="Sejarah Inovasi Pemberdayaan"
                            className="h-120 w-full rounded-3xl object-cover shadow-xl"
                        />
                        <div className="absolute -inset-4 -z-10 rounded-3xl bg-emerald-50" />
                    </div>

                    {/* Content */}
                    <div>
                        <span className="text-sm font-semibold tracking-[0.2em] text-emerald-600 uppercase">
                            Sejarah
                        </span>

                        <h2 className="mt-4 text-4xl leading-tight font-bold text-slate-900">
                            Tentang Inovasi Pemberdayaan
                        </h2>

                        <div className="mt-8 space-y-5 leading-relaxed text-slate-600 prose-p:leading-6">
                            <p className="text-sm">
                                Inovasi Pemberdayaan Yatim Mandiri adalah
                                platform sosial yang diinisiasi oleh Yatim
                                Mandiri untuk menghadirkan program pemberdayaan
                                masyarakat yang lebih adaptif, berkelanjutan,
                                dan berdampak luas, khususnya bagi keluarga
                                yatim dan dhuafa. Berangkat dari pengalaman
                                panjang dalam pemberdayaan, platform ini menjadi
                                ruang pengembangan ide, kolaborasi, dan inkubasi
                                solusi sosial yang relevan dengan kebutuhan
                                masyarakat. Setiap inovasi tidak hanya berhenti
                                sebagai gagasan, tetapi diwujudkan menjadi aksi
                                nyata di lapangan dengan mengusung semangat
                                transformasi digital, ekonomi hijau, dan SDGs,
                                sebagai langkah menuju ekosistem pemberdayaan
                                yang mandiri, produktif, dan berdaya saing
                                menuju Indonesia Emas 2045.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const VisiMisiSection = () => {
    return (
        <section className="bg-slate-50 py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-slate-900">
                        Visi & Misi
                    </h2>
                    <p className="mt-3 text-slate-600">
                        Fondasi arah dan tujuan dalam membangun pemberdayaan
                        yang berkelanjutan
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 to-emerald-500 p-10 text-white shadow-lg transition hover:shadow-2xl">
                        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl transition group-hover:scale-110" />
                        <h3 className="text-2xl font-semibold tracking-wide">
                            Visi
                        </h3>
                        <p className="mt-6 text-lg leading-relaxed text-white/90">
                            Menjadi platform inovasi pemberdayaan masyarakat
                            yang melahirkan solusi berkelanjutan untuk
                            menciptakan komunitas yang mandiri, produktif, dan
                            berdaya saing.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition hover:shadow-md">
                        <h3 className="text-2xl font-semibold text-slate-900">
                            Misi
                        </h3>
                        <ul className="mt-6 space-y-4">
                            {[
                                'Mengembangkan program pemberdayaan yang inovatif dan berkelanjutan',
                                'Mendorong lahirnya solusi sosial berbasis kebutuhan masyarakat',
                                'Menguatkan kapasitas amil dan komunitas dalam membangun kemandirian ekonomi',
                                'Menghubungkan berbagai stakeholder dalam kolaborasi sosial yang berdampak',
                                'Mengimplementasikan inovasi terbaik menjadi program nyata di masyarakat',
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex gap-3 leading-relaxed text-slate-600"
                                >
                                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                                        ✓
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const NilaiNilaiSection = () => {
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
    );
};

export const TujuanSection = () => {
    const goals = [
        {
            icon: Lightbulb,
            title: 'Inovasi Berdampak',
            description:
                'Mengembangkan inovasi program pemberdayaan masyarakat yang berdampak nyata dan berkelanjutan.',
        },
        {
            icon: TrendingUp,
            title: 'Penguatan Ekonomi',
            description:
                'Mendorong lahirnya solusi kreatif untuk memperkuat ekonomi keluarga yatim dan dhuafa.',
        },
        {
            icon: GraduationCap,
            title: 'Peningkatan Kapasitas',
            description:
                'Meningkatkan kapasitas, kompetensi, dan kreativitas amil dalam membangun program pemberdayaan.',
        },
        {
            icon: Handshake,
            title: 'Kolaborasi Multisektor',
            description:
                'Menjadi ruang kolaborasi antara lembaga sosial, CSR, pemerintah, akademisi, dan masyarakat.',
        },
    ];

    return (
        <section className="relative overflow-hidden bg-white py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Tujuan Program
                    </span>
                    <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
                        Menghadirkan Inovasi untuk Dampak yang Lebih Luas
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-slate-600">
                        Inovasi Pemberdayaan Yatim Mandiri hadir sebagai wadah
                        pengembangan solusi kreatif dan kolaboratif untuk
                        memperkuat kemandirian masyarakat serta menciptakan
                        dampak sosial yang berkelanjutan.
                    </p>
                </div>
                <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {goals.map((goal, index) => {
                        const Icon = goal.icon;

                        return (
                            <div
                                key={index}
                                className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition-all group-hover:bg-emerald-600">
                                    <Icon className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-slate-900">
                                    {goal.title}
                                </h3>

                                <p className="mt-4 leading-relaxed text-slate-600">
                                    {goal.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
