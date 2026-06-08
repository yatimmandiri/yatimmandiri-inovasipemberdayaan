import { ButtonComponent } from '@/components/partials/button-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import mitras from '@/routes/admin/companies/mitras';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const MitraForm = ({ dataId }: { dataId?: number }) => {
    const { mitra } = usePage<any>().props;

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            saveBack: 'false',
            name: mitra?.name || '',
            logo: null,
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
            post(mitras.update(dataId), {
                forceFormData: true,
            });
        } else {
            post(mitras.store(), {
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
                    label="Name"
                    name="name"
                    value={data.name}
                    handleOnChange={(value: string) => setData('name', value)}
                    errors={errors.name && errors.name}
                    helperText={errors.name && errors.name}
                    color={errors.name && 'danger'}
                />
                <InputFileComponent
                    type="file"
                    label="Logo"
                    name="logo"
                    handleOnChange={(value: any) => setData('logo', value)}
                    errors={errors.logo && errors.logo}
                    helperText={errors.logo && errors.logo}
                    color={errors.logo && 'danger'}
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
