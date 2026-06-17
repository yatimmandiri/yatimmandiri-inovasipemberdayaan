import { ButtonComponent } from '@/components/partials/button-component';
import { EditorComponent } from '@/components/partials/editor-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import programs from '@/routes/admin/companies/programs';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const ProgramForm = ({ dataId }: { dataId?: number }) => {
    const { program, categories } = usePage<any>().props;

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            saveBack: 'false',
            name: program?.name || '',
            description: program?.description || '',
            benefits: program?.activities || '',
            category_id: program?.category_id || '',
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
            post(programs.update(dataId), {
                forceFormData: true,
            });
        } else {
            post(programs.store(), {
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
                    label="Category"
                    name="category_id"
                    data={categories?.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                    dataSelected={data.category_id}
                    handleOnChange={(value: string) =>
                        setData('category_id', value)
                    }
                    errors={errors.category_id && errors.category_id}
                    helperText={errors.category_id && errors.category_id}
                    color={errors.category_id && 'danger'}
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
