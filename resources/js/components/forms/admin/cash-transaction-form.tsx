import { ButtonComponent } from '@/components/partials/button-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import kas from '@/routes/admin/kas';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { InfoIcon, SaveIcon } from 'lucide-react';

export const AdminCashTransactionForm = ({
    dataId,
}: {
    dataId?: number;
}) => {
    const { cashTransaction, groups }: any = usePage<any>().props;

    const { data, setData, post, transform, processing, errors }: any = useForm({
        transaction_date:
            cashTransaction?.transaction_date || localDateToday(),
        group_id: cashTransaction?.group_id || '',
        description: cashTransaction?.description || '',
        debit:
            cashTransaction?.debit && Number(cashTransaction.debit) > 0
                ? cashTransaction.debit
                : '',
        credit:
            cashTransaction?.credit && Number(cashTransaction.credit) > 0
                ? cashTransaction.credit
                : '',
    });

    // Cabang TIDAK diinput: server menurunkannya dari kelompok yang dipilih.
    transform((data: any) => ({
        transaction_date: data.transaction_date,
        group_id: data.group_id,
        description: data.description,
        debit: data.debit,
        credit: data.credit,
        ...(dataId && { _method: 'put' }),
    }));

    const selectedGroup = groups?.find(
        (item: any) => String(item.id) === String(data.group_id),
    );

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(kas.update(dataId).url, {
                forceFormData: true,
            });
        } else {
            post(kas.store().url, {
                forceFormData: true,
            });
        }
    };

    return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col space-y-4"
        >
            <div className="flex items-start space-x-2 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
                <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                    Entri/koreksi oleh admin langsung mengubah saldo berjalan
                    kelompok (saldo dihitung on-the-fly). Aksi ini tercatat di
                    Log Activity dengan identitas admin.
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <SelectComponent
                    label="Nama Kelompok"
                    name="group_id"
                    data={[
                        { value: '', label: '- Pilih Kelompok -' },
                        ...(groups?.map((item: any) => ({
                            value: item.id,
                            label: `${item.name} — ${item.branch?.label || item.branch?.name || '-'}${
                                item.facilitator
                                    ? ` (Fasilitator: ${item.facilitator.name})`
                                    : ' (belum ada fasilitator)'
                            }`,
                        })) ?? []),
                    ]}
                    dataSelected={data.group_id}
                    handleOnChange={(value: string) =>
                        setData('group_id', value)
                    }
                    errors={errors.group_id && errors.group_id}
                    helperText={
                        errors.group_id ? errors.group_id : undefined
                    }
                    color={errors.group_id && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Cabang"
                    name="branch_display"
                    value={
                        selectedGroup?.branch?.label ||
                        selectedGroup?.branch?.name ||
                        ''
                    }
                    disabled
                    helperText="Otomatis mengikuti cabang kelompok yang dipilih."
                />
                <InputTextComponent
                    type="date"
                    label="Tanggal"
                    name="transaction_date"
                    value={data.transaction_date}
                    max={localDateToday()}
                    handleOnChange={(value: string) =>
                        setData('transaction_date', value)
                    }
                    errors={errors.transaction_date && errors.transaction_date}
                    helperText={
                        errors.transaction_date
                            ? errors.transaction_date
                            : 'Bebas backdate; tidak boleh masa depan.'
                    }
                    color={errors.transaction_date && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Keterangan Anggaran"
                    name="description"
                    placeholder="Contoh: Pembelian alat tulis kegiatan"
                    value={data.description}
                    handleOnChange={(value: string) =>
                        setData('description', value)
                    }
                    errors={errors.description && errors.description}
                    helperText={errors.description && errors.description}
                    color={errors.description && 'danger'}
                />
                <InputTextComponent
                    type="number"
                    step="0.01"
                    min="0"
                    label="Debit (Arus Masuk)"
                    name="debit"
                    placeholder="0"
                    value={data.debit}
                    handleOnChange={(value: string) => setData('debit', value)}
                    errors={errors.debit && errors.debit}
                    helperText={
                        errors.debit
                            ? errors.debit
                            : 'Isi salah satu saja: Debit atau Kredit.'
                    }
                    color={errors.debit && 'danger'}
                />
                <InputTextComponent
                    type="number"
                    step="0.01"
                    min="0"
                    label="Kredit (Arus Keluar)"
                    name="credit"
                    placeholder="0"
                    value={data.credit}
                    handleOnChange={(value: string) => setData('credit', value)}
                    errors={errors.credit && errors.credit}
                    helperText={
                        errors.credit
                            ? errors.credit
                            : 'Isi salah satu saja: Debit atau Kredit.'
                    }
                    color={errors.credit && 'danger'}
                />
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

// Tanggal hari ini dalam zona waktu browser, format YYYY-MM-DD.
const localDateToday = () => {
    const now = new Date();

    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
};
