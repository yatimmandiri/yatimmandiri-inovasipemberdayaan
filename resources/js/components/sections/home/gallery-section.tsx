import { getStorageUrl } from '@/utils/copyText';
import { Fragment, useState } from 'react';

export const GallerySection = ({
    title = 'Galeri Kegiatan',
    subtitle = 'Dokumentasi berbagai program, kegiatan sosial, dan momen inspiratif bersama para donatur, relawan, serta penerima manfaat di seluruh Indonesia.',
}) => {
    const [preview, setPreview] = useState(null);

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
    ];

    return (
        <Fragment>
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold">{title}</h2>

                        <p className="mt-3 text-base text-gray-500">
                            {subtitle}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {galleries.map((item: any) => (
                            <div
                                key={item.id}
                                onClick={() => setPreview(item.image)}
                                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl"
                            >
                                <img
                                    src={getStorageUrl(item.image)}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/30" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                                    <div className="rounded-full bg-white/90 p-3 shadow-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-emerald-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c-1.5-4-5-7-9-7S4.5 8 3 12c1.5 4 5 7 9 7s7.5-3 9-7z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {preview && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
                    onClick={() => setPreview(null)}
                >
                    <img
                        src={preview}
                        className="max-h-full max-w-full rounded-xl"
                    />
                </div>
            )}
        </Fragment>
    );
};
