import { Badge } from '@/components/ui/badge';
import cashTransactions from '@/routes/admin/cash-transactions';
import { formatDate } from '@/utils/formatDate';
import { Link, usePage } from '@inertiajs/react';
import {
    ArrowDownLeftIcon,
    ArrowLeftIcon,
    ArrowUpRightIcon,
    CalendarDaysIcon,
    DollarSignIcon,
    Edit3Icon,
    FileTextIcon,
    TagIcon,
    UsersRoundIcon,
} from 'lucide-react';

const formatRupiah = (val: number | string) => {
    const num = Number(val || 0);
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(num);
};

export default function ShowPage() {
    const { cashTransaction }: any = usePage<any>().props;

    const isIncome = cashTransaction?.type === 'in';

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    href={cashTransactions.index().url}
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Kembali ke Laporan Kas
                </Link>

                <Link
                    href={cashTransactions.edit(cashTransaction.id).url}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
                >
                    <Edit3Icon className="h-4 w-4" />
                    Edit Transaksi
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-xs">
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-sidebar-border/50 pb-5">
                            <div>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                    Transaksi #{cashTransaction.id}
                                </span>
                                <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                                    {cashTransaction.category || 'Transaksi Kas'}
                                </h2>
                                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarDaysIcon className="h-4 w-4" />
                                    <span>{formatDate(cashTransaction.transaction_date)}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <Badge
                                    className={`px-3 py-1 text-sm font-medium ${
                                        isIncome
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-rose-500 text-white'
                                    }`}
                                >
                                    {isIncome ? (
                                        <ArrowDownLeftIcon className="mr-1 h-4 w-4 inline" />
                                    ) : (
                                        <ArrowUpRightIcon className="mr-1 h-4 w-4 inline" />
                                    )}
                                    {isIncome ? 'Kas Masuk' : 'Kas Keluar'}
                                </Badge>

                                <span
                                    className={`text-2xl font-bold ${
                                        isIncome
                                            ? 'text-emerald-600 dark:text-emerald-400'
                                            : 'text-rose-600 dark:text-rose-400'
                                    }`}
                                >
                                    {isIncome ? '+ ' : '- '}
                                    {formatRupiah(cashTransaction.amount)}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Uraian / Keterangan
                                </h4>
                                <p className="mt-2 text-sm leading-relaxed text-foreground whitespace-pre-line">
                                    {cashTransaction.description || 'Tidak ada keterangan tambahan.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {cashTransaction.proof && (
                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-xs">
                            <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                                <FileTextIcon className="h-5 w-5 text-primary" />
                                <h3 className="text-base font-semibold text-foreground">
                                    Bukti Pembayaran / Kwitansi
                                </h3>
                            </div>
                            <div className="overflow-hidden rounded-lg border border-sidebar-border bg-muted/20">
                                <img
                                    src={`/storage/${cashTransaction.proof}`}
                                    alt="Bukti Transaksi"
                                    className="max-h-[500px] w-full object-contain"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                        <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                            <UsersRoundIcon className="h-5 w-5 text-primary" />
                            <h3 className="text-sm font-semibold text-foreground">
                                Kelompok Binaan
                            </h3>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-xs text-muted-foreground">Nama Kelompok</span>
                                <p className="font-medium text-foreground">
                                    {cashTransaction.group?.name || '-'}
                                </p>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground">Fasilitator Pendamping</span>
                                <p className="font-medium text-foreground">
                                    {cashTransaction.fasilitator?.name || '-'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                        <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                            <TagIcon className="h-5 w-5 text-primary" />
                            <h3 className="text-sm font-semibold text-foreground">
                                Informasi Tambahan
                            </h3>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-xs text-muted-foreground">Status</span>
                                <div className="mt-1">
                                    <Badge variant={cashTransaction.status ? 'default' : 'destructive'}>
                                        {cashTransaction.status ? 'Aktif' : 'Nonaktif'}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground">Dicatat Pada</span>
                                <p className="font-medium text-foreground">
                                    {formatDate(cashTransaction.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
