import { VisitReportPhotoDialog } from '@/components/admin/visit-report-photo-dialog';
import { ButtonComponent } from '@/components/partials/button-component';
import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowDate,
    renderRowHeader,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CheckIcon, MoreHorizontal, RotateCcwIcon } from 'lucide-react';
import visitReports from '@/routes/admin/visit-reports';
import { renderStatusBadge } from '@/utils/visit-report-status';
import { formatDate } from '@/utils/formatDate';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ListPage() {
    const { errors }: any = usePage<any>().props;
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue] = useState<object>({});

    // Baris yang sedang diminta revisi (untuk dialog catatan review).
    const [reviserow, setReviserow] = useState<any>(null);
    const [reviewNotes, setReviewNotes] = useState('');

    const handleReview = (id: number, status: string, notes = '') => {
        router.put(
            visitReports.review(id).url,
            {
                status,
                review_notes: notes,
            },
            {
                onSuccess: () => {
                    setReviserow(null);
                    setReviewNotes('');
                    setRefreshData(true);
                },
            },
        );
    };

    const columns = [
        {
            id: 'actions',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                const data = info.row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    router.visit(visitReports.show(data.id).url)
                                }
                            >
                                Detail
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'Program'),
            accessorKey: 'program.name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Nama Event'),
            accessorKey: 'event_name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Fasilitator'),
            accessorKey: 'facilitator.name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Tanggal Kunjungan'),
            accessorKey: 'visit_date',
            cell: (info: any) => renderRowDate(info.getValue()),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Jam Pendampingan'),
            accessorKey: 'start_time',
            cell: (info: any) =>
                `${info.row.original.start_time} - ${info.row.original.end_time}`,
        },
        {
            header: (info: any) => renderRowHeader(info, 'PM Terlibat'),
            accessorKey: 'pm_count',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Status'),
            accessorKey: 'status',
            cell: (info: any) => {
                const data = info.row.original;

                return (
                    <div className="flex flex-col items-start space-y-1">
                        {renderStatusBadge(data.status)}

                        {data.status === 'submitted' ? (
                            <div className="flex items-center space-x-1">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-6 px-2 text-xs text-green-700 hover:bg-green-50"
                                    onClick={() =>
                                        handleReview(data.id, 'reviewed')
                                    }
                                >
                                    <CheckIcon className="h-3 w-3" />
                                    Setujui
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-6 px-2 text-xs text-orange-700 hover:bg-orange-50"
                                    onClick={() => setReviserow(data)}
                                >
                                    <RotateCcwIcon className="h-3 w-3" />
                                    Minta Revisi
                                </Button>
                            </div>
                        ) : null}
                    </div>
                );
            },
        },
        {
            header: (info: any) => renderRowHeader(info, 'Foto'),
            accessorKey: 'photo',
            cell: (info: any) => (
                <VisitReportPhotoDialog photo={info.getValue()} />
            ),
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Program: item.program?.name,
            'Nama Event': item.event_name,
            Fasilitator: item.facilitator?.name,
            'Tanggal Kunjungan': formatDate(item.visit_date),
            'Jam Pendampingan': `${item.start_time} - ${item.end_time}`,
            'PM Terlibat': item.pm_count,
            Status: item.status,
        }));
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <DataTableProvider
                    columns={columns}
                    filterValue={filterValue}
                    refreshData={refreshData}
                    setRefreshData={setRefreshData}
                    urlFetchData={visitReports.data().url}
                    formatDataExport={formatDataExport}
                >
                    <DataTableComponent buttonActive={{ export: false }} />
                </DataTableProvider>
            </div>

            {/* Dialog catatan review untuk shortcut Minta Revisi di tabel */}
            <Dialog
                open={!!reviserow}
                onOpenChange={(open) => (open ? null : setReviserow(null))}
            >
                <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
                <DialogContent>
                    <DialogTitle className="text-xl font-semibold">
                        Minta Revisi — Monitoring Evaluasi #{reviserow?.id}
                    </DialogTitle>
                    <DialogDescription>
                        Tuliskan catatan yang jelas agar fasilitator tahu bagian
                        mana yang perlu diperbaiki.
                    </DialogDescription>
                    <div className="mt-2 flex flex-col space-y-4">
                        <TextAreaComponent
                            label="Catatan Review (wajib)"
                            name="review_notes"
                            value={reviewNotes}
                            handleOnChange={(value: string) =>
                                setReviewNotes(value)
                            }
                            errors={errors.review_notes}
                            helperText={errors.review_notes}
                            color={errors.review_notes && 'danger'}
                        />
                        <div className="flex justify-end space-x-4">
                            <ButtonComponent
                                buttonText="Batal"
                                buttonType="button"
                                onClick={() => setReviserow(null)}
                            />
                            <ButtonComponent
                                buttonText="Minta Revisi"
                                addonLeft={RotateCcwIcon}
                                onClick={() =>
                                    handleReview(
                                        reviserow?.id,
                                        'revised',
                                        reviewNotes,
                                    )
                                }
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
