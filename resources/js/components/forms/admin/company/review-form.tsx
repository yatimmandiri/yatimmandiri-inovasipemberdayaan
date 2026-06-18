import { ButtonComponent } from '@/components/partials/button-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import reviews from '@/routes/admin/companies/reviews';
import { Fieldset } from '@headlessui/react';

import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const ReviewForm = ({ dataId }: { dataId?: number }) => {
    const { review } = usePage<any>().props;

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            saveBack: 'false',
            name: review?.name || '',
            position: review?.position || '',
            description: review?.description || '',
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
            post(reviews.update(dataId), {
                forceFormData: true,
            });
        } else {
            post(reviews.store(), {
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
                <InputTextComponent
                    type="text"
                    label="Position"
                    name="position"
                    value={data.position}
                    handleOnChange={(value: string) =>
                        setData('position', value)
                    }
                    errors={errors.position && errors.position}
                    helperText={errors.position && errors.position}
                    color={errors.position && 'danger'}
                />
                <InputFileComponent
                    type="file"
                    label="Avatar"
                    name="photo"
                    handleOnChange={(value: any) => setData('photo', value)}
                    errors={errors.photo && errors.photo}
                    helperText={errors.photo && errors.photo}
                    color={errors.photo && 'danger'}
                />
            </div>
            <TextAreaComponent
                label="Comment"
                name="description"
                value={data.description}
                handleOnChange={(value: string) =>
                    setData('description', value)
                }
                errors={errors.description && errors.description}
                helperText={errors.description && errors.description}
                color={errors.description && 'danger'}
            />
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
