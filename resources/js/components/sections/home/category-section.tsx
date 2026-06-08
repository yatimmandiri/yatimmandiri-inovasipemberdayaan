import { ArrowRight, Building2 } from 'lucide-react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const CategorySection = ({ data }: { data: any[] }) => {
    return (
        <section
            id="program"
            className="relative overflow-hidden bg-slate-50 py-24"
        >
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mb-4 flex justify-center">
                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Program Unggulan
                    </span>
                </div>
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        Program Pemberdayaan Berkelanjutan
                    </h2>

                    <p className="mt-5 text-lg leading-relaxed text-slate-600">
                        Berbagai program yang dirancang untuk menciptakan
                        masyarakat yang mandiri, produktif, dan berdaya saing
                        melalui pendekatan yang berkelanjutan.
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
                    className="program-swiper pb-14!"
                >
                    {data?.map((item, index) => (
                        <SwiperSlide key={item.id || index}>
                            <CategoryItemSection item={item} index={index} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

const CategoryItemSection = ({ item, index }: { item: any; index: number }) => {
    const benefits = item.benefits ? item.benefits.split(';').slice(0, 3) : [];

    return (
        <div className="group flex h-full min-h-155 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={
                        item.featured_image ||
                        `https://picsum.photos/1000/720?random=${index}`
                    }
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 backdrop-blur">
                    <Building2 className="h-7 w-7 text-emerald-600" />
                </div>
            </div>
            <div className="flex flex-1 flex-col p-8">
                <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {item.programs?.length || 0} Program
                    </span>
                </div>
                <h3 className="mb-4 line-clamp-2 text-2xl font-bold text-slate-900">
                    {item.name}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {item.description}
                </p>
                <ul className="mt-6 space-y-3">
                    {benefits.map((benefit: string) => (
                        <li
                            key={benefit}
                            className="flex items-start gap-3 text-sm text-slate-600"
                        >
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto pt-8">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 font-medium text-emerald-600 transition-all hover:gap-3"
                    >
                        Pelajari Selengkapnya
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
