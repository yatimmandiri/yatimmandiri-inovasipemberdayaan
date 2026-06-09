import { ButtonComponent } from '@/components/partials/button-component';
import { CheckboxComponent } from '@/components/partials/checkbox-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const VideoForm = ({ dataId }: { dataId?: number }) => {
    const { video } = usePage<any>().props;

    const { data, setData, post, processing, errors, transform } = useForm({
        title: video?.title || '',
        category: video?.category || '',
        youtube_url: video?.youtube_url || '',
        thumbnail_url: video?.thumbnail_url || '',
        description: video?.description || '',
        published_at: video?.published_at
            ? video.published_at.slice(0, 10)
            : '',
        status: video?.status ?? true,
    });

    transform((data: any) => ({
        ...data,
        status: data.status ? '1' : '0',
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(`/admin/videos/${dataId}`, {});
            return;
        }

        post('/admin/videos', {});
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
                    placeholder="Video title"
                    name="title"
                    value={data.title}
                    handleOnChange={(value: string) => setData('title', value)}
                    color={errors.title ? 'danger' : 'default'}
                    errors={errors.title}
                    helperText={errors.title}
                />
                <InputTextComponent
                    type="url"
                    label="YouTube URL"
                    placeholder="https://www.youtube.com/watch?v=..."
                    name="youtube_url"
                    value={data.youtube_url}
                    handleOnChange={(value: string) =>
                        setData('youtube_url', value)
                    }
                    color={errors.youtube_url ? 'danger' : 'default'}
                    errors={errors.youtube_url}
                    helperText={errors.youtube_url}
                />
                <InputTextComponent
                    type="text"
                    label="Category"
                    placeholder="Video category"
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
                    type="url"
                    label="Thumbnail URL"
                    placeholder="Optional, default from YouTube"
                    name="thumbnail_url"
                    value={data.thumbnail_url}
                    handleOnChange={(value: string) =>
                        setData('thumbnail_url', value)
                    }
                    color={errors.thumbnail_url ? 'danger' : 'default'}
                    errors={errors.thumbnail_url}
                    helperText={errors.thumbnail_url}
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
                <div className="md:col-span-2">
                    <TextAreaComponent
                        label="Description"
                        placeholder="Video description"
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
