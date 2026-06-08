import { formatDate } from '@/utils/formatDate';
import { ArrowRight, CalendarDays, Newspaper } from 'lucide-react';

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    url?: string;
    category?: string;
    excerpt?: string;
    content: string;
    featured_image?: string;
    published_at?: string;
};

const fallbackArticles: NewsItem[] = [
    {
        id: 1,
        slug: 'pelatihan-digital-marketing-untuk-umkm',
        url: '/berita/pelatihan-digital-marketing-untuk-umkm',
        title: 'Pelatihan Digital Marketing untuk UMKM',
        category: 'Pelatihan',
        published_at: '2026-06-03',
        featured_image: 'https://picsum.photos/1000/720?random=52',
        content:
            'Program pelatihan digital marketing untuk meningkatkan daya saing UMKM di era digital.',
        excerpt:
            'Program pelatihan digital marketing untuk meningkatkan daya saing UMKM di era digital.',
    },
    {
        id: 2,
        slug: 'penyaluran-bantuan-pendidikan',
        url: '/berita/penyaluran-bantuan-pendidikan',
        title: 'Penyaluran Bantuan Pendidikan',
        category: 'Pendidikan',
        published_at: '2026-05-28',
        featured_image: 'https://picsum.photos/900/640?random=53',
        content:
            'Penyaluran bantuan pendidikan kepada siswa berprestasi dari keluarga prasejahtera.',
        excerpt:
            'Penyaluran bantuan pendidikan kepada siswa berprestasi dari keluarga prasejahtera.',
    },
    {
        id: 3,
        slug: 'workshop-pengembangan-komunitas',
        title: 'Workshop Pengembangan Komunitas',
        url: '/berita/workshop-pengembangan-komunitas',
        category: 'Komunitas',
        published_at: '2026-05-20',
        featured_image: 'https://picsum.photos/900/640?random=54',
        content:
            'Workshop untuk memperkuat kapasitas komunitas dalam menciptakan dampak sosial berkelanjutan.',
        excerpt:
            'Workshop untuk memperkuat kapasitas komunitas dalam menciptakan dampak sosial berkelanjutan.',
    },
];

export const BeritaSection = ({ news = [] }: { news?: NewsItem[] | any }) => {
    const newsItems = Array.isArray(news) ? news : (news?.data ?? []);
    const articles: NewsItem[] =
        newsItems.length > 0 ? newsItems : fallbackArticles;
    const [featured, ...secondary] = articles;
    const compactArticles = secondary.slice(0, 2);
    const extraArticles = secondary.slice(2);

    return (
        <section id="berita" className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-sm font-bold text-orange-600">
                            <Newspaper className="h-4 w-4" />
                            Berita & Artikel
                        </span>
                        <h2 className="mt-6 text-3xl leading-tight font-black tracking-tight text-slate-950 md:text-4xl">
                            Cerita Terbaru dari Program Pemberdayaan
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-600">
                            Ikuti perkembangan kegiatan, kabar kolaborasi, dan
                            kisah dampak yang tumbuh bersama masyarakat.
                        </p>
                    </div>
                    <a
                        href="/berita"
                        className="inline-flex w-fit items-center gap-3 rounded-full border border-orange-200 px-5 py-3 text-sm font-bold text-orange-600 transition hover:border-orange-500 hover:bg-orange-50"
                    >
                        Lihat Semua
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    {featured && <FeaturedNewsCard item={featured} />}
                    <div className="grid gap-5">
                        {compactArticles.map((item) => (
                            <CompactNewsCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {extraArticles.length > 0 && (
                    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {extraArticles.map((item) => (
                            <StackedNewsCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const FeaturedNewsCard = ({ item }: { item: NewsItem }) => {
    const image = getNewsImage(item, 70);

    return (
        <article className="group relative min-h-[340px] overflow-hidden rounded-2xl bg-slate-950 text-white shadow-sm md:min-h-[390px]">
            <img
                src={image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/45 to-transparent" />
            <div className="relative flex min-h-[340px] flex-col justify-end p-6 md:min-h-[390px] md:p-7">
                <NewsMeta item={item} tone="dark" />
                <h3 className="mt-4 max-w-2xl text-2xl leading-tight font-black tracking-tight md:text-3xl">
                    {item.title}
                </h3>
                <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-relaxed text-white/80">
                    {item.excerpt || item.content}
                </p>
                <a
                    href={item.url}
                    className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:gap-4 hover:bg-orange-50"
                >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </article>
    );
};

const CompactNewsCard = ({ item }: { item: NewsItem }) => {
    const image = getNewsImage(item, 80);

    return (
        <article className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[180px_1fr]">
            <div className="h-44 overflow-hidden bg-slate-100 sm:h-full">
                <img
                    src={image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col justify-between p-5">
                <div>
                    <NewsMeta item={item} />
                    <h3 className="mt-3 text-xl leading-tight font-black text-slate-950">
                        {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {item.excerpt || item.content}
                    </p>
                </div>
                <a
                    href={item.url}
                    target="_blank"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:gap-3"
                >
                    Baca Artikel
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </article>
    );
};

const StackedNewsCard = ({ item }: { item: NewsItem }) => {
    const image = getNewsImage(item, 95);

    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="h-44 overflow-hidden bg-slate-100">
                <img
                    src={image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-5">
                <NewsMeta item={item} />
                <h3 className="mt-3 text-lg leading-tight font-black text-slate-950">
                    {item.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {item.excerpt || item.content}
                </p>
                <a
                    href={item.url}
                    target="_blank"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:gap-3"
                >
                    Baca Artikel
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </article>
    );
};

const NewsMeta = ({
    item,
    tone = 'light',
}: {
    item: NewsItem;
    tone?: 'light' | 'dark';
}) => {
    const dark = tone === 'dark';

    return (
        <div className="flex flex-wrap items-center gap-3">
            <span
                className={
                    dark
                        ? 'rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur'
                        : 'rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600'
                }
            >
                {item.category || 'Berita'}
            </span>
            <span
                className={`inline-flex items-center gap-2 text-xs font-semibold ${
                    dark ? 'text-white/75' : 'text-slate-500'
                }`}
            >
                <CalendarDays className="h-4 w-4" />
                {item.published_at ? formatDate(item.published_at) : '-'}
            </span>
        </div>
    );
};

const getNewsImage = (item: NewsItem, seed: number) => {
    if (item.featured_image?.startsWith('http')) {
        return item.featured_image;
    }

    if (item.featured_image) {
        return `/storage/${item.featured_image}`;
    }

    return `https://picsum.photos/1000/720?random=${item.id + seed}`;
};
