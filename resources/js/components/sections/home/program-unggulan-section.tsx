import {
    ArrowRight,
    Briefcase,
    Building2,
    MapPinned,
    Sprout,
} from 'lucide-react';
import { createElement } from 'react';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ProgramUnggulanSection = () => {
    const programs = [
        {
            title: 'BISA',
            icon: Sprout,
            image: 'https://picsum.photos/1920/1080?random=10',
            description:
                'Program pemberdayaan masyarakat berbasis potensi lokal untuk meningkatkan kesejahteraan dan kemandirian ekonomi.',
            locations: '25 Lokasi',
            benefits: [
                'Pelatihan keterampilan',
                'Pendampingan usaha',
                'Penguatan komunitas',
            ],
        },
        {
            title: 'Kampung Mandiri',
            icon: Building2,
            image: 'https://picsum.photos/1920/1080?random=20',
            description:
                'Mendorong terciptanya kampung yang mandiri melalui pengembangan ekonomi, sosial, dan lingkungan.',
            locations: '18 Lokasi',
            benefits: [
                'Pemberdayaan masyarakat',
                'Pengembangan ekonomi lokal',
                'Pendampingan berkelanjutan',
            ],
        },
        {
            title: 'Desa Wisata',
            icon: MapPinned,
            image: 'https://picsum.photos/1920/1080?random=30',
            description:
                'Mengembangkan potensi wisata desa untuk meningkatkan pendapatan masyarakat dan membuka lapangan kerja baru.',
            locations: '12 Lokasi',
            benefits: [
                'Pengembangan destinasi',
                'Pelatihan SDM wisata',
                'Promosi digital',
            ],
        },
        {
            title: 'UMKM Bangkit',
            icon: Briefcase,
            image: 'https://picsum.photos/1920/1080?random=40',
            description:
                'Pendampingan UMKM agar mampu berkembang, naik kelas, dan memiliki daya saing yang lebih tinggi.',
            locations: '40 Lokasi',
            benefits: ['Pelatihan bisnis', 'Digital marketing', 'Akses pasar'],
        },
    ];

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
                    spaceBetween={10}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
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
                    className="program-swiper"
                >
                    {programs.map((item) => (
                        <SwiperSlide key={item.title}>
                            <ProgramUnggulanItemSection item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="mt-16 text-center">
                    <p className="mb-6 text-slate-600">
                        Bersama mitra dan masyarakat, kami terus mengembangkan
                        program-program yang memberikan dampak nyata dan
                        berkelanjutan.
                    </p>
                    <button
                        type="button"
                        className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                    >
                        Lihat Semua Program
                    </button>
                </div>
            </div>
        </section>
    );
};

export const ProgramUnggulanItemSection = ({ item }: { item: any }) => {
    return (
        <div className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-emerald-600 backdrop-blur">
                    {createElement(item.icon, {
                        className: 'h-7 w-7',
                    })}
                </div>
            </div>
            <div className="p-8">
                <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    {item.locations}
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                    {item.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    {item.description}
                </p>
                <ul className="mb-8 space-y-3">
                    {item.benefits.map((a: any) => (
                        <li
                            key={a}
                            className="flex items-center gap-3 text-sm text-slate-600"
                        >
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            {a}
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 font-medium text-emerald-600 transition-all hover:gap-3"
                >
                    Pelajari Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};
