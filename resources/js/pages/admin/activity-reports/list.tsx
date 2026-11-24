import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import { SelectComponent } from '@/components/partials/select-component';
import { renderRowHeader } from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import activityReports from '@/routes/admin/activity-reports';
import { formatDate } from '@/utils/formatDate';
import { router, usePage } from '@inertiajs/react';
import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react';
import { useState } from 'react';

export default function ListPage() {
    const { kantors }: any = usePage<any>().props;
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState<any>({});

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

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sidebar-border/70 bg-card p-4 shadow-xs">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">Filter Kantor:</span>
                    <div className="w-full sm:w-72">
                        <SelectComponent
                            placeholder="Pilih Kantor Cabang..."
                            value={filterValue?.kantor_id || ''}
                            onChange={(val: any) => {
                                setFilterValue((prev: any) => ({
                                    ...prev,
                                    kantor_id: val || undefined,
                                }));
                            }}
                            data={(kantors || []).map((k: any) => ({
                                value: k.id,
                                label: k.name || k.nama,
                            }))}
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
