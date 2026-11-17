import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogTitle,
} from '@/components/ui/dialog';
import { ZoomInIcon, ZoomOutIcon, RefreshCcwDotIcon } from 'lucide-react';
import { useState } from 'react';

const MAX_SCALE = 4;
const MIN_SCALE = 1;

/**
 * Tombol "Lihat" foto bukti laporan pendampingan yang membuka modal
 * dengan zoom in/out (skala 1x-4x, langkah 0.5x per klik).
 */
export const VisitReportPhotoDialog = ({
    photo,
    className,
}: {
    photo: string | null | undefined;
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    const [scale, setScale] = useState(1);

    const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, s + 0.5));
    const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, s - 0.5));

    const handleOpenChange = (next: boolean) => {
        setOpen(next);

        if (!next) {
            setScale(1);
        }
    };

    if (!photo) {
        return <div className="text-gray-400 italic">No Image</div>;
    }

    return (
        <>
            <Button
                variant="outline"
                className={`h-7 px-3 text-xs ${className ?? ''}`}
                onClick={() => handleOpenChange(true)}
            >
                Lihat
            </Button>

            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogOverlay className="fixed inset-0 bg-black opacity-60" />
                <DialogContent className="max-w-4xl">
                    <DialogTitle className="text-xl font-semibold">
                        Foto Bukti Laporan
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Pratinjau foto bukti dengan zoom in dan zoom out.
                    </DialogDescription>
                    <div className="flex max-h-[70vh] items-center justify-center overflow-auto rounded-lg bg-black/5 p-2">
                        <img
                            src={`/storage/${photo}`}
                            alt="Foto Bukti"
                            className="max-h-[65vh] max-w-full rounded-lg transition-transform duration-200"
                            style={{ transform: `scale(${scale})` }}
                        />
                    </div>
                    <div className="mt-2 flex items-center justify-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={zoomOut}
                            disabled={scale <= MIN_SCALE}
                        >
                            <ZoomOutIcon className="h-4 w-4" />
                        </Button>
                        <span className="w-14 text-center text-sm">
                            {Math.round(scale * 100)}%
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={zoomIn}
                            disabled={scale >= MAX_SCALE}
                        >
                            <ZoomInIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setScale(1)}
                        >
                            <RefreshCcwDotIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
