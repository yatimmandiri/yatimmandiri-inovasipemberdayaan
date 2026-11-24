import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import { DatePickerComponent } from '@/components/partials/datePicker-component';
import { SelectComponent } from '@/components/partials/select-component';
import { renderRowHeader } from '@/components/partials/dataTables/utils/dataTable-utils';
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
    CalendarDaysIcon,
    FilterIcon,
    PrinterIcon,
    RefreshCwIcon,
    UsersRoundIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function ActivitiesReportPage() {
    const {
        kantors,
        fasilitators,
        groups,
        filters,
        summary,
        groupsSummary,
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
            '/admin/reports/activities',
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
            '/admin/reports/activities',
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
            accessorKey: 'activity_date',
            cell: (info: any) => (
                <span className="whitespace-nowrap font-medium">
                    {formatDate(info.getValue())}
                </span>
            ),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Judul Kegiatan'),
            accessorKey: 'title',
            cell: (info: any) => (
                <span className="font-semibold text-foreground">
                    {info.getValue()}
                </span>
            ),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Jenis Kegiatan'),
            accessorKey: 'type',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Kelompok'),
            accessorKey: 'group_name',
            cell: (info: any) => info.row.original.group?.name || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Fasilitator'),
            accessorKey: 'fasilitator_name',
            cell: (info: any) => info.row.original.fasilitator?.name || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Lokasi'),
            accessorKey: 'location',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Peserta'),
            accessorKey: 'participants_count',
            cell: (info: any) => (
                <Badge variant="secondary" className="font-medium">
                    {info.getValue() || 0} Orang
                </Badge>
            ),
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Tanggal: formatDate(item.activity_date),
            'Judul Kegiatan': item.title,
            Jenis: item.type || '-',
            Kelompok: item.group?.name || '-',
            Fasilitator: item.fasilitator?.name || '-',
            Lokasi: item.location || '-',
            'Jumlah Peserta': item.participants_count || 0,
        }));
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
            {/* Header & Filter Card */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-sidebar-border/50 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <ActivityIcon className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                                Report Data Aktivitas Pemberdayaan
                            </h2>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Rekapitulasi pelaksanaan kegiatan pembinaan, pelatihan, dan monitoring kelompok per fasilitator
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
                        Cetak Laporan
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

                    {/* Rentang Tanggal di Kolom ke-4 */}
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

            {/* Stat Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Total Pelaksanaan Kegiatan</span>
                        <div className="rounded-md bg-primary/10 p-2 text-primary">
                            <CalendarDaysIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3 text-3xl font-bold text-foreground">
                        {summary?.total_activities || 0}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Total kegiatan pendampingan dan pembinaan terlaksana</p>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Total Kehadiran Partisipan</span>
                        <div className="rounded-md bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                            <UsersRoundIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3 text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {summary?.total_participants || 0} Orang
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Akumulasi penerima manfaat yang hadir dalam kegiatan</p>
                </div>
            </div>

            {/* Rekapitulasi per Kelompok Binaan */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-xs">
                <div className="border-b border-sidebar-border/50 p-5">
                    <h3 className="text-base font-semibold text-foreground">
                        Rekapitulasi Intensitas Kegiatan per Kelompok Binaan
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
                                <TableHead>Fasilitator Pendamping</TableHead>
                                <TableHead className="text-center">Total Kegiatan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(groupsSummary || []).length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-20 text-center text-muted-foreground">
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
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className="font-semibold">
                                                {item.activities_count} Kali
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Rincian Seluruh Riwayat Kegiatan dengan DataTableComponent */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-xs">
                <div className="border-b border-sidebar-border/50 p-5">
                    <h3 className="text-base font-semibold text-foreground">
                        Daftar Lengkap Kegiatan Pendampingan
                    </h3>
                </div>

                <div className="relative overflow-hidden">
                    <DataTableProvider
                        columns={columns}
                        filterValue={filterValue}
                        refreshData={refreshData}
                        setRefreshData={setRefreshData}
                        urlFetchData="/admin/reports/activities/data"
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
