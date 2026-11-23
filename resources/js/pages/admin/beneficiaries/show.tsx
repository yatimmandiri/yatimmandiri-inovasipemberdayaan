import { Button } from '@/components/ui/button';
import beneficiaries from '@/routes/admin/beneficiaries';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, EditIcon, MapPinIcon, PhoneIcon, UserCheckIcon } from 'lucide-react';

export default function ShowPage() {
    const { beneficiary }: any = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative flex-1 space-y-6 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min md:p-6 dark:border-sidebar-border">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight">{beneficiary?.name}</h2>
                            {beneficiary?.kantor_name && (
                                <span className="inline-flex rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                                    {beneficiary.kantor_name} {beneficiary?.kantor_id ? `(#${beneficiary.kantor_id})` : ''}
                                </span>
                            )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                            <span>NIK:</span>
                            <span className="font-medium text-foreground">{beneficiary?.nik || '-'}</span>
                            <span className="mx-1">•</span>
                            <span>Program yang Diikuti:</span>
                            {beneficiary?.programs && beneficiary.programs.length > 0 ? (
                                beneficiary.programs.map((p: any) => (
                                    <span key={p.id} className="inline-flex rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                                        {p.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-muted-foreground">Belum ada program</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={beneficiaries.index().url}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <ArrowLeftIcon className="h-4 w-4" /> Kembali
                            </Button>
                        </Link>
                        <Link href={beneficiaries.edit(beneficiary?.id).url}>
                            <Button size="sm" className="flex items-center gap-1">
                                <EditIcon className="h-4 w-4" /> Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-foreground">Data Penerima Manfaat</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Kontak / No. HP: {beneficiary?.phone || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Fasilitator Pendamping: {beneficiary?.fasilitator?.name ? `${beneficiary.fasilitator.name} (${beneficiary.fasilitator.phone || '-'})` : 'Belum ditentukan'}</span>
                            </div>
                            {beneficiary?.group?.name && (
                                <div className="flex items-center gap-2">
                                    <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>Kelompok Binaan: {beneficiary.group.name}</span>
                                </div>
                            )}
                            <div className="flex items-start gap-2">
                                <MapPinIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p>{beneficiary?.address || '-'}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {[
                                            beneficiary?.village?.name,
                                            beneficiary?.district?.name,
                                            beneficiary?.regency?.name,
                                            beneficiary?.province?.name,
                                        ].filter(Boolean).join(', ') || '-'}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    beneficiary?.status ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {beneficiary?.status ? 'Aktif Menerima Program' : 'Mandiri / Selesai'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-foreground">Catatan Perkembangan & Keterangan</h3>
                        <div className="text-sm">
                            {beneficiary?.notes ? (
                                <p className="whitespace-pre-wrap text-muted-foreground">{beneficiary.notes}</p>
                            ) : (
                                <p className="text-muted-foreground">Tidak ada catatan perkembangan khusus.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
