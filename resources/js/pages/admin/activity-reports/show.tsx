import { Button } from '@/components/ui/button';
import activityReports from '@/routes/admin/activity-reports';
import { formatDate } from '@/utils/formatDate';
import { Link, usePage } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    CalendarDaysIcon,
    EditIcon,
    MapPinIcon,
    UsersRoundIcon,
} from 'lucide-react';

export default function ShowPage() {
    const { activityReport }: any = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative flex-1 space-y-6 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min md:p-6 dark:border-sidebar-border">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight">
                                {activityReport?.title}
                            </h2>
                            {activityReport?.type && (
                                <span className="inline-flex rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                                    {activityReport.type}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Kelompok:{' '}
                            <span className="font-medium text-foreground">
                                {activityReport?.group?.name || '-'}
                            </span>
                            <span className="mx-1">•</span>
                            Fasilitator:{' '}
                            <span className="font-medium text-foreground">
                                {activityReport?.fasilitator?.name || '-'}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={activityReports.index().url}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                            >
                                <ArrowLeftIcon className="h-4 w-4" /> Kembali
                            </Button>
                        </Link>
                        <Link href={activityReports.edit(activityReport?.id).url}>
                            <Button
                                size="sm"
                                className="flex items-center gap-1"
                            >
                                <EditIcon className="h-4 w-4" /> Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-foreground">
                            Informasi Kegiatan
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    Tanggal:{' '}
                                    {formatDate(activityReport?.activity_date)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UsersRoundIcon className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    Peserta:{' '}
                                    {activityReport?.participants_count ?? 0}{' '}
                                    Orang
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPinIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <span>{activityReport?.location || '-'}</span>
                            </div>
                            <div className="pt-2">
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                        activityReport?.status
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-rose-100 text-rose-800'
                                    }`}
                                >
                                    {activityReport?.status
                                        ? 'Aktif'
                                        : 'Non-Aktif'}
                                </span>
                            </div>
                        </div>

                        {activityReport?.description && (
                            <div className="border-t pt-3">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                                    Uraian Kegiatan
                                </h4>
                                <p className="mt-1 text-sm whitespace-pre-line text-foreground">
                                    {activityReport.description}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-foreground">
                            Dokumentasi
                        </h3>
                        {activityReport?.photo ? (
                            <a
                                href={`/storage/${activityReport.photo}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={`/storage/${activityReport.photo}`}
                                    alt={activityReport.title}
                                    className="max-h-80 w-full rounded-lg object-cover"
                                />
                            </a>
                        ) : (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                Belum ada foto dokumentasi untuk kegiatan ini.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
