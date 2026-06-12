import { getStorageUrl } from '@/utils/copyText';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const SliderSection = ({ data }: { data: any }) => {
    return (
        <section className="relative overflow-hidden">
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                effect="fade"
                loop
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                className="hero-swiper"
            >
                {data?.map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                        <SliderItemSection item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export const SliderItemSection = ({ item }: { item: any }) => {
    return (
        <div className="relative min-h-162.5 overflow-hidden sm:min-h-180 lg:h-195">
            <img
                src={getStorageUrl(item.featured_image, item.id)}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30" />
            <div className="absolute top-0 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative z-10 flex min-h-162.5 items-center sm:min-h-180 lg:h-195">
                <div className="mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 md:mt-0 lg:px-8">
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
                            <Link
                                href={item.url || '/programs'}
                                className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 text-base font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-gray-100 sm:w-auto"
                            >
                                <span>Pelajari Selengkapnya</span>
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>
                        </div>

                        {/* Statistik */}
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
                                    {item.category.programs?.length || 0}
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
                                    Produk UMKM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
