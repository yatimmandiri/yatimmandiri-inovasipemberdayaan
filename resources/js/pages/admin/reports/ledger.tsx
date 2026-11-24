import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import { DatePickerComponent } from '@/components/partials/datePicker-component';
import { SelectComponent } from '@/components/partials/select-component';
import { renderRowHeader } from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { router, usePage } from '@inertiajs/react';
import {
    ArrowDownLeftIcon,
    ArrowUpRightIcon,
    BookOpenIcon,
    FilterIcon,
    PrinterIcon,
    RefreshCwIcon,
    ScaleIcon,
    WalletIcon,
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

export default function LedgerReportPage() {
    const {
        kantors,
        fasilitators,
        groups,
        filters,
        summary,
    }: any = usePage<any>().props;

    const [refreshData, setRefreshData] = useState(false);
    const [kantorId, setKantorId] = useState(filters?.kantor_id || '');
    const [fasilitatorId, setFasilitatorId] = useState(filters?.fasilitator_id || '');
    const [groupId, setGroupId] = useState(filters?.group_id || '');
    const [startDate, setStartDate] = useState(filters?.start_date || '');
    const [endDate, setEndDate] = useState(filters?.end_date || '');

    const filteredFasilitators = useMemo(() => {
        if (!kantorId) return fasilitators || [];
        return (fasilitators || []).filter(
            (f: any) => String(f.kantor_id) === String(kantorId),
        );
    }, [fasilitators, kantorId]);

    const filteredGroups = useMemo(() => {
        let result = groups || [];
        if (kantorId) {
            result = result.filter(
                (g: any) => String(g.kantor_id) === String(kantorId),
            );
        }
        if (fasilitatorId) {
            result = result.filter(
                (g: any) => String(g.fasilitator_id) === String(fasilitatorId),
            );
        }
        return result;
    }, [groups, kantorId, fasilitatorId]);

    const filterValue = useMemo(() => {
        return {
            ...(kantorId && { kantor_id: kantorId }),
            ...(fasilitatorId && { fasilitator_id: fasilitatorId }),
            ...(groupId && { group_id: groupId }),
            ...(startDate && { start_date: startDate }),
            ...(endDate && { end_date: endDate }),
        };
    }, [kantorId, fasilitatorId, groupId, startDate, endDate]);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/reports/ledger',
            filterValue,
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setRefreshData(true);
                },
            },
        );
    };

    const handleReset = () => {
        setKantorId('');
        setFasilitatorId('');
        setGroupId('');
        setStartDate('');
        setEndDate('');
        router.get(
            '/admin/reports/ledger',
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setRefreshData(true);
                },
            },
        );
    };

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Tanggal'),
            accessorKey: 'transaction_date',
            cell: (info: any) => (
                <span className="whitespace-nowrap font-medium">
                    {formatDate(info.getValue())}
                </span>
            ),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Kelompok'),
            accessorKey: 'group_name',
            cell: (info: any) => (
                <span className="font-semibold text-foreground">
                    {info.row.original.group?.name || '-'}
                </span>
            ),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Keterangan Transaksi'),
            accessorKey: 'description',
            cell: (info: any) => (
                <div className="flex flex-col gap-0.5 max-w-[280px]">
                    <span className="text-sm font-medium text-foreground line-clamp-2">
                        {info.getValue() || '-'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Kategori: {info.row.original.category || '-'}
                    </span>
                </div>
            ),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Fasilitator'),
            accessorKey: 'fasilitator_name',
            cell: (info: any) => info.row.original.fasilitator?.name || '-',
        },
        {
            header: (info: any) => (
                <div className="text-right w-full font-semibold text-emerald-600 dark:text-emerald-400">
                    Kas Masuk (Debit)
                </div>
            ),
            accessorKey: 'cash_in',
            cell: (info: any) => {
                const val = Number(info.getValue() || 0);
                if (val <= 0) return <span className="text-muted-foreground/50 text-right block">-</span>;
                return (
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-right block whitespace-nowrap">
                        + {formatRupiah(val)}
                    </span>
                );
            },
        },
        {
            header: (info: any) => (
                <div className="text-right w-full font-semibold text-rose-600 dark:text-rose-400">
                    Kas Keluar (Kredit)
                </div>
            ),
            accessorKey: 'cash_out',
            cell: (info: any) => {
                const val = Number(info.getValue() || 0);
                if (val <= 0) return <span className="text-muted-foreground/50 text-right block">-</span>;
                return (
                    <span className="font-semibold text-rose-600 dark:text-rose-400 text-right block whitespace-nowrap">
                        - {formatRupiah(val)}
                    </span>
                );
            },
        },
        {
            header: (info: any) => (
                <div className="text-right w-full font-semibold text-foreground">
                    Saldo Berjalan
                </div>
            ),
            accessorKey: 'running_balance',
            cell: (info: any) => {
                const val = Number(info.getValue() || 0);
                return (
                    <span className={`font-bold text-right block whitespace-nowrap ${
                        val >= 0 ? 'text-foreground' : 'text-destructive'
                    }`}>
                        {formatRupiah(val)}
                    </span>
                );
            },
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Tanggal: formatDate(item.transaction_date),
            Kelompok: item.group?.name || '-',
            Fasilitator: item.fasilitator?.name || '-',
            Kategori: item.category || '-',
            Keterangan: item.description || '-',
            'Kas Masuk (Debit)': item.cash_in,
            'Kas Keluar (Kredit)': item.cash_out,
            'Saldo Berjalan': item.running_balance,
        }));
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
            {/* Header & Filter Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-sidebar-border/50 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <BookOpenIcon className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                                Report Buku Besar Kas (General Ledger)
                            </h2>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Pencatatan mutasi kas komprehensif dengan saldo awal (dari akumulasi transaksi sebelum periode), mutasi berjalan, dan saldo akhir
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => window.print()}
                        className="gap-2"
                    >
                        <PrinterIcon className="h-4 w-4" />
                        Cetak Buku Besar
                    </Button>
                </div>

                {/* 4 Kolom Grid Filter */}
                <form onSubmit={handleFilter} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
                    <div>
                        <SelectComponent
                            label="Kantor Cabang"
                            placeholder="Semua Kantor"
                            value={kantorId}
                            onChange={(val: any) => {
                                setKantorId(val || '');
                                setFasilitatorId('');
                                setGroupId('');
                            }}
                            data={(kantors || []).map((k: any) => ({
                                value: k.id,
                                label: k.name || k.nama,
                            }))}
                        />
                    </div>

                    <div>
                        <SelectComponent
                            label="Fasilitator"
                            placeholder="Semua Fasilitator"
                            value={fasilitatorId}
                            onChange={(val: any) => {
                                setFasilitatorId(val || '');
                                setGroupId('');
                            }}
                            data={filteredFasilitators.map((f: any) => ({
                                value: f.id,
                                label: f.name,
                            }))}
                        />
                    </div>

                    <div>
                        <SelectComponent
                            label="Kelompok Binaan"
                            placeholder="Semua Kelompok"
                            value={groupId}
                            onChange={(val: any) => setGroupId(val || '')}
                            data={filteredGroups.map((g: any) => ({
                                value: g.id,
                                label: g.name,
                            }))}
                        />
                    </div>

                    {/* Rentang Periode di Kolom ke-4 */}
                    <div className="grid grid-cols-2 gap-2">
                        <DatePickerComponent
                            label="Dari Tanggal"
                            placeholder="Mulai"
                            value={startDate}
                            onChange={(val: any) => setStartDate(val || '')}
                        />
                        <DatePickerComponent
                            label="Sampai"
                            placeholder="Selesai"
                            value={endDate}
                            onChange={(val: any) => setEndDate(val || '')}
                        />
                    </div>

                    <div className="flex gap-2 sm:col-span-2 lg:col-span-4 justify-end pt-2">
                        <Button type="submit" size="default" className="gap-1.5 px-6">
                            <FilterIcon className="h-4 w-4" />
                            Terapkan Filter
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="default"
                            onClick={handleReset}
                            title="Reset Filter"
                        >
                            <RefreshCwIcon className="h-4 w-4 mr-1" />
                            Reset
                        </Button>
                    </div>
                </form>
            </div>

            {/* Stat Cards Ringkasan Saldo Buku Besar */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* 1. Saldo Awal */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Saldo Awal (Bulan Lalu)</span>
                        <div className="rounded-md bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                            <ScaleIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className={`mt-3 text-2xl font-bold ${
                        (summary?.opening_balance || 0) >= 0 ? 'text-foreground' : 'text-destructive'
                    }`}>
                        {formatRupiah(summary?.opening_balance || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Saldo akhir sebelum tanggal {startDate ? formatDate(startDate) : '-'}</p>
                </div>

                {/* 2. Total Kas Masuk Periode Ini */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Total Kas Masuk (Debit)</span>
                        <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                            <ArrowDownLeftIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formatRupiah(summary?.period_in || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Penerimaan kas selama periode dipilih</p>
                </div>

                {/* 3. Total Kas Keluar Periode Ini */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Total Kas Keluar (Kredit)</span>
                        <div className="rounded-md bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
                            <ArrowUpRightIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3 text-2xl font-bold text-rose-600 dark:text-rose-400">
                        {formatRupiah(summary?.period_out || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Pengeluaran kas selama periode dipilih</p>
                </div>

                {/* 4. Saldo Akhir */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Saldo Akhir</span>
                        <div className="rounded-md bg-primary/10 p-2 text-primary">
                            <WalletIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className={`mt-3 text-2xl font-bold ${
                        (summary?.closing_balance || 0) >= 0 ? 'text-primary' : 'text-destructive'
                    }`}>
                        {formatRupiah(summary?.closing_balance || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Saldo Awal + Masuk - Keluar</p>
                </div>
            </div>

            {/* Rincian Buku Besar dengan DataTableComponent */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-xs">
                <div className="border-b border-sidebar-border/50 p-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-base font-semibold text-foreground">
                            Buku Kas / Jurnal Mutasi Berjalan
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Saldo awal periode: <strong className="text-foreground">{formatRupiah(summary?.opening_balance || 0)}</strong>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                            Periode: {formatDate(startDate)} s/d {formatDate(endDate)}
                        </Badge>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <DataTableProvider
                        columns={columns}
                        filterValue={filterValue}
                        refreshData={refreshData}
                        setRefreshData={setRefreshData}
                        urlFetchData="/admin/reports/ledger/data"
                        formatDataExport={formatDataExport}
                        withActions={false}
                    >
                        <DataTableComponent
                            buttonActive={{
                                create: false,
                                export: true,
                            }}
                        />
                    </DataTableProvider>
                </div>
            </div>
        </div>
    );
}
