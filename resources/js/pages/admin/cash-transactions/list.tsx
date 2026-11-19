import { ButtonComponent } from '@/components/partials/button-component';
import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowDate,
    renderRowHeader,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import { InputTextComponent } from '@/components/partials/input-component';
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
import kas from '@/routes/admin/kas';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { FilterIcon, MoreHorizontal, RotateCcwIcon, TrashIcon } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const formatRupiah = (value: any) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 2,
    }).format(Number(value ?? 0));

export default function ListPage() {
    const { summary, perGroup, filterBranches, filterGroups }: any =
        usePage<any>().props;

    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState<Record<string, any>>({});

    const hasActiveFilter = Object.values(filterValue).some(Boolean);

    // Baris yang akan dihapus (konfirmasi lewat modal).
    const [deleterow, setDeleterow] = useState<any>(null);

    const handleDelete = () => {
        if (!deleterow) {
            return;
        }

        router.delete(kas.destroy(deleterow.id).url, {
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
                                    router.visit(kas.edit(data.id).url)
                                }
                            >
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
            header: (info: any) => renderRowHeader(info, 'Tanggal'),
            accessorKey: 'transaction_date',
            cell: (info: any) => renderRowDate(info.getValue()),
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
            header: (info: any) => renderRowHeader(info, 'Nama Kelompok'),
            accessorKey: 'group.name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Fasilitator'),
            accessorKey: 'facilitator.name',
            cell: (info: any) => info.getValue() || '—',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Keterangan Anggaran'),
            accessorKey: 'description',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Debit'),
            accessorKey: 'debit',
            cell: (info: any) => formatRupiah(info.getValue()),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Kredit'),
            accessorKey: 'credit',
            cell: (info: any) => formatRupiah(info.getValue()),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Saldo'),
            accessorKey: 'running_balance',
            cell: (info: any) => formatRupiah(info.getValue()),
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Tanggal: item.transaction_date,
            Cabang: item.branch?.name,
            'Nama Kelompok': item.group?.name,
            Fasilitator: item.facilitator?.name || '',
            'Keterangan Anggaran': item.description,
            Debit: item.debit,
            Kredit: item.credit,
            Saldo: item.running_balance,
        }));
    };

    return (
        <>
            <Head title="Pencatatan Kas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-end gap-4">
                    <Button
                        className="inline-flex items-center gap-2"
                        onClick={() => router.visit(kas.create().url)}
                    >
                        Tambah Transaksi Kas
                    </Button>
                </div>
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
                    <div className="w-52">
                        <SelectComponent
                            placeholder="Semua Kelompok"
                            data={[
                                { value: '', label: 'Semua Kelompok' },
                                ...(filterGroups?.map((item: any) => ({
                                    value: item.id,
                                    label: item.name,
                                })) ?? []),
                            ]}
                            dataSelected={filterValue.group_id ?? ''}
                            handleOnChange={(value: string) =>
                                setFilterValue((prev) => ({
                                    ...prev,
                                    group_id: value,
                                }))
                            }
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <InputTextComponent
                            type="date"
                            label=""
                            name="date_from"
                            value={filterValue.date_from ?? ''}
                            handleOnChange={(value: string) =>
                                setFilterValue((prev) => ({
                                    ...prev,
                                    date_from: value,
                                }))
                            }
                        />
                        <span className="text-xs text-muted-foreground">
                            s.d.
                        </span>
                        <InputTextComponent
                            type="date"
                            label=""
                            name="date_to"
                            value={filterValue.date_to ?? ''}
                            handleOnChange={(value: string) =>
                                setFilterValue((prev) => ({
                                    ...prev,
                                    date_to: value,
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
                {/* Ringkasan global */}
                <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                            <span className="text-sm text-muted-foreground">
                                Total Kas Masuk (Debit)
                            </span>
                            <span className="block text-2xl font-semibold">
                                {formatRupiah(summary?.total_debit ?? 0)}
                            </span>
                        </div>
                        <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                            <span className="text-sm text-muted-foreground">
                                Total Kas Keluar (Kredit)
                            </span>
                            <span className="block text-2xl font-semibold">
                                {formatRupiah(summary?.total_credit ?? 0)}
                            </span>
                        </div>
                        <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                            <span className="text-sm text-muted-foreground">
                                Saldo Keseluruhan
                            </span>
                            <span className="block text-2xl font-semibold">
                                {formatRupiah(summary?.saldo ?? 0)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Rekap saldo per kelompok/fasil */}
                <div className="rounded-xl border border-sidebar-border/70 p-4 md:p-6 dark:border-sidebar-border">
                    <h3 className="text-base font-semibold">
                        Rekap Saldo per Kelompok
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Lingkup saldo kas adalah per kelompok (akun
                        fasilitator); admin dapat memantau saldo semua fasil di
                        sini.
                    </p>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-sidebar-border/70 text-left">
                                    <th className="py-2 pr-4">Cabang</th>
                                    <th className="py-2 pr-4">Kelompok</th>
                                    <th className="py-2 pr-4">Fasilitator</th>
                                    <th className="py-2 pr-4">Debit</th>
                                    <th className="py-2 pr-4">Kredit</th>
                                    <th className="py-2">Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {perGroup?.length ? (
                                    perGroup.map((row: any) => (
                                        <tr
                                            key={row.group_id}
                                            className="border-b border-sidebar-border/50"
                                        >
                                            <td className="py-2 pr-4">
                                                {row.branch_name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {row.group_name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {row.fasilitator_name || '—'}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatRupiah(row.total_debit)}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {formatRupiah(row.total_credit)}
                                            </td>
                                            <td className="py-2 font-medium">
                                                {formatRupiah(row.saldo)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="py-4 text-center text-muted-foreground"
                                        >
                                            Belum ada transaksi kas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTableProvider
                        columns={columns}
                        filterValue={filterValue}
                        refreshData={refreshData}
                        setRefreshData={setRefreshData}
                        urlFetchData={kas.data().url}
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
                            Hapus Transaksi Kas
                        </DialogTitle>
                        <DialogDescription>
                            Yakin ingin menghapus transaksi ini? Saldo berjalan
                            kelompok terkait akan dihitung ulang otomatis.
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
