import { ProgramSection } from '@/components/sections/home/program-section';
import { SliderSection } from '@/components/sections/home/slider-section';
import { TestimonialSection } from '@/components/sections/home/testimonial-section';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export default function HomePage() {
    const { programs, testimonials } = usePage<any>().props;

    return (
        <Fragment>
            <SliderSection />
            <ProgramSection programs={programs} />
            <TestimonialSection testimonials={testimonials} />
        </Fragment>
    );
}
