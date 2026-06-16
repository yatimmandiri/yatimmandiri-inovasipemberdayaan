import { BeritaSection } from '@/components/sections/home/berita-section';
import { BlogSection } from '@/components/sections/home/blog-section';
import { Fragment } from 'react';

export default function BeritaPage() {
    return (
        <Fragment>
            <section className="bg-slate-950 py-24 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300">
                        Program Pemberdayaan
                    </span>
                    <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-tight font-black md:text-6xl">
                        Berita & Artikel
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                        Ikuti perkembangan program, kegiatan, dan berbagai
                        cerita inspiratif dari Inovasi Pemberdayaan.
                    </p>
                </div>
            </section>
            <BeritaSection />
            <BlogSection />
        </Fragment>
    );
}
