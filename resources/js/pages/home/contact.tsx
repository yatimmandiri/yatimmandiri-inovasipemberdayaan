import {
    Clock3,
    Mail,
    MapPin,
    Phone,
    Send,
} from 'lucide-react';
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs';

export default function ContactPage() {
    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="bg-linear-to-br from-emerald-700 via-emerald-600 to-emerald-500 py-24 text-white">
                <div className="container mx-auto max-w-7xl px-6 text-center">
                    <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                        Hubungi Kami
                    </span>

                    <h1 className="mt-6 text-5xl font-bold md:text-6xl">
                        Kontak Kami
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-emerald-50">
                        Kami siap membantu dan menjawab pertanyaan Anda terkait
                        program, kerja sama, maupun informasi lainnya.
                    </p>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-24">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-3xl border border-slate-200 p-8 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                                <MapPin className="h-7 w-7 text-emerald-600" />
                            </div>

                            <h3 className="mt-5 font-bold text-slate-900">
                                Alamat
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                Jl. Contoh No. 123
                                <br />
                                Jakarta Selatan, Indonesia
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 p-8 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                                <Phone className="h-7 w-7 text-emerald-600" />
                            </div>

                            <h3 className="mt-5 font-bold text-slate-900">
                                Telepon
                            </h3>

                            <p className="mt-3 text-slate-600">
                                (021) 1234 5678
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 p-8 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                                <Mail className="h-7 w-7 text-emerald-600" />
                            </div>

                            <h3 className="mt-5 font-bold text-slate-900">
                                Email
                            </h3>

                            <p className="mt-3 text-slate-600">
                                info@website.org
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 p-8 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                                <Clock3 className="h-7 w-7 text-emerald-600" />
                            </div>

                            <h3 className="mt-5 font-bold text-slate-900">
                                Jam Operasional
                            </h3>

                            <p className="mt-3 text-slate-600">
                                Senin - Jumat
                                <br />
                                08:00 - 17:00 WIB
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form & Info */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Form */}
                        <div className="rounded-3xl bg-white p-10 shadow-sm">
                            <h2 className="text-3xl font-bold text-slate-900">
                                Kirim Pesan
                            </h2>

                            <p className="mt-3 text-slate-600">
                                Isi formulir berikut dan tim kami akan segera
                                menghubungi Anda.
                            </p>

                            <form className="mt-8 space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Nama Lengkap
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                        placeholder="Masukkan nama"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Nomor Telepon
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Pesan
                                    </label>

                                    <textarea
                                        rows={5}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                        placeholder="Tulis pesan Anda..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    <Send size={18} />
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>

                        {/* Office */}
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">
                                Kantor Pusat
                            </h2>

                            <p className="mt-4 leading-relaxed text-slate-600">
                                Kami terbuka untuk kolaborasi, kemitraan, CSR,
                                program pemberdayaan masyarakat, maupun
                                konsultasi program sosial.
                            </p>

                            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                                <h3 className="font-bold text-slate-900">
                                    Informasi Kontak
                                </h3>

                                <div className="mt-6 space-y-5">
                                    <div className="flex gap-4">
                                        <MapPin className="mt-1 text-emerald-600" />
                                        <div>
                                            <h4 className="font-medium">
                                                Alamat
                                            </h4>
                                            <p className="text-slate-600">
                                                Jl. Contoh No.123, Jakarta
                                                Selatan, Indonesia
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Phone className="mt-1 text-emerald-600" />
                                        <div>
                                            <h4 className="font-medium">
                                                Telepon
                                            </h4>
                                            <p className="text-slate-600">
                                                (021) 1234 5678
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Mail className="mt-1 text-emerald-600" />
                                        <div>
                                            <h4 className="font-medium">
                                                Email
                                            </h4>
                                            <p className="text-slate-600">
                                                info@website.org
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="mt-8">
                                    <h4 className="font-semibold text-slate-900">
                                        Media Sosial
                                    </h4>

                                    <div className="mt-4 flex gap-3">
                                        <a
                                            href="#"
                                            className="rounded-xl bg-slate-100 p-3 transition hover:bg-emerald-100"
                                        >
                                            <BsFacebook size={20} />
                                        </a>

                                        <a
                                            href="#"
                                            className="rounded-xl bg-slate-100 p-3 transition hover:bg-emerald-100"
                                        >
                                            <BsInstagram size={20} />
                                        </a>

                                        <a
                                            href="#"
                                            className="rounded-xl bg-slate-100 p-3 transition hover:bg-emerald-100"
                                        >
                                            <BsYoutube size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Maps */}
            <section>
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps?q=Jakarta&output=embed"
                    className="h-125 w-full border-0"
                    loading="lazy"
                />
            </section>

            {/* CTA */}
            <section className="bg-emerald-600 py-24 text-white">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-4xl font-bold">Siap Berkolaborasi?</h2>

                    <p className="mt-6 text-lg text-emerald-50">
                        Mari bersama menciptakan dampak sosial yang lebih luas
                        untuk masyarakat Indonesia.
                    </p>

                    <button className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-emerald-600 transition hover:bg-slate-100">
                        Ajukan Kerja Sama
                    </button>
                </div>
            </section>
        </main>
    );
}
