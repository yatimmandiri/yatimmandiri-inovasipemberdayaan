import {
    BriefcaseBusiness,
    GraduationCap,
    MapPinned,
    Users,
} from 'lucide-react';

export const ImpactSection = () => {
    const impacts = [
        {
            icon: Users,
            value: '150.000+',
            label: 'Penerima Manfaat',
            description:
                'Masyarakat yang telah merasakan manfaat program pemberdayaan.',
        },
        {
            icon: GraduationCap,
            value: '12.500+',
            label: 'Peserta Pelatihan',
            description:
                'Peserta yang mendapatkan pelatihan keterampilan dan pendidikan.',
        },
        {
            icon: BriefcaseBusiness,
            value: '5.200+',
            label: 'UMKM Dibina',
            description:
                'Pelaku usaha yang mendapatkan pendampingan dan penguatan usaha.',
        },
        {
            icon: MapPinned,
            value: '38 Provinsi',
            label: 'Wilayah Program',
            description:
                'Program berjalan di berbagai daerah di seluruh Indonesia.',
        },
    ];

    return (
        <section
            id="impact"
            className="bg-linear-to-br from-orange-50 via-white to-orange-50 py-24"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-bold text-orange-600">
                        Dampak Program
                    </span>

                    <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                        Bersama Menciptakan Perubahan Nyata
                    </h2>

                    <p className="mt-5 text-lg leading-relaxed text-slate-600">
                        Setiap program yang dijalankan memberikan dampak nyata
                        bagi masyarakat melalui pendidikan, ekonomi, kesehatan,
                        dan pemberdayaan berkelanjutan.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {impacts.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="group rounded-3xl border border-orange-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                                    <Icon className="h-8 w-8" />
                                </div>

                                <h3 className="text-4xl font-black text-slate-950">
                                    {item.value}
                                </h3>

                                <p className="mt-2 text-lg font-bold text-slate-800">
                                    {item.label}
                                </p>

                                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
