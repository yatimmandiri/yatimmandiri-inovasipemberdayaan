import {
    BriefcaseBusiness,
    GraduationCap,
    MapPinned,
    Users,
    type LucideIcon,
} from 'lucide-react';

interface ImpactItem {
    icon: LucideIcon;
    value: string;
    label: string;
    description: string;
}

export const ImpactSection = () => {
    const impacts: ImpactItem[] = [
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
            className="relative overflow-hidden bg-linear-to-br from-orange-50 via-white to-orange-50 py-24"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_30%)]" />
            <div className="relative container mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
                        Dampak Program
                    </span>
                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        Bersama Menciptakan
                        <b className="block text-orange-500">Perubahan Nyata</b>
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-slate-600">
                        Setiap program yang dijalankan memberikan dampak nyata
                        bagi masyarakat melalui pendidikan, ekonomi, kesehatan,
                        dan pemberdayaan berkelanjutan.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {impacts.map((item, i) => {
                        return <ImpactItemSection item={item} key={i} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export const ImpactItemSection = ({ item }: { item: any }) => {
    const Icon = item.icon;

    return (
        <div
            key={item.label}
            className="group h-full rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl"
        >
            <div className="space-y-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                    <Icon className="size-8" />
                </div>
                <div className="text-4xl font-extrabold tracking-tight text-slate-900">
                    {item.value}
                </div>
                <div className="text-lg font-semibold text-slate-800">
                    {item.label}
                </div>
                <p className="leading-relaxed text-slate-600">
                    {item.description}
                </p>
            </div>
        </div>
    );
};
