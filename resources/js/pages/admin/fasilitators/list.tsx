import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowDate,
    renderRowHeader,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import fasilitators from '@/routes/admin/fasilitators';
import { formatDate } from '@/utils/formatDate';
import { router } from '@inertiajs/react';
import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react';
import { useState } from 'react';

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState({});

    const renderRowStatus = (info: any) => {
        const handleStatus = (id: number) => {
            router.put(
                fasilitators.status(id).url,
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
            header: (info: any) => renderRowHeader(info, 'Nama Fasilitator'),
            accessorKey: 'name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Kantor / Cabang'),
            accessorKey: 'kantor_name',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Program Pemberdayaan'),
            accessorKey: 'programs',
            cell: (info: any) => {
                const programs = info.getValue() || [];
                if (programs.length === 0) return '-';
                return (
                    <div className="flex flex-wrap gap-1">
                        {programs.map((p: any) => (
                            <span
                                key={p.id}
                                className="inline-flex rounded-md bg-muted px-2 py-0.5 text-xs font-medium"
                            >
                                {p.name}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            header: (info: any) => renderRowHeader(info, 'No. HP / WA'),
            accessorKey: 'phone',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Email'),
            accessorKey: 'email',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Jml PM'),
            accessorKey: 'beneficiaries_count',
            cell: (info: any) => (
                <span className="font-semibold text-primary">
                    {info.getValue() ?? 0} Orang
                </span>
            ),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Wilayah'),
            accessorKey: 'regency.name',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Status'),
            accessorKey: 'status',
            cell: (info: any) => renderRowStatus(info),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Created At'),
            accessorKey: 'created_at',
            cell: (info: any) => renderRowDate(info.getValue()),
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Nama: item.name,
            Kantor: item.kantor_name || '-',
            Program: item.programs?.map((p: any) => p.name).join(', ') || '-',
            'No. HP': item.phone || '-',
            Email: item.email || '-',
            'Jml PM': item.beneficiaries_count || 0,
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
                    urlFetchData={fasilitators.data().url}
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
