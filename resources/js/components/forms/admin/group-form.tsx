import { ButtonComponent } from '@/components/partials/button-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import groups from '@/routes/admin/groups';
import districtsRoute from '@/routes/admin/core/regions/districts';
import regenciesRoute from '@/routes/admin/core/regions/regencies';
import villagesRoute from '@/routes/admin/core/regions/villages';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { BookOpenIcon, MapPinIcon, SaveIcon, UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const GroupForm = ({ dataId }: { dataId?: number }) => {
    const { group, fasilitators, programs, provinces, kantors }: any = usePage<any>().props;

    const { data, setData, post, put, processing, errors, transform } = useForm({
        name: group?.name || '',
        kantor_id: group?.kantor_id || '',
        kantor_name: group?.kantor_name || '',
        fasilitator_id: group?.fasilitator_id || '',
        program_id: group?.program_id || '',
        leader_name: group?.leader_name || '',
        phone: group?.phone || '',
        address: group?.address || '',
        province_id: group?.province_id || '',
        regency_id: group?.regency_id || '',
        district_id: group?.district_id || '',
        village_id: group?.village_id || '',
        description: group?.description || '',
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

    transform((formData: any) => ({
        ...formData,
        kantor_id: formData.kantor_id ? Number(formData.kantor_id) : null,
        fasilitator_id: formData.fasilitator_id ? Number(formData.fasilitator_id) : null,
        program_id: formData.program_id ? Number(formData.program_id) : null,
        province_id: formData.province_id ? String(formData.province_id) : null,
        regency_id: formData.regency_id ? String(formData.regency_id) : null,
        district_id: formData.district_id ? String(formData.district_id) : null,
        village_id: formData.village_id ? String(formData.village_id) : null,
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (dataId) {
            put(groups.update(dataId).url);
        } else {
            post(groups.store().url);
        }
    };

    return (
        <Fieldset as="form" onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Section 1: Informasi Kelompok */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Informasi Kelompok & Pembina</h3>
                        <p className="text-xs text-muted-foreground">Detail nama kelompok, kantor cabang, fasilitator pendamping, dan program</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputTextComponent
                        type="text"
                        label="Nama Kelompok Binaan"
                        placeholder="Contoh: Kelompok Tani Makmur"
                        name="name"
                        value={data.name}
                        handleOnChange={(value: string) => setData('name', value)}
                        color={errors.name ? 'danger' : 'default'}
                        description={errors.name}
                        required
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
                        label="Program Pemberdayaan"
                        placeholder="Pilih Program"
                        name="program_id"
                        value={data.program_id}
                        handleOnChange={(value: string) => setData('program_id', value)}
                        color={errors.program_id ? 'danger' : 'default'}
                        description={errors.program_id}
                        data={programs?.map((item: any) => ({
                            id: item.id,
                            label: item.name,
                        })) || []}
                    />

                    <InputTextComponent
                        type="text"
                        label="Nama Ketua Kelompok"
                        placeholder="Nama Ketua Kelompok"
                        name="leader_name"
                        value={data.leader_name}
                        handleOnChange={(value: string) => setData('leader_name', value)}
                        color={errors.leader_name ? 'danger' : 'default'}
                        description={errors.leader_name}
                    />

                    <InputTextComponent
                        type="text"
                        label="No. Kontak Kelompok / WhatsApp"
                        placeholder="081234567890"
                        name="phone"
                        value={data.phone}
                        handleOnChange={(value: string) => setData('phone', value)}
                        color={errors.phone ? 'danger' : 'default'}
                        description={errors.phone}
                    />
                </div>
            </div>

            {/* Section 2: Wilayah & Sekretariat */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Wilayah & Sekretariat</h3>
                        <p className="text-xs text-muted-foreground">Lokasi sekretariat atau tempat pertemuan rutin kelompok</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <TextAreaComponent
                        label="Alamat Sekretariat / Lokasi Kelompok"
                        placeholder="Alamat lengkap kelompok"
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

            {/* Section 3: Catatan & Deskripsi */}
            <div className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2 border-b border-sidebar-border/50 pb-3">
                    <BookOpenIcon className="h-5 w-5 text-primary" />
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Deskripsi & Keterangan</h3>
                        <p className="text-xs text-muted-foreground">Profil singkat atau catatan tambahan seputar kegiatan kelompok</p>
                    </div>
                </div>

                <TextAreaComponent
                    label="Deskripsi / Catatan Kelompok"
                    placeholder="Profil singkat atau keterangan kegiatan kelompok"
                    name="description"
                    value={data.description}
                    handleOnChange={(value: string) => setData('description', value)}
                    color={errors.description ? 'danger' : 'default'}
                    description={errors.description}
                    rows={3}
                />
            </div>

            {/* Submit Action */}
            <div className="flex justify-end gap-3 pt-2">
                <ButtonComponent
                    buttonType="submit"
                    isProcessing={processing}
                    addonLeft={SaveIcon}
                    buttonText="Simpan Kelompok"
                    className="flex items-center gap-2"
                />
            </div>
        </Fieldset>
    );
};
