import { AboutSection } from '@/components/sections/home/about-section';
import { BeritaSection } from '@/components/sections/home/berita-section';
import { CategorySection } from '@/components/sections/home/category-section';
import { ImpactSection } from '@/components/sections/home/impact-section';
import { MitraSection } from '@/components/sections/home/mitra-section';
import { SliderSection } from '@/components/sections/home/slider-section';
import { TestimonialSection } from '@/components/sections/home/testimonial-section';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function HomePage() {
    const { categories, testimonials, mitras, news } = usePage<any>().props;

    return (
        <Fragment>
            <SliderSection />
            <AboutSection />
            <ImpactSection />
            <CategorySection data={categories} />
            <MitraSection data={mitras} />
            <BeritaSection />
            <TestimonialSection data={testimonials} />
        </Fragment>
    );
}
