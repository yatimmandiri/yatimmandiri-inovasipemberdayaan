import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import { DatePickerComponent } from '@/components/partials/datePicker-component';
import { SelectComponent } from '@/components/partials/select-component';
import { renderRowHeader } from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import activityReports from '@/routes/admin/activity-reports';
import { formatDate } from '@/utils/formatDate';
import { router, usePage } from '@inertiajs/react';
import { BadgeCheckIcon, BadgeXIcon, FilterIcon, RefreshCwIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function ListPage() {
    const { kantors, fasilitators, groups }: any = usePage<any>().props;
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
                activityReports.status(id).url,
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

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Tanggal'),
            accessorKey: 'activity_date',
            cell: (info: any) => formatDate(info.getValue()),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Judul Kegiatan'),
            accessorKey: 'title',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Jenis Kegiatan'),
            accessorKey: 'type',
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
            header: (info: any) => renderRowHeader(info, 'Lokasi'),
            accessorKey: 'location',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Jumlah Peserta'),
            accessorKey: 'participants_count',
            cell: (info: any) => `${info.getValue() ?? 0} Orang`,
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
            Tanggal: formatDate(item.activity_date),
            Kegiatan: item.title,
            Jenis: item.type || '-',
            Kelompok: item.group?.name || '-',
            Fasilitator: item.fasilitator?.name || '-',
            Lokasi: item.location || '-',
            Peserta: item.participants_count || 0,
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
                        <span>Filter Transaksi Aktivitas</span>
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

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                    urlFetchData={activityReports.data().url}
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
