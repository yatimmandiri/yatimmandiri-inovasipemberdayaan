import { getStorageUrl } from '@/utils/copyText';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import parse from 'html-react-parser';
import { Fragment, useCallback, useEffect, useState } from 'react';

export default function ProgramPage() {
    const [initialize, setInitialize] = useState({
        data: [],
        page: 1,
        perPage: 8,
        total: 0,
        lastPage: 1,
        searchValue: '',
        isLoading: false,
    });

    const fetchData = useCallback(async () => {
        setInitialize((prev) => ({
            ...prev,
            isLoading: true,
        }));

        const response = await axios.get('/programs/data', {
            params: {
                page: initialize.page,
                perPage: initialize.perPage,
                globalSearch: initialize.searchValue,
            },
        });

        setInitialize((prev) => ({
            ...prev,
            data: response.data.data,
            total: response.data.total,
            lastPage: response.data.last_page,
            isLoading: false,
        }));
    }, [initialize.page, initialize.perPage, initialize.searchValue]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getPages = () => {
        const current = initialize.page;
        const total = initialize.lastPage;

        const pages: (number | string)[] = [];

        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        if (current <= 4) {
            pages.push(1, 2, 3, 4, 5, '...', total);
        } else if (current >= total - 3) {
            pages.push(
                1,
                '...',
                total - 4,
                total - 3,
                total - 2,
                total - 1,
                total,
            );
        } else {
            pages.push(
                1,
                '...',
                current - 1,
                current,
                current + 1,
                '...',
                total,
            );
        }

        return pages;
    };

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

            <section className="relative z-20 -mt-12 pb-16">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="rounded-3xl bg-white p-6 shadow-xl">
                        <input
                            type="text"
                            value={initialize.searchValue}
                            placeholder="Cari produk..."
                            onChange={(e) =>
                                setInitialize((prev) => ({
                                    ...prev,
                                    page: 1,
                                    searchValue: e.target.value,
                                }))
                            }
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
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
                            {initialize.data?.length ?? 0} Program
                        </div>
                    </div>

                    {/* Empty State */}
                    {initialize.data?.length === 0 && (
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

                    {initialize.isLoading && (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="overflow-hidden rounded-3xl bg-white"
                                >
                                    <div className="h-60 animate-pulse bg-slate-200" />

                                    <div className="space-y-3 p-6">
                                        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                                        <div className="h-6 w-full animate-pulse rounded bg-slate-200" />
                                        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                                        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Grid */}
                    {!initialize.isLoading && initialize.data?.length > 0 && (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {initialize.data.map((program: any) => (
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

                    {initialize.lastPage > 1 && (
                        <div className="mt-16 flex items-center justify-center gap-2">
                            <button
                                disabled={initialize.page === 1}
                                onClick={() =>
                                    setInitialize((prev) => ({
                                        ...prev,
                                        page: prev.page - 1,
                                    }))
                                }
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
                            >
                                ←
                            </button>

                            {getPages().map((item, index) =>
                                item === '...' ? (
                                    <span
                                        key={index}
                                        className="px-2 text-slate-400"
                                    >
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={`${item}-${index}`}
                                        onClick={() =>
                                            setInitialize((prev) => ({
                                                ...prev,
                                                page: item as number,
                                            }))
                                        }
                                        className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition ${
                                            initialize.page === item
                                                ? 'bg-primary text-white'
                                                : 'hover:bg-slate-100'
                                        }`}
                                    >
                                        {item}
                                    </button>
                                ),
                            )}

                            <button
                                disabled={
                                    initialize.page === initialize.lastPage
                                }
                                onClick={() =>
                                    setInitialize((prev) => ({
                                        ...prev,
                                        page: prev.page + 1,
                                    }))
                                }
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
}
