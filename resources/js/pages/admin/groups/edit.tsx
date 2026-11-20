import { GroupForm } from '@/components/forms/admin/group-form';
import { usePage } from '@inertiajs/react';

export default function EditPage() {
    const { group }: any = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min md:p-6 dark:border-sidebar-border">
                <GroupForm dataId={group?.id} />
            </div>
        </div>
    );
}
