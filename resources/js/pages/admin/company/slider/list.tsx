import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowDate,
    renderRowHeader,
    renderRowImage,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import sliders from '@/routes/admin/companies/sliders';
import { formatDate } from '@/utils/formatDate';
import { useState } from 'react';

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState({});

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Title'),
            accessorKey: 'title',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Sub Title'),
            accessorKey: 'subtitle',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Url'),
            accessorKey: 'url',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Video Url'),
            accessorKey: 'video_url',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Featured Image'),
            accessorKey: 'featured_image',
            cell: (info: any) =>
                renderRowImage(info.getValue(), 'w-16 h-auto rounded-full'),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Created At'),
            accessorKey: 'created_at',
            cell: (info: any) => renderRowDate(info.getValue()),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Updated At'),
            accessorKey: 'updated_at',
            cell: (info: any) => renderRowDate(info.getValue()),
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Name: item.name,
            'Created At': formatDate(item.created_at),
            'Updated At': formatDate(item.updated_at),
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
                    urlFetchData={sliders.data().url}
                    formatDataExport={formatDataExport}
                >
                    <DataTableComponent buttonActive={{ export: false }} />
                </DataTableProvider>
            </div>
        </div>
    );
}
