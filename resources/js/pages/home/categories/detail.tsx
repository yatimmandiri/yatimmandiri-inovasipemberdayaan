import { usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import { Quote } from 'lucide-react';
import { Fragment } from 'react';

export default function DetailCategoriesPage() {
    const { category } = usePage<any>().props;

    const benefits = category?.benefits ? category.benefits.split('; ') : [];

    return (
        <Fragment>
            <section className="relative h-137.5 overflow-hidden">
                <img
                    src={category.featured_image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/40" />
                <div className="relative z-10 flex h-full items-center">
                    <div className="container mx-auto max-w-7xl px-6">
                        <div className="max-w-3xl text-white">
                            <span className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
                                Program Pemberdayaan
                            </span>
                            <h1 className="text-5xl font-black">
                                {category.name}
                            </h1>
                            <p className="mt-6 text-lg text-white/90">
                                {category.tagline}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TENTANG PROGRAM */}
            <section className="bg-slate-50 py-20">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <span className="text-sm font-semibold tracking-wider text-emerald-600 uppercase">
                                Tentang Program
                            </span>
                            <h2 className="mt-3 text-4xl font-bold">
                                {category.name}
                            </h2>
                            <div className="mt-6 leading-relaxed text-slate-600">
                                {parse(category.description)}
                            </div>
                        </div>
                        <div className="">Video</div>
                    </div>
                </div>
            </section>

            {/* PROGRAM */}
            <section className="bg-slate-50 py-20">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-bold">Program Terkait</h2>

                        <p className="mt-3 text-slate-600">
                            Berbagai inisiatif yang dijalankan dalam kategori
                            ini.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-3xl bg-white shadow-sm"
                            >
                                <div className="h-56 bg-slate-200" />

                                <div className="p-6">
                                    <h3 className="font-bold">Nama Program</h3>

                                    <p className="mt-3 text-sm text-slate-600">
                                        Deskripsi singkat program pemberdayaan.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONI */}
            <section className="py-20">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-bold">
                            Testimoni Penerima Manfaat
                        </h2>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="rounded-3xl border border-slate-200 p-8"
                            >
                                <Quote className="mb-4 text-emerald-600" />

                                <p className="text-slate-600">
                                    Program ini memberikan dampak positif dan
                                    membantu meningkatkan kesejahteraan keluarga
                                    kami.
                                </p>

                                <div className="mt-6">
                                    <h4 className="font-semibold">Ahmad</h4>

                                    <span className="text-sm text-slate-500">
                                        Penerima Manfaat
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
