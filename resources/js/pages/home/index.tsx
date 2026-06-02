import { AboutSection } from '@/components/sections/home/about-section';
import { MitraSection } from '@/components/sections/home/mitra-section';
import { ProgramUnggulanSection } from '@/components/sections/home/program-unggulan-section';
import { SliderSection } from '@/components/sections/home/slider-section';
import { TestimonialSection } from '@/components/sections/home/testimonial-section';
import { Fragment } from 'react';

export default function HomePage() {
    return (
        <Fragment>
            <SliderSection />
            <AboutSection />
            {/* <ImpactSection /> */}
            <ProgramUnggulanSection />
            <MitraSection />
            <TestimonialSection />
        </Fragment>
    );
}
