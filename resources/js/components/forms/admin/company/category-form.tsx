import { ButtonComponent } from '@/components/partials/button-component';
import { EditorComponent } from '@/components/partials/editor-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import categories from '@/routes/admin/companies/categories';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const CategoryForm = ({ dataId }: { dataId?: number }) => {
    const { category } = usePage<any>().props;

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            saveBack: 'false',
            name: category?.name || '',
            description: category?.description,
            benefits: category?.benefits,
            icon: null,
            featured_image: null,
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
            post(categories.update(dataId), {
                forceFormData: true,
            });
        } else {
            post(categories.store(), {
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
                <TextAreaComponent
                    label="Benefits"
                    name="benefits"
                    value={data.benefits}
                    handleOnChange={(value: string) =>
                        setData('benefits', value)
                    }
                    errors={errors.benefits && errors.benfits}
                    helperText={errors.benefits && errors.benefits}
                    color={errors.benefits && 'danger'}
                />
                <InputFileComponent
                    type="file"
                    label="Icon"
                    name="icon"
                    handleOnChange={(value: any) => setData('icon', value)}
                    errors={errors.icon && errors.icon}
                    helperText={errors.icon && errors.icon}
                    color={errors.icon && 'danger'}
                />
                <InputFileComponent
                    type="file"
                    label="Featured Image"
                    name="featured_image"
                    handleOnChange={(value: any) =>
                        setData('featured_image', value)
                    }
                    errors={errors.featured_image && errors.featured_image}
                    helperText={errors.featured_image && errors.featured_image}
                    color={errors.featured_image && 'danger'}
                />
            </div>
            <EditorComponent
                label="Description"
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
