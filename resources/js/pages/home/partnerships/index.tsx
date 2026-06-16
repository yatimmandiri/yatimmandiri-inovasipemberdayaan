import { PartnershipForm } from '@/components/forms/home/partnership-form';
import { Handshake } from 'lucide-react';

type SponsorshipForm = {
    organization_name: string;
    contact_name: string;
    email: string;
    phone: string;
    partnership_type: string;
    budget_range: string;
    preferred_contact: string;
    message: string;
};

export default function SponsorshipPage() {
    return (
        <main className="bg-white">
            <section className="bg-linear-to-br from-emerald-700 via-emerald-600 to-orange-500 py-24 text-white">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                            <Handshake className="h-4 w-4" />
                            Sponsorship & Partnership
                        </span>
                        <h1 className="mt-6 text-4xl leading-tight font-black md:text-6xl">
                            Bangun Dampak Sosial Bersama Growth YM
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                            Ajukan kolaborasi CSR, sponsor program, dukungan
                            event, atau kerja sama komunitas untuk memperluas
                            manfaat pemberdayaan masyarakat.
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {['CSR', 'Program', 'Event'].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"
                                >
                                    <p className="text-2xl font-black">
                                        {item}
                                    </p>
                                    <p className="mt-2 text-sm text-white/75">
                                        Kolaborasi terukur dan berdampak.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl md:p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-black">
                                Form Pengajuan Kerja Sama
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                Lengkapi data berikut agar tim kami bisa
                                memahami kebutuhan kerja sama dengan lebih
                                tepat.
                            </p>
                        </div>
                        <PartnershipForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
