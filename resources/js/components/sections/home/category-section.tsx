import { ArrowRight } from "lucide-react";

export const CategorySection = ({ data }: { data: any }) => {
    return (
        <section id="categories" className="bg-slate-50 py-24 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <span className="inline-flex rounded-full bg-emerald-100 px-5 py-2 text-sm font-bold text-emerald-700">
                        Program Unggulan
                    </span>
                    <h2 className="mx-auto mt-7 max-w-3xl text-4xl leading-[0.95] font-black tracking-tight text-slate-950 md:text-6xl">
                        Program Pemberdayaan Berkelanjutan
                    </h2>
                    <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl">
                        Berbagai program yang dirancang untuk menciptakan
                        masyarakat yang mandiri, produktif, dan berdaya saing
                        melalui pendekatan yang berkelanjutan.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {data?.map((item: any, i: number) => (
                        <CategoryItemSection key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export const CategoryItemSection = ({
    item,
    key,
}: {
    key: number;
    item: any;
}) => {
    return (
        <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-56 overflow-hidden bg-slate-200 md:h-64">
                <img
                    src={
                        item.featured_image
                            ? `/storage/${item.featured_image}`
                            : `https://picsum.photos/1000/720?random=${key}`
                    }
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-black/35" />
                <div className="absolute top-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-emerald-600 shadow-sm backdrop-blur">
                    <img src={item.icon} alt="icon" className="size-8" />
                </div>
            </div>
            <div className="p-8 md:p-9">
                <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700">
                    {0}
                </span>
                <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
                    {item.name}
                </h3>
                <p className="mt-5 min-h-20 text-base leading-relaxed text-slate-600">
                    {item.excerpt || item.description}
                </p>
                {/* <ul className="mt-8 space-y-4">
                    {item.benefits.map((itm: any, a: number) => (
                        <li
                            key={a}
                            className="flex items-center gap-4 text-base text-slate-600"
                        >
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul> */}
                <a
                    href={`/program/${item.slug}`}
                    className="mt-10 inline-flex items-center gap-3 text-base font-bold text-emerald-600 transition hover:gap-4"
                >
                    Pelajari Selengkapnya
                    <ArrowRight className="h-5 w-5" />
                </a>
            </div>
        </div>
    );
};
