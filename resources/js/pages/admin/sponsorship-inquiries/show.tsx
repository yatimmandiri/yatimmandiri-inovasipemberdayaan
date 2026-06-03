import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/utils/formatDate';
import { usePage } from '@inertiajs/react';
import { Building2Icon, HandshakeIcon, InfoIcon, UserIcon } from 'lucide-react';
import type { ReactNode } from 'react';

const statusLabels: Record<string, string> = {
    new: 'New',
    contacted: 'Contacted',
    in_review: 'In Review',
    approved: 'Approved',
    rejected: 'Rejected',
};

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive'> =
    {
        new: 'secondary',
        contacted: 'default',
        in_review: 'default',
        approved: 'default',
        rejected: 'destructive',
    };

export default function DetailPage() {
    const { inquiry } = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <Card className="min-h-full p-4 md:p-6">
                    <div className="flex items-center space-x-2">
                        <InfoIcon className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                            Detail Information
                        </span>
                    </div>

                    <div className="mt-6 grid gap-6">
                        <DetailSection icon={UserIcon} title="Contact Person">
                            <DetailItem
                                label="Name"
                                value={inquiry.contact_name}
                            />
                            <DetailItem label="Phone" value={inquiry.phone} />
                            <DetailItem label="Email" value={inquiry.email} />
                            <DetailItem
                                label="Address"
                                value={inquiry.address}
                                wide
                            />
                        </DetailSection>

                        <DetailSection
                            icon={Building2Icon}
                            title="Organization"
                        >
                            <DetailItem
                                label="Organization"
                                value={inquiry.organization_name}
                            />
                            <DetailItem
                                label="Type"
                                value={inquiry.organization_type}
                            />
                            <DetailItem
                                label="Phone"
                                value={inquiry.organization_phone}
                            />
                            <DetailItem
                                label="Email"
                                value={inquiry.organization_email}
                            />
                            <DetailItem
                                label="Address"
                                value={inquiry.organization_address}
                                wide
                            />
                        </DetailSection>

                        <DetailSection
                            icon={HandshakeIcon}
                            title="Collaboration"
                        >
                            <DetailItem
                                label="Collaboration Type"
                                value={inquiry.collaboration_type}
                            />
                            <DetailItem
                                label="Support Type"
                                value={inquiry.support_type}
                            />
                            <DetailItem
                                label="Preferred Program"
                                value={inquiry.preferred_program}
                            />
                            <DetailItem
                                label="Estimated Budget"
                                value={inquiry.estimated_budget}
                            />
                            <li className="flex flex-col space-y-2">
                                <span className="text-sm font-semibold">
                                    Status
                                </span>
                                <span>
                                    <Badge
                                        variant={
                                            statusVariants[inquiry.status] ||
                                            'secondary'
                                        }
                                    >
                                        {statusLabels[inquiry.status] ||
                                            inquiry.status}
                                    </Badge>
                                </span>
                            </li>
                            <DetailItem
                                label="Message"
                                value={inquiry.message}
                                wide
                            />
                        </DetailSection>

                        <DetailSection icon={InfoIcon} title="Timestamps">
                            <DetailItem
                                label="Created At"
                                value={formatDate(inquiry.created_at)}
                            />
                            <DetailItem
                                label="Updated At"
                                value={formatDate(inquiry.updated_at)}
                            />
                        </DetailSection>
                    </div>
                </Card>
            </div>
        </div>
    );
}

const DetailSection = ({
    icon: Icon,
    title,
    children,
}: {
    icon: any;
    title: string;
    children: ReactNode;
}) => (
    <section className="space-y-4">
        <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <h2 className="text-sm font-semibold">{title}</h2>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</ul>
    </section>
);

const DetailItem = ({
    label,
    value,
    wide = false,
}: {
    label: string;
    value?: string | null;
    wide?: boolean;
}) => (
    <li className={`flex flex-col space-y-2 ${wide ? 'md:col-span-2' : ''}`}>
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm whitespace-pre-line">{value || '-'}</span>
    </li>
);
