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

export default function SROISection() {
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
    ];

    return (
        <section className="bg-slate-50 py-20">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Social Return on Investment (SROI)
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900">
                        Dampak Sosial yang Terukur
                    </h2>

                    <p className="mt-4 text-lg text-slate-600">
                        Setiap investasi yang diberikan menghasilkan manfaat
                        sosial, ekonomi, dan lingkungan yang dapat diukur secara
                        nyata bagi masyarakat.
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
}
