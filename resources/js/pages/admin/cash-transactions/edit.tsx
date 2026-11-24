import { CashTransactionForm } from '@/components/forms/admin/cash-transaction-form';
import { usePage } from '@inertiajs/react';

export default function EditPage() {
    const { cashTransaction }: any = usePage<any>().props;

    return (
        <div className="space-y-6">
            <CashTransactionForm dataId={cashTransaction?.id} />
        </div>
    );
}
