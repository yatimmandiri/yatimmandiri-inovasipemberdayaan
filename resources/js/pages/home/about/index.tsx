import { CallToActionSection } from '@/components/sections/home/call-to-action-section';
import {
    NilaiNilaiSection,
    SejarahSection,
    TimelineSection,
    TujuanSection,
    VisiMisiSection,
} from '@/components/sections/home/sejarah-section';
import { Fragment } from 'react';

export default function AboutPage() {
    return (
        <Fragment>
            <section className="bg-emerald-700 py-32 text-white">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <p className="mb-4 text-sm font-medium tracking-[0.3em] text-emerald-200 uppercase">
                        Tentang Kami
                    </p>

                    <h1 className="text-5xl leading-tight font-bold md:text-6xl">
                        Memberdayakan Potensi,
                        <br />
                        Membangun Masa Depan
                    </h1>

                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-emerald-100">
                        Bersama masyarakat, kami menghadirkan inovasi dan
                        program berkelanjutan yang memberikan manfaat nyata
                        serta menciptakan perubahan yang lebih baik.
                    </p>
                </div>
            </section>
            <SejarahSection />
            <TujuanSection />
            <VisiMisiSection />
            <TimelineSection />
            <NilaiNilaiSection />
            <CallToActionSection />
        </Fragment>
    );
}
