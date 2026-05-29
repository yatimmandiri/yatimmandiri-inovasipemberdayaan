import { SliderSection } from '@/components/sections/home/slider-section';
import { TestimonialSection } from '@/components/sections/home/testimonial-section';
import { Fragment } from 'react';

export default function HomePage() {
    return (
        <Fragment>
            <SliderSection />
            <TestimonialSection />
        </Fragment>
    );
}
