import { AboutSection } from '@/components/sections/home/about-section';
import { SliderSection } from '@/components/sections/home/slider-section';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function HomePage() {
    const { programs, testimonials, news } = usePage<any>().props;

    return (
        <Fragment>
            <SliderSection />
            <AboutSection />
            {/* <AboutSection />
            <BeritaSection /> */}
            {/*
            <ImpactSection />
            <ProgramSection programs={programs} />
            <MitraSection />
            <BeritaSection news={news} />
            <TestimonialSection testimonials={testimonials} /> */}
        </Fragment>
    );
}
