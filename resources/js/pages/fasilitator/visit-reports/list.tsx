import { ButtonComponent } from '@/components/partials/button-component';
import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowDate,
    renderRowHeader,
    renderRowImage,
} from '@/components/partials/dataTables/utils/dataTable-utils';
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
import { MoreHorizontal, TrashIcon } from 'lucide-react';
import visitReports from '@/routes/fasilitator/visit-reports';
import { renderStatusBadge } from '@/utils/visit-report-status';
import { formatDate } from '@/utils/formatDate';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue] = useState<object>({});

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
                            <DropdownMenuItem
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
            cell: (info: any) => renderStatusBadge(info.getValue()),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Foto'),
            accessorKey: 'photo',
            cell: (info: any) =>
                renderRowImage(info.getValue(), 'w-24 h-auto rounded-lg'),
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Program: item.program?.name,
            'Nama Event': item.event_name,
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
                        Yakin ingin menghapus laporan ini? Tindakan ini tidak
                        dapat dibatalkan.
                    </DialogDescription>
                    <div className="mt-4 flex justify-end space-x-4">
                        <ButtonComponent
                            buttonText="Batal"
                            buttonType="button"
                            onClick={() => setDeleterow(null)}
                        />
                        <ButtonComponent
                            buttonText="Delete"
                            addonLeft={TrashIcon}
                            buttonType="button"
                            onClick={handleDelete}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
