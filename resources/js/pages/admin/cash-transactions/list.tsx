import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import { DatePickerComponent } from '@/components/partials/datePicker-component';
import { SelectComponent } from '@/components/partials/select-component';
import { renderRowHeader } from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import cashTransactions from '@/routes/admin/cash-transactions';
import { formatDate } from '@/utils/formatDate';
import { router, usePage } from '@inertiajs/react';
import {
    ArrowDownLeftIcon,
    ArrowUpRightIcon,
    BadgeCheckIcon,
    BadgeXIcon,
    FilterIcon,
    RefreshCwIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const formatRupiah = (val: number | string) => {
    const num = Number(val || 0);
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(num);
};

export default function ListPage() {
    const { kantors, fasilitators, groups, categories }: any = usePage<any>().props;
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState<any>({});

    const filteredFasilitators = useMemo(() => {
        if (!filterValue?.kantor_id) return fasilitators || [];
        return (fasilitators || []).filter(
            (f: any) => String(f.kantor_id) === String(filterValue.kantor_id),
        );
    }, [fasilitators, filterValue?.kantor_id]);

    const filteredGroups = useMemo(() => {
        let result = groups || [];
        if (filterValue?.kantor_id) {
            result = result.filter(
                (g: any) => String(g.kantor_id) === String(filterValue.kantor_id),
            );
        }
        if (filterValue?.fasilitator_id) {
            result = result.filter(
                (g: any) => String(g.fasilitator_id) === String(filterValue.fasilitator_id),
            );
        }
        return result;
    }, [groups, filterValue?.kantor_id, filterValue?.fasilitator_id]);

    const renderRowStatus = (info: any) => {
        const handleStatus = (id: number) => {
            router.put(
                cashTransactions.status(id).url,
                {},
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setRefreshData(true);
                        router.reload({ only: ['flash'] });
                    },
                },
            );
        };

        return info.getValue() ? (
            <Badge
                className="cursor-pointer bg-blue-500 text-white dark:bg-blue-600"
                onClick={() => handleStatus(info.row.original.id)}
                variant="default"
            >
                <BadgeCheckIcon className="mr-1 h-3.5 w-3.5" />
                Active
            </Badge>
        ) : (
            <Badge
                className="cursor-pointer"
                onClick={() => handleStatus(info.row.original.id)}
                variant="destructive"
            >
                <BadgeXIcon className="mr-1 h-3.5 w-3.5" />
                Deactive
            </Badge>
        );
    };

    const renderRowType = (type: string) => {
        return type === 'in' ? (
            <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600">
                <ArrowDownLeftIcon className="mr-1 h-3.5 w-3.5" />
                Kas Masuk
            </Badge>
        ) : (
            <Badge className="bg-rose-500 text-white hover:bg-rose-600 dark:bg-rose-600">
                <ArrowUpRightIcon className="mr-1 h-3.5 w-3.5" />
                Kas Keluar
            </Badge>
        );
    };

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Tanggal'),
            accessorKey: 'transaction_date',
            cell: (info: any) => formatDate(info.getValue()),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Jenis'),
            accessorKey: 'type',
            cell: (info: any) => renderRowType(info.getValue()),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Nominal'),
            accessorKey: 'amount',
            cell: (info: any) => {
                const isIncome = info.row.original.type === 'in';
                return (
                    <span
                        className={`font-semibold ${
                            isIncome
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                        }`}
                    >
                        {isIncome ? '+ ' : '- '}
                        {formatRupiah(info.getValue())}
                    </span>
                );
            },
        },
        {
            header: (info: any) => renderRowHeader(info, 'Kategori'),
            accessorKey: 'category',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Kelompok'),
            accessorKey: 'group.name',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Fasilitator'),
            accessorKey: 'fasilitator.name',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Keterangan'),
            accessorKey: 'description',
            cell: (info: any) => {
                const val = info.getValue();
                return val ? (
                    <span className="line-clamp-1 max-w-[200px]" title={val}>
                        {val}
                    </span>
                ) : (
                    '-'
                );
            },
        },
        {
            header: (info: any) => renderRowHeader(info, 'Status'),
            accessorKey: 'status',
            cell: (info: any) => renderRowStatus(info),
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Tanggal: formatDate(item.transaction_date),
            Jenis: item.type === 'in' ? 'Kas Masuk' : 'Kas Keluar',
            Nominal: item.amount,
            Kategori: item.category || '-',
            Kelompok: item.group?.name || '-',
            Fasilitator: item.fasilitator?.name || '-',
            Keterangan: item.description || '-',
            Status: item.status ? 'Aktif' : 'Non-Aktif',
            'Created At': formatDate(item.created_at),
        }));
    };

    const handleResetFilter = () => {
        setFilterValue({});
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            {/* Filter Toolbar */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-4 shadow-xs">
                <div className="mb-3 flex items-center justify-between border-b border-sidebar-border/50 pb-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <FilterIcon className="h-4 w-4 text-primary" />
                        <span>Filter Transaksi Kas</span>
                    </div>
                    {Object.keys(filterValue).length > 0 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleResetFilter}
                            className="h-7 text-xs text-muted-foreground gap-1 hover:text-foreground"
                        >
                            <RefreshCwIcon className="h-3 w-3" />
                            Reset Filter
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    <SelectComponent
                        label="Kantor Cabang"
                        placeholder="Semua Kantor"
                        value={filterValue?.kantor_id || ''}
                        onChange={(val: any) => {
                            setFilterValue((prev: any) => ({
                                ...prev,
                                kantor_id: val || undefined,
                                fasilitator_id: undefined,
                                group_id: undefined,
                            }));
                        }}
                        data={(kantors || []).map((k: any) => ({
                            value: k.id,
                            label: k.name || k.nama,
                        }))}
                    />

                    <SelectComponent
                        label="Jenis Kas"
                        placeholder="Semua Jenis"
                        value={filterValue?.type || ''}
                        onChange={(val: any) => {
                            setFilterValue((prev: any) => ({
                                ...prev,
                                type: val || undefined,
                            }));
                        }}
                        data={[
                            { value: 'in', label: 'Kas Masuk' },
                            { value: 'out', label: 'Kas Keluar' },
                        ]}
                    />

                    <SelectComponent
                        label="Fasilitator"
                        placeholder="Semua Fasilitator"
                        value={filterValue?.fasilitator_id || ''}
                        onChange={(val: any) => {
                            setFilterValue((prev: any) => ({
                                ...prev,
                                fasilitator_id: val || undefined,
                                group_id: undefined,
                            }));
                        }}
                        data={filteredFasilitators.map((f: any) => ({
                            value: f.id,
                            label: f.name,
                        }))}
                    />

                    <SelectComponent
                        label="Kelompok Binaan"
                        placeholder="Semua Kelompok"
                        value={filterValue?.group_id || ''}
                        onChange={(val: any) => {
                            setFilterValue((prev: any) => ({
                                ...prev,
                                group_id: val || undefined,
                            }));
                        }}
                        data={filteredGroups.map((g: any) => ({
                            value: g.id,
                            label: g.name,
                        }))}
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <DatePickerComponent
                            label="Dari Tanggal"
                            placeholder="Mulai"
                            value={filterValue?.start_date || ''}
                            onChange={(val: any) => {
                                setFilterValue((prev: any) => ({
                                    ...prev,
                                    start_date: val || undefined,
                                }));
                            }}
                        />
                        <DatePickerComponent
                            label="Sampai Tanggal"
                            placeholder="Selesai"
                            value={filterValue?.end_date || ''}
                            onChange={(val: any) => {
                                setFilterValue((prev: any) => ({
                                    ...prev,
                                    end_date: val || undefined,
                                }));
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <DataTableProvider
                    columns={columns}
                    filterValue={filterValue}
                    refreshData={refreshData}
                    setRefreshData={setRefreshData}
                    urlFetchData={cashTransactions.data().url}
                    formatDataExport={formatDataExport}
                >
                    <DataTableComponent
                        buttonActive={{
                            create: true,
                            export: true,
                        }}
                    />
                </DataTableProvider>
            </div>
        </div>
    );
}
