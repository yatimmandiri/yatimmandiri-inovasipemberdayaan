import { AboutSection } from '@/components/sections/home/about-section';
import { ImpactSection } from '@/components/sections/home/impact-section';
import { MitraSection } from '@/components/sections/home/mitra-section';
import { SliderSection } from '@/components/sections/home/slider-section';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function HomePage() {
    const { programs, testimonials, mitras } = usePage<any>().props;

    return (
        <Fragment>
            <SliderSection />
            <AboutSection />
            <ImpactSection />
            <MitraSection data={mitras} />
            {/*

            <ProgramSection programs={programs} />

            <BeritaSection news={news} />
            <TestimonialSection testimonials={testimonials} /> */}
        </Fragment>
    );
}
