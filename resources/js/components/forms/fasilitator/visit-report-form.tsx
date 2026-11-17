import { ButtonComponent } from '@/components/partials/button-component';
import { CameraCaptureComponent } from '@/components/partials/camera-capture-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import visitReports from '@/routes/fasilitator/visit-reports';
import { compressImage } from '@/utils/compressImage';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon, SendIcon } from 'lucide-react';

export const VisitReportForm = ({ dataId }: { dataId?: number }) => {
    const { visitReport, program } = usePage<any>().props;

    // Rentang tanggal yang boleh dipilih: 3 hari sebelumnya sampai hari ini
    // (window sama dengan validasi backend).
    const minVisitDate = localDateShift(-3);
    const maxVisitDate = localDateToday();

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            // Kirim '1'/'0' — rule boolean Laravel hanya menerima
            // true/false/1/0/"1"/"0"; string "false"/"true" dapat 422.
            submit: '0',
            program_id: visitReport?.program_id || '',
            event_name: visitReport?.event_name || '',
            visit_date: visitReport?.visit_date || localDateToday(),
            start_time: visitReport?.start_time || '',
            end_time: visitReport?.end_time || '',
            activity_description: visitReport?.activity_description || '',
            obstacles: visitReport?.obstacles || '',
            pm_count: visitReport?.pm_count ?? '',
            photo: null,
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
            post(visitReports.update(dataId).url, {
                forceFormData: true,
            });
        } else {
            post(visitReports.store().url, {
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
            {visitReport?.status === 'revised' && visitReport?.review_notes ? (
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                    <strong>Catatan revisi dari Administrator:</strong>{' '}
                    {visitReport.review_notes}
                    <span className="mt-1 block text-xs text-amber-700">
                        Perbaiki laporan di bawah, lalu simpan dengan "Save
                        &amp; Ajukan" agar dipelajari ulang.
                    </span>
                </div>
            ) : null}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <SelectComponent
                    label="Program"
                    name="program_id"
                    data={program?.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                    dataSelected={data.program_id}
                    handleOnChange={(value: string) =>
                        setData('program_id', value)
                    }
                    errors={errors.program_id && errors.program_id}
                    helperText={errors.program_id && errors.program_id}
                    color={errors.program_id && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Nama Event"
                    name="event_name"
                    placeholder="Contoh: Bimtek Kewirausahaan Batch 1"
                    value={data.event_name}
                    handleOnChange={(value: string) =>
                        setData('event_name', value)
                    }
                    errors={errors.event_name && errors.event_name}
                    helperText={
                        errors.event_name
                            ? errors.event_name
                            : 'Nama event dari program ini, bisa lebih dari satu event per program.'
                    }
                    color={errors.event_name && 'danger'}
                />
                <InputTextComponent
                    type="date"
                    label="Hari/Tanggal Kunjungan"
                    name="visit_date"
                    value={data.visit_date}
                    min={minVisitDate}
                    max={maxVisitDate}
                    handleOnChange={(value: string) =>
                        setData('visit_date', value)
                    }
                    errors={errors.visit_date && errors.visit_date}
                    helperText={
                        errors.visit_date && errors.visit_date
                            ? errors.visit_date
                            : `${daysName(data.visit_date)} • hanya bisa ${minVisitDate} s/d ${maxVisitDate}`
                    }
                    color={errors.visit_date && 'danger'}
                />
                <InputTextComponent
                    type="time"
                    label="Jam Mulai Pendampingan"
                    name="start_time"
                    value={data.start_time}
                    handleOnChange={(value: string) =>
                        setData('start_time', value)
                    }
                    errors={errors.start_time && errors.start_time}
                    helperText={errors.start_time && errors.start_time}
                    color={errors.start_time && 'danger'}
                />
                <InputTextComponent
                    type="time"
                    label="Jam Selesai Pendampingan"
                    name="end_time"
                    value={data.end_time}
                    handleOnChange={(value: string) =>
                        setData('end_time', value)
                    }
                    errors={errors.end_time && errors.end_time}
                    helperText={errors.end_time && errors.end_time}
                    color={errors.end_time && 'danger'}
                />
                <InputTextComponent
                    type="number"
                    label="Jumlah Penerima Manfaat Terlibat"
                    name="pm_count"
                    value={data.pm_count}
                    handleOnChange={(value: string) =>
                        setData('pm_count', value)
                    }
                    errors={errors.pm_count && errors.pm_count}
                    helperText={errors.pm_count && errors.pm_count}
                    color={errors.pm_count && 'danger'}
                />
                <CameraCaptureComponent
                    name="photo"
                    errors={errors.photo && errors.photo}
                    helperText="Live foto dari kamera; otomatis dikompres sebelum upload."
                    handleOnChange={async (file: File) => {
                        const compressed = await compressImage(file);
                        setData('photo', compressed);
                    }}
                />
            </div>
            <TextAreaComponent
                label="Isi Kegiatan"
                name="activity_description"
                value={data.activity_description}
                handleOnChange={(value: string) =>
                    setData('activity_description', value)
                }
                errors={
                    errors.activity_description && errors.activity_description
                }
                helperText={
                    errors.activity_description && errors.activity_description
                }
                color={errors.activity_description && 'danger'}
            />
            <TextAreaComponent
                label="Kendala yang Dihadapi"
                name="obstacles"
                value={data.obstacles}
                handleOnChange={(value: string) => setData('obstacles', value)}
                errors={errors.obstacles && errors.obstacles}
                helperText={
                    errors.obstacles
                        ? errors.obstacles
                        : 'Kosongkan jika tidak ada kendala.'
                }
                color={errors.obstacles && 'danger'}
            />
            <div className="flex justify-end space-x-4">
                <ButtonComponent
                    buttonText={dataId ? 'Save' : 'Save Draft'}
                    addonLeft={SaveIcon}
                    buttonType="submit"
                    isProcessing={processing}
                    onClick={() => setData('submit', '0')}
                />
                <ButtonComponent
                    buttonText="Save & Ajukan"
                    addonLeft={SendIcon}
                    buttonType="submit"
                    isProcessing={processing}
                    onClick={() => setData('submit', '1')}
                />
            </div>
        </Fieldset>
    );
};

const daysName = (date: string) => {
    if (!date) {
        return '';
    }

    return new Date(date).toLocaleDateString('id-ID', { weekday: 'long' });
};

// Tanggal hari ini dalam zona waktu browser (bukan UTC), format YYYY-MM-DD
// untuk nilai default <input type="date">.
export const localDateToday = () => localDateShift(0);

// Tanggal browser digeser delta hari (negatif = ke belakang), format YYYY-MM-DD.
export const localDateShift = (deltaDays: number) => {
    const now = new Date();
    now.setDate(now.getDate() + deltaDays);

    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
};
