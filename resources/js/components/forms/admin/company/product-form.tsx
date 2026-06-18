import { ButtonComponent } from '@/components/partials/button-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import products from '@/routes/admin/companies/products';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const ProductForm = ({ dataId }: { dataId?: number }) => {
    const { product, programs } = usePage<any>().props;

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            saveBack: 'false',
            name: product?.name || '',
            link: product?.link || '',
            description: product?.description || '',
            price: Number(product?.price) || '',
            program_id: product?.program_id || '',
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
            post(products.update(dataId), {
                forceFormData: true,
            });
        } else {
            post(products.store(), {
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
                    label="Link"
                    name="link"
                    value={data.link}
                    handleOnChange={(value: string) => setData('link', value)}
                    errors={errors.link && errors.link}
                    helperText={errors.link && errors.link}
                    color={errors.link && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Price"
                    name="price"
                    value={data.price}
                    handleOnChange={(value: string) => setData('price', value)}
                    errors={errors.price && errors.price}
                    helperText={errors.price && errors.price}
                    color={errors.price && 'danger'}
                />
                <SelectComponent
                    label="Program"
                    name="program_id"
                    data={programs?.map((program: any) => ({
                        value: program.id,
                        label: program.name,
                    }))}
                    dataSelected={data.program_id}
                    handleOnChange={(value: string) =>
                        setData('program_id', value)
                    }
                    errors={errors.program_id && errors.program_id}
                    helperText={errors.program_id && errors.program_id}
                    color={errors.program_id && 'danger'}
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
            <TextAreaComponent
                label="Description"
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
