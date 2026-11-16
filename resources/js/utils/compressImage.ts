/**
 * Kompresi gambar di sisi client sebelum upload — memangkas ukuran file
 * (re-encode JPEG, sisi panjang dibatasi `maxSize`) supaya beban upload ke
 * server tetap kecil. GIF dilewatkan (bukan target), file hasil umumnya
 * jauh lebih kecil dari asli.
 */
export async function compressImage(
    file: File,
    maxSize = 1600,
    quality = 0.8,
): Promise<File> {
    if (typeof window === 'undefined') {
        return file;
    }

    if (!file.type.startsWith('image/')) {
        return file;
    }

    if (file.type === 'image/gif') {
        return file;
    }

    try {
        const bitmap = await createImageBitmap(file);

        const scale = Math.min(
            1,
            maxSize / Math.max(bitmap.width, bitmap.height),
        );
        const width = Math.round(bitmap.width * scale);
        const height = Math.round(bitmap.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');

        if (!context) {
            return file;
        }

        context.drawImage(bitmap, 0, 0, width, height);

        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg', quality),
        );

        bitmap.close?.();

        if (!blob) {
            return file;
        }

        const compressed = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, '') + '.jpg',
            { type: 'image/jpeg' },
        );

        // Kalau hasil kompresi lebih besar dari aslinya, pakai file asli.
        return compressed.size < file.size ? compressed : file;
    } catch {
        return file;
    }
}
