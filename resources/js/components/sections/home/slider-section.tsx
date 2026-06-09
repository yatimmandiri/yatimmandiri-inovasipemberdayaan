import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type SliderItemSectionProps = {
    item: any;
    index: number;
    stats: HeroStats;
    onPlayVideo: (item: any) => void;
};

type HeroStats = {
    beneficiaries?: number;
    activePrograms?: number;
    collaborationCities?: number;
    activeVolunteers?: number;
};

export const SliderItemSection = ({
    item,
    index,
    stats,
    onPlayVideo,
}: SliderItemSectionProps) => {
    const featuredImage = getStorageImage(
        item.featured_image,
        `https://picsum.photos/1920/1080?random=${index + 11}`,
    );
    const hasVideo = Boolean(getVideoEmbedUrl(item.video_url));

    return (
        <div className="relative min-h-162.5 overflow-hidden sm:min-h-180 lg:h-195">
            <img
                src={featuredImage}
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
                            <Link
                                href={item.url || '/program'}
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-gray-100 sm:w-auto sm:px-6 sm:py-4 sm:text-base"
                            >
                                <span>Pelajari Selengkapnya</span>
                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={() => onPlayVideo(item)}
                                disabled={!hasVideo}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-6 sm:py-4 sm:text-base"
                            >
                                <PlayCircle size={20} />
                                Video Program
                            </button>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
                            {getHeroStats(stats).map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                                >
                                    <h3 className="text-2xl font-bold sm:text-3xl">
                                        {formatStatNumber(stat.value)}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-200 sm:text-sm">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SliderSection = () => {
    const { sliders, heroStats } = usePage<any>().props;
    const [selectedSlider, setSelectedSlider] = useState<any | null>(null);
    const sliderItems =
        Array.isArray(sliders) && sliders.length > 0
            ? sliders
            : [
                  {
                      title: 'Inovasi untuk Pemberdayaan Umat',
                      subtitle:
                          'Menghadirkan solusi digital, pendidikan, dan sosial untuk menciptakan dampak nyata bagi masyarakat.',
                      url: '/program',
                      video_url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
                  },
              ];

    const selectedVideoUrl = selectedSlider
        ? getVideoEmbedUrl(selectedSlider.video_url)
        : null;

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
                {sliderItems.map((item: any, i: number) => (
                    <SwiperSlide key={i}>
                        <SliderItemSection
                            item={item}
                            index={i}
                            stats={heroStats ?? {}}
                            onPlayVideo={setSelectedSlider}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Dialog
                open={Boolean(selectedVideoUrl)}
                onOpenChange={(open) => !open && setSelectedSlider(null)}
            >
                <DialogContent className="border-white/10 bg-slate-950 p-0 text-white shadow-2xl sm:max-w-4xl">
                    {selectedSlider && selectedVideoUrl && (
                        <div className="overflow-hidden rounded-lg">
                            <DialogHeader className="px-5 pt-5 pb-4 text-left sm:px-6">
                                <DialogTitle className="text-xl font-black text-white sm:text-2xl">
                                    {selectedSlider.title}
                                </DialogTitle>
                                <DialogDescription className="text-sm leading-relaxed text-white/70">
                                    {selectedSlider.subtitle ||
                                        'Video program pemberdayaan.'}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="aspect-video w-full overflow-hidden rounded-b-2xl bg-black">
                                <iframe
                                    src={selectedVideoUrl}
                                    title={selectedSlider.title}
                                    className="h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};

const getHeroStats = (stats: HeroStats) => [
    {
        label: 'Penerima Manfaat',
        value: stats.beneficiaries ?? 0,
    },
    {
        label: 'Program Aktif',
        value: stats.activePrograms ?? 0,
    },
    {
        label: 'Kota Kolaborasi',
        value: stats.collaborationCities ?? 0,
    },
    {
        label: 'Relawan Aktif',
        value: stats.activeVolunteers ?? 0,
    },
];

const formatStatNumber = (value: number) => {
    if (value >= 1000) {
        const formatted = value / 1000;

        return `${Number.isInteger(formatted) ? formatted : formatted.toFixed(1)}K`;
    }

    return value.toLocaleString('id-ID');
};

const getStorageImage = (path: string | null | undefined, fallback: string) => {
    if (!path) {
        return fallback;
    }

    if (path.startsWith('http') || path.startsWith('/')) {
        return path;
    }

    return `/storage/${path}`;
};

const getVideoEmbedUrl = (url: string | null | undefined) => {
    if (!url) {
        return null;
    }

    if (url.includes('/embed/')) {
        return url;
    }

    const youtubeMatch = url.match(
        /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/,
    );

    if (youtubeMatch?.[1]) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1`;
    }

    return url;
};
