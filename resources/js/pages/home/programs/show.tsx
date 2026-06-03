import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { usePage } from '@inertiajs/react';

type ProgramCategory = {
    id: number;
    name: string;
    slug: string;
    description?: string;
};

type ProgramItem = {
    id: number;
    name: string;
    slug: string;
    excerpt?: string;
    description: string;
    featured_image?: string;
    category?: ProgramCategory;
};

export default function ProgramShowPage() {
    const { program, relatedPrograms } = usePage<any>().props;

    const image = getProgramImage(program, 90);

    return (
        <main className="bg-white">
            <section className="relative overflow-hidden bg-slate-950 text-white">
                <img
                    src={image}
                    alt={program.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-slate-950/35" />
                <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-end px-6 py-20">
                    <a
                        href="/program"
                        className="mb-10 inline-flex w-fit items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Program
                    </a>
                    <span className="inline-flex w-fit rounded-full bg-emerald-400/20 px-5 py-2 text-sm font-bold text-emerald-100 backdrop-blur">
                        {program.category?.name || 'Program'}
                    </span>
                    <h1 className="mt-7 max-w-4xl text-4xl leading-tight font-black tracking-tight md:text-6xl">
                        {program.name}
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
                        {program.excerpt || program.description}
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_360px]">
                    <article>
                        <span className="text-sm font-bold text-emerald-600">
                            Detail Program
                        </span>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                            Tentang Program Ini
                        </h2>
                        <div className="mt-8 text-lg leading-relaxed whitespace-pre-line text-slate-600">
                            {program.description}
                        </div>
                    </article>

                    <aside className="h-fit rounded-3xl border border-slate-200 bg-slate-50 p-7">
                        <h3 className="text-xl font-black text-slate-950">
                            Fokus Program
                        </h3>
                        <ul className="mt-6 space-y-4">
                            {[
                                program.category?.name ||
                                    'Pemberdayaan masyarakat',
                                'Pendampingan berkelanjutan',
                                'Penguatan kapasitas penerima manfaat',
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex gap-3 text-sm font-semibold text-slate-600"
                                >
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </section>

            {relatedPrograms?.length > 0 && (
                <section className="bg-slate-50 py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-10 flex items-end justify-between gap-6">
                            <div>
                                <span className="text-sm font-bold text-emerald-600">
                                    Program Terkait
                                </span>
                                <h2 className="mt-3 text-3xl font-black text-slate-950">
                                    Lanjut Jelajahi Program Lainnya
                                </h2>
                            </div>
                            <a
                                href="/program"
                                className="hidden items-center gap-2 text-sm font-bold text-emerald-600 md:inline-flex"
                            >
                                Semua Program
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedPrograms.map((item: ProgramItem) => (
                                <RelatedProgramCard
                                    key={item.id}
                                    program={item}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

const RelatedProgramCard = ({ program }: { program: ProgramItem }) => {
    return (
        <a
            href={`/program/${program.slug}`}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="h-44 overflow-hidden bg-slate-200">
                <img
                    src={getProgramImage(program, 110)}
                    alt={program.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-6">
                <span className="text-xs font-bold text-emerald-600">
                    {program.category?.name || 'Program'}
                </span>
                <h3 className="mt-3 text-xl font-black text-slate-950">
                    {program.name}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {program.excerpt || program.description}
                </p>
            </div>
        </a>
    );
};

const getProgramImage = (program: ProgramItem, seed: number) => {
    if (program.featured_image?.startsWith('http')) {
        return program.featured_image;
    }

    if (program.featured_image) {
        return `/storage/${program.featured_image}`;
    }

    return `https://picsum.photos/1200/820?random=${program.id + seed}`;
};
