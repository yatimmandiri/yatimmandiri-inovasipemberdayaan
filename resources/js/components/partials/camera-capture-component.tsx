import { ButtonComponent } from '@/components/partials/button-component';
import { InputFileComponent } from '@/components/partials/input-component';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { compressImage } from '@/utils/compressImage';
import { CameraIcon, InfoIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/**
 * Input foto bukti yang membuka kamera langsung via getUserMedia
 * (permission kamera browser — desktop maupun mobile), lalu hasil
 * tangkapan dikompres di browser sebelum dikirim ke form.
 *
 * Fallback: kalau getUserMedia tidak tersedia atau permission ditolak,
 * selalu tersedia input file biasa (di HP memanggil kamera via capture).
 */
export const CameraCaptureComponent = ({
    label = 'Foto Bukti Kehadiran',
    name = 'photo',
    errors,
    helperText,
    handleOnChange = () => {},
}: {
    label?: string;
    name?: string;
    errors?: string | false;
    helperText?: string;
    handleOnChange?: (file: File) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [streamError, setStreamError] = useState('');
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedFile, setCapturedFile] = useState<File | null>(null);
    const [capturedPreview, setCapturedPreview] = useState('');

    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Jangan pernah meninggalkan track kamera menyala (berlaku juga saat unmount).
    useEffect(() => {
        return () => {
            stream?.getTracks().forEach((track) => track.stop());
        };
    }, [stream]);

    // Tempelkan stream ke elemen video da DialogContent sudah termount.
    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {
                // autoplay boleh gagal diam; video tetap terlihat saat live.
            });
        }
    });

    const stopStream = () => {
        stream?.getTracks().forEach((track) => track.stop());
        setStream(null);
        setStreamError('');
    };

    const capturePhoto = async () => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas.getContext('2d')?.drawImage(video, 0, 0);

        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92),
        );

        if (!blob) {
            setStreamError('Gagal mengambil foto dari kamera.');

            return;
        }

        const file = new File([blob], 'kamera.jpg', { type: 'image/jpeg' });
        const compressed = await compressImage(file);

        setCapturedFile(compressed);
        setCapturedPreview(URL.createObjectURL(compressed));

        handleOnChange(compressed);
    };

    const handleDialogChange = (next: boolean) => {
        setOpen(next);

        if (next) {
            startStream();
        } else {
            stopStream();
        }
    };

    const startStream = async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            setStreamError(
                'Browser tidak mendukung akses kamera. Silakan gunakan unggah file di bawah.',
            );

            return;
        }

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1920 } },
                audio: false,
            });
            setStream(mediaStream);
        } catch (error: any) {
            setStream(null);
            setStreamError(
                error?.name === 'NotAllowedError'
                    ? 'Izin kamera ditolak. Aktifkan izin kamera di browser, atau gunakan unggah file di bawah.'
                    : 'Kamera tidak dapat diakses. Silakan gunakan unggah file di bawah.',
            );
        }
    };

    return (
        <Field data-invalid={errors}>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>

            <div className="flex flex-col space-y-2">
                {capturedPreview ? (
                    <div className="flex items-center space-x-2">
                        <img
                            src={capturedPreview}
                            alt="Pratinjau foto bukti"
                            className="h-20 w-auto rounded-md border object-cover"
                        />
                        <span className="text-xs text-emerald-600">
                            Foto siap diunggah: {capturedFile?.name}
                        </span>
                    </div>
                ) : null}

                <div>
                    <ButtonComponent
                        buttonText={
                            capturedPreview ? 'Ambil Ulang Foto' : 'Ambil Foto'
                        }
                        addonLeft={CameraIcon}
                        buttonType="button"
                        onClick={() => handleDialogChange(true)}
                    />
                </div>

                <InputFileComponent
                    name={name}
                    accept="image/*"
                    capture="environment"
                    handleOnChange={async (file: File) => {
                        const compressed = await compressImage(file);
                        setCapturedFile(compressed);
                        setCapturedPreview(URL.createObjectURL(compressed));
                        handleOnChange(compressed);
                    }}
                />
            </div>

            {(errors || helperText) && (
                <FieldDescription
                    className={cn(
                        'flex items-center space-x-2',
                        errors ? 'text-red-500' : 'text-yellow-500',
                    )}
                >
                    <InfoIcon
                        className={cn(
                            'h-4 w-4',
                            errors ? 'text-red-500' : 'text-yellow-500',
                        )}
                    />
                    <span>
                        {errors
                            ? errors
                            : 'Live foto dari kamera; otomatis dikompres sebelum diunggah.'}
                    </span>
                </FieldDescription>
            )}

            <Dialog open={open} onOpenChange={handleDialogChange}>
                <DialogOverlay className="fixed inset-0 bg-black opacity-60" />
                <DialogContent className="max-w-2xl">
                    <DialogTitle className="text-xl font-semibold">
                        Ambil Foto dengan Kamera
                    </DialogTitle>
                    <DialogDescription>
                        Izinkan akses kamera di browser, lalu tekan Ambil Foto.
                        Hasilnya bisa diambil ulang sampai pas.
                    </DialogDescription>

                    <div className="overflow-hidden rounded-lg bg-black">
                        <video
                            ref={videoRef}
                            className={cn(
                                'max-h-[60vh] w-full object-contain',
                                !stream && 'hidden',
                            )}
                            autoPlay
                            playsInline
                            muted
                        />
                    </div>

                    {streamError ? (
                        <p className="text-sm text-red-500">{streamError}</p>
                    ) : null}

                    <div className="flex justify-end space-x-4">
                        <ButtonComponent
                            buttonText="Tutup"
                            buttonType="button"
                            onClick={() => handleDialogChange(false)}
                        />
                        <ButtonComponent
                            buttonText="Ambil Foto"
                            addonLeft={CameraIcon}
                            buttonType="button"
                            onClick={capturePhoto}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </Field>
    );
};
