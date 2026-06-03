import { AboutSection } from '@/components/sections/home/about-section';
import { ImpactSection } from '@/components/sections/home/impact-section';
import { MitraSection } from '@/components/sections/home/mitra-section';
import { ProgramUnggulanSection } from '@/components/sections/home/program-unggulan-section';
import { SliderSection } from '@/components/sections/home/slider-section';
import { TestimonialSection } from '@/components/sections/home/testimonial-section';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function HomePage() {
    const { programs, testimonials } = usePage<any>().props;

    return (
        <Fragment>
            <SliderSection />
            <AboutSection />
            <ImpactSection />
            <ProgramUnggulanSection />
            <MitraSection />
            <TestimonialSection />
        </Fragment>
    );
}
