import { Quote, Star } from 'lucide-react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type TestimonialItemComponentProps = {
    name: string;
    role: string;
    image: string;
    message: string;
    rating?: number;
};

export const TestimonialItemComponent = ({
    name,
    role,
    image,
    message,
    rating = 5,
}: TestimonialItemComponentProps) => {
    return (
        <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            {/* Quote Icon */}
            <div className="absolute top-5 right-5 text-primary/10">
                <Quote size={64} strokeWidth={1.5} />
            </div>

            {/* Rating */}
            <div className="mb-5 flex items-center gap-1">
                {Array.from({ length: rating }).map((_, index) => (
                    <Star
                        key={index}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                    />
                ))}
            </div>

            {/* Message */}
            <p className="relative z-10 line-clamp-5 text-sm leading-relaxed text-slate-600 md:text-base">
                “{message}”
            </p>

            {/* User */}
            <div className="mt-6 flex items-center gap-4">
                <img
                    src={image}
                    alt={name}
                    className="h-14 w-14 rounded-full object-cover ring-4 ring-slate-100"
                />

                <div>
                    <h4 className="font-semibold text-slate-900">{name}</h4>

                    <p className="text-sm text-slate-500">{role}</p>
                </div>
            </div>
        </div>
    );
};

export const TestimonialSection = () => {
    const testimonials = [
        {
            name: 'Ahmad Fauzi',
            role: 'Peserta Program Digital',
            image: 'https://i.pravatar.cc/300?img=12',
            message:
                'Program ini benar-benar membantu saya memahami teknologi digital dan membuka peluang kerja baru.',
        },
        {
            name: 'Siti Rahma',
            role: 'Pelaku UMKM',
            image: 'https://i.pravatar.cc/300?img=32',
            message:
                'Berkat pelatihan dan pendampingan, usaha saya berkembang lebih cepat dan lebih dikenal secara online.',
        },
        {
            name: 'Budi Santoso',
            role: 'Relawan Sosial',
            image: 'https://i.pravatar.cc/300?img=15',
            message:
                'Kolaborasi yang luar biasa. Saya merasa bisa memberikan dampak nyata bagi masyarakat sekitar.',
        },
        {
            name: 'Nabila Putri',
            role: 'Mahasiswa Beasiswa',
            image: 'https://i.pravatar.cc/300?img=45',
            message:
                'Bantuan pendidikan dan mentoring membuat saya lebih percaya diri untuk meraih cita-cita.',
        },
    ];

    return (
        <section className="relative overflow-hidden bg-slate-50 py-20">
            {/* Background */}
            <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        Testimoni
                    </span>

                    <h2 className="mt-5 text-3xl font-black text-slate-900 md:text-5xl">
                        Apa Kata Mereka?
                    </h2>

                    <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                        Cerita nyata dari peserta, relawan, dan masyarakat yang
                        telah merasakan manfaat program pemberdayaan.
                    </p>
                </div>

                {/* Slider */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={10}
                    loop
                    autoplay={{
                        delay: 4000,
                    }}
                    slidesPerView={3}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1280: {
                            slidesPerView: 3,
                        },
                    }}
                    className="testimonial-swiper pb-14!"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index} className="h-auto">
                            <TestimonialItemComponent
                                name={item.name}
                                role={item.role}
                                image={item.image}
                                message={item.message}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
