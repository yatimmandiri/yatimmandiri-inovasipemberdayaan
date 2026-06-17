import { getStorageUrl } from '@/utils/copyText';
import { Link, usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import { Fragment, useMemo, useState } from 'react';

export default function ProgramPage() {
    const { programs } = usePage<any>().props;

    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        return programs?.filter((program: any) =>
            (program.name || '').toLowerCase().includes(query.toLowerCase()),
        );
    }, [programs, query]);

    return (
        <Fragment>
            <section className="bg-slate-950 py-16 text-white md:py-20">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">
                        Program Pemberdayaan
                    </span>

                    <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black md:text-6xl">
                        Jelajahi Program yang Membangun Kemandirian
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                        Temukan program berdasarkan kebutuhan, kolaborasi, dan
                        dampak pemberdayaan yang ingin dibangun.
                    </p>
                </div>
            </section>

            <section className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari program..."
                            className="w-full rounded-2xl border border-slate-200 py-3 pr-4 pl-12 transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-slate-50 py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">
                                Daftar Program
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Temukan program yang sesuai dengan kebutuhan dan
                                tujuan pemberdayaan.
                            </p>
                        </div>

                        <div className="inline-flex w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            {filtered?.length ?? 0} Program
                        </div>
                    </div>

                    {/* Empty State */}
                    {filtered?.length === 0 && (
                        <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.2-5.2m1.7-4.8a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                                    />
                                </svg>
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Program tidak ditemukan
                            </h3>

                            <p className="mt-2 text-slate-500">
                                Coba gunakan kata kunci lain untuk pencarian.
                            </p>
                        </div>
                    )}

                    {/* Grid */}
                    {filtered?.length > 0 && (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {filtered.map((program: any) => (
                                <Link
                                    key={program.id}
                                    href={`/programs/${program.slug}`}
                                    className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-16/10 overflow-hidden">
                                        <img
                                            src={getStorageUrl(
                                                program.featured_image,
                                            )}
                                            alt={program.name}
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                                        <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                                            Program
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                                            {program.name}
                                        </h3>

                                        <div className="description mt-3 line-clamp-3 text-slate-600">
                                            {parse(program.description ?? '')}
                                        </div>

                                        <div className="mt-6 flex items-center gap-2 font-semibold text-emerald-600">
                                            Lihat Detail
                                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
}
