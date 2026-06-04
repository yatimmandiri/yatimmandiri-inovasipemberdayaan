import { Input } from '@/components/ui/input';
import { router, usePage } from '@inertiajs/react';
import { ArrowRight, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ProgramCategory = {
    id: number;
    name: string;
    slug: string;
    programs_count?: number;
};

type ProgramItem = {
    id: number;
    name: string;
    slug: string;
    excerpt?: string;
    description: string;
    featured_image?: string;
    category?: ProgramCategory;
};

type PaginatedPrograms = {
    data: ProgramItem[];
    links?: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};

export default function ProgramIndexPage() {
    const { programs, categories, filters } = usePage<any>().props;
    const paginatedPrograms = programs as PaginatedPrograms;
    const [search, setSearch] = useState(filters?.search || '');
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const timeout = window.setTimeout(() => {
            router.get(
                '/program',
                {
                    search: search || undefined,
                    category: filters?.category || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 450);

        return () => window.clearTimeout(timeout);
    }, [search]);

    const setCategory = (category?: string) => {
        router.get(
            '/program',
            {
                search: search || undefined,
                category,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <main className="bg-slate-50">
            <section className="bg-white py-20 md:py-24">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="inline-flex rounded-full bg-emerald-100 px-5 py-2 text-sm font-bold text-emerald-700">
                        Program Pemberdayaan
                    </span>
                    <h1 className="mx-auto mt-7 max-w-4xl text-4xl leading-tight font-black tracking-tight text-slate-950 md:text-6xl">
                        Temukan Program yang Sesuai dengan Kebutuhan
                        Pemberdayaan
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
                        Jelajahi berbagai inisiatif pemberdayaan yang dirancang
                        untuk membangun masyarakat mandiri, produktif, dan
                        berkelanjutan.
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                        <div className="grid gap-4">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <Input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Cari nama program, kategori, atau deskripsi..."
                                    className="h-12 rounded-2xl border-slate-200 pl-12"
                                />
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => setCategory(undefined)}
                                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                                    !filters?.category
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                }`}
                            >
                                Semua
                            </button>
                            {categories?.map((category: ProgramCategory) => (
                                <button
                                    type="button"
                                    key={category.id}
                                    onClick={() => setCategory(category.slug)}
                                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                                        filters?.category === category.slug
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                    }`}
                                >
                                    {category.name}
                                    {typeof category.programs_count ===
                                        'number' && (
                                        <span className="ml-2 opacity-70">
                                            {category.programs_count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {paginatedPrograms.data.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {paginatedPrograms.data.map((program) => (
                                <ProgramListCard
                                    key={program.id}
                                    program={program}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                            <h2 className="text-2xl font-black text-slate-950">
                                Program tidak ditemukan
                            </h2>
                            <p className="mt-3 text-slate-600">
                                Coba gunakan kata kunci lain atau pilih kategori
                                yang berbeda.
                            </p>
                        </div>
                    )}

                    <Pagination links={paginatedPrograms.links || []} />
                </div>
            </section>
        </main>
    );
}

const ProgramListCard = ({ program }: { program: ProgramItem }) => {
    const image = program.featured_image?.startsWith('http')
        ? program.featured_image
        : program.featured_image
          ? `/storage/${program.featured_image}`
          : `https://picsum.photos/1000/720?random=${program.id + 60}`;

    return (
        <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="h-56 overflow-hidden bg-slate-200">
                <img
                    src={image}
                    alt={program.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-7">
                <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700">
                    {program.category?.name || 'Program'}
                </span>
                <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
                    {program.name}
                </h2>
                <p className="mt-4 line-clamp-3 text-base leading-relaxed text-slate-600">
                    {program.excerpt || program.description}
                </p>
                <a
                    href={`/program/${program.slug}`}
                    className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-emerald-600 transition hover:gap-4"
                >
                    Lihat Detail
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </article>
    );
};

const Pagination = ({ links }: { links: PaginatedPrograms['links'] }) => {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="mt-10 flex flex-wrap justify-center gap-2">
            {links.map((link, index) => (
                <button
                    key={`${link.label}-${index}`}
                    type="button"
                    disabled={!link.url}
                    onClick={() =>
                        link.url &&
                        router.visit(link.url, {
                            preserveScroll: true,
                            preserveState: true,
                        })
                    }
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        link.active
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    } ${!link.url ? 'cursor-not-allowed opacity-40' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
};
