import { ButtonComponent } from '@/components/partials/button-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import beneficiaries from '@/routes/admin/beneficiaries';
import districtsRoute from '@/routes/admin/core/regions/districts';
import regenciesRoute from '@/routes/admin/core/regions/regencies';
import villagesRoute from '@/routes/admin/core/regions/villages';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { BookOpenIcon, MapPinIcon, SaveIcon, UserCheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const BeneficiaryForm = ({ dataId }: { dataId?: number }) => {
    const { beneficiary, programs, fasilitators, groups: groupList, provinces, kantors }: any = usePage<any>().props;

    const initialProgramIds: number[] = beneficiary?.programs?.map((p: any) => p.id) || [];

    const { data, setData, post, put, processing, errors, transform } = useForm({
        name: beneficiary?.name || '',
        nik: beneficiary?.nik || '',
        kantor_id: beneficiary?.kantor_id || '',
        kantor_name: beneficiary?.kantor_name || '',
        program_ids: initialProgramIds,
        fasilitator_id: beneficiary?.fasilitator_id || '',
        group_id: beneficiary?.group_id || '',
        phone: beneficiary?.phone || '',
        address: beneficiary?.address || '',
        province_id: beneficiary?.province_id || '',
        regency_id: beneficiary?.regency_id || '',
        district_id: beneficiary?.district_id || '',
        village_id: beneficiary?.village_id || '',
        notes: beneficiary?.notes || '',
    });

    const [regencies, setRegencies] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);

    useEffect(() => {
        if (data.province_id) {
            axios
                .get(regenciesRoute.data().url, {
                    params: {
                        filterValue: {
                            province_id: data.province_id,
                        },
                    },
                })
                .then((res) => {
                    const rows = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                    setRegencies(rows);
                })
                .catch(() => {
                    setRegencies([]);
                });
        } else {
            setRegencies([]);
        }
    }, [data.province_id]);

    useEffect(() => {
        if (data.regency_id) {
            axios
                .get(districtsRoute.data().url, {
                    params: {
                        filterValue: {
                            regency_id: data.regency_id,
                        },
                    },
                })
                .then((res) => {
                    const rows = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                    setDistricts(rows);
                })
                .catch(() => {
                    setDistricts([]);
                });
        } else {
            setDistricts([]);
        }
    }, [data.regency_id]);

    useEffect(() => {
        if (data.district_id) {
            axios
                .get(villagesRoute.data().url, {
                    params: {
                        filterValue: {
                            district_id: data.district_id,
                        },
                    },
                })
                .then((res) => {
                    const rows = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                    setVillages(rows);
                })
                .catch(() => {
                    setVillages([]);
                });
        } else {
            setVillages([]);
        }
    }, [data.district_id]);

    const handleProgramToggle = (id: number) => {
        const current = data.program_ids || [];
        if (current.includes(id)) {
            setData('program_ids', current.filter((item) => item !== id));
        } else {
            setData('program_ids', [...current, id]);
        }
    };

    transform((formData: any) => ({
        ...formData,
        kantor_id: formData.kantor_id ? Number(formData.kantor_id) : null,
        fasilitator_id: formData.fasilitator_id ? Number(formData.fasilitator_id) : null,
        group_id: formData.group_id ? Number(formData.group_id) : null,
        province_id: formData.province_id ? String(formData.province_id) : null,
        regency_id: formData.regency_id ? String(formData.regency_id) : null,
        district_id: formData.district_id ? String(formData.district_id) : null,
        village_id: formData.village_id ? String(formData.village_id) : null,
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (dataId) {
            put(beneficiaries.update(dataId).url);
        } else {
            post(beneficiaries.store().url);
        }
    };

    return (
        <Fieldset as="form" onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Section 1: Profil Penerima Manfaat */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <UserCheckIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Identitas & Pendampingan</h3>
                        <p className="text-xs text-muted-foreground">Data penerima manfaat, kantor penugasan, dan fasilitator pendamping</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputTextComponent
                        type="text"
                        label="Nama Penerima Manfaat (PM)"
                        placeholder="Nama Lengkap PM"
                        name="name"
                        value={data.name}
                        handleOnChange={(value: string) => setData('name', value)}
                        color={errors.name ? 'danger' : 'default'}
                        description={errors.name}
                        required
                    />

                    <InputTextComponent
                        type="text"
                        label="NIK / Nomor Identitas"
                        placeholder="16 digit NIK"
                        name="nik"
                        value={data.nik}
                        handleOnChange={(value: string) => setData('nik', value)}
                        color={errors.nik ? 'danger' : 'default'}
                        description={errors.nik}
                    />

                    <SelectComponent
                        label="Kantor / Cabang"
                        placeholder="Pilih Kantor / Cabang"
                        name="kantor_id"
                        value={data.kantor_id}
                        handleOnChange={(value: string) => {
                            const selected = kantors?.find((k: any) => String(k.id) === String(value));
                            setData('kantor_id', value);
                            setData('kantor_name', selected ? selected.name : '');
                        }}
                        color={errors.kantor_id ? 'danger' : 'default'}
                        description={errors.kantor_id}
                        data={kantors?.map((item: any) => ({
                            id: item.id,
                            label: item.name,
                        })) || []}
                    />

                    <SelectComponent
                        label="Fasilitator Pendamping"
                        placeholder="Pilih Fasilitator"
                        name="fasilitator_id"
                        value={data.fasilitator_id}
                        handleOnChange={(value: string) => setData('fasilitator_id', value)}
                        color={errors.fasilitator_id ? 'danger' : 'default'}
                        description={errors.fasilitator_id}
                        data={fasilitators?.map((item: any) => ({
                            id: item.id,
                            label: item.name,
                        })) || []}
                    />

                    <SelectComponent
                        label="Kelompok Binaan (Opsional)"
                        placeholder="Pilih Kelompok"
                        name="group_id"
                        value={data.group_id}
                        handleOnChange={(value: string) => setData('group_id', value)}
                        color={errors.group_id ? 'danger' : 'default'}
                        description={errors.group_id}
                        data={groupList?.map((item: any) => ({
                            id: item.id,
                            label: item.name,
                        })) || []}
                    />

                    <InputTextComponent
                        type="text"
                        label="No. Handphone / Kontak"
                        placeholder="081234567890"
                        name="phone"
                        value={data.phone}
                        handleOnChange={(value: string) => setData('phone', value)}
                        color={errors.phone ? 'danger' : 'default'}
                        description={errors.phone}
                    />
                </div>
            </div>

            {/* Section 2: Program yang Diikuti */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <BookOpenIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Program yang Diikuti</h3>
                        <p className="text-xs text-muted-foreground">Pilih satu atau lebih program yang diterima oleh penerima manfaat</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                    {programs?.map((program: any) => {
                        const checked = data.program_ids.includes(program.id);
                        return (
                            <label
                                key={program.id}
                                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition-all ${
                                    checked
                                        ? 'border-primary bg-primary/10 font-medium text-primary shadow-xs'
                                        : 'border-sidebar-border/70 hover:border-sidebar-border hover:bg-muted/50'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleProgramToggle(program.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span>{program.name}</span>
                            </label>
                        );
                    })}
                </div>
                {errors.program_ids && (
                    <p className="mt-2 text-xs text-rose-500">{errors.program_ids}</p>
                )}
            </div>

            {/* Section 3: Wilayah & Domisili */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Wilayah & Domisili</h3>
                        <p className="text-xs text-muted-foreground">Alamat lengkap tempat tinggal penerima manfaat</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <TextAreaComponent
                        label="Alamat Lengkap"
                        placeholder="Alamat domisili penerima manfaat"
                        name="address"
                        value={data.address}
                        handleOnChange={(value: string) => setData('address', value)}
                        color={errors.address ? 'danger' : 'default'}
                        description={errors.address}
                        rows={3}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <SelectComponent
                            label="Provinsi"
                            placeholder="Pilih Provinsi"
                            name="province_id"
                            value={data.province_id}
                            handleOnChange={(value: string) => {
                                setData('province_id', value);
                                setData('regency_id', '');
                                setData('district_id', '');
                                setData('village_id', '');
                            }}
                            color={errors.province_id ? 'danger' : 'default'}
                            description={errors.province_id}
                            data={provinces?.map((item: any) => ({
                                id: item.id,
                                label: item.name,
                            })) || []}
                        />

                        <SelectComponent
                            label="Kabupaten / Kota"
                            placeholder="Pilih Kabupaten / Kota"
                            name="regency_id"
                            value={data.regency_id}
                            handleOnChange={(value: string) => {
                                setData('regency_id', value);
                                setData('district_id', '');
                                setData('village_id', '');
                            }}
                            color={errors.regency_id ? 'danger' : 'default'}
                            description={errors.regency_id}
                            data={regencies?.map((item: any) => ({
                                id: item.id,
                                label: item.name,
                            })) || []}
                        />

                        <SelectComponent
                            label="Kecamatan"
                            placeholder="Pilih Kecamatan"
                            name="district_id"
                            value={data.district_id}
                            handleOnChange={(value: string) => {
                                setData('district_id', value);
                                setData('village_id', '');
                            }}
                            color={errors.district_id ? 'danger' : 'default'}
                            description={errors.district_id}
                            data={districts?.map((item: any) => ({
                                id: item.id,
                                label: item.name,
                            })) || []}
                        />

                        <SelectComponent
                            label="Kelurahan / Desa"
                            placeholder="Pilih Kelurahan / Desa"
                            name="village_id"
                            value={data.village_id}
                            handleOnChange={(value: string) => setData('village_id', value)}
                            color={errors.village_id ? 'danger' : 'default'}
                            description={errors.village_id}
                            data={villages?.map((item: any) => ({
                                id: item.id,
                                label: item.name,
                            })) || []}
                        />
                    </div>
                </div>
            </div>

            {/* Section 4: Catatan Tambahan */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <BookOpenIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Catatan Perkembangan</h3>
                        <p className="text-xs text-muted-foreground">Catatan mengenai kondisi, kebutuhan, atau riwayat penerima manfaat</p>
                    </div>
                </div>

                <TextAreaComponent
                    label="Catatan Perkembangan / Keterangan"
                    placeholder="Catatan tambahan mengenai kondisi penerima manfaat"
                    name="notes"
                    value={data.notes}
                    handleOnChange={(value: string) => setData('notes', value)}
                    color={errors.notes ? 'danger' : 'default'}
                    description={errors.notes}
                    rows={3}
                />
            </div>

            {/* Submit Action */}
            <div className="flex justify-end gap-3 pt-2">
                <ButtonComponent
                    buttonType="submit"
                    isProcessing={processing}
                    addonLeft={SaveIcon}
                    buttonText="Simpan Penerima Manfaat"
                    className="flex items-center gap-2"
                />
            </div>
        </Fieldset>
    );
};
