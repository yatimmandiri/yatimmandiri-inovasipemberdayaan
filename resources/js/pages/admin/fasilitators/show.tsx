import { Button } from '@/components/ui/button';
import fasilitators from '@/routes/admin/fasilitators';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, EditIcon, MailIcon, MapPinIcon, PhoneIcon, UserIcon } from 'lucide-react';

export default function ShowPage() {
    const { fasilitator }: any = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative flex-1 space-y-6 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min md:p-6 dark:border-sidebar-border">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight">{fasilitator?.name}</h2>
                            {fasilitator?.kantor_name && (
                                <span className="inline-flex rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                                    {fasilitator.kantor_name} {fasilitator?.kantor_id ? `(#${fasilitator.kantor_id})` : ''}
                                </span>
                            )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                            <span>Program Binaan:</span>
                            {fasilitator?.programs && fasilitator.programs.length > 0 ? (
                                fasilitator.programs.map((p: any) => (
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
                        <Link href={fasilitators.index().url}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <ArrowLeftIcon className="h-4 w-4" /> Kembali
                            </Button>
                        </Link>
                        <Link href={fasilitators.edit(fasilitator?.id).url}>
                            <Button size="sm" className="flex items-center gap-1">
                                <EditIcon className="h-4 w-4" /> Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-foreground">Informasi Fasilitator</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                <span>No. HP: {fasilitator?.phone || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MailIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Email: {fasilitator?.email || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Akun Login: {fasilitator?.user?.email ? `${fasilitator.user.name} (${fasilitator.user.email})` : 'Belum ditautkan'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPinIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p>{fasilitator?.address || '-'}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {[
                                            fasilitator?.village?.name,
                                            fasilitator?.district?.name,
                                            fasilitator?.regency?.name,
                                            fasilitator?.province?.name,
                                        ].filter(Boolean).join(', ') || '-'}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    fasilitator?.status ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                    {fasilitator?.status ? 'Aktif' : 'Non-Aktif'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-foreground">
                            Kelompok Binaan ({fasilitator?.groups?.length || 0})
                        </h3>
                        <div className="max-h-72 overflow-y-auto divide-y text-sm">
                            {fasilitator?.groups && fasilitator.groups.length > 0 ? (
                                fasilitator.groups.map((group: any) => (
                                    <div key={group.id} className="py-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{group.name}</span>
                                            <span className="text-xs text-muted-foreground">{group.phone || '-'}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Ketua: {group.leader_name || '-'}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="py-4 text-center text-sm text-muted-foreground">
                                    Belum ada kelompok yang dibina oleh fasilitator ini.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-foreground">
                            Penerima Manfaat Didampingi ({fasilitator?.beneficiaries?.length || 0})
                        </h3>
                        <div className="max-h-72 overflow-y-auto divide-y text-sm">
                            {fasilitator?.beneficiaries && fasilitator.beneficiaries.length > 0 ? (
                                fasilitator.beneficiaries.map((pm: any) => (
                                    <div key={pm.id} className="py-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{pm.name}</span>
                                            <span className="text-xs text-muted-foreground">{pm.phone || '-'}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            NIK: {pm.nik || '-'} | Program: {pm.programs?.map((p: any) => p.name).join(', ') || '-'}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="py-4 text-center text-sm text-muted-foreground">
                                    Belum ada penerima manfaat yang didampingi oleh fasilitator ini.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
