import { getStorageUrl } from '@/utils/copyText';
import { Link, usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function ProgramPage() {
    const { programs } = usePage<any>().props;

    return (
        <Fragment>
            <section className="bg-slate-950 py-24 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300">
                        Program Pemberdayaan
                    </span>
                    <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-tight font-black md:text-6xl">
                        Jelajahi Program yang Membangun Kemandirian
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                        Temukan program berdasarkan kategori, kebutuhan
                        kolaborasi, dan dampak pemberdayaan yang ingin dibangun.
                    </p>
                </div>
            </section>
            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {programs?.map((program: any) => (
                            <div
                                key={program.id}
                                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="aspect-16/10 overflow-hidden">
                                    <img
                                        src={getStorageUrl(
                                            program.featured_image,
                                        )}
                                        alt={program.name}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900">
                                        {program.name}
                                    </h3>
                                    <p className="mt-3 line-clamp-3 text-slate-600">
                                        {program.excerpt}
                                    </p>
                                    <div className="mt-6">
                                        <Link
                                            href={`/programs/${program.slug}`}
                                            className="inline-flex items-center gap-2 font-semibold text-emerald-600"
                                        >
                                            Lihat Detail →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export const ProgramItemSection = ({ item }: { item: any }) => {
    return <div>ProgramItemSection</div>;
};
