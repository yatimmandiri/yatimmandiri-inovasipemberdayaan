import { AboutSection } from '@/components/sections/home/about-section';
import { KabarSection } from '@/components/sections/home/berita-section';
import { ImpactSection } from '@/components/sections/home/impact-section';
import { MitraSection } from '@/components/sections/home/mitra-section';
import { RecomendationCategorySection } from '@/components/sections/home/recomendation-category-section';
import { ReviewSection } from '@/components/sections/home/review-section';
import { SliderSection } from '@/components/sections/home/slider-section';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function HomePage() {
    const { categories, reviews, mitras, sliders } = usePage<any>().props;

    return (
        <Fragment>
            <SliderSection data={sliders} />
            <AboutSection />
            <RecomendationCategorySection data={categories} />
            <ImpactSection />
            <MitraSection data={mitras} />
            <KabarSection />
            <ReviewSection data={reviews} />
        </Fragment>
    );
}
