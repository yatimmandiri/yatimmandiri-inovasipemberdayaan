import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const MitraSection = () => {
    const partners = [
        {
            name: 'Telkomsel',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
        {
            name: 'Google',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
        {
            name: 'Microsoft',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
        {
            name: 'Amazon Web Services',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
        {
            name: 'Shopee',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
        {
            name: 'Tokopedia',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
        {
            name: 'Tokopedia',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
        {
            name: 'Tokopedia',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
        {
            name: 'Tokopedia',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
        {
            name: 'Tokopedia',
            logo: 'https://img.maxsi.id/assets/logo-telkomsel-baru.DYhv_uL8_Zecqio.webp',
        },
    ];

    return (
        <section className="bg-slate-50 py-20">
            <div className="relative container mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                        Mitra & Kolaborator
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-slate-900">
                        Bersama Membangun Dampak yang Lebih Luas
                    </h2>

                    <p className="mt-4 text-lg text-slate-600">
                        Kolaborasi dengan berbagai perusahaan, komunitas,
                        institusi pendidikan, dan organisasi untuk menciptakan
                        inovasi pemberdayaan yang berkelanjutan.
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    speed={4000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
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
                    {partners.map((item) => (
                        <SwiperSlide key={item.name}>
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
        <div className="flex h-32 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
                src={item.logo}
                alt={item.name}
                className="max-h-14 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
            />
        </div>
    );
};
