import SROISection from '@/components/sections/home/sroi-section';
import { getStorageUrl } from '@/utils/copyText';
import { usePage } from '@inertiajs/react';
import { ArrowRight, Link, MapPin } from 'lucide-react';
import { Fragment } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ProgramDetailPage() {
    const { program, relatedPrograms } = usePage<any>().props;

    const benefits = program?.benefits
        ? program.benefits.split(';').filter(Boolean)
        : [];

    return (
        <Fragment>
            <section
                id="hero"
                className="relative min-h-187.5 overflow-hidden"
            >
                <img
                    src={getStorageUrl(program.featured_image)}
                    alt={program.name}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.25),transparent_35%)]" />

                <div className="relative z-10 flex min-h-[750px] items-center">
                    <div className="container mx-auto max-w-7xl px-6">
                        <div className="max-w-4xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                                {program.category?.name || 'Program'}
                            </span>

                            <h1 className="mt-6 text-5xl leading-tight font-black text-white md:text-7xl">
                                {program.name}
                            </h1>

                            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
                                {program.excerpt ||
                                    'Program pemberdayaan yang dirancang untuk menciptakan dampak berkelanjutan bagi masyarakat.'}
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <a
                                    href="#detail-program"
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

                            <div className="mt-12 flex flex-wrap gap-6">
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur">
                                    <div className="text-2xl font-bold text-white">
                                        {benefits.length}
                                    </div>
                                    <div className="text-sm text-slate-300">
                                        Aktivitas Program
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur">
                                    <div className="text-2xl font-bold text-white">
                                        {program.locations?.length || 0}
                                    </div>
                                    <div className="text-sm text-slate-300">
                                        Lokasi Program
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="detail-program" className="bg-slate-50 py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
                        {/* Content */}
                        <article className="rounded-3xl bg-white p-8 shadow-sm lg:p-10">
                            <span className="text-sm font-semibold tracking-wider text-emerald-600 uppercase">
                                Tentang Program
                            </span>

                            <h2 className="mt-4 text-3xl font-black text-slate-950 lg:text-4xl">
                                {program.name}
                            </h2>

                            <div className="mt-6 h-1 w-20 rounded-full bg-emerald-600" />

                            <div
                                className="prose prose-lg mt-8 max-w-none prose-slate"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        program.description || program.excerpt,
                                }}
                            />

                            {benefits.length > 0 && (
                                <div className="mt-12">
                                    <span className="text-sm font-semibold tracking-wider text-emerald-600 uppercase">
                                        Kegiatan Utama
                                    </span>

                                    <h3 className="mt-3 text-2xl font-bold text-slate-900">
                                        Aktivitas Program
                                    </h3>

                                    <p className="mt-2 text-slate-600">
                                        Berbagai kegiatan yang dilaksanakan
                                        untuk mencapai tujuan program.
                                    </p>

                                    <div className="mt-8 space-y-4">
                                        {benefits.map(
                                            (
                                                benefit: string,
                                                index: number,
                                            ) => (
                                                <div
                                                    key={benefit}
                                                    className="flex items-start gap-4 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-5"
                                                >
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                                                        {String(
                                                            index + 1,
                                                        ).padStart(2, '0')}
                                                    </div>

                                                    <p className="pt-2 font-medium text-slate-700">
                                                        {benefit}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* Sidebar */}
                        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
                            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white">
                                    <h3 className="text-xl font-black">
                                        Lokasi Program
                                    </h3>

                                    <p className="mt-2 text-sm text-emerald-50">
                                        Area pelaksanaan dan pendampingan
                                        program.
                                    </p>
                                </div>

                                <div className="p-6">
                                    {program.locations?.length ? (
                                        <div className="space-y-4">
                                            {program.locations.map(
                                                (location: any) => (
                                                    <div
                                                        key={location.id}
                                                        className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                                                    >
                                                        <MapPin className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />

                                                        <div>
                                                            <p className="font-semibold text-slate-900">
                                                                {location.pic}
                                                            </p>

                                                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                                                {
                                                                    location.address
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                                            Informasi lokasi program akan
                                            diperbarui oleh admin.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-3xl bg-slate-950 p-6 text-white">
                                <h3 className="font-bold">
                                    Tertarik Berkolaborasi?
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                                    Mari bersama menghadirkan program
                                    pemberdayaan yang memberikan dampak
                                    berkelanjutan bagi masyarakat.
                                </p>

                                <a
                                    href="/kontak"
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    Hubungi Kami
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <SROISection />

            {relatedPrograms?.length > 0 && (
                <section className="bg-slate-50 py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <span className="text-sm font-semibold tracking-wider text-emerald-600 uppercase">
                                    Program Lainnya
                                </span>

                                <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
                                    Program Terkait
                                </h2>

                                <p className="mt-3 max-w-2xl text-slate-600">
                                    Temukan program lain yang memiliki tujuan
                                    dan dampak pemberdayaan yang serupa.
                                </p>
                            </div>
                        </div>

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={24}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.1,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            className="!pb-14"
                        >
                            {relatedPrograms.map((item: any) => (
                                <SwiperSlide key={item.id}>
                                    <Link
                                        href={`/program/${item.slug}`}
                                        className="group block overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={getStorageUrl(
                                                    item.featured_image,
                                                )}
                                                alt={item.name}
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                                {item.category?.name}
                                            </span>

                                            <h3 className="mt-4 line-clamp-2 text-xl font-black text-slate-950">
                                                {item.name}
                                            </h3>

                                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                                                {item.excerpt ||
                                                    item.description?.replace(
                                                        /<[^>]+>/g,
                                                        '',
                                                    )}
                                            </p>

                                            <div className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-600">
                                                Lihat Detail
                                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            )}
        </Fragment>
    );
}
