import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowHeader,
    renderRowImage,
    renderRowParagraph,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import newsRoutes from '@/routes/admin/news';
import { formatDate } from '@/utils/formatDate';
import { useState } from 'react';

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Image'),
            accessorKey: 'featured_image',
            cell: (info: any) =>
                renderRowImage(info.getValue(), 'h-12 w-20', true),
            enableSorting: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'Title'),
            accessorKey: 'title',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Category'),
            accessorKey: 'category',
            cell: (info: any) => info.getValue() || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Excerpt'),
            accessorKey: 'excerpt',
            cell: (info: any) => renderRowParagraph(info.getValue()),
            enableSorting: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'Published At'),
            accessorKey: 'published_at',
            cell: (info: any) =>
                info.getValue() ? formatDate(info.getValue(), 'date') : '-',
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Title: item.title,
            Category: item.category,
            'Published At': item.published_at
                ? formatDate(item.published_at, 'date')
                : '-',
        }));
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <DataTableProvider
                    columns={columns}
                    refreshData={refreshData}
                    setRefreshData={setRefreshData}
                    urlFetchData={newsRoutes.data().url}
                    formatDataExport={formatDataExport}
                    withActions={false}
                >
                    <DataTableComponent
                        buttonActive={{ create: false, export: false }}
                    />
                </DataTableProvider>
            </div>
        </div>
    );
}
