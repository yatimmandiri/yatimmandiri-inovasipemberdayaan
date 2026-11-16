import { ButtonComponent } from '@/components/partials/button-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import groups from '@/routes/admin/groups';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { PlusIcon, SaveIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

export const GroupForm = ({ dataId }: { dataId?: number }) => {
    const { group, branches, fasilitators }: any = usePage<any>().props;

    const [pmDraft, setPmDraft] = useState('');

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            branch_id: group?.branch_id || '',
            name: group?.name || '',
            fasilitator_id: group?.fasilitator_id || '',
            // Daftar nama PM (array string) — di-edit di sini, disinkronkan backend.
            pms: group?.pms?.map((pm: any) => pm.name) ?? [],
        },
    );

    // transformData
    transform((data: any) => ({
        ...data,
        ...(dataId && { _method: 'put' }),
    }));

    const addPm = () => {
        const name = pmDraft.trim();

        if (!name || data.pms.includes(name)) {
            return;
        }

        setData('pms', [...data.pms, name]);
        setPmDraft('');
    };

    const removePm = (index: number) => {
        setData(
            'pms',
            data.pms.filter((_: string, i: number) => i !== index),
        );
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(groups.update(dataId).url);
        } else {
            post(groups.store().url);
        }
    };

    return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <SelectComponent
                    label="Cabang"
                    name="branch_id"
                    data={branches?.map((item: any) => ({
                        value: item.id,
                        label: item.label || item.name,
                    }))}
                    dataSelected={data.branch_id}
                    handleOnChange={(value: string) =>
                        setData('branch_id', value)
                    }
                    errors={errors.branch_id && errors.branch_id}
                    helperText={errors.branch_id && errors.branch_id}
                    color={errors.branch_id && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Nama Kelompok"
                    name="name"
                    placeholder="Contoh: BISA WONOSARI"
                    value={data.name}
                    handleOnChange={(value: string) => setData('name', value)}
                    errors={errors.name && errors.name}
                    helperText={
                        errors.name
                            ? errors.name
                            : 'Nama kelompok unik per cabang.'
                    }
                    color={errors.name && 'danger'}
                />
                <SelectComponent
                    label="Fasilitator Penanggung Jawab"
                    name="fasilitator_id"
                    data={[
                        { value: '', label: '— Belum ditugaskan —' },
                        ...(fasilitators?.map((item: any) => ({
                            value: item.id,
                            label: item.name,
                        })) ?? []),
                    ]}
                    dataSelected={data.fasilitator_id}
                    handleOnChange={(value: string) =>
                        setData('fasilitator_id', value)
                    }
                    errors={errors.fasilitator_id && errors.fasilitator_id}
                    helperText={
                        errors.fasilitator_id
                            ? errors.fasilitator_id
                            : '1 fasil = 1 kelompok; fasil yang sudah memegang kelompok tidak bisa dipilih ulang.'
                    }
                    color={errors.fasilitator_id && 'danger'}
                />
            </div>

            <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                <h3 className="text-sm font-semibold">
                    Daftar PM (Penerima Manfaat)
                </h3>
                <div className="mt-3 flex flex-wrap items-end gap-4">
                    <div className="min-w-64 flex-1">
                        <InputTextComponent
                            type="text"
                            label="Nama PM"
                            name="pm_draft"
                            placeholder="Nama Penerima Manfaat"
                            value={pmDraft}
                            handleOnChange={(value: string) =>
                                setPmDraft(value)
                            }
                        />
                    </div>
                    <ButtonComponent
                        buttonText="Tambah"
                        addonLeft={PlusIcon}
                        buttonType="button"
                        onClick={addPm}
                    />
                </div>
                {data.pms?.length ? (
                    <ul className="mt-4 divide-y divide-sidebar-border/70">
                        {data.pms.map((pm: string, index: number) => (
                            <li
                                key={`${pm}-${index}`}
                                className="flex items-center justify-between py-2"
                            >
                                <span>{pm}</span>
                                <ButtonComponent
                                    buttonText=""
                                    addonLeft={TrashIcon}
                                    buttonType="button"
                                    onClick={() => removePm(index)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-sm text-muted-foreground">
                        Belum ada PM ditambahkan.
                    </p>
                )}
            </div>

            <div className="flex justify-end space-x-4">
                <ButtonComponent
                    buttonText={dataId ? 'Save' : 'Simpan'}
                    addonLeft={SaveIcon}
                    buttonType="submit"
                    isProcessing={processing}
                />
            </div>
        </Fieldset>
    );
};
