import { DataTableComponent } from '@/components/partials/dataTables';
import { DataTableProvider } from '@/components/partials/dataTables/hooks/useDataTables';
import {
    renderRowHeader,
    renderRowParagraph,
} from '@/components/partials/dataTables/utils/dataTable-utils';
import sponsorshipInquiries from '@/routes/admin/sponsorship-inquiries';
import { formatDate } from '@/utils/formatDate';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const statusLabels: Record<string, string> = {
    new: 'New',
    contacted: 'Contacted',
    in_review: 'In Review',
    approved: 'Approved',
    rejected: 'Rejected',
};

export default function ListPage() {
    const { statuses } = usePage<any>().props;
    const [refreshData, setRefreshData] = useState(false);
    const [filterValue, setFilterValue] = useState<any>({});

    const columns = [
        {
            header: (info: any) => renderRowHeader(info, 'Organization'),
            accessorKey: 'organization_name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Contact'),
            accessorKey: 'contact_name',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Phone'),
            accessorKey: 'phone',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Email'),
            accessorKey: 'email',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Collaboration'),
            accessorKey: 'collaboration_type',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Support'),
            accessorKey: 'support_type',
        },
        {
            header: (info: any) => renderRowHeader(info, 'Message'),
            accessorKey: 'message',
            cell: (info: any) => renderRowParagraph(info.getValue()),
            enableSorting: false,
        },
        {
            header: (info: any) => renderRowHeader(info, 'Status'),
            accessorKey: 'status',
            cell: (info: any) => {
                const status = info.getValue() || 'new';

                return (
                    <select
                        value={status}
                        onChange={(event) =>
                            router.put(
                                sponsorshipInquiries.status(
                                    info.row.original.id,
                                ).url,
                                { status: event.target.value },
                                {
                                    preserveScroll: true,
                                    onSuccess: () => setRefreshData(true),
                                },
                            )
                        }
                        className="h-8 rounded-md border bg-background px-2 text-xs"
                    >
                        {(statuses || []).map((item: any) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                );
            },
        },
    ];

    const formatDataExport = (data: any) => {
        return data.map((item: any, i: number) => ({
            No: i + 1,
            Organization: item.organization_name,
            Contact: item.contact_name,
            Phone: item.phone,
            Email: item.email,
            Collaboration: item.collaboration_type,
            Support: item.support_type,
            Status: statusLabels[item.status] || item.status,
            Message: item.message,
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
                    urlFetchData={sponsorshipInquiries.data().url}
                    formatDataExport={formatDataExport}
                >
                    <div className="flex flex-col space-y-4 px-4 pt-8 md:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <label className="flex flex-col gap-2 text-sm">
                                <span className="font-semibold">Status</span>
                                <select
                                    value={filterValue.status || ''}
                                    onChange={(event) =>
                                        setFilterValue((prev: any) => ({
                                            ...prev,
                                            status:
                                                event.target.value || undefined,
                                        }))
                                    }
                                    className="h-10 rounded-md border bg-background px-3 text-sm"
                                >
                                    <option value="">All Status</option>
                                    {(statuses || []).map((item: any) => (
                                        <option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                    <DataTableComponent buttonActive={{ export: false }} />
                </DataTableProvider>
            </div>
        </div>
    );
}
