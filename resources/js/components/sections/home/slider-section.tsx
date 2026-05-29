import { ArrowRight, PlayCircle } from 'lucide-react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

type SliderItemSectionProps = {
    title: string;
    image: string;
    description: string;
    buttonText: string;
};

export const SliderItemSection = ({
    title,
    image,
    description,
    buttonText,
}: SliderItemSectionProps) => {
    return (
        <div className="relative min-h-162.5 overflow-hidden sm:min-h-180 lg:h-195">
            {/* Background */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30" />

            {/* Blur Decoration */}
            <div className="absolute top-0 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 flex min-h-162.5 items-center sm:min-h-180 lg:h-195">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl text-white">
                        {/* Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:mb-6 sm:px-5 sm:text-sm">
                            <span className="h-2 w-2 rounded-full bg-green-400" />
                            Inovasi & Pemberdayaan
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl leading-tight font-black sm:text-5xl md:text-6xl lg:text-7xl">
                            {title}
                        </h1>

                        {/* Description */}
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-200 sm:mt-6 sm:text-base md:text-lg lg:text-xl">
                            {description}
                        </p>

                        {/* Button */}
                        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                            <button className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-gray-100 sm:w-auto sm:px-6 sm:py-4 sm:text-base">
                                {buttonText}

                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            </button>

                            <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:w-auto sm:px-6 sm:py-4 sm:text-base">
                                <PlayCircle size={20} />
                                Video Program
                            </button>
                        </div>

                        {/* Stats */}
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
                                    120+
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
    const items = [
        {
            title: 'Inovasi untuk Pemberdayaan Umat',
            image: 'https://picsum.photos/1920/1080?random=11',
            description:
                'Menghadirkan solusi digital, pendidikan, dan sosial untuk menciptakan dampak nyata bagi masyarakat.',
            buttonText: 'Lihat Program',
        },
        {
            title: 'Membangun Kemandirian Bersama',
            image: 'https://picsum.photos/1920/1080?random=12',
            description:
                'Program pemberdayaan ekonomi dan pelatihan untuk mendukung masyarakat menjadi lebih mandiri.',
            buttonText: 'Pelajari Selengkapnya',
        },
        {
            title: 'Teknologi untuk Kebaikan',
            image: 'https://picsum.photos/1920/1080?random=13',
            description:
                'Memanfaatkan teknologi dan inovasi untuk memperluas manfaat pendidikan, donasi, dan layanan sosial.',
            buttonText: 'Mulai Sekarang',
        },
        {
            title: 'Kolaborasi Menciptakan Perubahan',
            image: 'https://picsum.photos/1920/1080?random=14',
            description:
                'Bersama komunitas, relawan, dan mitra untuk menghadirkan perubahan yang berkelanjutan.',
            buttonText: 'Gabung Bersama Kami',
        },
    ];

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
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <SliderItemSection
                            title={item.title}
                            image={item.image}
                            description={item.description}
                            buttonText={item.buttonText}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
