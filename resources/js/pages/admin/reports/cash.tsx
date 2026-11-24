import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DatePickerComponent } from '@/components/partials/datePicker-component';
import { SelectComponent } from '@/components/partials/select-component';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/formatDate';
import { router, usePage } from '@inertiajs/react';
import {
    ArrowDownLeftIcon,
    ArrowUpRightIcon,
    DollarSignIcon,
    FilterIcon,
    PrinterIcon,
    RefreshCwIcon,
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

export default function CashReportPage() {
    const {
        kantors,
        fasilitators,
        groups,
        filters,
        summary,
        groupsSummary,
        cashTransactionsList,
    }: any = usePage<any>().props;

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

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/reports/cash',
            {
                ...(kantorId && { kantor_id: kantorId }),
                ...(fasilitatorId && { fasilitator_id: fasilitatorId }),
                ...(groupId && { group_id: groupId }),
                ...(startDate && { start_date: startDate }),
                ...(endDate && { end_date: endDate }),
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleReset = () => {
        setKantorId('');
        setFasilitatorId('');
        setGroupId('');
        setStartDate('');
        setEndDate('');
        router.get('/admin/reports/cash', {}, { preserveState: true });
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
            {/* Header & Filter Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-sidebar-border/50 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <WalletIcon className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                                Report Data Kas Kelompok
                            </h2>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Rekapitulasi keuangan kas masuk, pengeluaran kas, dan saldo berjalan per kelompok binaan per kantor cabang
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
                        Cetak Laporan Kas
                    </Button>
                </div>

                <form onSubmit={handleFilter} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
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

                    <div>
                        <DatePickerComponent
                            label="Dari Tanggal"
                            placeholder="Mulai"
                            value={startDate}
                            onChange={(val: any) => setStartDate(val || '')}
                        />
                    </div>

                    <div>
                        <DatePickerComponent
                            label="Sampai Tanggal"
                            placeholder="Selesai"
                            value={endDate}
                            onChange={(val: any) => setEndDate(val || '')}
                        />
                    </div>

                    <div className="flex gap-2 sm:col-span-2 lg:col-span-5 justify-end pt-2">
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

            {/* Stat Cards Keuangan */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Total Kas Masuk</span>
                        <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                            <ArrowDownLeftIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formatRupiah(summary?.total_cash_in || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Penyaluran modal, hasil penjualan, & iuran kelompok</p>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Total Kas Keluar</span>
                        <div className="rounded-md bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
                            <ArrowUpRightIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3 text-3xl font-bold text-rose-600 dark:text-rose-400">
                        {formatRupiah(summary?.total_cash_out || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Pembelian bahan baku, biaya operasional, & bagi hasil</p>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Saldo Kas Tersedia</span>
                        <div className="rounded-md bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                            <DollarSignIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className={`mt-3 text-3xl font-bold ${
                        (summary?.cash_balance || 0) >= 0
                            ? 'text-foreground'
                            : 'text-destructive'
                    }`}>
                        {formatRupiah(summary?.cash_balance || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Akumulasi saldo kas bersih saat ini</p>
                </div>
            </div>

            {/* Rekapitulasi Keuangan per Kelompok */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-xs">
                <div className="border-b border-sidebar-border/50 p-5">
                    <h3 className="text-base font-semibold text-foreground">
                        Rekapitulasi Saldo Keuangan per Kelompok Binaan
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12 text-center">No</TableHead>
                                <TableHead>Kelompok Binaan</TableHead>
                                <TableHead>Ketua Kelompok</TableHead>
                                <TableHead>Kantor Cabang</TableHead>
                                <TableHead>Fasilitator</TableHead>
                                <TableHead className="text-right">Total Kas Masuk</TableHead>
                                <TableHead className="text-right">Total Kas Keluar</TableHead>
                                <TableHead className="text-right">Saldo Kas</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(groupsSummary || []).length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-20 text-center text-muted-foreground">
                                        Tidak ada data kelompok binaan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                groupsSummary.map((item: any, idx: number) => (
                                    <TableRow key={item.group_id}>
                                        <TableCell className="text-center font-medium">{idx + 1}</TableCell>
                                        <TableCell className="font-semibold text-foreground">{item.group_name}</TableCell>
                                        <TableCell>{item.leader_name || '-'}</TableCell>
                                        <TableCell>{item.kantor_name}</TableCell>
                                        <TableCell>{item.fasilitator_name}</TableCell>
                                        <TableCell className="text-right font-medium text-emerald-600 dark:text-emerald-400">
                                            {formatRupiah(item.total_cash_in)}
                                        </TableCell>
                                        <TableCell className="text-right font-medium text-rose-600 dark:text-rose-400">
                                            {formatRupiah(item.total_cash_out)}
                                        </TableCell>
                                        <TableCell className={`text-right font-bold ${
                                            item.balance >= 0 ? 'text-foreground' : 'text-destructive'
                                        }`}>
                                            {formatRupiah(item.balance)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Daftar Lengkap Transaksi Kas */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-xs">
                <div className="border-b border-sidebar-border/50 p-5">
                    <h3 className="text-base font-semibold text-foreground">
                        Daftar Lengkap Mutasi Kas Kelompok
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12 text-center">No</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Jenis</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Kelompok</TableHead>
                                <TableHead>Fasilitator</TableHead>
                                <TableHead>Keterangan</TableHead>
                                <TableHead className="text-right">Nominal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(cashTransactionsList || []).length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                        Tidak ada data mutasi kas.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                cashTransactionsList.map((tx: any, idx: number) => (
                                    <TableRow key={tx.id}>
                                        <TableCell className="text-center font-medium">{idx + 1}</TableCell>
                                        <TableCell className="whitespace-nowrap font-medium">
                                            {formatDate(tx.transaction_date)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`text-xs ${
                                                    tx.type === 'in'
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-rose-500 text-white'
                                                }`}
                                            >
                                                {tx.type === 'in' ? 'Masuk' : 'Keluar'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{tx.category || '-'}</TableCell>
                                        <TableCell className="font-semibold text-foreground">
                                            {tx.group?.name || '-'}
                                        </TableCell>
                                        <TableCell>{tx.fasilitator?.name || '-'}</TableCell>
                                        <TableCell className="text-sm max-w-[280px]">
                                            {tx.description || '-'}
                                        </TableCell>
                                        <TableCell className={`text-right font-bold whitespace-nowrap ${
                                            tx.type === 'in'
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-rose-600 dark:text-rose-400'
                                        }`}>
                                            {tx.type === 'in' ? '+ ' : '- '}
                                            {formatRupiah(tx.amount)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
