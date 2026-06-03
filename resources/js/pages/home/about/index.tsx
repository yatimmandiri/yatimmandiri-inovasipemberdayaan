export default function AboutPage() {
    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-emerald-700 to-emerald-500 py-24 text-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                            Tentang Kami
                        </span>

                        <h1 className="mt-6 text-5xl font-bold md:text-6xl">
                            Inovasi Pemberdayaan
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-emerald-50 md:text-xl">
                            Membangun masyarakat yang mandiri, produktif, dan
                            berdaya saing melalui program pemberdayaan yang
                            inovatif dan berkelanjutan.
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
                                src="https://picsum.photos/600/400?random=1"
                                alt="Tentang Kami"
                                className="rounded-3xl shadow-xl"
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
                                Inovasi Pemberdayaan merupakan lembaga yang
                                berfokus pada pengembangan masyarakat melalui
                                program ekonomi, sosial, pendidikan, dan
                                lingkungan yang berkelanjutan.
                            </p>

                            <p className="mt-4 leading-relaxed text-slate-600">
                                Kami percaya bahwa setiap individu dan komunitas
                                memiliki potensi untuk berkembang. Dengan
                                pendekatan kolaboratif dan inovatif, kami
                                mendampingi masyarakat agar mampu mencapai
                                kemandirian dan kesejahteraan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sejarah */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold text-slate-900">
                            Perjalanan Kami
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Langkah-langkah yang telah kami tempuh untuk
                            menciptakan dampak yang lebih luas.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {[
                            {
                                year: '2020',
                                title: 'Pendirian Organisasi',
                            },
                            {
                                year: '2021',
                                title: 'Peluncuran Program BISA',
                            },
                            {
                                year: '2022',
                                title: 'Ekspansi Desa Dampingan',
                            },
                            {
                                year: '2023',
                                title: 'Pengembangan Desa Wisata',
                            },
                            {
                                year: '2024',
                                title: 'Kolaborasi Nasional',
                            },
                        ].map((item) => (
                            <div
                                key={item.year}
                                className="flex items-center gap-6"
                            >
                                <div className="w-24 text-xl font-bold text-emerald-600">
                                    {item.year}
                                </div>

                                <div className="h-3 w-3 rounded-full bg-emerald-600" />

                                <div className="font-medium text-slate-700">
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Mission */}
            <section className="py-24">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div className="rounded-3xl bg-emerald-600 p-10 text-white">
                            <h3 className="text-3xl font-bold">Visi</h3>

                            <p className="mt-6 leading-relaxed">
                                Menjadi lembaga pemberdayaan masyarakat yang
                                inovatif, profesional, dan berkelanjutan dalam
                                menciptakan dampak sosial yang luas.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-slate-100 p-10">
                            <h3 className="text-3xl font-bold text-slate-900">
                                Misi
                            </h3>

                            <ul className="mt-6 space-y-4 text-slate-600">
                                <li>
                                    • Mengembangkan program berbasis potensi
                                    lokal.
                                </li>
                                <li>
                                    • Meningkatkan kapasitas masyarakat dan
                                    UMKM.
                                </li>
                                <li>• Membangun kolaborasi lintas sektor.</li>
                                <li>
                                    • Menciptakan dampak sosial yang
                                    berkelanjutan.
                                </li>
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
                        {[
                            'Integritas',
                            'Inovasi',
                            'Kolaborasi',
                            'Keberlanjutan',
                        ].map((value) => (
                            <div
                                key={value}
                                className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
                            >
                                <h3 className="text-xl font-bold text-slate-900">
                                    {value}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-emerald-600 py-24 text-white">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-4xl font-bold">Mari Berkolaborasi</h2>

                    <p className="mt-6 text-lg text-emerald-50">
                        Bersama kita dapat menciptakan dampak yang lebih luas
                        dan berkelanjutan bagi masyarakat Indonesia.
                    </p>

                    <button className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-emerald-600 transition hover:bg-slate-100">
                        Ajukan Kerja Sama
                    </button>
                </div>
            </section>
        </main>
    );
}
