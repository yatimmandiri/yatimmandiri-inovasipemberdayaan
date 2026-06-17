import { CategoryItemSection } from '@/components/sections/home/category-section';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function CategoriesPage() {
    const { categories } = usePage<any>().props;

    return (
        <Fragment>
            <section
                id="hero"
                className="relative overflow-hidden bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-500 py-24 text-white"
            >
                <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="relative z-10 container mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                            Kategori Program
                        </span>
                        <h1 className="mt-6 text-4xl font-black md:text-6xl">
                            Program Inovasi Pemberdayaan
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-emerald-50">
                            Berbagai program pemberdayaan dirancang untuk
                            menciptakan masyarakat yang mandiri, produktif, dan
                            berkelanjutan melalui pendekatan inovatif dan
                            kolaboratif.
                        </p>
                    </div>
                </div>
            </section>
            <section className="relative bg-slate-50 py-24">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="mb-14 text-center">
                        <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-600">
                            Program
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                            Kategori Program
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                            Setiap program dirancang untuk menjawab kebutuhan
                            masyarakat dan menciptakan dampak yang berkelanjutan
                            melalui pendekatan yang terukur dan terarah.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {categories?.map((item: any, i: number) => (
                            <CategoryItemSection
                                key={i}
                                item={item}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
