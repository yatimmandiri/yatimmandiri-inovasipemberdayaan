import { ProductItemSection } from '@/components/sections/home/product-section';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Fragment, useCallback, useEffect, useState } from 'react';

export default function ProductPage() {
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

        const response = await axios.get('/products/data', {
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
            <section className="relative overflow-hidden py-32">
                <img
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000"
                    alt="Produk Pemberdayaan"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container mx-auto max-w-7xl px-6">
                    <div className="max-w-3xl">
                        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                            Produk Pemberdayaan
                        </span>

                        <h1 className="mt-6 text-5xl font-bold text-white md:text-7xl">
                            Produk Hasil Program Inovasi
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-white/80">
                            Produk unggulan hasil program pemberdayaan
                            masyarakat yang memberikan manfaat ekonomi sekaligus
                            dampak sosial yang berkelanjutan.
                        </p>
                    </div>
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

            {/* Product Grid */}
            <section className="pb-24">
                <div className="container mx-auto max-w-7xl px-6">
                    {initialize.isLoading && (
                        <div className="py-24 text-center">
                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        </div>
                    )}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {initialize.data.map((product: any) => (
                            <ProductItemSection
                                key={product.id}
                                item={product}
                            />
                        ))}
                    </div>

                    {initialize.data.length === 0 && (
                        <div className="py-20 text-center">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Belum ada produk tersedia
                            </h3>

                            <p className="mt-3 text-slate-600">
                                Produk akan ditampilkan di sini setelah
                                dipublikasikan.
                            </p>
                        </div>
                    )}
                    {initialize.lastPage > 1 && (
                        <div className="mt-12 flex items-center justify-center gap-1">
                            <button
                                disabled={initialize.page === 1}
                                onClick={() =>
                                    setInitialize((prev) => ({
                                        ...prev,
                                        page: prev.page - 1,
                                    }))
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm hover:bg-slate-50 disabled:opacity-50"
                            >
                                ←
                            </button>

                            {getPages().map((item, index) =>
                                item === '...' ? (
                                    <span
                                        key={index}
                                        className="px-2 text-sm text-slate-400"
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
                                        className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                                            initialize.page === item
                                                ? 'bg-primary text-white'
                                                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
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
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm hover:bg-slate-50 disabled:opacity-50"
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary py-20">
                <div className="container mx-auto max-w-4xl px-6 text-center text-white">
                    <h2 className="text-3xl font-bold md:text-4xl">
                        Tertarik Menjadi Mitra Produk Pemberdayaan?
                    </h2>

                    <p className="mt-4 text-white/80">
                        Mari berkolaborasi untuk memperluas dampak sosial
                        melalui produk hasil program pemberdayaan masyarakat.
                    </p>

                    <Link
                        href="/kontak"
                        className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-3 font-semibold text-primary transition hover:shadow-lg"
                    >
                        Hubungi Kami
                    </Link>
                </div>
            </section>
        </Fragment>
    );
}
