import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function ShowPage() {
    const { group }: any = usePage<any>().props;

    return (
        <>
            <Head title={`Kelompok: ${group?.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 p-4 md:p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">{group?.name}</h2>
                    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Cabang
                            </span>
                            <p className="font-medium">
                                {group?.branch?.display_name ||
                                    group?.branch?.name}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Fasilitator
                            </span>
                            <p className="font-medium">
                                {group?.facilitator?.name || '—'}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Jumlah PM
                            </span>
                            <p className="font-medium">
                                {group?.pms?.length ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-sidebar-border/70 p-4 md:p-6 dark:border-sidebar-border">
                    <h3 className="text-base font-semibold">Daftar PM</h3>
                    {group?.pms?.length ? (
                        <ul className="mt-3 list-inside list-disc">
                            {group.pms.map((pm: any) => (
                                <li key={pm.id}>{pm.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-3 text-sm text-muted-foreground">
                            Belum ada PM terdaftar.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
