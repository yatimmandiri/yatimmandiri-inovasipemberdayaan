import { getStorageUrl } from '@/utils/copyText';
import { Eye, ImageOff, X } from 'lucide-react';
import { Fragment, useState } from 'react';

export const GallerySection = ({
    title = 'Galeri Kegiatan',
    subtitle = 'Dokumentasi kegiatan terbaru',
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    const galleries = [
        {
            id: 1,
            title: 'Santunan Anak Yatim',
            image: null,
            description: 'Kegiatan santunan di Surabaya',
        },
        {
            id: 2,
            title: 'Berbagi Paket Sembako',
            image: null,
            description: 'Program Ramadhan',
        },
        {
            id: 3,
            title: 'Kajian Rutin',
            image: null,
            description: 'Kajian bersama masyarakat',
        },
        {
            id: 4,
            title: 'Bakti Sosial',
            image: null,
            description: 'Aksi peduli lingkungan',
        },
        {
            id: 5,
            title: 'Belajar Bersama',
            image: null,
            description: 'Program pendidikan',
        },
    ];

    const layout = [
        'col-span-12 md:col-span-7 row-span-2',
        'col-span-12 md:col-span-5',
        'col-span-12 md:col-span-5',
        'col-span-12 md:col-span-4',
        'col-span-12 md:col-span-8',
    ];

    return (
        <Fragment>
            <section className="bg-linear-to-b from-slate-50 to-white py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            📸 Dokumentasi
                        </span>

                        <h2 className="mt-5 text-4xl font-extrabold">
                            {title}
                        </h2>

                        <p className="mt-4 text-slate-500">{subtitle}</p>
                    </div>

                    <div className="grid auto-rows-55 grid-cols-12 gap-5">
                        {galleries.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() =>
                                    item.image && setPreview(item.image)
                                }
                                className={`${layout[index % layout.length]} group relative cursor-pointer overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl`}
                            >
                                {item.image ? (
                                    <img
                                        src={getStorageUrl(item.image)}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-200 to-slate-300">
                                        <ImageOff className="h-14 w-14 text-slate-400" />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                                    <div className="rounded-full bg-white p-4 shadow-xl">
                                        <Eye className="h-6 w-6 text-emerald-600" />
                                    </div>
                                </div>

                                <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                                        Program
                                    </span>

                                    <h3 className="mt-3 text-xl font-bold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-white/80">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <button className="rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700">
                            Lihat Semua Galeri
                        </button>
                    </div>
                </div>
            </section>

            {preview && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
                    onClick={() => setPreview(null)}
                >
                    <button
                        className="absolute top-6 right-6 rounded-full bg-white p-2"
                        onClick={() => setPreview(null)}
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <img
                        src={getStorageUrl(preview)}
                        alt=""
                        className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
                    />
                </div>
            )}
        </Fragment>
    );
};
