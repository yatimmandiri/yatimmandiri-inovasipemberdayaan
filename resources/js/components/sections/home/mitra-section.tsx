import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const MitraSection = ({ data }: { data: any }) => {
    return (
        <section className="bg-slate-50 py-24">
            <div className="relative container mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
                        Mitra & Kolaborator
                    </span>
                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        Bersama Membangun
                        <b className="block text-orange-500">
                            Dampak yang Lebih Luas
                        </b>
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-slate-600">
                        Kolaborasi dengan perusahaan, komunitas, institusi
                        pendidikan, dan organisasi untuk menghadirkan inovasi
                        pemberdayaan yang berkelanjutan.
                    </p>
                </div>
                <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-linear-to-r from-slate-50 to-transparent" />
                <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-slate-50 to-transparent" />
                <Swiper
                    modules={[Autoplay]}
                    loop
                    speed={5000}
                    allowTouchMove={false}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 24,
                        },
                    }}
                >
                    {data?.map((item: any, i: number) => (
                        <SwiperSlide key={i}>
                            <MitraItemSection item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export const MitraItemSection = ({ item }: { item: any }) => {
    return (
        <div className="group flex h-32 items-center justify-center rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
            <img
                src={
                    item.logo
                        ? `/storage/${item.logo}`
                        : 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp'
                }
                alt={item.name}
                loading="lazy"
                className="max-h-14 w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
            />
        </div>
    );
};
