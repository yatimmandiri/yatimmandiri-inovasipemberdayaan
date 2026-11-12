import { dashboard } from '@/routes/admin';
import kas from '@/routes/admin/kas';
import visitReports from '@/routes/admin/visit-reports';
import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    ArrowDownLeftIcon,
    ArrowUpRightIcon,
    ClipboardListIcon,
    EyeIcon,
    WalletIcon,
} from 'lucide-react';

const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value ?? 0);

export default function Dashboard() {
    const { cashStats, pendingReports }: any = usePage<any>().props;

    const cards = [
        {
            label: 'Kas Masuk (Debit)',
            value: formatRupiah(cashStats?.total_debit ?? 0),
            icon: ArrowDownLeftIcon,
        },
        {
            label: 'Kas Keluar (Kredit)',
            value: formatRupiah(cashStats?.total_credit ?? 0),
            icon: ArrowUpRightIcon,
        },
        {
            label: 'Saldo Kas',
            value: formatRupiah(cashStats?.saldo ?? 0),
            icon: WalletIcon,
        },
        {
            label: 'Monev Menunggu Review',
            value: pendingReports ?? 0,
            icon: EyeIcon,
        },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative flex-1 flex-col space-y-4 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min md:p-6 dark:border-sidebar-border">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        {cards.map((card) => (
                            <div
                                key={card.label}
                                className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        {card.label}
                                    </span>
                                    <card.icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <span className="text-2xl font-semibold">
                                    {card.value}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href={kas.index().url}
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                            prefetch
                        >
                            <WalletIcon className="h-4 w-4" />
                            Pencatatan Kas
                        </Link>
                        <Link
                            href={visitReports.index().url}
                            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
                            prefetch
                        >
                            <ClipboardListIcon className="h-4 w-4" />
                            Monitoring Evaluasi
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
