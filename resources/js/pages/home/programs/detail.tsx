import { GallerySection } from '@/components/sections/home/gallery-section';
import { LocationSection } from '@/components/sections/home/location-section';
import { ProductPilihanSection } from '@/components/sections/home/product-section';
import { SROISection } from '@/components/sections/home/sroi-section';
import { getStorageUrl } from '@/utils/copyText';
import { usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import { Fragment } from 'react';

export default function ProgramDetailPage() {
    const { program, relatedPrograms } = usePage<any>().props;

    const activities = program?.activities
        ? program.activities.split(';').filter(Boolean)
        : [];

    console.log(program);

    return (
        <Fragment>
            <section id="hero" className="relative min-h-165.5 overflow-hidden">
                <img
                    src={getStorageUrl(program.featured_image)}
                    alt={program.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.25),transparent_35%)]" />
                <div className="relative z-10 flex min-h-165.5 items-center">
                    <div className="container mx-auto max-w-7xl px-6">
                        <div className="max-w-4xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                                {program.category?.name || 'Program'}
                            </span>
                            <h1 className="mt-6 text-5xl leading-tight font-black text-white md:text-7xl">
                                {program.name}
                            </h1>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <a
                                    href="#tentang-program"
                                    className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    Pelajari Program
                                </a>
                                <a
                                    href="#lokasi-program"
                                    className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                                >
                                    Lihat Lokasi
                                </a>
                            </div>
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
                                {program.name}
                            </h2>
                            <div className="mt-6 h-1 w-20 rounded-full bg-emerald-600" />
                            <div className="description mt-8 max-w-none prose-slate">
                                {parse(program.description ?? '')}
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
            <LocationSection locations={program.locations} />
            <GallerySection />
            <ProductPilihanSection data={program.products} />
            <SROISection />
        </Fragment>
    );
}
