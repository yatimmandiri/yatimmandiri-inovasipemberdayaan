import { ArrowRight } from 'lucide-react';

type ProgramItem = {
    id: number;
    name: string;
    slug: string;
    excerpt?: string;
    description: string;
    featured_image?: string;
};

const fallbackPrograms: ProgramItem[] = [
    {
        id: 1,
        name: 'Pendidikan Berdaya',
        slug: 'pendidikan-berdaya',
        description:
            'Pendampingan pendidikan, mentoring, dan penguatan karakter untuk anak-anak muda agar tumbuh lebih mandiri.',
    },
    {
        id: 2,
        name: 'UMKM Tumbuh',
        slug: 'umkm-tumbuh',
        description:
            'Pelatihan usaha, literasi digital, dan pendampingan pasar untuk membantu pelaku UMKM berkembang.',
    },
    {
        id: 3,
        name: 'Komunitas Mandiri',
        slug: 'komunitas-mandiri',
        description:
            'Kolaborasi komunitas dan relawan untuk menciptakan dampak sosial yang berkelanjutan.',
    },
];

export const ProgramSection = ({
    programs = [],
}: {
    programs?: ProgramItem[];
}) => {
    const items = programs.length > 0 ? programs : fallbackPrograms;

    return (
        <section id="programs" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            Program
                        </span>
                        <h2 className="mt-5 text-3xl font-black text-slate-900 md:text-5xl">
                            Ruang Tumbuh untuk Pemberdayaan
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                            Program pilihan yang dirancang untuk menguatkan
                            kapasitas, membuka peluang, dan memperluas manfaat
                            bagi masyarakat.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                                <img
                                    src={
                                        item.featured_image
                                            ? `/storage/${item.featured_image}`
                                            : `https://picsum.photos/900/600?random=${item.id + 40}`
                                    }
                                    alt={item.name}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {item.name}
                                </h3>
                                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                                    {item.excerpt || item.description}
                                </p>
                                <a
                                    href={`#program-${item.slug}`}
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                                >
                                    Lihat Program
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
