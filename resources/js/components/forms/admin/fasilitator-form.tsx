import { ButtonComponent } from '@/components/partials/button-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import fasilitators from '@/routes/admin/fasilitators';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const FasilitatorForm = ({ dataId }: { dataId?: number }) => {
    const { fasilitator, programs, users, provinces, kantors }: any = usePage<any>().props;

    const initialProgramIds: number[] = fasilitator?.programs?.map((p: any) => p.id) || [];

    const { data, setData, post, put, processing, errors, transform } = useForm({
        name: fasilitator?.name || '',
        kantor_id: fasilitator?.kantor_id || '',
        kantor_name: fasilitator?.kantor_name || '',
        user_id: fasilitator?.user_id || '',
        program_ids: initialProgramIds,
        phone: fasilitator?.phone || '',
        email: fasilitator?.email || '',
        address: fasilitator?.address || '',
        province_id: fasilitator?.province_id || '',
        regency_id: fasilitator?.regency_id || '',
        district_id: fasilitator?.district_id || '',
        village_id: fasilitator?.village_id || '',
        status: fasilitator?.status ?? true,
    });

    const [regencies, setRegencies] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);

    useEffect(() => {
        if (data.province_id) {
            axios.get(`/api/regions/regencies?province_id=${data.province_id}`).then((res) => {
                setRegencies(res.data || []);
            }).catch(() => {});
        } else {
            setRegencies([]);
        }
    }, [data.province_id]);

    useEffect(() => {
        if (data.regency_id) {
            axios.get(`/api/regions/districts?regency_id=${data.regency_id}`).then((res) => {
                setDistricts(res.data || []);
            }).catch(() => {});
        } else {
            setDistricts([]);
        }
    }, [data.regency_id]);

    useEffect(() => {
        if (data.district_id) {
            axios.get(`/api/regions/villages?district_id=${data.district_id}`).then((res) => {
                setVillages(res.data || []);
            }).catch(() => {});
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
        user_id: formData.user_id ? Number(formData.user_id) : null,
        status: Boolean(formData.status),
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (dataId) {
            put(fasilitators.update(dataId).url);
        } else {
            post(fasilitators.store().url);
        }
    };

    return (
        <Fieldset as="form" onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputTextComponent
                    type="text"
                    label="Nama Fasilitator"
                    placeholder="Nama Fasilitator"
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
                    label="Akun User Login (Opsional)"
                    placeholder="Pilih Akun User"
                    name="user_id"
                    value={data.user_id}
                    handleOnChange={(value: string) => setData('user_id', value)}
                    color={errors.user_id ? 'danger' : 'default'}
                    description={errors.user_id}
                    data={users?.map((item: any) => ({
                        id: item.id,
                        label: `${item.name} (${item.email})`,
                    })) || []}
                />

                <InputTextComponent
                    type="text"
                    label="No. Handphone / WhatsApp"
                    placeholder="081234567890"
                    name="phone"
                    value={data.phone}
                    handleOnChange={(value: string) => setData('phone', value)}
                    color={errors.phone ? 'danger' : 'default'}
                    description={errors.phone}
                />

                <InputTextComponent
                    type="email"
                    label="Email"
                    placeholder="email@example.com"
                    name="email"
                    value={data.email}
                    handleOnChange={(value: string) => setData('email', value)}
                    color={errors.email ? 'danger' : 'default'}
                    description={errors.email}
                />

                <SelectComponent
                    label="Status"
                    placeholder="Pilih Status"
                    name="status"
                    value={data.status ? '1' : '0'}
                    handleOnChange={(value: string) => setData('status', value === '1')}
                    color={errors.status ? 'danger' : 'default'}
                    description={errors.status}
                    data={[
                        { id: '1', label: 'Aktif' },
                        { id: '0', label: 'Non-Aktif' },
                    ]}
                />
            </div>

            {/* Multi Program Selection */}
            <div className="space-y-2 rounded-lg border p-4">
                <label className="text-sm font-semibold text-foreground">
                    Program Pemberdayaan (Bisa Memilih Lebih dari Satu Program)
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {programs?.map((program: any) => {
                        const checked = data.program_ids.includes(program.id);
                        return (
                            <label
                                key={program.id}
                                className={`flex cursor-pointer items-center gap-2 rounded-md border p-2.5 text-sm transition-colors ${
                                    checked ? 'border-primary bg-primary/10 font-medium text-primary' : 'border-sidebar-border hover:bg-muted'
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
                    <p className="text-xs text-rose-500">{errors.program_ids}</p>
                )}
            </div>

            <TextareaComponent
                label="Alamat Lengkap"
                placeholder="Alamat domisili / wilayah penugasan"
                name="address"
                value={data.address}
                handleOnChange={(value: string) => setData('address', value)}
                color={errors.address ? 'danger' : 'default'}
                description={errors.address}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

            <div className="flex justify-end gap-2 pt-4">
                <ButtonComponent
                    type="submit"
                    disabled={processing}
                    className="flex items-center gap-2"
                >
                    <SaveIcon className="h-4 w-4" />
                    Simpan Fasilitator
                </ButtonComponent>
            </div>
        </Fieldset>
    );
};
