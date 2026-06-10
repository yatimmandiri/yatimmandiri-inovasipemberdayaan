import { Quote, Star } from 'lucide-react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type TestimonialItemProps = {
    name: string;
    role: string;
    image: string;
    message: string;
    rating?: number;
};

export const TestimonialSection = ({ data }: { data: any }) => {
    return (
        <section
            id="testimonials"
            className="relative overflow-hidden bg-slate-50 py-16"
        >
            <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-orange-300/5 blur-3xl" />

            <div className="relative container mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                        Testimoni
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Apa Kata Mereka?
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                        Cerita nyata dari peserta, relawan, dan masyarakat yang
                        telah merasakan manfaat program pemberdayaan.
                    </p>
                </div>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop
                    spaceBetween={16}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="pb-10"
                >
                    {data.map((item: any, i: number) => (
                        <SwiperSlide key={i} className="h-auto">
                            <TestimonialItem
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

export const TestimonialItem = ({
    name,
    role,
    image,
    message,
    rating = 5,
}: TestimonialItemProps) => {
    return (
        <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-1">
                    {Array.from({ length: rating }).map((_, index) => (
                        <Star
                            key={index}
                            className="size-4 fill-yellow-400 text-yellow-400"
                        />
                    ))}
                </div>
                <Quote className="size-8 text-orange-100" />
            </div>
            <p className="flex-1 text-sm leading-relaxed text-slate-600">
                "{message}"
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div className="flex flex-col space-y-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                        {name}
                    </h4>
                    <p className="text-xs text-slate-500">{role}</p>
                </div>
            </div>
        </div>
    );
};
