import { useMemo } from 'react';

type Location = {
    id: number;

    province?: {
        id: number;
        name: string;
    } | null;

    regency?: {
        id: number;
        name: string;
    } | null;

    pic?: string;
    address?: string;
};

export const LocationSection = ({ locations }: { locations: Location[] }) => {
    // 🔥 GROUP BY PROVINCE
    const grouped = useMemo(() => {
        const map: Record<string, Location[]> = {};

        locations.forEach((item) => {
            const province = item.province?.name || 'Unknown Province';

            if (!map[province]) {
                map[province] = [];
            }

            map[province].push(item);
        });

        return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
    }, [locations]);

    const totalLocations = locations.length;
    const totalProvinces = grouped.length;
    const topProvince = grouped[0];

    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl px-6">
                {/* HEADER */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Sebaran Lokasi Program
                    </h2>
                    <p className="mt-2 text-slate-500">
                        Distribusi titik program berdasarkan provinsi dan kota
                        di Indonesia
                    </p>
                </div>

                {/* STATS */}
                <div className="mb-10 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border bg-white p-5">
                        <p className="text-sm text-slate-500">Total Lokasi</p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {totalLocations}
                        </h3>
                    </div>

                    <div className="rounded-2xl border bg-white p-5">
                        <p className="text-sm text-slate-500">
                            Provinsi Terbanyak
                        </p>
                        <h3 className="text-lg font-bold text-slate-900">
                            {topProvince ? topProvince[0] : '-'}
                        </h3>
                        <p className="text-xs text-slate-400">
                            {topProvince
                                ? `${topProvince[1].length} lokasi`
                                : '-'}
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-white p-5">
                        <p className="text-sm text-slate-500">Coverage</p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {totalProvinces}
                        </h3>
                        <p className="text-xs text-slate-400">
                            Provinsi terjangkau
                        </p>
                    </div>
                </div>

                {/* GRID */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {grouped.map(([province, items], index) => {
                        const percent =
                            totalLocations > 0
                                ? (items.length / totalLocations) * 100
                                : 0;

                        return (
                            <div
                                key={province}
                                className="rounded-2xl border bg-white p-5 transition hover:shadow-md"
                            >
                                {/* HEADER CARD */}
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="font-semibold text-slate-800">
                                        {province}
                                    </h4>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                        #{index + 1}
                                    </span>
                                </div>

                                {/* COUNT */}
                                <div className="mb-3 flex items-end justify-between">
                                    <div className="text-3xl font-bold text-slate-900">
                                        {items.length}
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        titik lokasi
                                    </div>
                                </div>

                                {/* MINI BAR */}
                                <div className="h-2 w-full rounded-full bg-slate-100">
                                    <div
                                        className="h-2 rounded-full bg-emerald-500 transition-all"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
