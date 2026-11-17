import visitReports from '@/routes/fasilitator/visit-reports';
import fasilitatorKas from '@/routes/fasilitator/kas';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    ArrowDownLeftIcon,
    ArrowUpRightIcon,
    ClipboardListIcon,
    EyeIcon,
    FilePlusIcon,
    WalletIcon,
} from 'lucide-react';

const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value ?? 0);

export default function DashboardPage() {
    const { stats, cashStats }: any = usePage<any>().props;

    const statusCards = [
        {
            label: 'Total Laporan',
            value: stats?.total ?? 0,
            icon: ClipboardListIcon,
        },
        {
            label: 'Draft',
            value: stats?.draft ?? 0,
            icon: FilePlusIcon,
        },
        {
            label: 'Menunggu Review',
            value: stats?.submitted ?? 0,
            icon: EyeIcon,
        },
        {
            label: 'Disetujui',
            value: stats?.reviewed ?? 0,
            icon: ClipboardListIcon,
        },
    ];

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="rounded-xl border border-sidebar-border/70 p-4 md:p-6 dark:border-sidebar-border">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    {statusCards.map((card) => (
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
                <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                        href={visitReports.create().url}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        prefetch
                    >
                        <FilePlusIcon className="h-4 w-4" />
                        Buat Monev
                    </Link>
                    <Link
                        href={visitReports.index().url}
                        className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
                        prefetch
                    >
                        <ClipboardListIcon className="h-4 w-4" />
                        Lihat Semua Monitoring Evaluasi
                    </Link>
                    <Link
                        href={fasilitatorKas.create().url}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        prefetch
                    >
                        <WalletIcon className="h-4 w-4" />
                        Catat Kas
                    </Link>
                </div>
            </div>
            <div className="rounded-xl border border-sidebar-border/70 p-4 md:p-6 dark:border-sidebar-border">
                <div className="mb-4 flex items-center gap-2">
                    <WalletIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                        Ringkasan Kas Saya
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Kas Masuk
                            </span>
                            <ArrowDownLeftIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-2xl font-semibold">
                            {formatRupiah(cashStats?.total_debit ?? 0)}
                        </span>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Kas Keluar
                            </span>
                            <ArrowUpRightIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-2xl font-semibold">
                            {formatRupiah(cashStats?.total_credit ?? 0)}
                        </span>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Saldo Kelompok
                            </span>
                            <WalletIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-2xl font-semibold">
                            {formatRupiah(cashStats?.saldo ?? 0)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
