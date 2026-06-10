import { MapPin, Phone, Mail, Clock3, Send } from 'lucide-react';
import { Fragment } from 'react';
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs';

export const ContactSection = () => {
    return (
        <Fragment>
            <section className="py-16">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {[
                            {
                                icon: MapPin,
                                title: 'Alamat',
                                content: (
                                    <>
                                        Jl. Contoh No. 123
                                        <br />
                                        Jakarta Selatan, Indonesia
                                    </>
                                ),
                            },
                            {
                                icon: Phone,
                                title: 'Telepon',
                                content: '(021) 1234 5678',
                            },
                            {
                                icon: Mail,
                                title: 'Email',
                                content: 'info@website.org',
                            },
                            {
                                icon: Clock3,
                                title: 'Jam Operasional',
                                content: (
                                    <>
                                        Senin - Jumat
                                        <br />
                                        08:00 - 17:00 WIB
                                    </>
                                ),
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                        <Icon className="h-6 w-6 text-emerald-600" />
                                    </div>

                                    <h3 className="mt-4 font-semibold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        {item.content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="bg-slate-50 py-16">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid gap-10 lg:grid-cols-2">
                        {/* Form */}
                        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Kirim Pesan
                            </h2>

                            <p className="mt-2 text-slate-600">
                                Isi formulir berikut dan tim kami akan segera
                                menghubungi Anda.
                            </p>

                            <form className="mt-6 space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Nama Lengkap
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Masukkan nama lengkap"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-emerald-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-emerald-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Nomor Telepon
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-emerald-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Pesan
                                    </label>

                                    <textarea
                                        rows={5}
                                        placeholder="Tulis pesan Anda..."
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-emerald-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
                                >
                                    <Send size={18} />
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>

                        {/* Office */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Kantor Pusat
                            </h2>

                            <p className="mt-3 leading-relaxed text-slate-600">
                                Kami terbuka untuk kolaborasi, kemitraan, CSR,
                                program pemberdayaan masyarakat, maupun
                                konsultasi program sosial.
                            </p>

                            <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">
                                <h3 className="font-semibold text-slate-900">
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
            <section>
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps?q=Jakarta&output=embed"
                    className="h-112.5 w-full border-0"
                    loading="lazy"
                />
            </section>
        </Fragment>
    );
};
