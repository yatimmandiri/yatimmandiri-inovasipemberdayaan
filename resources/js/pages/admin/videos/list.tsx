import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowHeader,
    renderRowImage,
    renderRowParagraph,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/formatDate';
import { router } from '@inertiajs/react';
import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react';
import { useState } from 'react';

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Thumbnail'),
            accessorKey: 'thumbnail_url',
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
            header: (info: any) => renderRowHeader(info, 'YouTube URL'),
            accessorKey: 'youtube_url',
            cell: (info: any) => (
                <a
                    href={info.getValue()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 hover:underline"
                >
                    Open video
                </a>
            ),
            enableSorting: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'Description'),
            accessorKey: 'description',
            cell: (info: any) => renderRowParagraph(info.getValue()),
            enableSorting: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'Published At'),
            accessorKey: 'published_at',
            cell: (info: any) =>
                info.getValue() ? formatDate(info.getValue(), 'date') : '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Status'),
            accessorKey: 'status',
            cell: (info: any) => {
                const active = Boolean(info.getValue());

                return (
                    <Badge
                        className="cursor-pointer"
                        variant={active ? 'default' : 'destructive'}
                        onClick={() =>
                            router.put(
                                `/admin/videos/${info.row.original.id}/status`,
                                {},
                                {
                                    preserveScroll: true,
                                    onSuccess: () => setRefreshData(true),
                                },
                            )
                        }
                    >
                        {active ? <BadgeCheckIcon /> : <BadgeXIcon />}
                        {active ? 'Active' : 'Inactive'}
                    </Badge>
                );
            },
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Title: item.title,
            Category: item.category,
            'YouTube URL': item.youtube_url,
            Status: item.status ? 'Active' : 'Inactive',
            'Published At': item.published_at
                ? formatDate(item.published_at, 'date')
                : '-',
            'Created At': formatDate(item.created_at, 'datetime'),
            'Updated At': formatDate(item.updated_at, 'datetime'),
        }));
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <DataTableProvider
                    columns={columns}
                    refreshData={refreshData}
                    setRefreshData={setRefreshData}
                    urlFetchData="/admin/videos/data"
                    formatDataExport={formatDataExport}
                >
                    <DataTableComponent buttonActive={{ export: false }} />
                </DataTableProvider>
            </div>
        </div>
    );
}
