import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { ArrowRight, Building2, Loader2, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function ProgramsPage() {
    const { programs, categories } = usePage<any>().props;
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [items, setItems] = useState(programs?.data ?? []);
    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: programs?.current_page ?? 1,
        lastPage: programs?.last_page ?? 1,
        total: programs?.total ?? 0,
    });

    const fetchPrograms = useCallback(
        async (
            searchValue: string,
            categoryValue: string,
            page: number = 1,
        ) => {
            try {
                setLoading(true);

                const response = await axios.get('/programs/data', {
                    params: {
                        search: searchValue,
                        category: categoryValue,
                        page,
                    },
                });
                console.log('API RESPONSE', response.data);

                setItems(response.data.data);

                setPagination({
                    currentPage: response.data.current_page,
                    lastPage: response.data.last_page,
                    total: response.data.total,
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            fetchPrograms(search, category, 1);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, category]);


    const handlePageChange = (page: number) => {
        fetchPrograms(search, category, page);

        window.scrollTo({
            top: 400,
            behavior: 'smooth',
        });
    };

    return (
        <main className="bg-white">
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

            <section className="bg-slate-50 py-10">
                <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-[1fr_260px]">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-sm font-semibold shadow-sm transition outline-none focus:border-emerald-400"
                            placeholder="Cari program..."
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold shadow-sm transition outline-none focus:border-emerald-400"
                    >
                        <option value="">Semua Kategori</option>
                        {categories?.map((item: any) => (
                            <option key={item.id} value={item.slug}>
                                {item.name} ({item.programs_count || 0})
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="relative">
                        {loading && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white/70 backdrop-blur-sm">
                                <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                            </div>
                        )}

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {items.map((item: any, index: number) => (
                                <ProgramCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    {!loading && pagination.lastPage > 1 && (
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                            <button
                                disabled={pagination.currentPage === 1}
                                onClick={() =>
                                    handlePageChange(pagination.currentPage - 1)
                                }
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Sebelumnya
                            </button>

                            {Array.from(
                                { length: pagination.lastPage },
                                (_, index) => index + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`h-10 min-w-10 rounded-xl text-sm font-bold transition ${page === pagination.currentPage
                                        ? 'bg-emerald-600 text-white'
                                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                disabled={
                                    pagination.currentPage === pagination.lastPage
                                }
                                onClick={() =>
                                    handlePageChange(pagination.currentPage + 1)
                                }
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Selanjutnya
                            </button>
                        </div>
                    )}

                    {!loading && items.length === 0 && (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                            <p className="text-lg font-bold text-slate-900">
                                Program tidak ditemukan
                            </p>
                            <p className="mt-2 text-slate-600">
                                Coba ubah kata kunci atau kategori pencarian.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

const ProgramCard = ({ item, index }: { item: any; index: number }) => {
    const benefits = item.benefits ? item.benefits.split(';').slice(0, 3) : [];

    return (
        <a
            href={`/program/${item.slug}`}
            className="group flex min-h-140 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="relative h-56 overflow-hidden">
                <img
                    src={getImage(item.featured_image, index)}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" />
                <div className="absolute top-5 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90">
                    <Building2 className="h-7 w-7 text-emerald-600" />
                </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {item.category?.name || 'Program'}
                </span>
                <h2 className="mt-4 text-2xl font-black text-slate-950">
                    {item.name}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {item.excerpt || item.description}
                </p>
                <ul className="mt-5 space-y-2">
                    {benefits.map((benefit: string) => (
                        <li
                            key={benefit}
                            className="flex items-start gap-3 text-sm text-slate-600"
                        >
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-emerald-600 transition group-hover:gap-3">
                    Pelajari Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                </span>
            </div>
        </a>
    );
};

const getImage = (path: string | null | undefined, index: number) => {
    if (!path) {
        return `https://picsum.photos/1000/720?random=${index + 40}`;
    }

    return path.startsWith('http') || path.startsWith('/')
        ? path
        : `/storage/${path}`;
};
