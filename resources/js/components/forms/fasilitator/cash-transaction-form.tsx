import { ButtonComponent } from '@/components/partials/button-component';
import { InputTextComponent } from '@/components/partials/input-component';
import kas from '@/routes/fasilitator/kas';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const CashTransactionForm = ({ dataId }: { dataId?: number }) => {
    const { cashTransaction, myGroup } = usePage<any>().props;

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            transaction_date:
                cashTransaction?.transaction_date || localDateToday(),
            // Cabang & kelompok otomatis dari kelompok fasil (readonly di UI,
            // backend juga memaksa dari kelompok yang dipegang fasil).
            branch_id: myGroup?.branch_id || '',
            group_id: myGroup?.group_id || myGroup?.id || '',
            description: cashTransaction?.description || '',
            debit:
                cashTransaction?.debit && Number(cashTransaction.debit) > 0
                    ? cashTransaction.debit
                    : '',
            credit:
                cashTransaction?.credit && Number(cashTransaction.credit) > 0
                    ? cashTransaction.credit
                    : '',
        },
    );

    // transformData
    transform((data: any) => ({
        ...data,
        ...(dataId && { _method: 'put' }),
    }));

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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputTextComponent
                    type="text"
                    label="Cabang"
                    name="branch_display"
                    value={
                        myGroup?.branch?.display_name ||
                        myGroup?.branch?.name ||
                        ''
                    }
                    disabled
                    helperText="Otomatis mengikuti cabang kelompok Anda."
                />
                <InputTextComponent
                    type="text"
                    label="Nama Kelompok"
                    name="group_display"
                    value={myGroup?.name || ''}
                    disabled
                    helperText="Otomatis mengikuti kelompok Anda."
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
