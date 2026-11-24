import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import { renderRowHeader } from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import cashTransactions from '@/routes/admin/cash-transactions';
import { formatDate } from '@/utils/formatDate';
import { router } from '@inertiajs/react';
import {
    ArrowDownLeftIcon,
    ArrowUpRightIcon,
    BadgeCheckIcon,
    BadgeXIcon,
} from 'lucide-react';
import { useState } from 'react';

const formatRupiah = (val: number | string) => {
    const num = Number(val || 0);
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(num);
};

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState({});

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

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
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
