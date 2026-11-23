import { Button } from '@/components/ui/button';
import groups from '@/routes/admin/groups';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, EditIcon, MapPinIcon, PhoneIcon, UserIcon, UsersIcon } from 'lucide-react';

export default function ShowPage() {
    const { group }: any = usePage<any>().props;

    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative flex-1 space-y-6 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min md:p-6 dark:border-sidebar-border">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight">{group?.name}</h2>
                            {group?.kantor_name && (
                                <span className="inline-flex rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                                    {group.kantor_name} {group?.kantor_id ? `(#${group.kantor_id})` : ''}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Fasilitator Pendamping: <span className="font-medium text-foreground">{group?.fasilitator?.name || 'Belum ditentukan'}</span>
                            {group?.program?.name && (
                                <>
                                    <span className="mx-1">•</span>
                                    Program: <span className="font-medium text-foreground">{group.program.name}</span>
                                </>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={groups.index().url}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <ArrowLeftIcon className="h-4 w-4" /> Kembali
                            </Button>
                        </Link>
                        <Link href={groups.edit(group?.id).url}>
                            <Button size="sm" className="flex items-center gap-1">
                                <EditIcon className="h-4 w-4" /> Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-foreground">Informasi Kelompok</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Ketua Kelompok: {group?.leader_name || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Kontak: {group?.phone || '-'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPinIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p>{group?.address || '-'}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {[
                                            group?.village?.name,
                                            group?.district?.name,
                                            group?.regency?.name,
                                            group?.province?.name,
                                        ].filter(Boolean).join(', ') || '-'}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    group?.status ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                    {group?.status ? 'Aktif' : 'Non-Aktif'}
                                </span>
                            </div>
                        </div>

                        {group?.description && (
                            <div className="border-t pt-3">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase">Deskripsi</h4>
                                <p className="mt-1 text-sm text-foreground">{group.description}</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-foreground flex items-center justify-between">
                            <span>Anggota Penerima Manfaat ({group?.beneficiaries?.length || 0})</span>
                            <UsersIcon className="h-4 w-4 text-muted-foreground" />
                        </h3>
                        <div className="max-h-72 overflow-y-auto divide-y text-sm">
                            {group?.beneficiaries && group.beneficiaries.length > 0 ? (
                                group.beneficiaries.map((pm: any) => (
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
                                    Belum ada anggota penerima manfaat yang terdaftar di kelompok ini.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
