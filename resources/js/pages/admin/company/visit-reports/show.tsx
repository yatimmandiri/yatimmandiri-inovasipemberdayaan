import { Card } from '@/components/ui/card';
import { VisitReportPhotoDialog } from '@/components/admin/visit-report-photo-dialog';
import { InfoIcon, ClipboardCheckIcon } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { renderStatusBadge } from '@/utils/visit-report-status';
import { VisitReportReviewForm } from '@/components/forms/admin/company/visit-report-review-form';
import { usePage } from '@inertiajs/react';

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
                                    Hasil Review
                                </span>
                                <span className="text-sm whitespace-pre-wrap">
                                    {visitReport.review_notes ?? '-'}
                                </span>
                                {visitReport.reviewer?.name ? (
                                    <span className="text-xs text-muted-foreground">
                                        Oleh {visitReport.reviewer.name},{' '}
                                        {formatDate(
                                            visitReport.reviewed_at,
                                            'datetime',
                                        )}
                                    </span>
                                ) : null}
                            </li>
                        ) : null}
                    </ul>
                </Card>
            </div>

            {visitReport.status === 'submitted' ? (
                <div className="rounded-xl border border-sidebar-border/70 p-4 md:p-6 dark:border-sidebar-border">
                    <div className="flex items-center space-x-2">
                        <ClipboardCheckIcon className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                            Review Laporan
                        </span>
                    </div>
                    <div className="mt-4">
                        <VisitReportReviewForm dataId={visitReport.id} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
