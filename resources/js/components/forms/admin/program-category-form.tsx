import { ButtonComponent } from '@/components/partials/button-component';
import { CheckboxComponent } from '@/components/partials/checkbox-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import programCategories from '@/routes/admin/program-categories';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const ProgramCategoryForm = ({ dataId }: { dataId?: number }) => {
    const { category } = usePage<any>().props;

    const { data, setData, post, processing, errors, transform } = useForm({
        name: category?.name || '',
        description: category?.description || '',
        status: category?.status ?? true,
    });

    transform((data: any) => ({
        ...data,
        status: data.status ? '1' : '0',
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(programCategories.update(dataId).url, {});
            return;
        }

        post(programCategories.store().url, {});
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
                    placeholder="Category name"
                    name="name"
                    value={data.name}
                    handleOnChange={(value: string) => setData('name', value)}
                    color={errors.name ? 'danger' : 'default'}
                    errors={errors.name}
                    helperText={errors.name}
                />
                <div className="md:col-span-2">
                    <TextAreaComponent
                        label="Description"
                        placeholder="Category description"
                        name="description"
                        value={data.description}
                        rows={6}
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
