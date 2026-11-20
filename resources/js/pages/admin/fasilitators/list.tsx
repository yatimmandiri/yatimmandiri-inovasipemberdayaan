import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowBoolean,
    renderRowDate,
    renderRowHeader,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import fasilitators from '@/routes/admin/fasilitators';
import { formatDate } from '@/utils/formatDate';
import { useState } from 'react';

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState({});

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Nama Fasilitator'),
            accessorKey: 'name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Program'),
            accessorKey: 'program.name',
            cell: (info: any) => info.getValue() || '-',
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
            cell: (info: any) =>
                renderRowBoolean(info.row.original, 'status', fasilitators.status(info.row.original.id).url, setRefreshData),
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
            Program: item.program?.name || '-',
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
