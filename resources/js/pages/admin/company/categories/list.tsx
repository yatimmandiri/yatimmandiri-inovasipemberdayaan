import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowDate,
    renderRowHeader,
    renderRowImage,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import categories from '@/routes/admin/companies/categories';
import { formatDate } from '@/utils/formatDate';
import { router } from '@inertiajs/react';
import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react';
import { useState } from 'react';

export default function ListPage() {
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState({});

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Name'),
            accessorKey: 'name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Icon'),
            accessorKey: 'icon',
            cell: (info: any) =>
                renderRowImage(info.getValue(), 'w-16 h-auto rounded-full'),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Featured Image'),
            accessorKey: 'featured_image',
            cell: (info: any) =>
                renderRowImage(info.getValue(), 'w-56 h-auto rounded-lg'),
        },
        {
            header: (info: any) => renderRowHeader(info, 'Recommended'),
            accessorKey: 'recommended',
            cell: (info: any) => renderRowRecommended(info),
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
        {
            header: (info: any) => renderRowHeader(info, 'Updated At'),
            accessorKey: 'updated_at',
            cell: (info: any) => renderRowDate(info.getValue()),
        },
    ];

    const renderRowStatus = (info: any) => {
        const handleStatus = (id: number) => {
            router.put(
                categories.status(id).url,
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
                color="success"
            >
                <BadgeCheckIcon />
                Active
            </Badge>
        ) : (
            <Badge
                className="cursor-pointer"
                onClick={() => handleStatus(info.row.original.id)}
                variant="destructive"
                color="danger"
            >
                <BadgeXIcon />
                Deactive
            </Badge>
        );
    };

    const renderRowRecommended = (info: any) => {
        const handleRecommended = (id: number) => {
            router.put(
                categories.recommended(id).url,
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
                onClick={() => handleRecommended(info.row.original.id)}
                variant="default"
                color="success"
            >
                <BadgeCheckIcon />
                Recommended
            </Badge>
        ) : (
            <Badge
                className="cursor-pointer"
                onClick={() => handleRecommended(info.row.original.id)}
                variant="destructive"
                color="danger"
            >
                <BadgeXIcon />
                Not Recommended
            </Badge>
        );
    };

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
                    urlFetchData={categories.data().url}
                    formatDataExport={formatDataExport}
                >
                    <DataTableComponent buttonActive={{ export: false }} />
                </DataTableProvider>
            </div>
        </div>
    );
}
