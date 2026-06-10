import { Link } from '@inertiajs/react';
import {
    HeartHandshake,
    Lightbulb,
    TrendingUp,
    Users,
    type LucideIcon,
} from 'lucide-react';

interface ValueItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

export const AboutSection = () => {
    const values: ValueItem[] = [
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
                        <div className="overflow-hidden rounded-3xl">
                            <img
                                src="https://picsum.photos/800/600?random=1"
                                alt="Inovasi Pemberdayaan"
                                className="h-full w-full object-cover shadow-xl"
                            />
                        </div>
                        <div className="absolute -right-6 -bottom-6 z-20 rounded-2xl bg-orange-500 p-6 text-white shadow-lg">
                            <div className="text-3xl font-bold">10K+</div>
                            <div className="text-sm opacity-90">
                                Penerima Manfaat
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="inline-flex w-fit rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500">
                            Tentang Kami
                        </div>
                        <h2 className="mt-5 text-4xl leading-tight font-bold text-slate-900 md:text-4xl">
                            Menciptakan Solusi Inovatif untuk{' '}
                            <b className="text-orange-500">
                                Pemberdayaan yang Berkelanjutan
                            </b>
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-slate-600">
                            Inovasi Pemberdayaan hadir sebagai wadah kolaborasi
                            untuk mengembangkan program-program yang berfokus
                            pada peningkatan kualitas hidup masyarakat melalui
                            pendidikan, ekonomi, teknologi, dan pengembangan
                            sumber daya manusia.
                        </p>
                        <div className="mt-8 flex w-full flex-col gap-4 md:flex-row">
                            <Link href="/about">
                                <button
                                    type="button"
                                    className="w-full rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:opacity-90"
                                >
                                    Pelajari Lebih Lanjut
                                </button>
                            </Link>

                            <Link href="/contact">
                                <button
                                    type="button"
                                    className="w-full rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Hubungi Kami
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {values.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-lg"
                            >
                                <div className="mb-4 inline-flex rounded-xl bg-orange-500/10 p-3 text-orange-500">
                                    <Icon className="size-8" />
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
