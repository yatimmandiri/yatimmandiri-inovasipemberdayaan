import { FasilitatorForm } from '@/components/forms/admin/fasilitator-form';
import { usePage } from '@inertiajs/react';

export default function EditPage() {
    const { fasilitator }: any = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min md:p-6 dark:border-sidebar-border">
                <FasilitatorForm dataId={fasilitator?.id} />
            </div>
        </div>
    );
}
