import { VisitReportPhotoDialog } from '@/components/admin/visit-report-photo-dialog';
import { ButtonComponent } from '@/components/partials/button-component';
import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowDate,
    renderRowHeader,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import { SelectComponent } from '@/components/partials/select-component';
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
import { CheckIcon, FilterIcon, MoreHorizontal, RotateCcwIcon } from 'lucide-react';
import visitReports from '@/routes/admin/visit-reports';
import { renderStatusBadge } from '@/utils/visit-report-status';
import { formatDate } from '@/utils/formatDate';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ListPage() {
    const { errors, programs, filterBranches }: any = usePage<any>().props;
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState<Record<string, any>>({});

    const hasActiveFilter = Object.values(filterValue).some(Boolean);

    // Baris yang sedang diminta revisi (untuk dialog catatan review).
    const [reviserow, setReviserow] = useState<any>(null);
    const [reviewNotes, setReviewNotes] = useState('');

    // Baris yang akan dihapus (konfirmasi lewat modal).
    const [deleterow, setDeleterow] = useState<any>(null);

    const handleDelete = () => {
        if (!deleterow) {
            return;
        }

        router.delete(visitReports.destroy(deleterow.id).url, {
            onSuccess: () => {
                setDeleterow(null);
                setRefreshData(true);
            },
        });
    };

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
                            {/* Koreksi data oleh admin; snapshot milik fasil
                                (group_id/fasilitator_id/status) dipertahankan. */}
                            <DropdownMenuItem
                                onClick={() =>
                                    router.visit(visitReports.edit(data.id).url)
                                }
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => setDeleterow(data)}
                            >
                                Delete
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
            {/* Filter toolbar (server-side via filterValue + whitelist) */}
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-sidebar-border/70 p-3 dark:border-sidebar-border">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <FilterIcon className="h-3.5 w-3.5" />
                    <span>Filter:</span>
                </div>
                <div className="w-44">
                    <SelectComponent
                        placeholder="Semua Status"
                        data={[
                            { value: '', label: 'Semua Status' },
                            { value: 'draft', label: 'Draft' },
                            { value: 'submitted', label: 'Submitted' },
                            { value: 'revised', label: 'Revised' },
                            { value: 'reviewed', label: 'Reviewed' },
                        ]}
                        dataSelected={filterValue.status ?? ''}
                        handleOnChange={(value: string) =>
                            setFilterValue((prev) => ({
                                ...prev,
                                status: value,
                            }))
                        }
                    />
                </div>
                <div className="w-48">
                    <SelectComponent
                        placeholder="Semua Program"
                        data={[
                            { value: '', label: 'Semua Program' },
                            ...(programs?.map((item: any) => ({
                                value: item.id,
                                label: item.name,
                            })) ?? []),
                        ]}
                        dataSelected={filterValue.program_id ?? ''}
                        handleOnChange={(value: string) =>
                            setFilterValue((prev) => ({
                                ...prev,
                                program_id: value,
                            }))
                        }
                    />
                </div>
                <div className="w-48">
                    <SelectComponent
                        placeholder="Semua Cabang"
                        data={[
                            { value: '', label: 'Semua Cabang' },
                            ...(filterBranches?.map((item: any) => ({
                                value: item.id,
                                label: item.label || item.name,
                            })) ?? []),
                        ]}
                        dataSelected={filterValue.branch_id ?? ''}
                        handleOnChange={(value: string) =>
                            setFilterValue((prev) => ({
                                ...prev,
                                branch_id: value,
                            }))
                        }
                    />
                </div>
                {hasActiveFilter ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 text-xs text-muted-foreground"
                        onClick={() => setFilterValue({})}
                    >
                        <RotateCcwIcon className="mr-1.5 h-3.5 w-3.5" />
                        Reset Filter
                    </Button>
                ) : null}
            </div>
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

            {/* Konfirmasi hapus laporan (koreksi admin; aksi tercatat di Log Activity). */}
            <Dialog
                open={!!deleterow}
                onOpenChange={(open) => (open ? null : setDeleterow(null))}
            >
                <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
                <DialogContent>
                    <DialogTitle className="text-xl font-semibold">
                        Hapus Laporan Monitoring Evaluasi
                    </DialogTitle>
                    <DialogDescription>
                        Hapus laporan &quot;{deleterow?.event_name}&quot; dari
                        fasilitator ini? Tindakan ini tercatat di Log Activity
                        dan tidak dapat dibatalkan.
                    </DialogDescription>
                    <div className="mt-4 flex justify-end space-x-4">
                        <ButtonComponent
                            buttonText="Batal"
                            buttonType="button"
                            onClick={() => setDeleterow(null)}
                        />
                        <ButtonComponent
                            buttonText="Delete"
                            buttonType="button"
                            onClick={handleDelete}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
