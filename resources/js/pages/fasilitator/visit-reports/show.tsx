import visitReports from '@/routes/fasilitator/visit-reports';
import { Link, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { VisitReportPhotoDialog } from '@/components/admin/visit-report-photo-dialog';
import { InfoIcon } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { renderStatusBadge } from '@/utils/visit-report-status';

export default function DetailPage() {
    const { visitReport } = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <Card className="min-h-full p-4 md:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <InfoIcon className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                                Detail Laporan Monitoring Evaluasi
                            </span>
                        </div>
                        {renderStatusBadge(visitReport.status)}
                    </div>
                    <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Program
                            </span>
                            <span className="text-sm">
                                {visitReport.program?.name}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Nama Event
                            </span>
                            <span className="text-sm">
                                {visitReport.event_name}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Fasilitator
                            </span>
                            <span className="text-sm">
                                {visitReport.facilitator?.name}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Hari/Tanggal
                            </span>
                            <span className="text-sm">
                                {formatDate(visitReport.visit_date, 'long')}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Jam Pendampingan
                            </span>
                            <span className="text-sm">
                                {visitReport.start_time} -{' '}
                                {visitReport.end_time}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Penerima Manfaat Terlibat
                            </span>
                            <span className="text-sm">
                                {visitReport.pm_count}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Foto Bukti
                            </span>
                            {visitReport.photo ? (
                                <VisitReportPhotoDialog
                                    photo={visitReport.photo}
                                />
                            ) : (
                                <span className="text-sm">No Image</span>
                            )}
                        </li>
                        <li className="flex flex-col space-y-2 md:col-span-2">
                            <span className="text-sm font-semibold">
                                Isi Kegiatan
                            </span>
                            <span className="text-sm whitespace-pre-wrap">
                                {visitReport.activity_description}
                            </span>
                        </li>
                        <li className="flex flex-col space-y-2 md:col-span-2">
                            <span className="text-sm font-semibold">
                                Kendala yang Dihadapi
                            </span>
                            <span className="text-sm whitespace-pre-wrap">
                                {visitReport.obstacles ?? '-'}
                            </span>
                        </li>
                        {visitReport.status === 'revised' ||
                        visitReport.status === 'reviewed' ? (
                            <li className="flex flex-col space-y-2 md:col-span-2">
                                <span className="text-sm font-semibold">
                                    Catatan Review Administrator
                                </span>
                                <span className="text-sm whitespace-pre-wrap">
                                    {visitReport.review_notes ?? '-'}
                                </span>
                                {visitReport.reviewed_at ? (
                                    <span className="text-xs text-muted-foreground">
                                        Diperiksa{' '}
                                        {formatDate(
                                            visitReport.reviewed_at,
                                            'datetime',
                                        )}
                                    </span>
                                ) : null}
                            </li>
                        ) : null}
                    </ul>
                    {visitReport.status === 'draft' ||
                    visitReport.status === 'revised' ? (
                        <div className="mt-6 flex justify-end">
                            <Link
                                href={visitReports.edit(visitReport.id).url}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                                prefetch
                            >
                                Edit Laporan
                            </Link>
                        </div>
                    ) : null}
                </Card>
            </div>
        </div>
    );
}
