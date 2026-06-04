import { useForm } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Handshake,
    Send,
    Users,
} from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';

type SponsorshipForm = {
    contact_name: string;
    phone: string;
    email: string;
    address: string;
    organization_name: string;
    organization_type: string;
    organization_address: string;
    organization_phone: string;
    organization_email: string;
    collaboration_type: string;
    support_type: string;
    preferred_program: string;
    estimated_budget: string;
    message: string;
};

const collaborationTypes = [
    'Sponsorship Program',
    'CSR Perusahaan',
    'Dukungan Event',
    'Kolaborasi Komunitas',
    'Dukungan Media',
];

const supportTypes = [
    'Pendanaan',
    'Produk atau layanan',
    'Pelatihan dan mentoring',
    'Akses pasar',
    'Publikasi dan kampanye',
];

const benefits = [
    'Program kerja sama disusun berdasarkan kebutuhan kedua pihak.',
    'Dampak program dapat dikomunikasikan melalui laporan dan publikasi.',
    'Tim akan meninjau kesesuaian program sebelum proses lanjutan.',
];

export default function SponsorshipPage() {
    const { data, setData, post, processing, errors, reset } =
        useForm<SponsorshipForm>({
            contact_name: '',
            phone: '',
            email: '',
            address: '',
            organization_name: '',
            organization_type: '',
            organization_address: '',
            organization_phone: '',
            organization_email: '',
            collaboration_type: '',
            support_type: '',
            preferred_program: '',
            estimated_budget: '',
            message: '',
        });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post('/sponsorship', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <main className="bg-slate-50">
            <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20 text-white">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80"
                        alt="Diskusi kerja sama sponsorship"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-slate-950/75" />

                <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                    <div>
                        <span className="inline-flex rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-bold text-emerald-200 ring-1 ring-emerald-300/20">
                            Sponsorship & Kolaborasi
                        </span>
                        <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                            Bangun Dampak Pemberdayaan Bersama
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
                            Ajukan kerja sama untuk mendukung program ekonomi,
                            pendidikan, komunitas, UMKM, dan pengembangan
                            wilayah dampingan secara berkelanjutan.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                        {[
                            ['Program', 'Terarah'],
                            ['Mitra', 'Kolaboratif'],
                            ['Dampak', 'Terukur'],
                        ].map(([title, value]) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur"
                            >
                                <p className="text-sm text-slate-300">
                                    {title}
                                </p>
                                <p className="mt-2 text-xl font-black">
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                            <Handshake className="h-10 w-10 text-emerald-600" />
                            <h2 className="mt-5 text-2xl font-black text-slate-950">
                                Ruang Kerja Sama
                            </h2>
                            <p className="mt-4 leading-relaxed text-slate-600">
                                Sponsorship dapat berbentuk dukungan program,
                                CSR, pelatihan, produk, media, atau kolaborasi
                                komunitas yang saling menguatkan.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                            <h3 className="text-lg font-black text-slate-950">
                                Alur Singkat
                            </h3>
                            <div className="mt-5 space-y-4">
                                {[
                                    'Kirim proposal awal',
                                    'Tim meninjau kecocokan program',
                                    'Diskusi kebutuhan dan skema kerja sama',
                                    'Eksekusi dan pelaporan dampak',
                                ].map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-700">
                                            {index + 1}
                                        </span>
                                        <span className="text-sm font-semibold text-slate-700">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-900 p-7 text-white">
                            <h3 className="text-lg font-black">
                                Prinsip Kolaborasi
                            </h3>
                            <div className="mt-5 space-y-3">
                                {benefits.map((item) => (
                                    <div key={item} className="flex gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                                        <p className="text-sm leading-relaxed text-slate-200">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                    >
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <Send className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-950">
                                    Form Sponsorship
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Data PIC dan pihak yang mengajukan kerja
                                    sama.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-8">
                            <FormSection
                                icon={Users}
                                title="Data Penanggung Jawab"
                            >
                                <Field
                                    label="Nama Lengkap"
                                    value={data.contact_name}
                                    error={errors.contact_name}
                                    onChange={(value) =>
                                        setData('contact_name', value)
                                    }
                                />
                                <Field
                                    label="Nomor Telepon"
                                    value={data.phone}
                                    error={errors.phone}
                                    onChange={(value) =>
                                        setData('phone', value)
                                    }
                                />
                                <Field
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    error={errors.email}
                                    onChange={(value) =>
                                        setData('email', value)
                                    }
                                />
                                <Field
                                    label="Alamat"
                                    value={data.address}
                                    error={errors.address}
                                    onChange={(value) =>
                                        setData('address', value)
                                    }
                                />
                            </FormSection>

                            <FormSection
                                icon={Building2}
                                title="Data Organisasi atau Perusahaan"
                            >
                                <Field
                                    label="Nama Organisasi/Perusahaan"
                                    value={data.organization_name}
                                    error={errors.organization_name}
                                    onChange={(value) =>
                                        setData('organization_name', value)
                                    }
                                />
                                <Field
                                    label="Tipe Organisasi"
                                    value={data.organization_type}
                                    error={errors.organization_type}
                                    placeholder="Perusahaan, komunitas, kampus, lembaga"
                                    onChange={(value) =>
                                        setData('organization_type', value)
                                    }
                                />
                                <Field
                                    label="Telepon Organisasi"
                                    value={data.organization_phone}
                                    error={errors.organization_phone}
                                    onChange={(value) =>
                                        setData('organization_phone', value)
                                    }
                                />
                                <Field
                                    label="Email Organisasi"
                                    type="email"
                                    value={data.organization_email}
                                    error={errors.organization_email}
                                    onChange={(value) =>
                                        setData('organization_email', value)
                                    }
                                />
                                <Field
                                    label="Alamat Organisasi"
                                    value={data.organization_address}
                                    error={errors.organization_address}
                                    onChange={(value) =>
                                        setData('organization_address', value)
                                    }
                                    className="md:col-span-2"
                                />
                            </FormSection>

                            <FormSection
                                icon={Handshake}
                                title="Rencana Kerja Sama"
                            >
                                <SelectField
                                    label="Jenis Kerja Sama"
                                    value={data.collaboration_type}
                                    error={errors.collaboration_type}
                                    options={collaborationTypes}
                                    onChange={(value) =>
                                        setData('collaboration_type', value)
                                    }
                                />
                                <SelectField
                                    label="Bentuk Dukungan"
                                    value={data.support_type}
                                    error={errors.support_type}
                                    options={supportTypes}
                                    onChange={(value) =>
                                        setData('support_type', value)
                                    }
                                />
                                <Field
                                    label="Program yang Diminati"
                                    value={data.preferred_program}
                                    error={errors.preferred_program}
                                    placeholder="Contoh: UMKM Bangkit, Desa Wisata"
                                    onChange={(value) =>
                                        setData('preferred_program', value)
                                    }
                                />
                                <Field
                                    label="Estimasi Nilai Dukungan"
                                    value={data.estimated_budget}
                                    error={errors.estimated_budget}
                                    placeholder="Opsional"
                                    onChange={(value) =>
                                        setData('estimated_budget', value)
                                    }
                                />
                                <TextAreaField
                                    label="Pesan atau Ringkasan Proposal"
                                    value={data.message}
                                    error={errors.message}
                                    onChange={(value) =>
                                        setData('message', value)
                                    }
                                />
                            </FormSection>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Kirim Pengajuan
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

const FormSection = ({
    icon: Icon,
    title,
    children,
}: {
    icon: any;
    title: string;
    children: ReactNode;
}) => (
    <section>
        <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Icon className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-black text-slate-950">{title}</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
);

const Field = ({
    label,
    value,
    error,
    onChange,
    type = 'text',
    placeholder,
    className = '',
}: {
    label: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    className?: string;
}) => (
    <label className={`block ${className}`}>
        <span className="text-sm font-bold text-slate-700">{label}</span>
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 transition outline-none focus:ring-4 focus:ring-emerald-100 ${
                error
                    ? 'border-red-400'
                    : 'border-slate-200 focus:border-emerald-500'
            }`}
        />
        {error && (
            <span className="mt-1 block text-xs text-red-600">{error}</span>
        )}
    </label>
);

const SelectField = ({
    label,
    value,
    error,
    options,
    onChange,
}: {
    label: string;
    value: string;
    error?: string;
    options: string[];
    onChange: (value: string) => void;
}) => (
    <label className="block">
        <span className="text-sm font-bold text-slate-700">{label}</span>
        <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 transition outline-none focus:ring-4 focus:ring-emerald-100 ${
                error
                    ? 'border-red-400'
                    : 'border-slate-200 focus:border-emerald-500'
            }`}
        >
            <option value="">Pilih salah satu</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && (
            <span className="mt-1 block text-xs text-red-600">{error}</span>
        )}
    </label>
);

const TextAreaField = ({
    label,
    value,
    error,
    onChange,
}: {
    label: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}) => (
    <label className="block md:col-span-2">
        <span className="text-sm font-bold text-slate-700">{label}</span>
        <textarea
            value={value}
            rows={6}
            onChange={(event) => onChange(event.target.value)}
            className={`mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 transition outline-none focus:ring-4 focus:ring-emerald-100 ${
                error
                    ? 'border-red-400'
                    : 'border-slate-200 focus:border-emerald-500'
            }`}
        />
        {error && (
            <span className="mt-1 block text-xs text-red-600">{error}</span>
        )}
    </label>
);
