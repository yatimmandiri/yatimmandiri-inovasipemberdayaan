export const BeritaSection = () => {
    const articles = [
        {
            id: 1,
            title: 'Pelatihan Digital Marketing untuk UMKM',
            category: 'Pelatihan',
            date: '03 Juni 2026',
            image: 'https://picsum.photos/600/400?random=2',
            excerpt:
                'Program pelatihan digital marketing untuk meningkatkan daya saing UMKM di era digital.',
        },
        {
            id: 2,
            title: 'Penyaluran Bantuan Pendidikan',
            category: 'Pendidikan',
            date: '28 Mei 2026',
            image: 'https://picsum.photos/600/400?random=3',
            excerpt:
                'Penyaluran bantuan pendidikan kepada siswa berprestasi dari keluarga prasejahtera.',
        },
        {
            id: 3,
            title: 'Workshop Pengembangan Komunitas',
            category: 'Komunitas',
            date: '20 Mei 2026',
            image: 'https://picsum.photos/600/400?random=4',
            excerpt:
                'Workshop untuk memperkuat kapasitas komunitas dalam menciptakan dampak sosial berkelanjutan.',
        },
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((item: any, i: number) => (
                        <BeritaItemSection key={i} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export const BeritaItemSection = ({ item }: { item: any }) => {
    return (
        <article
            key={item.id}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
            <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
            />

            <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-500">
                        {item.category}
                    </span>

                    <span className="text-sm text-gray-500">{item.date}</span>
                </div>

                <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>

                <p className="mb-4 text-gray-600">{item.excerpt}</p>

                <button className="font-medium text-orange-500 hover:underline">
                    Baca Selengkapnya →
                </button>
            </div>
        </article>
    );
};
