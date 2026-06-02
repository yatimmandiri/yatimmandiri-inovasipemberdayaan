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
            header: (info: any) => renderRowHeader(info, 'Image'),
            accessorKey: 'featured_image',
            cell: (info: any) => renderRowImage(info.getValue(), 'h-12 w-20'),
            enableSorting: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'Name'),
            accessorKey: 'name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Description'),
            accessorKey: 'description',
            cell: (info: any) => renderRowParagraph(info.getValue()),
            enableSorting: false,
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
                                `/admin/programs/${info.row.original.id}/status`,
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
                    urlFetchData="/admin/programs/data"
                    formatDataExport={formatDataExport}
                >
                    <DataTableComponent buttonActive={{ export: false }} />
                </DataTableProvider>
            </div>
        </div>
    );
}
