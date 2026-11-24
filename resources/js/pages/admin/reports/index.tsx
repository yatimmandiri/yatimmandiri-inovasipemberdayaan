import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    ActivityIcon,
    ArrowDownLeftIcon,
    ArrowUpRightIcon,
    BarChart3Icon,
    CalendarDaysIcon,
    DownloadIcon,
    FilterIcon,
    RefreshCwIcon,
    UsersRoundIcon,
    WalletIcon,
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

export default function ReportsIndexPage() {
    const {
        fasilitators,
        groups,
        filters,
        summary,
        groupsSummary,
        cashTransactionsList,
        activitiesList,
    }: any = usePage<any>().props;

    const [fasilitatorId, setFasilitatorId] = useState(filters?.fasilitator_id || '');
    const [groupId, setGroupId] = useState(filters?.group_id || '');
    const [startDate, setStartDate] = useState(filters?.start_date || '');
    const [endDate, setEndDate] = useState(filters?.end_date || '');

    const filteredGroups = fasilitatorId
        ? (groups || []).filter(
              (g: any) => String(g.fasilitator_id) === String(fasilitatorId),
          )
        : groups || [];

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/reports',
            {
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
        setFasilitatorId('');
        setGroupId('');
        setStartDate('');
        setEndDate('');
        router.get('/admin/reports', {}, { preserveState: true });
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
            {/* Header & Filter Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-sidebar-border/50 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <BarChart3Icon className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                                Report Data Aktivitas & Kas Kelompok
                            </h2>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Rekapitulasi lengkap kegiatan pendampingan dan mutasi kas masuk/keluar per kelompok per fasilitator
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => window.print()}
                        className="gap-2"
                    >
                        <DownloadIcon className="h-4 w-4" />
                        Cetak / Unduh PDF
                    </Button>
                </div>

                <form onSubmit={handleFilter} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                            Fasilitator
                        </label>
                        <select
                            value={fasilitatorId}
                            onChange={(e) => {
                                setFasilitatorId(e.target.value);
                                setGroupId('');
                            }}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                        >
                            <option value="">Semua Fasilitator</option>
                            {(fasilitators || []).map((f: any) => (
                                <option key={f.id} value={f.id}>
                                    {f.name} {f.kantor_name ? `(${f.kantor_name})` : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                            Kelompok Binaan
                        </label>
                        <select
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                        >
                            <option value="">Semua Kelompok</option>
                            {filteredGroups.map((g: any) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                            Dari Tanggal
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">
                            Sampai Tanggal
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" size="default" className="flex-1 gap-1">
                            <FilterIcon className="h-4 w-4" />
                            Filter
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="default"
                            onClick={handleReset}
                            title="Reset Filter"
                        >
                            <RefreshCwIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>

            {/* Stat Cards Ringkasan */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Total Kas Masuk</span>
                        <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                            <ArrowDownLeftIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formatRupiah(summary?.total_cash_in || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Penyaluran modal, penjualan, & iuran</p>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Total Kas Keluar</span>
                        <div className="rounded-md bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
                            <ArrowUpRightIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3 text-2xl font-bold text-rose-600 dark:text-rose-400">
                        {formatRupiah(summary?.total_cash_out || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Bahan baku, operasional, & bagi hasil</p>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Saldo Kas Bersih</span>
                        <div className="rounded-md bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                            <WalletIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className={`mt-3 text-2xl font-bold ${
                        (summary?.cash_balance || 0) >= 0
                            ? 'text-foreground'
                            : 'text-destructive'
                    }`}>
                        {formatRupiah(summary?.cash_balance || 0)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Sisa saldo kas kelompok saat ini</p>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Aktivitas & Partisipan</span>
                        <div className="rounded-md bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                            <ActivityIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3 text-2xl font-bold text-foreground">
                        {summary?.total_activities || 0} Kegiatan
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Total {summary?.total_participants || 0} orang penerima manfaat hadir
                    </p>
                </div>
            </div>

            {/* Rekapitulasi Per Kelompok */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-xs">
                <div className="border-b border-sidebar-border/50 p-5">
                    <div className="flex items-center gap-2">
                        <UsersRoundIcon className="h-5 w-5 text-primary" />
                        <h3 className="text-base font-semibold text-foreground">
                            Rekapitulasi Saldo & Kegiatan per Kelompok Binaan
                        </h3>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12 text-center">No</TableHead>
                                <TableHead>Kelompok Binaan</TableHead>
                                <TableHead>Ketua Kelompok</TableHead>
                                <TableHead>Fasilitator Pendamping</TableHead>
                                <TableHead className="text-center">Jml Kegiatan</TableHead>
                                <TableHead className="text-right">Total Kas Masuk</TableHead>
                                <TableHead className="text-right">Total Kas Keluar</TableHead>
                                <TableHead className="text-right">Saldo Kas</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(groupsSummary || []).length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                        Tidak ada data kelompok binaan yang sesuai filter.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                groupsSummary.map((item: any, idx: number) => (
                                    <TableRow key={item.group_id}>
                                        <TableCell className="text-center font-medium">{idx + 1}</TableCell>
                                        <TableCell className="font-semibold text-foreground">{item.group_name}</TableCell>
                                        <TableCell>{item.leader_name || '-'}</TableCell>
                                        <TableCell>{item.fasilitator_name}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline">{item.activities_count} kali</Badge>
                                        </TableCell>
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

            {/* Rincian Transaksi Kas & Aktivitas Terakhir */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* 1. Riwayat Transaksi Kas */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-xs">
                    <div className="border-b border-sidebar-border/50 p-4">
                        <h4 className="text-sm font-semibold text-foreground">
                            Riwayat Transaksi Kas Masuk / Keluar
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tgl</TableHead>
                                    <TableHead>Jenis</TableHead>
                                    <TableHead>Kelompok / Fasilitator</TableHead>
                                    <TableHead className="text-right">Nominal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(cashTransactionsList || []).length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-20 text-center text-muted-foreground">
                                            Tidak ada transaksi kas.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cashTransactionsList.slice(0, 10).map((tx: any) => (
                                        <TableRow key={tx.id}>
                                            <TableCell className="text-xs whitespace-nowrap">
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
                                            <TableCell>
                                                <div className="text-xs font-medium text-foreground">
                                                    {tx.group?.name || '-'}
                                                </div>
                                                <div className="text-[11px] text-muted-foreground">
                                                    {tx.category || '-'} • {tx.fasilitator?.name || '-'}
                                                </div>
                                            </TableCell>
                                            <TableCell className={`text-right text-xs font-semibold whitespace-nowrap ${
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

                {/* 2. Riwayat Laporan Aktivitas */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-xs">
                    <div className="border-b border-sidebar-border/50 p-4">
                        <h4 className="text-sm font-semibold text-foreground">
                            Riwayat Aktivitas & Pendampingan
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tgl</TableHead>
                                    <TableHead>Kegiatan & Lokasi</TableHead>
                                    <TableHead>Kelompok / Fasilitator</TableHead>
                                    <TableHead className="text-center">Peserta</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(activitiesList || []).length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-20 text-center text-muted-foreground">
                                            Tidak ada aktivitas pendampingan.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    activitiesList.slice(0, 10).map((act: any) => (
                                        <TableRow key={act.id}>
                                            <TableCell className="text-xs whitespace-nowrap">
                                                {formatDate(act.activity_date)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-xs font-medium text-foreground line-clamp-1">
                                                    {act.title}
                                                </div>
                                                <div className="text-[11px] text-muted-foreground">
                                                    {act.type || 'Kegiatan'} • {act.location || '-'}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-xs font-medium text-foreground">
                                                    {act.group?.name || '-'}
                                                </div>
                                                <div className="text-[11px] text-muted-foreground">
                                                    {act.fasilitator?.name || '-'}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center text-xs">
                                                <Badge variant="secondary">
                                                    {act.participants_count || 0} org
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
