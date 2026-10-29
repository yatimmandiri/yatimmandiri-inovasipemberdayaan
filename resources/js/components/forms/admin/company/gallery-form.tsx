import { ButtonComponent } from '@/components/partials/button-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import galleries from '@/routes/admin/companies/galleries';
import programs from '@/routes/admin/companies/programs';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const GalleryForm = ({ dataId }: { dataId?: number }) => {
    const { gallery } = usePage<any>().props;

    console.log(gallery);

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            saveBack: 'false',
            name: gallery?.name || '',
            program_id: gallery?.program_id || '',
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
            post(galleries.update(dataId), {
                forceFormData: true,
            });
        } else {
            post(galleries.store(), {
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
                <SelectComponent
                    label="Program"
                    name="program_id"
                    fetchDataUrl={programs.data().url}
                    dataSelected={data.program_id}
                    // dataSelectedLabel={gallery.programs?.name}
                    handleOnChange={(value: string) =>
                        setData('program_id', value)
                    }
                    errors={errors.program_id && errors.program_id}
                    helperText={errors.program_id && errors.program_id}
                    color={errors.program_id && 'danger'}
                />
                <InputFileComponent
                    type="file"
                    label="Photo"
                    name="photo"
                    handleOnChange={(value: any) => setData('photo', value)}
                    errors={errors.photo && errors.photo}
                    helperText={errors.photo && errors.photo}
                    color={errors.photo && 'danger'}
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
