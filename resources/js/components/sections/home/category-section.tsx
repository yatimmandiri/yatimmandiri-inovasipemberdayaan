import { ArrowRight, Building2 } from 'lucide-react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const CategorySection = ({ data }: { data: any[] }) => {
    const items = Array.isArray(data) ? data : [];

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
                    {items.map((item, index) => (
                        <SwiperSlide key={item.id || index}>
                            <ProgramItemSection item={item} index={index} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {items.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                        <p className="text-lg font-bold text-slate-900">
                            Belum ada program unggulan
                        </p>
                        <p className="mt-2 text-slate-600">
                            Tandai program sebagai recommended dari dashboard
                            admin untuk menampilkannya di sini.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

const ProgramItemSection = ({ item, index }: { item: any; index: number }) => {
    const benefits = item.benefits ? item.benefits.split(';').slice(0, 3) : [];

    return (
        <a
            href={`/program/${item.slug}`}
            className="group flex h-full min-h-140 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="relative h-56 overflow-hidden">
                <img
                    src={getImage(item.featured_image, index)}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" />

                <div className="absolute top-5 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90">
                    <Building2 className="h-7 w-7 text-emerald-600" />
                </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {item.category?.name || 'Program'}
                </span>
                <h3 className="mt-4 text-2xl font-black text-slate-950">
                    {item.name}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {item.excerpt || item.description}
                </p>
                <ul className="mt-5 space-y-2">
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
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-emerald-600 transition group-hover:gap-3">
                    Pelajari Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                </span>
            </div>
        </a>
    );
};

const getImage = (path: string | null | undefined, index: number) => {
    if (!path) {
        return `https://picsum.photos/1000/720?random=${index + 40}`;
    }

    return path.startsWith('http') || path.startsWith('/')
        ? path
        : `/storage/${path}`;
};
