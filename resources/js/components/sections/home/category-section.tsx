import { getStorageUrl } from '@/utils/copyText';
import { Link } from '@inertiajs/react';
import { ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const CategorySection = ({ data }: { data: any }) => {
    return (
        <section
            id="category"
            className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white py-24"
        >
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mb-4 flex justify-center">
                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Kategori Program
                    </span>
                </div>
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        Kategori Program Pemberdayaan
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-slate-600">
                        Berbagai kategori program pemberdayaan yang dirancang
                        untuk meningkatkan kualitas hidup masyarakat melalui
                        penguatan ekonomi, pendidikan, sosial, lingkungan, dan
                        pengembangan potensi lokal.
                    </p>
                </div>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={10}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 1.2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1280: {
                            slidesPerView: 3,
                        },
                    }}
                    className="pb-14!"
                >
                    {data?.map((item: any, i: number) => (
                        <SwiperSlide key={i}>
                            <CategoryItemSection item={item} index={i} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export const CategoryItemSection = ({
    item,
    index,
}: {
    item: any;
    index: number;
}) => {
    const benefits = item.benefits
        ? item.benefits.split(';').filter(Boolean)
        : [];

    return (
        <Link href={`/categories/${item.slug}`} className="group block h-full">
            <div className="flex h-full min-h-155 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={getStorageUrl(item.featured_image, index)}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-5 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 shadow-lg">
                        <Building2 className="h-7 w-7 text-emerald-600" />
                    </div>
                    <div className="absolute right-5 bottom-5">
                        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                            {item.programs.length} Program
                        </span>
                    </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                    <div className="flex flex-col space-y-2">
                        <h3 className="mt-4 text-2xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                            {item.name}
                        </h3>
                        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                            {item.excerpt || item.description}
                        </p>
                    </div>
                    {benefits.length > 0 && (
                        <ul className="mt-6 space-y-3">
                            {benefits.map((benefit: string, idx: number) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                    <span className="text-sm text-slate-600">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="mt-auto pt-8">
                        <div className="inline-flex items-center gap-2 font-semibold text-emerald-600 transition-all group-hover:gap-3">
                            Pelajari Selengkapnya
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
