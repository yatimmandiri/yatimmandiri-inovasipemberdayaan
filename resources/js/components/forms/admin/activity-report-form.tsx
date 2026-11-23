import { ButtonComponent } from '@/components/partials/button-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import activityReports from '@/routes/admin/activity-reports';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import {
    CalendarDaysIcon,
    ClipboardListIcon,
    ImageIcon,
    SaveIcon,
    UsersRoundIcon,
} from 'lucide-react';

const today = () => new Date().toISOString().slice(0, 10);

export const ActivityReportForm = ({ dataId }: { dataId?: number }) => {
    const {
        activityReport,
        fasilitators,
        groups,
        types,
    }: any = usePage<any>().props;

    const { data, setData, post, processing, errors, transform }: any = useForm({
        fasilitator_id: activityReport?.fasilitator_id || '',
        group_id: activityReport?.group_id || '',
        activity_date: activityReport?.activity_date
            ? String(activityReport.activity_date).slice(0, 10)
            : today(),
        title: activityReport?.title || '',
        type: activityReport?.type || '',
        location: activityReport?.location || '',
        participants_count: activityReport?.participants_count ?? 0,
        description: activityReport?.description || '',
        photo: null,
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
        participants_count: Number(formData.participants_count || 0),
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(activityReports.update(dataId).url, { forceFormData: true });
        } else {
            post(activityReports.store().url, { forceFormData: true });
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
                            Pilih fasilitator pendamping lalu kelompok binaan
                            yang melaksanakan kegiatan
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
                                (group: any) =>
                                    String(group.id) === String(data.group_id),
                            );

                            if (
                                selectedGroup &&
                                String(selectedGroup.fasilitator_id) !==
                                    String(value)
                            ) {
                                setData('group_id', '');
                            }
                        }}
                        errors={!!errors.fasilitator_id}
                        helperText={errors.fasilitator_id}
                        color={errors.fasilitator_id ? 'danger' : 'default'}
                        data={
                            fasilitators?.map((item: any) => ({
                                value: item.id,
                                label: item.name,
                            })) || []
                        }
                    />

                    <SelectComponent
                        label="Kelompok Binaan"
                        placeholder="Pilih Kelompok"
                        name="group_id"
                        value={data.group_id}
                        handleOnChange={(value: string) => {
                            const selectedGroup = (groups || []).find(
                                (group: any) =>
                                    String(group.id) === String(value),
                            );

                            setData('group_id', value);
                            if (selectedGroup?.fasilitator_id) {
                                setData(
                                    'fasilitator_id',
                                    selectedGroup.fasilitator_id,
                                );
                            }
                        }}
                        errors={!!errors.group_id}
                        helperText={errors.group_id}
                        color={errors.group_id ? 'danger' : 'default'}
                        data={
                            filteredGroups?.map((item: any) => ({
                                value: item.id,
                                label: item.name,
                            })) || []
                        }
                    />
                </div>
            </div>

            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <ClipboardListIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">
                            Detail Aktivitas
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Informasi kegiatan yang dilaksanakan kelompok
                            binaan
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputTextComponent
                        type="text"
                        label="Judul / Nama Kegiatan"
                        placeholder="Contoh: Pertemuan Rutin Bulanan"
                        name="title"
                        value={data.title}
                        handleOnChange={(value: string) =>
                            setData('title', value)
                        }
                        errors={!!errors.title}
                        helperText={errors.title}
                        color={errors.title ? 'danger' : 'default'}
                        required
                    />

                    <SelectComponent
                        label="Jenis Kegiatan"
                        placeholder="Pilih Jenis Kegiatan"
                        name="type"
                        value={data.type}
                        handleOnChange={(value: string) =>
                            setData('type', value)
                        }
                        errors={!!errors.type}
                        helperText={errors.type}
                        color={errors.type ? 'danger' : 'default'}
                        data={(types || []).map((type: string) => ({
                            value: type,
                            label: type,
                        }))}
                    />

                    <InputTextComponent
                        type="date"
                        label="Tanggal Kegiatan"
                        name="activity_date"
                        value={data.activity_date}
                        handleOnChange={(value: string) =>
                            setData('activity_date', value)
                        }
                        errors={!!errors.activity_date}
                        helperText={errors.activity_date}
                        color={errors.activity_date ? 'danger' : 'default'}
                        required
                    />

                    <InputTextComponent
                        type="number"
                        label="Jumlah Peserta"
                        placeholder="0"
                        name="participants_count"
                        min={0}
                        value={data.participants_count}
                        handleOnChange={(value: string) =>
                            setData('participants_count', value)
                        }
                        errors={!!errors.participants_count}
                        helperText={errors.participants_count}
                        color={
                            errors.participants_count ? 'danger' : 'default'
                        }
                    />

                    <InputTextComponent
                        type="text"
                        label="Lokasi Kegiatan"
                        placeholder="Contoh: Balai Desa Sukamaju"
                        name="location"
                        value={data.location}
                        handleOnChange={(value: string) =>
                            setData('location', value)
                        }
                        errors={!!errors.location}
                        helperText={errors.location}
                        color={errors.location ? 'danger' : 'default'}
                    />
                </div>
            </div>

            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <CalendarDaysIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">
                            Uraian & Dokumentasi
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Ceritakan jalannya kegiatan dan lampirkan foto
                            dokumentasi bila ada
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <TextAreaComponent
                        label="Uraian Kegiatan"
                        placeholder="Tuliskan ringkasan kegiatan, materi, hasil, atau catatan penting"
                        name="description"
                        rows={5}
                        value={data.description}
                        handleOnChange={(value: string) =>
                            setData('description', value)
                        }
                        errors={!!errors.description}
                        helperText={errors.description}
                        color={errors.description ? 'danger' : 'default'}
                    />

                    <InputFileComponent
                        type="file"
                        label="Foto Dokumentasi"
                        name="photo"
                        accept="image/jpeg,image/png,image/webp"
                        handleOnChange={(value: any) =>
                            setData('photo', value)
                        }
                        errors={!!errors.photo}
                        helperText={errors.photo}
                        color={errors.photo ? 'danger' : 'default'}
                    />

                    {activityReport?.photo && (
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            <a
                                href={`/storage/${activityReport.photo}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-primary underline-offset-4 hover:underline"
                            >
                                Lihat foto dokumentasi saat ini
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <ButtonComponent
                    buttonType="submit"
                    isProcessing={processing}
                    addonLeft={SaveIcon}
                    buttonText="Simpan Laporan"
                    className="flex items-center gap-2"
                />
            </div>
        </Fieldset>
    );
};
