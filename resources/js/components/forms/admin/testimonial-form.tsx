import { ButtonComponent } from '@/components/partials/button-component';
import { CheckboxComponent } from '@/components/partials/checkbox-component';
import {
    InputFileComponent,
    InputTextComponent,
} from '@/components/partials/input-component';
import { NumberComponent } from '@/components/partials/number-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

export const TestimonialForm = ({ dataId }: { dataId?: number }) => {
    const { testimonial } = usePage<any>().props;

    const { data, setData, post, processing, errors, transform } = useForm(
        {
            name: testimonial?.name || '',
            position: testimonial?.position || '',
            description: testimonial?.description || '',
            photo: null as File | null,
            rating: testimonial?.rating || 5,
            status: testimonial?.status ?? true,
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
            post(`/admin/testimonials/${dataId}`, {});
        } else {
            post('/admin/testimonials', {});
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
                    placeholder="Name"
                    name="name"
                    value={data.name}
                    handleOnChange={(value: string) => setData('name', value)}
                    color={errors.name ? 'danger' : 'default'}
                    errors={errors.name}
                    helperText={errors.name}
                />
                <InputTextComponent
                    type="text"
                    label="Position"
                    placeholder="Position"
                    name="position"
                    value={data.position}
                    handleOnChange={(value: string) =>
                        setData('position', value)
                    }
                    color={errors.position ? 'danger' : 'default'}
                    errors={errors.position}
                    helperText={errors.position}
                />
                <NumberComponent
                    label="Rating"
                    name="rating"
                    min={1}
                    max={5}
                    value={data.rating}
                    handleOnChange={(value: string) =>
                        setData('rating', Number(value || 1))
                    }
                    color={errors.rating ? 'danger' : 'default'}
                    errors={errors.rating}
                    helperText={errors.rating}
                />
                <InputFileComponent
                    label="Photo"
                    name="photo"
                    accept="image/*"
                    handleOnChange={(file: File) => setData('photo', file)}
                    color={errors.photo ? 'danger' : 'default'}
                    errors={errors.photo}
                    helperText={errors.photo}
                />
                <div className="md:col-span-2">
                    <TextAreaComponent
                        label="Description"
                        placeholder="Testimonial message"
                        name="description"
                        value={data.description}
                        rows={8}
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
