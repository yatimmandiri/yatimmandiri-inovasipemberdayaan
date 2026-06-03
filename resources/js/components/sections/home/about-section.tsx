import { HeartHandshake, Lightbulb, TrendingUp, Users } from 'lucide-react';
import { createElement } from 'react';

export const AboutSection = () => {
    const values = [
        {
            icon: Lightbulb,
            title: 'Inovasi Berkelanjutan',
            description:
                'Mengembangkan solusi kreatif dan teknologi yang memberikan dampak nyata bagi masyarakat.',
        },
        {
            icon: Users,
            title: 'Kolaborasi',
            description:
                'Membangun sinergi bersama komunitas, pemerintah, perusahaan, dan lembaga sosial.',
        },
        {
            icon: HeartHandshake,
            title: 'Pemberdayaan',
            description:
                'Mendorong kemandirian individu dan komunitas melalui program yang berkelanjutan.',
        },
        {
            icon: TrendingUp,
            title: 'Dampak Terukur',
            description:
                'Setiap program dirancang dengan indikator keberhasilan yang jelas dan terukur.',
        },
    ];

    return (
        <section id="about" className="bg-white py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div className="relative">
                        <img
                            src="https://picsum.photos/800/600?random=1"
                            alt="Inovasi Pemberdayaan"
                            className="w-full rounded-3xl object-cover shadow-xl"
                        />

                        <div className="absolute -right-6 -bottom-6 rounded-2xl bg-orange-500 p-6 text-white shadow-lg">
                            <h3 className="text-3xl font-bold">10K+</h3>
                            <p className="text-sm opacity-90">
                                Penerima Manfaat
                            </p>
                        </div>
                    </div>
                    <div>
                        <span className="rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500">
                            Tentang Kami
                        </span>

                        <h2 className="mt-5 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
                            Menciptakan Solusi Inovatif untuk
                            <span className="text-orange-500">
                                {' '}
                                Pemberdayaan yang Berkelanjutan
                            </span>
                        </h2>

                        <p className="mt-6 text-lg leading-relaxed text-slate-600">
                            Inovasi Pemberdayaan hadir sebagai wadah kolaborasi
                            untuk mengembangkan program-program yang berfokus
                            pada peningkatan kualitas hidup masyarakat melalui
                            pendidikan, ekonomi, teknologi, dan pengembangan
                            sumber daya manusia.
                        </p>

                        <p className="mt-4 text-lg leading-relaxed text-slate-600">
                            Kami percaya bahwa perubahan besar dimulai dari
                            solusi yang tepat, kolaborasi yang kuat, dan
                            komitmen untuk menciptakan dampak yang berkelanjutan
                            bagi generasi masa depan.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:opacity-90">
                                Pelajari Lebih Lanjut
                            </button>

                            <button className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
                                Hubungi Kami
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {values.map((item: any, i: number) => {
                        return (
                            <div
                                key={i}
                                className="rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-lg"
                            >
                                <div className="mb-4 inline-flex rounded-xl bg-orange-500/10 p-3 text-orange-500">
                                    {createElement(item.icon, {
                                        className: 'size-8',
                                    })}
                                </div>

                                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                                    {item.title}
                                </h3>

                                <p className="leading-relaxed text-slate-600">
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
