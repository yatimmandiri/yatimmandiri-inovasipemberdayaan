import { ButtonComponent } from '@/components/partials/button-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import { CheckboxComponent } from '@/components/partials/checkbox-component';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const ProgramForm = ({ dataId }: { dataId?: number }) => {
    const { program } = usePage<any>().props;

    const { data, setData, post, processing, errors, transform } = useForm(
        {
            name: program?.name || '',
            description: program?.description || '',
            featured_image: null as File | null,
            status: program?.status ?? true,
        },
    );

    transform((data: any) => ({
        ...data,
        status: data.status ? '1' : '0',
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(`/admin/programs/${dataId}`, {});
        } else {
            post('/admin/programs', {});
        }
    };

    return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputTextComponent
                    type="text"
                    label="Name"
                    placeholder="Program name"
                    name="name"
                    value={data.name}
                    handleOnChange={(value: string) => setData('name', value)}
                    color={errors.name ? 'danger' : 'default'}
                    errors={errors.name}
                    helperText={errors.name}
                />
                <InputFileComponent
                    label="Featured Image"
                    name="featured_image"
                    accept="image/*"
                    handleOnChange={(file: File) =>
                        setData('featured_image', file)
                    }
                    color={errors.featured_image ? 'danger' : 'default'}
                    errors={errors.featured_image}
                    helperText={errors.featured_image}
                />
                <div className="md:col-span-2">
                    <TextAreaComponent
                        label="Description"
                        placeholder="Program description"
                        name="description"
                        value={data.description}
                        rows={10}
                        handleOnChange={(value: string) =>
                            setData('description', value)
                        }
                        color={errors.description ? 'danger' : 'default'}
                        errors={errors.description}
                        helperText={errors.description}
                    />
                </div>
                <CheckboxComponent
                    label="Active"
                    checked={Boolean(data.status)}
                    setChecked={(checked: boolean) =>
                        setData('status', checked)
                    }
                />
            </div>
            <div className="flex justify-end space-x-4">
                <ButtonComponent
                    buttonText="Save"
                    addonLeft={SaveIcon}
                    buttonType="submit"
                    isProcessing={processing}
                />
            </div>
        </Fieldset>
    );
};
