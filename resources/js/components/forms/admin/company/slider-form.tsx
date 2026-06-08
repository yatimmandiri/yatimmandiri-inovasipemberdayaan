import { ButtonComponent } from '@/components/partials/button-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import sliders from '@/routes/admin/companies/sliders';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const SliderForm = ({ dataId }: { dataId?: number }) => {
    const { slider, categories } = usePage<any>().props;

    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            saveBack: 'false',
            title: slider?.title || '',
            subtitle: slider?.subtitle || '',
            url: slider?.url || '',
            video_url: slider?.video_url || '',
            category_id: slider?.category_id || '',
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
            post(sliders.update(dataId), {
                forceFormData: true,
            });
        } else {
            post(sliders.store(), {
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
                    label="Title"
                    name="title"
                    value={data.title}
                    handleOnChange={(value: string) => setData('title', value)}
                    errors={errors.title && errors.title}
                    helperText={errors.title && errors.title}
                    color={errors.title && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Subtitle"
                    name="subtitle"
                    value={data.subtitle}
                    handleOnChange={(value: string) =>
                        setData('subtitle', value)
                    }
                    errors={errors.subtitle && errors.subtitle}
                    helperText={errors.subtitle && errors.subtitle}
                    color={errors.subtitle && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="URL"
                    name="url"
                    value={data.url}
                    handleOnChange={(value: string) => setData('url', value)}
                    errors={errors.url && errors.url}
                    helperText={errors.url && errors.url}
                    color={errors.url && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Video URL"
                    name="video_url"
                    value={data.video_url}
                    handleOnChange={(value: string) =>
                        setData('video_url', value)
                    }
                    errors={errors.video_url && errors.video_url}
                    helperText={errors.video_url && errors.video_url}
                    color={errors.video_url && 'danger'}
                />
                <SelectComponent
                    label="Category"
                    name="category_id"
                    data={categories?.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                    dataSelected={data.category_id}
                    handleOnChange={(value: any) =>
                        setData('category_id', value)
                    }
                    errors={errors.category_id && errors.category_id}
                    helperText={errors.category_id && errors.category_id}
                    color={errors.category_id && 'danger'}
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
