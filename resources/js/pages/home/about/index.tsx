import { CallToActionSection } from '@/components/sections/home/call-to-action-section';
import {
    NilaiNilaiSection,
    ProfileSection,
    TimelineSection,
    TujuanSection,
    VisiMisiSection,
} from '@/components/sections/home/sejarah-section';
import { Fragment } from 'react';

export default function AboutPage() {
    return (
        <Fragment>
            <section className="relative overflow-hidden bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-500 py-28 text-white">
                <div className="absolute inset-0">
                    <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                </div>
                <div className="relative container mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mt-8 text-5xl font-bold md:text-7xl">
                            Membangun
                            <b className="block text-emerald-200">
                                Kemandirian Masyarakat
                            </b>
                        </h1>
                        <p className="mt-8 text-lg leading-relaxed text-emerald-50 md:text-xl">
                            Mengembangkan potensi masyarakat melalui program
                            ekonomi, pendidikan, sosial, dan lingkungan yang
                            berkelanjutan.
                        </p>
                    </div>
                </div>
            </section>
            <ProfileSection />
            <TujuanSection />
            <TimelineSection />
            <VisiMisiSection />
            <NilaiNilaiSection />
            <CallToActionSection />
        </Fragment>
    );
}
