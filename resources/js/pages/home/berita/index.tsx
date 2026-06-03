import { BeritaSection } from '@/components/sections/home/berita-section';
import { usePage } from '@inertiajs/react';

export default function BeritaPage() {
    const { news } = usePage<any>().props;

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-linear-to-r from-orange-500 to-orange-500/80 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                        Berita & Artikel
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-white/90">
                        Ikuti perkembangan program, kegiatan, dan berbagai
                        cerita inspiratif dari Inovasi Pemberdayaan.
                    </p>
                </div>
            </section>

            {/* News List */}
            <BeritaSection news={news} />
        </div>
    );
}
