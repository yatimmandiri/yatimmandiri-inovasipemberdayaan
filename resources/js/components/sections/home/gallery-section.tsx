import { getStorageUrl } from '@/utils/copyText';
import { Fragment, useState } from 'react';

export const GallerySection = ({
    title = 'Galeri',
    subtitle = 'Dokumentasi kegiatan terbaru',
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

                        <p className="mt-3 text-gray-500">{subtitle}</p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {galleries.map((item: any) => (
                            <div
                                key={item.id}
                                onClick={() => setPreview(item.image)}
                                className="group cursor-pointer overflow-hidden rounded-2xl shadow transition hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={getStorageUrl(item.image)}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold">
                                        {item.title}
                                    </h3>

                                    {item.description && (
                                        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                    )}
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
