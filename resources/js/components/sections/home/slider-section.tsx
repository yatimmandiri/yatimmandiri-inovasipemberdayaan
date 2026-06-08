import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type SliderItemSectionProps = {
    item: any;
    index: number;
};

export const SliderItemSection = ({ item, index }: SliderItemSectionProps) => {
    return (
        <div className="relative min-h-162.5 overflow-hidden sm:min-h-180 lg:h-195">
            s{' '}
            <img
                src={
                    item.featured_image
                        ? `/storage/${item.featured_image}`
                        : `https://picsum.photos/1920/1080?random=${index}`
                }
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30" />
            <div className="absolute top-0 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative z-10 flex min-h-162.5 items-center sm:min-h-180 lg:h-195">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl text-white">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:mb-6 sm:px-5 sm:text-sm">
                            <span className="h-2 w-2 rounded-full bg-green-400" />
                            Inovasi & Pemberdayaan
                        </div>
                        <h1 className="text-3xl leading-tight font-black sm:text-5xl md:text-6xl lg:text-7xl">
                            {item.title}
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-200 sm:mt-6 sm:text-base md:text-lg lg:text-xl">
                            {item.subtitle}
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                            <Link href={item.url ?? '#'}>
                                <button className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-gray-100 sm:w-auto sm:px-6 sm:py-4 sm:text-base">
                                    <span>Pelajari Selengkapnya</span>
                                    <ArrowRight
                                        size={18}
                                        className="transition group-hover:translate-x-1"
                                    />
                                </button>
                            </Link>
                            <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:w-auto sm:px-6 sm:py-4 sm:text-base">
                                <PlayCircle size={20} />
                                Video Program
                            </button>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                                <h3 className="text-2xl font-bold sm:text-3xl">
                                    10K+
                                </h3>

                                <p className="mt-1 text-xs text-gray-200 sm:text-sm">
                                    Penerima Manfaat
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                                <h3 className="text-2xl font-bold sm:text-3xl">
                                    {item.category?.programs?.length}
                                </h3>

                                <p className="mt-1 text-xs text-gray-200 sm:text-sm">
                                    Program Aktif
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                                <h3 className="text-2xl font-bold sm:text-3xl">
                                    34
                                </h3>

                                <p className="mt-1 text-xs text-gray-200 sm:text-sm">
                                    Kota Kolaborasi
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                                <h3 className="text-2xl font-bold sm:text-3xl">
                                    500+
                                </h3>

                                <p className="mt-1 text-xs text-gray-200 sm:text-sm">
                                    Relawan Aktif
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SliderSection = () => {
    const { sliders } = usePage<any>().props;

    return (
        <section className="relative overflow-hidden">
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                effect="fade"
                loop
                speed={1000}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                className="hero-swiper"
            >
                {sliders.map((item: any, i: number) => (
                    <SwiperSlide key={i}>
                        <SliderItemSection item={item} index={i} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
