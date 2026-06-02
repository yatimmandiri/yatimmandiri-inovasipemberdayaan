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
import { BadgeCheckIcon, BadgeXIcon, StarIcon } from 'lucide-react';
import { useState } from 'react';

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Photo'),
            accessorKey: 'photo',
            cell: (info: any) => renderRowImage(info.getValue(), 'h-12 w-12'),
            enableSorting: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'Name'),
            accessorKey: 'name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Position'),
            accessorKey: 'position',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Message'),
            accessorKey: 'description',
            cell: (info: any) => renderRowParagraph(info.getValue()),
            enableSorting: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'Rating'),
            accessorKey: 'rating',
            cell: (info: any) => (
                <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{info.getValue()}</span>
                </div>
            ),
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
                                `/admin/testimonials/${info.row.original.id}/status`,
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
            Name: item.name,
            Position: item.position,
            Rating: item.rating,
            Status: item.status ? 'Active' : 'Inactive',
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
                    urlFetchData="/admin/testimonials/data"
                    formatDataExport={formatDataExport}
                >
                    <DataTableComponent buttonActive={{ export: false }} />
                </DataTableProvider>
            </div>
        </div>
    );
}
