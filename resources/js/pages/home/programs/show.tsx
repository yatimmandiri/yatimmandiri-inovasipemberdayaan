import SROISection from '@/components/sections/home/sroi-section';
import { usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

export default function ProgramShowPage() {
    const { program, relatedPrograms } = usePage<any>().props;
    const benefits = program?.benefits
        ? program.benefits.split(';').filter(Boolean)
        : [];

    return (
        <main className="bg-white">
            <section className="bg-slate-950 py-20 text-white">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div>
                            <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300">
                                {program.category?.name || 'Program'}
                            </span>
                            <h1 className="mt-6 text-4xl leading-tight font-black md:text-6xl">
                                {program.name}
                            </h1>
                            <p className="mt-5 text-lg leading-relaxed text-white/70">
                                {program.excerpt || program.description}
                            </p>
                        </div>
                        <img
                            src={getImage(program.featured_image)}
                            alt={program.name}
                            className="aspect-4/3 rounded-3xl object-cover shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_320px]">
                    <article className="prose prose-slate max-w-none">
                        <h2>Detail Program</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: program.description || program.excerpt,
                            }}
                        />

                        {benefits.length > 0 && (
                            <>
                                <h2>Manfaat Program</h2>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {benefits.map((benefit: string) => (
                                        <div
                                            key={benefit}
                                            className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-slate-700"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                                            {benefit}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </article>

                    <aside className="space-y-4">
                        <div className="rounded-3xl border border-slate-200 p-6">
                            <h3 className="text-lg font-black text-slate-950">
                                Lokasi Program
                            </h3>
                            <div className="mt-4 space-y-3">
                                {program.locations?.length ? (
                                    program.locations.map((location: any) => (
                                        <div
                                            key={location.id}
                                            className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600"
                                        >
                                            <MapPin className="h-5 w-5 shrink-0 text-emerald-600" />
                                            <div>
                                                <p className="font-bold text-slate-900">
                                                    {location.pic}
                                                </p>
                                                <p className="mt-1">
                                                    {location.address}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-600">
                                        Lokasi akan diperbarui oleh admin.
                                    </p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <SROISection />

            {relatedPrograms?.length > 0 && (
                <section className="bg-slate-50 py-16">
                    <div className="mx-auto max-w-6xl px-6">
                        <h2 className="text-3xl font-black text-slate-950">
                            Program Terkait
                        </h2>
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {relatedPrograms.map((item: any) => (
                                <a
                                    key={item.id}
                                    href={`/program/${item.slug}`}
                                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <span className="text-sm font-bold text-emerald-600">
                                        {item.category?.name}
                                    </span>
                                    <h3 className="mt-3 text-xl font-black text-slate-950">
                                        {item.name}
                                    </h3>
                                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                                        {item.excerpt || item.description}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
                                        Lihat Detail
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

const getImage = (path: string | null | undefined) => {
    if (!path) {
        return 'https://picsum.photos/1200/900?random=61';
    }

    return path.startsWith('http') || path.startsWith('/')
        ? path
        : `/storage/${path}`;
};
