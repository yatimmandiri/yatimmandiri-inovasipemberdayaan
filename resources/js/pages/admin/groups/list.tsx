import { ButtonComponent } from '@/components/partials/button-component';
import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import { renderRowHeader } from '@/components/partials/dataTables/utils/dataTable-utils';
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
import groups from '@/routes/admin/groups';
import { Head } from '@inertiajs/react';
import { FilterIcon, MoreHorizontal, PencilIcon, RotateCcwIcon, TrashIcon } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ListPage() {
    const { filterBranches }: any = usePage<any>().props;
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState<Record<string, any>>({});

    const hasActiveFilter = Object.values(filterValue).some(Boolean);

    // Baris yang akan dihapus (konfirmasi lewat modal).
    const [deleterow, setDeleterow] = useState<any>(null);

    const handleDelete = () => {
        if (!deleterow) {
            return;
        }

        router.delete(groups.destroy(deleterow.id).url, {
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
                                    router.visit(groups.show(data.id).url)
                                }
                            >
                                Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    router.visit(groups.edit(data.id).url)
                                }
                            >
                                <PencilIcon className="h-3 w-3" />
                                Edit
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
            header: (info: any) => renderRowHeader(info, 'Nama Kelompok'),
            accessorKey: 'name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Cabang'),
            accessorKey: 'branch.name',
            cell: (info: any) =>
                info.row.original.branch?.display_name ||
                info.row.original.branch?.name ||
                '—',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Fasilitator'),
            accessorKey: 'facilitator.name',
            cell: (info: any) => info.getValue() || '—',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Jumlah PM'),
            accessorKey: 'pms_count',
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            'Nama Kelompok': item.name,
            Cabang: item.branch?.name,
            Fasilitator: item.facilitator?.name || '',
            'Jumlah PM': item.pms_count,
        }));
    };

    return (
        <>
            <Head title="Kelompok Fasilitator" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Filter toolbar (server-side via filterValue + whitelist) */}
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-sidebar-border/70 p-3 dark:border-sidebar-border">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <FilterIcon className="h-3.5 w-3.5" />
                        <span>Filter:</span>
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
                <div className="flex flex-wrap items-center gap-4">
                    <Button
                        className="inline-flex items-center gap-2"
                        onClick={() => router.visit(groups.create().url)}
                    >
                        Buat Kelompok
                    </Button>
                </div>

                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTableProvider
                        columns={columns}
                        filterValue={filterValue}
                        refreshData={refreshData}
                        setRefreshData={setRefreshData}
                        urlFetchData={groups.data().url}
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
                            Hapus Kelompok
                        </DialogTitle>
                        <DialogDescription>
                            Yakin ingin menghapus kelompok ini? Kelompok yang
                            masih dipakai laporan/kas tidak dapat dihapus.
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
        </>
    );
}
