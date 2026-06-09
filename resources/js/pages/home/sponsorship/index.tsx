import { useForm, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    Handshake,
    Mail,
    Phone,
    Send,
    UserRound,
} from 'lucide-react';
import { FormEvent, ReactNode } from 'react';

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
    const { partnershipTypes = [], flash } = usePage<any>().props;
    const { data, setData, post, processing, errors, reset } =
        useForm<SponsorshipForm>({
            organization_name: '',
            contact_name: '',
            email: '',
            phone: '',
            partnership_type: partnershipTypes[0] || 'CSR',
            budget_range: '',
            preferred_contact: 'whatsapp',
            message: '',
        });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        post('/sponsorship', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

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

                    <form
                        onSubmit={submit}
                        className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl md:p-8"
                    >
                        <div className="mb-6">
                            <h2 className="text-2xl font-black">
                                Form Pengajuan Kerja Sama
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                Lengkapi data berikut agar tim kami bisa
                                memahami kebutuhan kerja sama dengan lebih
                                tepat.
                            </p>
                            {flash?.success && (
                                <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                                    {flash.success}
                                </div>
                            )}
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <Field
                                icon={Building2}
                                label="Nama Perusahaan/Organisasi"
                                error={errors.organization_name}
                            >
                                <input
                                    value={data.organization_name}
                                    onChange={(event) =>
                                        setData(
                                            'organization_name',
                                            event.target.value,
                                        )
                                    }
                                    className={fieldInputClass}
                                    placeholder="PT / Komunitas / Instansi"
                                />
                            </Field>

                            <Field
                                icon={UserRound}
                                label="Nama Penanggung Jawab"
                                error={errors.contact_name}
                            >
                                <input
                                    value={data.contact_name}
                                    onChange={(event) =>
                                        setData(
                                            'contact_name',
                                            event.target.value,
                                        )
                                    }
                                    className={fieldInputClass}
                                    placeholder="Nama lengkap"
                                />
                            </Field>

                            <Field
                                icon={Mail}
                                label="Email"
                                error={errors.email}
                            >
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData('email', event.target.value)
                                    }
                                    className={fieldInputClass}
                                    placeholder="email@perusahaan.com"
                                />
                            </Field>

                            <Field
                                icon={Phone}
                                label="Nomor Telepon/WhatsApp"
                                error={errors.phone}
                            >
                                <input
                                    value={data.phone}
                                    onChange={(event) =>
                                        setData('phone', event.target.value)
                                    }
                                    className={fieldInputClass}
                                    placeholder="08xxxxxxxxxx"
                                />
                            </Field>

                            <Field
                                icon={Handshake}
                                label="Jenis Kerja Sama"
                                error={errors.partnership_type}
                            >
                                <select
                                    value={data.partnership_type}
                                    onChange={(event) =>
                                        setData(
                                            'partnership_type',
                                            event.target.value,
                                        )
                                    }
                                    className={fieldInputClass}
                                >
                                    {partnershipTypes.map((type: string) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Estimasi Dukungan">
                                <select
                                    value={data.budget_range}
                                    onChange={(event) =>
                                        setData(
                                            'budget_range',
                                            event.target.value,
                                        )
                                    }
                                    className={fieldInputClass}
                                >
                                    <option value="">Belum ditentukan</option>
                                    <option value="< 25 juta">
                                        Kurang dari Rp25 juta
                                    </option>
                                    <option value="25-100 juta">
                                        Rp25 juta - Rp100 juta
                                    </option>
                                    <option value="> 100 juta">
                                        Lebih dari Rp100 juta
                                    </option>
                                </select>
                            </Field>
                        </div>

                        <div className="mt-5">
                            <Field label="Preferensi Kontak">
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {['whatsapp', 'email', 'phone'].map(
                                        (item) => (
                                            <label
                                                key={item}
                                                className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold capitalize"
                                            >
                                                <input
                                                    type="radio"
                                                    checked={
                                                        data.preferred_contact ===
                                                        item
                                                    }
                                                    onChange={() =>
                                                        setData(
                                                            'preferred_contact',
                                                            item,
                                                        )
                                                    }
                                                />
                                                {item}
                                            </label>
                                        ),
                                    )}
                                </div>
                            </Field>
                        </div>

                        <div className="mt-5">
                            <Field
                                label="Rencana Kerja Sama"
                                error={errors.message}
                            >
                                <textarea
                                    rows={5}
                                    value={data.message}
                                    onChange={(event) =>
                                        setData('message', event.target.value)
                                    }
                                    className={fieldInputClass}
                                    placeholder="Ceritakan tujuan, bentuk dukungan, target penerima manfaat, atau timeline kerja sama."
                                />
                            </Field>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Send className="h-5 w-5" />
                            Kirim Pengajuan
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}

const Field = ({
    icon: Icon,
    label,
    error,
    children,
}: {
    icon?: any;
    label: string;
    error?: string;
    children: ReactNode;
}) => (
    <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
            {Icon && <Icon className="h-4 w-4 text-emerald-600" />}
            {label}
        </span>
        {children}
        {error && (
            <span className="mt-2 block text-xs font-semibold text-red-600">
                {error}
            </span>
        )}
    </label>
);

const fieldInputClass =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100';
