import { ButtonComponent } from '@/components/partials/button-component';
import { DatePickerComponent } from '@/components/partials/datePicker-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import cashTransactions from '@/routes/admin/cash-transactions';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import {
    ArrowDownLeftIcon,
    ArrowUpRightIcon,
    CalendarDaysIcon,
    DollarSignIcon,
    FileTextIcon,
    SaveIcon,
    UsersRoundIcon,
} from 'lucide-react';

const today = () => new Date().toISOString().slice(0, 10);

export const CashTransactionForm = ({ dataId }: { dataId?: number }) => {
    const {
        cashTransaction,
        fasilitators,
        groups,
        categories,
    }: any = usePage<any>().props;

    const { data, setData, post, processing, errors, transform }: any = useForm({
        fasilitator_id: cashTransaction?.fasilitator_id || '',
        group_id: cashTransaction?.group_id || '',
        transaction_date: cashTransaction?.transaction_date
            ? String(cashTransaction.transaction_date).slice(0, 10)
            : today(),
        type: cashTransaction?.type || 'in',
        amount: cashTransaction?.amount || '',
        category: cashTransaction?.category || '',
        description: cashTransaction?.description || '',
        proof: null,
    });

    const filteredGroups = data.fasilitator_id
        ? (groups || []).filter(
              (group: any) =>
                  String(group.fasilitator_id) === String(data.fasilitator_id),
          )
        : groups || [];

    transform((formData: any) => ({
        ...formData,
        fasilitator_id: formData.fasilitator_id
            ? Number(formData.fasilitator_id)
            : null,
        group_id: formData.group_id ? Number(formData.group_id) : null,
        amount: Number(formData.amount || 0),
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(cashTransactions.update(dataId).url, { forceFormData: true });
        } else {
            post(cashTransactions.store().url, { forceFormData: true });
        }
    };

    return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col space-y-6"
        >
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <UsersRoundIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">
                            Kelompok & Fasilitator
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Pilih fasilitator pendamping lalu kelompok binaan terkait transaksi ini
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SelectComponent
                        label="Fasilitator"
                        placeholder="Pilih Fasilitator"
                        name="fasilitator_id"
                        value={data.fasilitator_id}
                        handleOnChange={(value: string) => {
                            setData('fasilitator_id', value);

                            const selectedGroup = (groups || []).find(
                                (g: any) => String(g.id) === String(data.group_id),
                            );
                            if (
                                selectedGroup &&
                                String(selectedGroup.fasilitator_id) !== String(value)
                            ) {
                                setData((prev: any) => ({
                                    ...prev,
                                    fasilitator_id: value,
                                    group_id: '',
                                }));
                            }
                        }}
                        options={(fasilitators || []).map((f: any) => ({
                            id: f.id,
                            name: f.name,
                        }))}
                        error={errors?.fasilitator_id}
                        isClearable
                    />

                    <SelectComponent
                        label="Kelompok Binaan"
                        placeholder="Pilih Kelompok"
                        name="group_id"
                        value={data.group_id}
                        handleOnChange={(value: string) => {
                            setData('group_id', value);

                            const selectedGroup = (groups || []).find(
                                (g: any) => String(g.id) === String(value),
                            );
                            if (
                                selectedGroup &&
                                selectedGroup.fasilitator_id &&
                                !data.fasilitator_id
                            ) {
                                setData((prev: any) => ({
                                    ...prev,
                                    group_id: value,
                                    fasilitator_id: selectedGroup.fasilitator_id,
                                }));
                            }
                        }}
                        options={filteredGroups.map((g: any) => ({
                            id: g.id,
                            name: g.name,
                        }))}
                        error={errors?.group_id}
                        isClearable
                    />
                </div>
            </div>

            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <DollarSignIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">
                            Detail Transaksi Kas
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Informasi tipe transaksi kas (masuk/keluar), tanggal, nominal, dan kategori
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Jenis Transaksi Kas <span className="text-destructive">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setData('type', 'in')}
                                className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all ${
                                    data.type === 'in'
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-xs dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-600'
                                        : 'border-sidebar-border bg-background text-muted-foreground hover:bg-muted/50'
                                }`}
                            >
                                <ArrowDownLeftIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Kas Masuk (In)</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('type', 'out')}
                                className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all ${
                                    data.type === 'out'
                                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xs dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-600'
                                        : 'border-sidebar-border bg-background text-muted-foreground hover:bg-muted/50'
                                }`}
                            >
                                <ArrowUpRightIcon className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                                <span>Kas Keluar (Out)</span>
                            </button>
                        </div>
                        {errors?.type && (
                            <p className="mt-1 text-xs text-destructive">{errors.type}</p>
                        )}
                    </div>

                    <DatePickerComponent
                        label="Tanggal Transaksi"
                        value={data.transaction_date}
                        handleOnChange={(val: string) =>
                            setData('transaction_date', val)
                        }
                        error={errors?.transaction_date}
                        required
                    />

                    <InputTextComponent
                        label="Nominal (Rp)"
                        type="number"
                        placeholder="Contoh: 500000"
                        name="amount"
                        value={data.amount}
                        handleOnChange={(e: any) =>
                            setData('amount', e.target.value)
                        }
                        error={errors?.amount}
                        required
                    />

                    <SelectComponent
                        label="Kategori Transaksi"
                        placeholder="Pilih Kategori"
                        name="category"
                        value={data.category}
                        handleOnChange={(value: string) =>
                            setData('category', value)
                        }
                        options={(categories || []).map((c: string) => ({
                            id: c,
                            name: c,
                        }))}
                        error={errors?.category}
                        isClearable
                    />

                    <div className="md:col-span-2">
                        <TextAreaComponent
                            label="Keterangan / Uraian Transaksi"
                            placeholder="Tuliskan keterangan detail transaksi kas, nomor kwitansi, atau tujuan penggunaan dana..."
                            name="description"
                            value={data.description}
                            handleOnChange={(e: any) =>
                                setData('description', e.target.value)
                            }
                            error={errors?.description}
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <FileTextIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">
                            Bukti Transaksi (Kwitansi / Nota / Transfer)
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Lampirkan foto struk, kwitansi, atau bukti transfer bila ada (JPG, PNG, WebP, max 4MB)
                        </p>
                    </div>
                </div>

                <InputFileComponent
                    label="Unggah Bukti"
                    name="proof"
                    handleOnChange={(file: any) => setData('proof', file)}
                    error={errors?.proof}
                />
            </div>

            <div className="flex justify-end gap-3">
                <ButtonComponent
                    type="submit"
                    variant="primary"
                    disabled={processing}
                >
                    <SaveIcon className="mr-2 h-4 w-4" />
                    {dataId ? 'Simpan Perubahan' : 'Catat Transaksi'}
                </ButtonComponent>
            </div>
        </Fieldset>
    );
};
