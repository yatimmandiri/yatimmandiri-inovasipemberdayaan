import { AboutSection } from '@/components/sections/home/about-section';
import { KabarSection } from '@/components/sections/home/berita-section';
import { CategorySection } from '@/components/sections/home/category-section';
import { ImpactSection } from '@/components/sections/home/impact-section';
import { MitraSection } from '@/components/sections/home/mitra-section';
import { SliderSection } from '@/components/sections/home/slider-section';
import { TestimonialSection } from '@/components/sections/home/testimonial-section';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function HomePage() {
    const { categories, testimonials, mitras, sliders } = usePage<any>().props;

    return (
        <Fragment>
            <SliderSection data={sliders} />
            <AboutSection />
            <ImpactSection />
            <CategorySection data={categories} />
            <MitraSection data={mitras} />
            <KabarSection />
            <TestimonialSection data={testimonials} />
        </Fragment>
    );
}
