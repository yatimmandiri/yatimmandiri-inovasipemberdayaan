import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import { SelectComponent } from '@/components/partials/select-component';
import {
    renderRowHeader,
    renderRowImage,
    renderRowParagraph,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import { Badge } from '@/components/ui/badge';
import programs from '@/routes/admin/programs';
import { formatDate } from '@/utils/formatDate';
import { router, usePage } from '@inertiajs/react';
import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react';
import { useState } from 'react';

export default function ListPage() {
    const { categories } = usePage<any>().props;

    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState<any>({});

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
            header: (info: any) => renderRowHeader(info, 'Category'),
            accessorKey: 'category',
            accessorFn: (row: any) => row.category?.name || '-',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Slug'),
            accessorKey: 'slug',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Excerpt'),
            accessorKey: 'excerpt',
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
                                programs.status(info.row.original.id).url,
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
            Slug: item.slug,
            Category: item.category?.name || '-',
            Excerpt: item.excerpt,
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
                    filterValue={filterValue}
                    urlFetchData={programs.data().url}
                    formatDataExport={formatDataExport}
                >
                    <div className="flex flex-col space-y-4 px-4 pt-8 md:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <SelectComponent
                                label="Category"
                                placeholder="Filter by Category..."
                                data={categories?.map((item: any) => ({
                                    value: item.id.toString(),
                                    label: item.name,
                                }))}
                                dataSelected={filterValue.category}
                                handleOnChange={(value: any) =>
                                    setFilterValue((prev: any) => ({
                                        ...prev,
                                        category: value,
                                    }))
                                }
                            />
                        </div>
                    </div>
                    <DataTableComponent buttonActive={{ export: false }} />
                </DataTableProvider>
            </div>
        </div>
    );
}
