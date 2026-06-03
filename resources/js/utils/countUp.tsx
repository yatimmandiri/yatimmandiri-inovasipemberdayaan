import { useEffect, useState } from 'react';

export const CountUpSectionCustom = ({
    countValue = 0,
}: {
    countValue: number;
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(duration / 16);
        const increment = countValue / step;

        const timer = setInterval(() => {
            start += increment;

            if (start >= countValue) {
                setCount(countValue);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [countValue]);

    const formatValue = (value: number) => {
        if (value >= 1_000_000_000)
            return `${(value / 1_000_000_000).toFixed(1)} M`;
        if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} JT`;
        if (value >= 1_000) return `${(value / 1_000).toFixed(1)} RB`;
        return value.toLocaleString('id-ID');
    };

    return <span className="text-4xl font-bold">{formatValue(count)}</span>;
};
