import { CallToActionSection } from '@/components/sections/home/call-to-action-section';
import { ContactSection } from '@/components/sections/home/contact-section';
import { Fragment } from 'react';

export default function ContactPage() {
    return (
        <Fragment>
            <section
                id="hero"
                className="bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-500 py-20 text-white"
            >
                <div className="container mx-auto max-w-7xl px-6 pt-8 text-center md:pt-8">
                    <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
                        Hubungi Kami
                    </span>
                    <h1 className="mt-5 text-4xl font-bold md:text-6xl">
                        Kontak Kami
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
                        Kami siap membantu dan menjawab pertanyaan Anda terkait
                        program, kerja sama, maupun informasi lainnya.
                    </p>
                </div>
            </section>
            <ContactSection />
            <CallToActionSection />
        </Fragment>
    );
}
