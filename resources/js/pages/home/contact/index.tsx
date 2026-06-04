import {
    ArrowRight,
    Clock,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
} from 'lucide-react';

const contactCards = [
    {
        icon: Phone,
        title: 'Telepon',
        value: '+62 812-3456-7890',
        href: 'tel:+6281234567890',
    },
    {
        icon: Mail,
        title: 'Email',
        value: 'partnership@yatimmandiri.org',
        href: 'mailto:partnership@yatimmandiri.org',
    },
    {
        icon: MessageCircle,
        title: 'WhatsApp',
        value: 'Diskusi Kolaborasi',
        href: 'https://wa.me/6281234567890',
    },
];

const topics = [
    'Informasi program pemberdayaan',
    'Pengajuan sponsorship dan CSR',
    'Kolaborasi komunitas atau kampus',
    'Publikasi kegiatan dan berita program',
];

export default function ContactPage() {
    return (
        <main className="bg-white">
            <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20 text-white">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80"
                        alt="Tim berdiskusi"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-slate-950/75" />

                <div className="relative mx-auto max-w-7xl px-6">
                    <span className="inline-flex rounded-full bg-sky-400/15 px-4 py-2 text-sm font-bold text-sky-200 ring-1 ring-sky-300/20">
                        Kontak
                    </span>
                    <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
                        Mari Bicara Tentang Dampak yang Bisa Dibangun
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
                        Hubungi tim kami untuk informasi program, peluang
                        kolaborasi, sponsorship, dan kebutuhan komunikasi
                        terkait Inovasi Pemberdayaan.
                    </p>
                </div>
            </section>

            <section className="bg-slate-50 py-20">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_0.9fr]">
                    <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
                        {contactCards.map((item) => (
                            <a
                                key={item.title}
                                href={item.href}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600" />
                                </div>
                                <h2 className="mt-6 text-lg font-black text-slate-950">
                                    {item.title}
                                </h2>
                                <p className="mt-2 text-sm font-semibold text-slate-600">
                                    {item.value}
                                </p>
                            </a>
                        ))}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                                <Send className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-950">
                                    Kanal Komunikasi
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Tim akan mengarahkan pesan Anda ke bagian
                                    yang sesuai.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4">
                            {topics.map((topic) => (
                                <div
                                    key={topic}
                                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                                >
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-sm font-semibold text-slate-700">
                                        {topic}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 grid gap-4 border-t border-slate-100 pt-8 md:grid-cols-2">
                            <div className="rounded-xl bg-slate-50 p-5">
                                <MapPin className="h-5 w-5 text-emerald-600" />
                                <h3 className="mt-4 font-black text-slate-950">
                                    Kantor
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    Jl. Raya Jambangan No. 135-137, Surabaya,
                                    Jawa Timur
                                </p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-5">
                                <Clock className="h-5 w-5 text-emerald-600" />
                                <h3 className="mt-4 font-black text-slate-950">
                                    Jam Layanan
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    Senin-Jumat, 08.00-16.00 WIB
                                </p>
                            </div>
                        </div>

                        <a
                            href="/sponsorship"
                            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                        >
                            Ajukan Sponsorship
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
