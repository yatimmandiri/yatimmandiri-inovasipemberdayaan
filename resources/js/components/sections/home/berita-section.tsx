import axios from 'axios';
import { ArrowRight, Newspaper } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export const BeritaSection = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                'https://yatimmandiri.org/news/wp-json/ymapi/v2/posts',
            );

            setData(response.data ?? []);
        } catch (error) {
            console.error('Gagal mengambil berita:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const featuredArticle: any = data[0];
    const otherArticles: any = data.slice(1, 5);

    return (
        <section id="berita" className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-sm font-bold text-orange-600">
                            <Newspaper className="h-4 w-4" />
                            Berita & Artikel
                        </span>

                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                            Cerita Terbaru dari Program Pemberdayaan
                        </h2>

                        <p className="mt-5 text-lg text-slate-600">
                            Ikuti perkembangan kegiatan, kabar kolaborasi, dan
                            kisah dampak yang tumbuh bersama masyarakat.
                        </p>
                    </div>

                    <a
                        href="https://yatimmandiri.org/news"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-3 rounded-full border border-orange-200 px-5 py-3 text-sm font-bold text-orange-600 transition hover:border-orange-500 hover:bg-orange-50"
                    >
                        Lihat Semua
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                {loading ? (
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Featured Skeleton */}
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                                <div className="h-80 animate-pulse bg-slate-200" />
                                <div className="space-y-4 p-6">
                                    <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                                        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Skeleton */}
                        <div className="space-y-6">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="flex gap-4 rounded-lg border p-4"
                                >
                                    <div className="h-24 w-24 animate-pulse rounded-xl bg-slate-200" />

                                    <div className="flex-1 space-y-3">
                                        <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                                        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

                                        <div className="space-y-2">
                                            <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                                            <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        {featuredArticle && (
                            <div className="lg:col-span-2">
                                <a
                                    href={featuredArticle.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-lg"
                                >
                                    <img
                                        src={
                                            featuredArticle.featured_image
                                                .medium
                                        }
                                        alt={featuredArticle.title}
                                        className="h-80 w-full object-cover"
                                    />

                                    <div className="p-6">
                                        <h3 className="mb-3 text-2xl font-bold">
                                            {featuredArticle.title}
                                        </h3>

                                        <p className="line-clamp-3 text-slate-600">
                                            {featuredArticle.excerpt}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        )}
                        <div className="space-y-6">
                            {otherArticles.map((article: any) => (
                                <a
                                    key={article.id}
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-4 rounded-lg border p-1.5 transition hover:shadow-md"
                                >
                                    <img
                                        src={article.featured_image.medium}
                                        alt={article.title}
                                        className="h-24 w-24 rounded-lg object-cover"
                                    />

                                    <div>
                                        <h4 className="line-clamp-2 font-bold">
                                            {article.title}
                                        </h4>

                                        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
