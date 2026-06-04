import { AboutSection } from '@/components/sections/home/about-section';
import { BeritaSection } from '@/components/sections/home/berita-section';
import { ImpactSection } from '@/components/sections/home/impact-section';
import { MitraSection } from '@/components/sections/home/mitra-section';
import { ProgramSection } from '@/components/sections/home/program-section';
import { SliderSection } from '@/components/sections/home/slider-section';
import { TestimonialSection } from '@/components/sections/home/testimonial-section';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function HomePage() {
    const { programs, testimonials, news } = usePage<any>().props;

    return (
        <Fragment>
            <SliderSection />
            <AboutSection />
            <ImpactSection />
            <ProgramSection programs={programs} />
            <MitraSection />
            <BeritaSection news={news} />
            <TestimonialSection testimonials={testimonials} />
        </Fragment>
    );
}
