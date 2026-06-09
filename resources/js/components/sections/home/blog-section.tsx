import axios from 'axios';
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export const BlogSection = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                'https://yatimmandiri.org/blog/wp-json/ymapi/v2/posts',
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

    return (
        <section className="bg-slate-50 py-20">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                        <Newspaper className="h-4 w-4" />
                        Blog
                    </div>

                    <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-5xl">
                        Informasi dan Kabar Terbaru
                    </h2>

                    <p className="max-w-2xl text-slate-600">
                        Ikuti berbagai cerita inspiratif, program pemberdayaan,
                        dan perkembangan kegiatan yang memberikan dampak bagi
                        masyarakat.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.slice(0, 3).map((item: any, i: number) => (
                        <article
                            key={i}
                            className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={item.featured_image.medium}
                                    alt={item.title}
                                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                <span className="absolute top-4 left-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                                    {item?.category}
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar className="h-4 w-4" />
                                    {item?.date}
                                </div>

                                <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900">
                                    {item.title}
                                </h3>

                                <p className="mb-5 line-clamp-3 text-slate-600">
                                    {item.excerpt}
                                </p>

                                <a
                                    href={item.link}
                                    className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition hover:text-emerald-700"
                                >
                                    Baca Selengkapnya
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://yatimmandiri.org/blog"
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                    >
                        Lihat Semua Artikel
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};
