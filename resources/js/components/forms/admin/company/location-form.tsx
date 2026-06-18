import { ButtonComponent } from '@/components/partials/button-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import locations from '@/routes/admin/companies/locations';
import districts from '@/routes/admin/core/regions/districts';
import regencies from '@/routes/admin/core/regions/regencies';
import villages from '@/routes/admin/core/regions/villages';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { SaveIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export const LocationForm = ({ dataId }: { dataId?: number }) => {
    const { location, provinces, programs } = usePage<any>().props;

    const [regionData, setRegionData] = useState({
        provinces: provinces,
        regencies: [],
        districts: [],
        villages: [],
    });

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            saveBack: 'false',
            name: location?.pic || '',
            address: location?.address || '',
            phone: location?.phone || '',
            province_id: location?.province_id || '',
            regency_id: location?.regency_id || '',
            district_id: location?.district_id || '',
            village_id: location?.village_id || '',
            program_id: location?.program_id || '',
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
            post(locations.update(dataId), {
                forceFormData: true,
            });
        } else {
            post(locations.store(), {
                forceFormData: true,
            });
        }
    };

    const handleRegionChange = (label: string, value: string) => {
        if (label == 'province_id') {
            setData((prev: any) => ({
                ...prev,
                province_id: value,
                regency_id: '',
                district_id: '',
                village_id: '',
            }));

            setRegionData((prev) => ({
                ...prev,
                regencies: [],
                districts: [],
                villages: [],
            }));
        } else if (label == 'regency_id') {
            setData((prev: any) => ({
                ...prev,
                regency_id: value,
                district_id: '',
                village_id: '',
            }));

            setRegionData((prev) => ({
                ...prev,
                districts: [],
                villages: [],
            }));
        } else if (label == 'district_id') {
            setData((prev: any) => ({
                ...prev,
                district_id: value,
                village_id: '',
            }));

            setRegionData((prev) => ({
                ...prev,
                villages: [],
            }));
        }

        setData((prev: any) => ({
            ...prev,
            village_id: value,
        }));
    };

    const getRegion = useCallback(async () => {
        try {
            const [regenciesRes, districtsRes, villagesRes] = await Promise.all(
                [
                    data.province_id
                        ? axios.get(regencies.data().url, {
                              params: {
                                  filterValue: {
                                      province_id: data.province_id,
                                  },
                              },
                          })
                        : Promise.resolve({ data: [] }),

                    data.regency_id
                        ? axios.get(districts.data().url, {
                              params: {
                                  filterValue: {
                                      regency_id: data.regency_id,
                                  },
                              },
                          })
                        : Promise.resolve({ data: [] }),

                    data.district_id
                        ? axios.get(villages.data().url, {
                              params: {
                                  filterValue: {
                                      district_id: data.district_id,
                                  },
                              },
                          })
                        : Promise.resolve({ data: [] }),
                ],
            );

            setRegionData((prev) => ({
                ...prev,
                regencies: regenciesRes.data,
                districts: districtsRes.data,
                villages: villagesRes.data,
            }));
        } catch (error) {
            console.error(error);
        }
    }, [data.province_id, data.regency_id, data.district_id]);

    useEffect(() => {
        getRegion();
    }, [getRegion]);

    useEffect(() => {
        setRegionData((prev) => ({
            ...prev,
            regencies: [],
            districts: [],
            villages: [],
        }));
    }, [data.province_id]);

    useEffect(() => {
        setRegionData((prev) => ({
            ...prev,
            districts: [],
            villages: [],
        }));
    }, [data.regency_id]);

    useEffect(() => {
        setRegionData((prev) => ({
            ...prev,
            villages: [],
        }));
    }, [data.district_id]);

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
                    label="Name"
                    name="name"
                    value={data.name}
                    handleOnChange={(value: string) => setData('name', value)}
                    errors={errors.name && errors.name}
                    helperText={errors.name && errors.name}
                    color={errors.name && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Address"
                    name="address"
                    value={data.address}
                    handleOnChange={(value: string) =>
                        setData('address', value)
                    }
                    errors={errors.address && errors.address}
                    helperText={errors.address && errors.address}
                    color={errors.address && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Phone"
                    name="Handphone"
                    value={data.phone}
                    handleOnChange={(value: string) => setData('phone', value)}
                    errors={errors.phone && errors.phone}
                    helperText={errors.phone && errors.phone}
                    color={errors.phone && 'danger'}
                />
                <SelectComponent
                    label="Provinces"
                    placeholder="Select Province..."
                    data={regionData.provinces.map((item: any) => {
                        return { label: item.name, value: item.id };
                    })}
                    dataSelected={Number(data.province_id)}
                    handleOnChange={(value: string) =>
                        handleRegionChange('province_id', value)
                    }
                    color={errors.province_id ? 'danger' : 'default'}
                    errors={errors.province_id && errors.province_id}
                    helperText={errors.province_id && errors.province_id}
                />
                <SelectComponent
                    label="Regencies"
                    placeholder="Select Regencies..."
                    data={regionData.regencies.map((item: any) => {
                        return { label: item.name, value: item.id };
                    })}
                    dataSelected={Number(data?.regency_id)}
                    handleOnChange={(value: string) =>
                        handleRegionChange('regency_id', value)
                    }
                    color={errors.regency_id ? 'danger' : 'default'}
                    errors={errors.regency_id && errors.regency_id}
                    helperText={errors.regency_id && errors.regency_id}
                />
                <SelectComponent
                    label="District"
                    placeholder="Select District..."
                    data={regionData.districts.map((item: any) => {
                        return { label: item.name, value: item.id };
                    })}
                    dataSelected={Number(data?.district_id)}
                    handleOnChange={(value: string) =>
                        handleRegionChange('district_id', value)
                    }
                    color={errors.district_id ? 'danger' : 'default'}
                    errors={errors.district_id && errors.district_id}
                    helperText={errors.district_id && errors.district_id}
                />
                <SelectComponent
                    label="Village"
                    placeholder="Select Village..."
                    data={regionData.villages.map((item: any) => {
                        return { label: item.name, value: item.id };
                    })}
                    dataSelected={Number(data?.village_id)}
                    handleOnChange={(value: string) =>
                        handleRegionChange('village_id', value)
                    }
                    color={errors.village_id ? 'danger' : 'default'}
                    errors={errors.village_id && errors.village_id}
                    helperText={errors.village_id && errors.village_id}
                />
                <SelectComponent
                    label="Programs"
                    placeholder="Select Program..."
                    data={programs?.map((item: any) => {
                        return { label: item.name, value: item.id };
                    })}
                    dataSelected={data?.program_id}
                    handleOnChange={(value: string) =>
                        setData('program_id', value)
                    }
                    color={errors.program_id ? 'danger' : 'default'}
                    errors={errors.program_id && errors.program_id}
                    helperText={errors.program_id && errors.program_id}
                />
            </div>
            <div className="flex justify-end space-x-4">
                <ButtonComponent
                    buttonText="Save"
                    addonLeft={SaveIcon}
                    buttonType="submit"
                    isProcessing={processing}
                    onClick={() => setData('saveBack', 'true')}
                />
            </div>
        </Fieldset>
    );
};
