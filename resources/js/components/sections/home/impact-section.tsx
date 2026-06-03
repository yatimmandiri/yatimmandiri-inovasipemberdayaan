import { CountUpSectionCustom } from '@/utils/countUp';
import { Building2, Handshake, MapPinned, Users } from 'lucide-react';
import { createElement } from 'react';

export const ImpactSection = () => {
    const impacts = [
        {
            title: 'Desa Dampingan',
            value: 50,
            suffix: '+',
            icon: MapPinned,
            description:
                'Desa yang telah mendapatkan program pemberdayaan dan pendampingan berkelanjutan.',
        },
        {
            title: 'UMKM Binaan',
            value: 1500,
            suffix: '+',
            icon: Building2,
            description:
                'Pelaku usaha yang memperoleh pelatihan, mentoring, dan penguatan bisnis.',
        },
        {
            title: 'Penerima Manfaat',
            value: 10000,
            suffix: '+',
            icon: Users,
            description:
                'Masyarakat yang telah merasakan dampak langsung dari program pemberdayaan.',
        },
        {
            title: 'Mitra Kolaborasi',
            value: 100,
            suffix: '+',
            icon: Handshake,
            description:
                'Perusahaan, pemerintah, akademisi, dan komunitas yang berkolaborasi bersama kami.',
        },
    ];

    return (
        <section className="relative overflow-hidden bg-emerald-600 py-20">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white" />
                <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-white" />
            </div>

            <div className="relative container mx-auto max-w-7xl px-6">
                <div className="mb-12 text-center">
                    <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                        Dampak Kami
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                        Dampak Nyata untuk Indonesia
                    </h2>

                    <p className="mx-auto mt-4 max-w-3xl text-lg text-emerald-50">
                        Bersama berbagai mitra dan masyarakat, kami terus
                        menghadirkan perubahan yang berkelanjutan.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {impacts.map((item) => (
                        <div key={item.title} className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                                    {createElement(item.icon, {
                                        className: 'h-8 w-8 text-white',
                                        strokeWidth: 2,
                                    })}
                                </div>
                            </div>

                            <div className="text-4xl font-bold text-white md:text-6xl">
                                <CountUpSectionCustom countValue={item.value} />
                                {item.suffix}
                            </div>

                            <h3 className="mt-3 text-lg font-semibold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-emerald-100">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
