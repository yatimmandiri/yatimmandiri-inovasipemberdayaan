import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export const SROISection = () => {
    const impactData = [
        {
            name: 'Investasi',
            value: 500,
        },
        {
            name: 'Dampak Sosial',
            value: 2700,
        },
    ];

    const impactBreakdown = [
        {
            category: 'Ekonomi',
            value: 55,
        },
        {
            category: 'Sosial',
            value: 30,
        },
        {
            category: 'Lingkungan',
            value: 15,
        },
        {
            category: 'Spiritual',
            value: 10,
        },
    ];

    return (
        <section className="bg-slate-50 py-16">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="text-sm font-medium tracking-wider text-primary uppercase">
                        Social Return on Investment
                    </span>

                    <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
                        Dampak yang Terukur
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Analisis SROI menunjukkan nilai manfaat sosial yang
                        dihasilkan dibandingkan dengan investasi yang telah
                        dikeluarkan dalam program ini.
                    </p>
                </div>
                <div className="mt-16 grid gap-6 md:grid-cols-4">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Total Investasi
                        </p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900">
                            Rp500 Jt
                        </h3>
                    </div>
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Nilai Dampak</p>
                        <h3 className="mt-2 text-3xl font-bold text-emerald-600">
                            Rp2,7 M
                        </h3>
                    </div>
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Rasio SROI</p>
                        <h3 className="mt-2 text-3xl font-bold text-emerald-600">
                            5,4 : 1
                        </h3>
                    </div>
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Penerima Manfaat
                        </p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900">
                            500+
                        </h3>
                    </div>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-white p-8 shadow-sm">
                        <h3 className="mb-6 text-xl font-semibold text-slate-900">
                            Perbandingan Investasi dan Dampak
                        </h3>

                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={impactData}>
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="name" />

                                    <YAxis />

                                    <Tooltip
                                        formatter={(value: any) => [
                                            `Rp ${value.toLocaleString()} Juta`,
                                            'Nilai',
                                        ]}
                                    />

                                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                        <Cell fill="#94a3b8" />
                                        <Cell fill="#10b981" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm">
                        <h3 className="mb-6 text-xl font-semibold text-slate-900">
                            Kontribusi Dampak
                        </h3>

                        <div className="space-y-6">
                            {impactBreakdown.map((item) => (
                                <div key={item.category}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-medium text-slate-700">
                                            {item.category}
                                        </span>

                                        <span className="text-sm text-slate-500">
                                            {item.value}%
                                        </span>
                                    </div>

                                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full bg-emerald-500"
                                            style={{
                                                width: `${item.value}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
                            <p className="text-sm text-emerald-700">
                                Berdasarkan hasil pengukuran, setiap
                                <strong> Rp1 investasi</strong> menghasilkan
                                sekitar
                                <strong> Rp5,4 manfaat sosial</strong> bagi
                                penerima manfaat dan komunitas sekitar.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 rounded-3xl bg-white p-8 shadow-sm">
                    <h3 className="mb-4 text-xl font-semibold text-slate-900">
                        Metodologi Pengukuran SROI
                    </h3>

                    <div className="grid gap-4 md:grid-cols-5">
                        {[
                            'Identifikasi Stakeholder',
                            'Pengukuran Outcome',
                            'Monetisasi Dampak',
                            'Validasi Data',
                            'Perhitungan SROI',
                        ].map((step, index) => (
                            <div
                                key={step}
                                className="rounded-2xl border p-4 text-center"
                            >
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-600">
                                    {index + 1}
                                </div>

                                <p className="text-sm text-slate-700">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const SRIOSectionV2 = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="text-sm font-medium tracking-wider text-primary uppercase">
                        Social Return on Investment
                    </span>

                    <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
                        Dampak yang Terukur
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Analisis SROI menunjukkan nilai manfaat sosial yang
                        dihasilkan dibandingkan dengan investasi yang telah
                        dikeluarkan dalam program ini.
                    </p>
                </div>

                {/* Hero SROI */}
                <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                    <div className="grid lg:grid-cols-2">
                        <div className="flex flex-col justify-center border-b border-slate-100 p-10 text-center lg:border-r lg:border-b-0">
                            <span className="text-sm font-medium tracking-wider text-slate-500 uppercase">
                                Rasio SROI
                            </span>

                            <h3 className="mt-4 text-6xl font-bold text-primary md:text-7xl">
                                5,4 : 1
                            </h3>

                            <p className="mx-auto mt-5 max-w-md text-slate-600">
                                Setiap Rp1 investasi menghasilkan sekitar Rp5,4
                                manfaat sosial bagi penerima manfaat dan
                                komunitas sekitar.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 divide-y divide-slate-100">
                            <div className="p-8">
                                <p className="text-sm text-slate-500">
                                    Total Investasi
                                </p>

                                <h4 className="mt-2 text-3xl font-bold text-slate-900">
                                    Rp500 Juta
                                </h4>
                            </div>

                            <div className="p-8">
                                <p className="text-sm text-slate-500">
                                    Nilai Dampak Sosial
                                </p>

                                <h4 className="mt-2 text-3xl font-bold text-emerald-600">
                                    Rp2,7 Miliar
                                </h4>
                            </div>

                            <div className="p-8">
                                <p className="text-sm text-slate-500">
                                    Penerima Manfaat
                                </p>

                                <h4 className="mt-2 text-3xl font-bold text-slate-900">
                                    500+
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kontribusi Dampak */}
                <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8">
                    <h3 className="text-xl font-semibold text-slate-900">
                        Kontribusi Dampak
                    </h3>

                    <p className="mt-2 text-slate-600">
                        Distribusi manfaat yang dihasilkan berdasarkan kategori
                        dampak.
                    </p>

                    <div className="mt-8 space-y-6">
                        {[
                            { label: 'Ekonomi', value: 55 },
                            { label: 'Sosial', value: 30 },
                            { label: 'Lingkungan', value: 15 },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="mb-2 flex justify-between">
                                    <span className="font-medium text-slate-700">
                                        {item.label}
                                    </span>

                                    <span className="text-sm text-slate-500">
                                        {item.value}%
                                    </span>
                                </div>

                                <div className="h-2 rounded-full bg-slate-100">
                                    <div
                                        className="h-2 rounded-full bg-primary"
                                        style={{
                                            width: `${item.value}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Metodologi */}
                <div className="mt-12">
                    <h3 className="mb-8 text-center text-2xl font-bold text-slate-900">
                        Metodologi Pengukuran
                    </h3>

                    <div className="grid gap-4 md:grid-cols-5">
                        {[
                            'Stakeholder',
                            'Outcome',
                            'Monetisasi',
                            'Validasi',
                            'Perhitungan SROI',
                        ].map((step, index) => (
                            <div
                                key={step}
                                className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
                            >
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                    {index + 1}
                                </div>

                                <p className="mt-4 text-sm font-medium text-slate-700">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
