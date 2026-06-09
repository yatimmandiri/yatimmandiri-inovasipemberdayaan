import { formatDate } from '@/utils/formatDate';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CalendarDays } from 'lucide-react';

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    category?: string;
    excerpt?: string;
    content: string;
    featured_image?: string;
    published_at?: string;
};

export default function BeritaShowPage() {
    const { news, relatedNews } = usePage<any>().props;

    return (
        <main className="bg-white">
            <section className="bg-slate-50 py-16 md:py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <a
                        href="/berita"
                        className="inline-flex items-center gap-3 text-sm font-bold text-orange-600 transition hover:gap-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Berita
                    </a>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
                            {news.category || 'Berita'}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                            <CalendarDays className="h-4 w-4" />
                            {news.published_at
                                ? formatDate(news.published_at)
                                : '-'}
                        </span>
                    </div>

                    <h1 className="mt-7 text-4xl leading-tight font-black tracking-tight text-slate-950 md:text-6xl">
                        {news.title}
                    </h1>
                    <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
                        {news.excerpt || news.content}
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-5xl px-6">
                    <img
                        src={getNewsImage(news, 130)}
                        alt={news.title}
                        className="aspect-[16/9] w-full rounded-3xl object-cover shadow-sm"
                    />

                    <article
                        className="mx-auto mt-12 max-w-3xl text-lg leading-relaxed text-slate-700"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                </div>
            </section>

            {relatedNews?.length > 0 && (
                <section className="bg-slate-50 py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-10 flex items-end justify-between gap-6">
                            <div>
                                <span className="text-sm font-bold text-orange-600">
                                    Berita Terkait
                                </span>
                                <h2 className="mt-3 text-3xl font-black text-slate-950">
                                    Artikel Lain yang Bisa Dibaca
                                </h2>
                            </div>
                            <a
                                href="/berita"
                                className="hidden items-center gap-2 text-sm font-bold text-orange-600 md:inline-flex"
                            >
                                Semua Berita
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedNews.map((item: NewsItem) => (
                                <RelatedNewsCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

const RelatedNewsCard = ({ item }: { item: NewsItem }) => {
    return (
        <a
            href={`/berita/${item.slug}`}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="h-44 overflow-hidden bg-slate-200">
                <img
                    src={getNewsImage(item, 150)}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-6">
                <span className="text-xs font-bold text-orange-600">
                    {item.category || 'Berita'}
                </span>
                <h3 className="mt-3 text-xl font-black text-slate-950">
                    {item.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {item.excerpt || item.content}
                </p>
            </div>
        </a>
    );
};

const getNewsImage = (item: NewsItem, seed: number) => {
    if (item.featured_image?.startsWith('http')) {
        return item.featured_image;
    }

    if (item.featured_image) {
        return `/storage/${item.featured_image}`;
    }

    return `https://picsum.photos/1200/820?random=${item.id + seed}`;
};
