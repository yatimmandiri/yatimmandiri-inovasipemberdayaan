import { ButtonComponent } from '@/components/partials/button-component';
import { CheckboxComponent } from '@/components/partials/checkbox-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import newsRoutes from '@/routes/admin/news';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const NewsForm = ({ dataId }: { dataId?: number }) => {
    const { news } = usePage<any>().props;

    const { data, setData, post, processing, errors, transform } = useForm({
        title: news?.title || '',
        category: news?.category || '',
        content: news?.content || '',
        featured_image: null as File | null,
        published_at: news?.published_at ? news.published_at.slice(0, 10) : '',
        status: news?.status ?? true,
    });

    transform((data: any) => ({
        ...data,
        status: data.status ? '1' : '0',
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(newsRoutes.update(dataId).url, {});
            return;
        }

        post(newsRoutes.store().url, {});
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
                    label="Title"
                    placeholder="News title"
                    name="title"
                    value={data.title}
                    handleOnChange={(value: string) => setData('title', value)}
                    color={errors.title ? 'danger' : 'default'}
                    errors={errors.title}
                    helperText={errors.title}
                />
                <InputTextComponent
                    type="text"
                    label="Category"
                    placeholder="News category"
                    name="category"
                    value={data.category}
                    handleOnChange={(value: string) =>
                        setData('category', value)
                    }
                    color={errors.category ? 'danger' : 'default'}
                    errors={errors.category}
                    helperText={errors.category}
                />
                <InputTextComponent
                    type="date"
                    label="Published At"
                    name="published_at"
                    value={data.published_at}
                    handleOnChange={(value: string) =>
                        setData('published_at', value)
                    }
                    color={errors.published_at ? 'danger' : 'default'}
                    errors={errors.published_at}
                    helperText={errors.published_at}
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
                        label="Content"
                        placeholder="News content"
                        name="content"
                        value={data.content}
                        rows={10}
                        handleOnChange={(value: string) =>
                            setData('content', value)
                        }
                        color={errors.content ? 'danger' : 'default'}
                        errors={errors.content}
                        helperText={errors.content}
                    />
                </div>
                <CheckboxComponent
                    label="Published"
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
