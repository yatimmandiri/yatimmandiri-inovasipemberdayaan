import { Quote, Star } from 'lucide-react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ReviewSection = ({ data }: { data: any }) => {
    return (
        <section
            id="reviews"
            className="relative overflow-hidden bg-slate-50 py-20"
        >
            <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-orange-300/5 blur-3xl" />
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold text-orange-600">
                        Testimoni
                    </span>
                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Apa Kata Mereka
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                        Cerita nyata dari peserta, relawan, dan masyarakat yang
                        telah merasakan dampak langsung dari program
                        pemberdayaan.
                    </p>
                </div>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop
                    spaceBetween={20}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-14"
                >
                    {data.map((item: any, i: number) => (
                        <SwiperSlide key={i} className="h-auto">
                            <ReviewItemSection
                                name={item.name}
                                role={item.position || 'Penerima Manfaat'}
                                image={
                                    item.photo?.startsWith('http')
                                        ? item.photo
                                        : item.photo
                                          ? `/storage/${item.photo}`
                                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                item.name,
                                            )}&background=f97316&color=fff`
                                }
                                message={item.description}
                                rating={item.rating ?? 5}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export const ReviewItemSection = ({
    name,
    role,
    image,
    message,
    rating = 5,
}: {
    name: string;
    role: string;
    image: string;
    message: string;
    rating?: number;
}) => {
    return (
        <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
            <div className="flex items-start justify-between">
                <div className="flex gap-0.5 text-orange-400">
                    {Array.from({ length: 5 }).map((_, index) => {
                        const filled = index < rating;

                        return (
                            <Star
                                key={index}
                                className={`size-4 ${
                                    filled
                                        ? 'fill-orange-400'
                                        : 'text-slate-200'
                                }`}
                            />
                        );
                    })}
                </div>
                <Quote className="size-6 text-slate-200 transition group-hover:text-orange-200" />
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                “{message}”
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div className="min-w-0">
                    <h4 className="truncate text-sm font-semibold text-slate-900">
                        {name}
                    </h4>
                    <p className="truncate text-xs text-slate-500">{role}</p>
                </div>
            </div>
        </div>
    );
};
