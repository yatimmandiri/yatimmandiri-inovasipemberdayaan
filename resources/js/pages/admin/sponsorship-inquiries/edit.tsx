import { SponsorshipInquiryForm } from '@/components/forms/admin/sponsorship-inquiry-form';
import { Card } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';

export default function EditPage() {
    const { inquiry } = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <Card className="min-h-full p-4 md:p-6">
                    <SponsorshipInquiryForm dataId={inquiry.id} />
                </Card>
            </div>
        </div>
    );
}
