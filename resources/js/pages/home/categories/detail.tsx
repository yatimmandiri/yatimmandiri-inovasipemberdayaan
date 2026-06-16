import { usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import { Fragment } from 'react';

export default function DetailCategoriesPage() {
    const { category } = usePage<any>().props;

    const activities = category?.benefits
        ? category.benefits
              .split(';')
              .map((item: string) => item.trim())
              .filter(Boolean)
        : [];

    return (
        <Fragment>
            <section className="relative min-h-96 overflow-hidden">
                <img
                    src={category.featured_image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.25),transparent_30%)]" />
                <div className="relative z-10 flex min-h-96 items-center">
                    <div className="container mx-auto max-w-7xl px-6">
                        <div className="max-w-4xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                                Program Pemberdayaan
                            </span>
                            <h1 className="mt-6 text-4xl font-black text-white md:text-6xl">
                                {category.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="tentang-program"
                className="bg-slate-50 py-20 lg:py-24"
            >
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px]">
                        <div className="rounded-3xl bg-white p-8 shadow-sm lg:p-10">
                            <span className="text-sm font-semibold tracking-wider text-emerald-600 uppercase">
                                Tentang Program
                            </span>
                            <h2 className="mt-4 text-3xl font-bold text-slate-900 lg:text-4xl">
                                {category.name}
                            </h2>
                            <div className="mt-6 h-1 w-20 rounded-full bg-emerald-600" />
                            <div className="prose prose-lg mt-8 max-w-none prose-slate">
                                {parse(category.description ?? '')}
                            </div>
                        </div>
                        <div className="h-fit rounded-3xl bg-white p-8 shadow-sm lg:sticky lg:top-24">
                            <span className="text-sm font-semibold tracking-wider text-emerald-600 uppercase">
                                Kegiatan Utama
                            </span>
                            <h3 className="mt-3 text-2xl font-bold text-slate-900">
                                Aktivitas dalam Program
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                Program ini dijalankan melalui berbagai kegiatan
                                yang dirancang untuk memberikan manfaat dan
                                dampak yang berkelanjutan.
                            </p>
                            <div className="mt-8 space-y-4">
                                {activities.map(
                                    (item: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-5 transition-all duration-200 hover:bg-emerald-100/50"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white shadow-sm">
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </div>
                                            <p className="pt-2 leading-relaxed font-medium text-slate-700">
                                                {item}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
