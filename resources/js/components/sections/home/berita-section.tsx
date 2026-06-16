import { SkeletonBeritaComponent } from '@/components/partials/skeleton-component';
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
    const otherArticles: any = data.slice(1, 4);

    return (
        <section
            id="berita"
            className="bg-linear-to-b from-white via-slate-50 to-white py-24"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-sm font-bold text-orange-600">
                            <Newspaper className="h-4 w-4" />
                            News
                        </span>
                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                            Cerita Terbaru dari Program Pemberdayaan
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-slate-600">
                            Ikuti perkembangan kegiatan, kabar kolaborasi, serta
                            kisah dampak yang tumbuh bersama masyarakat.
                        </p>
                    </div>
                    <a
                        href="https://yatimmandiri.org/news"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-600 transition hover:border-orange-500 hover:bg-orange-50"
                    >
                        Lihat Semua
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
                {loading ? (
                    <SkeletonBeritaComponent />
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        {featuredArticle && (
                            <FeaturedArticle item={featuredArticle} />
                        )}
                        <div className="space-y-4">
                            {otherArticles.map((article: any) => (
                                <OtherArticle key={article.id} item={article} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export const KabarSection = () => {
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
    const otherArticles: any = data.slice(1, 4);

    return (
        <section
            id="berita"
            className="bg-linear-to-b from-white via-slate-50 to-white py-24"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-sm font-bold text-orange-600">
                            <Newspaper className="h-4 w-4" />
                            Kabar Terbaru
                        </span>
                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                            Cerita Terbaru dari Program Pemberdayaan
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-slate-600">
                            Ikuti perkembangan kegiatan, kabar kolaborasi, serta
                            kisah dampak yang tumbuh bersama masyarakat.
                        </p>
                    </div>
                    <a
                        href="https://yatimmandiri.org/news"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-3 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-600 transition hover:border-orange-500 hover:bg-orange-50"
                    >
                        Lihat Semua
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
                {loading ? (
                    <SkeletonBeritaComponent />
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        {featuredArticle && (
                            <div className="lg:col-span-2">
                                <a
                                    href={featuredArticle.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="relative">
                                        <img
                                            src={
                                                featuredArticle.featured_image
                                                    ?.medium
                                            }
                                            alt={featuredArticle.title}
                                            className="h-125 w-full object-cover transition duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                                        <div className="absolute bottom-0 p-8 text-white">
                                            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold">
                                                Berita Terbaru
                                            </span>
                                            <h3 className="mt-4 text-3xl leading-tight font-bold md:text-4xl">
                                                {featuredArticle.title}
                                            </h3>
                                            <p className="mt-4 line-clamp-2 text-sm text-slate-200 md:text-base">
                                                {featuredArticle.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}
                        <div className="space-y-4">
                            {otherArticles.map((article: any) => (
                                <a
                                    key={article.id}
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-lg"
                                >
                                    <img
                                        src={article.featured_image?.medium}
                                        alt={article.title}
                                        className="h-28 w-32 shrink-0 rounded-xl object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="flex flex-1 flex-col">
                                        <h4 className="line-clamp-2 font-bold text-slate-900 transition-colors group-hover:text-orange-600">
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

export const OtherArticle = ({ item }: { item: any }) => {
    return (
        <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-lg"
        >
            <img
                src={item.featured_image?.medium}
                alt={item.title}
                className="h-28 w-32 shrink-0 rounded-xl object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="flex flex-1 flex-col">
                <h4 className="line-clamp-2 font-bold text-slate-900 transition-colors group-hover:text-orange-600">
                    {item.title}
                </h4>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {item.excerpt}
                </p>
            </div>
        </a>
    );
};

export const FeaturedArticle = ({ item }: { item: any }) => {
    return (
        <div className="lg:col-span-2">
            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
                <div className="relative">
                    <img
                        src={item.featured_image?.medium}
                        alt={item.title}
                        className="h-125 w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 p-8 text-white">
                        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold">
                            Berita Terbaru
                        </span>

                        <h3 className="mt-4 text-3xl leading-tight font-bold md:text-4xl">
                            {item.title}
                        </h3>

                        <p className="mt-4 line-clamp-2 text-sm text-slate-200 md:text-base">
                            {item.excerpt}
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
};
