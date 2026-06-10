import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export const CallToActionSection = () => {
    return (
        <section className="bg-linear-to-r from-emerald-700 to-emerald-500 py-24 text-white">
            <div className="container mx-auto max-w-4xl px-6 text-center">
                <span className="text-4xl font-bold">
                    Mari Berkolaborasi Bersama Kami
                </span>
                <p className="mt-6 text-lg text-emerald-50">
                    Bersama kita dapat menciptakan dampak yang lebih luas dan
                    berkelanjutan bagi masyarakat Indonesia.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link href="/partnerships">
                        <button className="rounded-xl bg-white px-8 py-4 font-semibold text-emerald-600 transition hover:scale-105">
                            Ajukan Kerja Sama
                        </button>
                    </Link>
                    <Link href="/programs">
                        <button className="flex items-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-emerald-600">
                            Lihat Program
                            <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
