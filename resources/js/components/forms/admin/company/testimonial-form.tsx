import { ButtonComponent } from '@/components/partials/button-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import testimonials from '@/routes/admin/companies/testimonials';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const TestimonialForm = ({ dataId }: { dataId?: number }) => {
    const { testimonial, category } = usePage<any>().props;

    const {
        data,
        setData,
        post,
        put,
        transform,
        processing,
        errors,
        reset,
    }: any = useForm({
        saveBack: 'false',
        name: testimonial?.name || '',
        position: testimonial?.position || '',
        categories_id: testimonial?.categories_id || '',
        description: testimonial?.description || '',
        photo: null,
    });

    // transformData
    transform((data: any) => ({
        ...data,
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(testimonials.update(dataId), {
                forceFormData: true,
            });
        } else {
            post(testimonials.store(), {
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
                <SelectComponent
                    label="Category"
                    name="categories_id"
                    data={category?.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                    dataSelected={data.categories_id}
                    handleOnChange={(value: string) =>
                        setData('categories_id', value)
                    }
                    errors={errors.categories_id && errors.categories_id}
                    helperText={errors.categories_id && errors.categories_id}
                    color={errors.categories_id && 'danger'}
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
