import { ButtonComponent } from '@/components/partials/button-component';
import { InputTextComponent } from '@/components/partials/input-component';
import fasilitatorGroup from '@/routes/fasilitator/group';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { TrashIcon, UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function MyGroupPage() {
    const { group }: any = usePage<any>().props;
    const { errors }: any = usePage<any>().props;

    const [pmName, setPmName] = useState('');

    const handleAddPm = (e: any) => {
        e.preventDefault();

        router.post(
            fasilitatorGroup.pms.store().url,
            { name: pmName },
            {
                onSuccess: () => setPmName(''),
            },
        );
    };

    const handleDeletePm = (pmId: number) => {
        router.delete(fasilitatorGroup.pms.destroy(pmId).url);
    };

    if (!group) {
        return (
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <div className="flex items-center gap-2">
                        <UsersIcon className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-lg font-semibold">Kelompok Saya</h2>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Anda belum ditugaskan ke kelompok manapun. Hubungi
                        Administrator untuk menugaskan Anda ke kelompok dan
                        cabang.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title="Kelompok Saya" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 p-4 md:p-6 dark:border-sidebar-border">
                    <div className="flex items-center gap-2">
                        <UsersIcon className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-lg font-semibold">{group.name}</h2>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Cabang
                            </span>
                            <p className="font-medium">
                                {group.branch?.display_name ||
                                    group.branch?.name}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Fasilitator
                            </span>
                            <p className="font-medium">
                                {group.facilitator?.name || '—'}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">
                                Jumlah PM Terdaftar
                            </span>
                            <p className="font-medium">
                                {group.pms?.length ?? 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 p-4 md:p-6 dark:border-sidebar-border">
                    <h3 className="text-base font-semibold">
                        Daftar PM (Penerima Manfaat)
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Isi nama anggota PM kelompok Anda. Jumlah PM hadir di
                        laporan Monev tetap diinput per kegiatan.
                    </p>

                    <form
                        onSubmit={handleAddPm}
                        className="mt-4 flex flex-wrap items-end gap-4"
                    >
                        <div className="min-w-64 flex-1">
                            <InputTextComponent
                                type="text"
                                label="Nama PM"
                                name="name"
                                placeholder="Nama Penerima Manfaat"
                                value={pmName}
                                handleOnChange={(value: string) =>
                                    setPmName(value)
                                }
                                errors={errors.name && errors.name}
                                helperText={errors.name && errors.name}
                                color={errors.name && 'danger'}
                            />
                        </div>
                        <ButtonComponent
                            buttonText="Tambah PM"
                            addonLeft={UsersIcon}
                            buttonType="submit"
                        />
                    </form>

                    {group.pms?.length ? (
                        <ul className="mt-6 divide-y divide-sidebar-border/70">
                            {group.pms.map((pm: any) => (
                                <li
                                    key={pm.id}
                                    className="flex items-center justify-between py-2"
                                >
                                    <span>{pm.name}</span>
                                    <ButtonComponent
                                        buttonText=""
                                        addonLeft={TrashIcon}
                                        buttonType="button"
                                        onClick={() => handleDeletePm(pm.id)}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 text-sm text-muted-foreground">
                            Belum ada PM terdaftar.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
