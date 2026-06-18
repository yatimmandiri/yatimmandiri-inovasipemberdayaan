import { getStorageUrl } from '@/utils/copyText';
import { Link } from '@inertiajs/react';
import { ArrowRight, Package } from 'lucide-react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ProductPilihanSection = ({ data }: { data?: any[] }) => {
    return (
        <section className="bg-slate-50 py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            <Package size={16} />
                            Produk Unggulan
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
                            Produk Pilihan
                        </h2>

                        <p className="mt-4 max-w-2xl text-slate-600">
                            Produk terbaik hasil program pemberdayaan yang
                            memberikan manfaat ekonomi bagi masyarakat dan
                            penerima manfaat.
                        </p>
                    </div>

                    <Link
                        href={`/products`}
                        className="inline-flex items-center gap-2 font-medium text-primary hover:gap-3"
                    >
                        Lihat Semua Produk
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {data?.map((item) => (
                        <SwiperSlide key={item.id}></SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export const ProductItemSection = ({ item }: { item: any }) => {
    return (
        <a
            href={item.link}
            target="_blank"
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl"
        >
            <div className="relative overflow-hidden">
                <img
                    src={getStorageUrl(item.featured_image)}
                    alt={item.name}
                    className="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                {item.program?.name && (
                    <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                            {item.program.name}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
                    {item.name}
                </h3>
                <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <div>
                            <p className="text-xs text-slate-500">
                                Harga Mulai
                            </p>

                            <p className="text-xl font-bold text-primary">
                                Rp{' '}
                                {Number(item.price || 0).toLocaleString(
                                    'id-ID',
                                )}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                            <ArrowRight size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};
