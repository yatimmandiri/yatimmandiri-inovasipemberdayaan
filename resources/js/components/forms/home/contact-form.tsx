import { ButtonComponent } from '@/components/partials/button-component';
import { InputTextComponent } from '@/components/partials/input-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import { formatNumberWhatsapp } from '@/utils/formatNumber';
import { Fieldset } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { SendIcon } from 'lucide-react';

export const ContactForm = () => {
    const { data, setData, post, transform, processing, errors }: any = useForm(
        {
            saveBack: 'false',
        },
    );

    // transformData
    transform((data: any) => ({
        ...data,
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col space-y-4 pt-4"
        >
            <div className="grid grid-cols-1 gap-4">
                <InputTextComponent
                    type="text"
                    label="Name"
                    name="name"
                    placeholder="John Doe"
                    value={data.name}
                    handleOnChange={(value: string) => setData('name', value)}
                    errors={errors.name && errors.name}
                    helperText={errors.name && errors.name}
                    color={errors.name && 'danger'}
                />
                <InputTextComponent
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="johndoe@example.com"
                    value={data.email}
                    handleOnChange={(value: string) => setData('email', value)}
                    errors={errors.email && errors.email}
                    helperText={errors.email && errors.email}
                    color={errors.email && 'danger'}
                />
                <InputTextComponent
                    type="text"
                    label="Phone"
                    name="phone"
                    placeholder="6281xxxxxxxxx"
                    value={data.phone}
                    handleOnChange={(value: string) =>
                        setData('phone', formatNumberWhatsapp(value))
                    }
                    errors={errors.phone && errors.phone}
                    helperText={errors.phone && errors.phone}
                    color={errors.phone && 'danger'}
                />
                <TextAreaComponent
                    label="Message"
                    name="message"
                    placeholder="write message ..."
                    value={data.message}
                    handleOnChange={(value: string) =>
                        setData('message', value)
                    }
                    errors={errors.message && errors.message}
                    helperText={errors.message && errors.message}
                    color={errors.message && 'danger'}
                />
            </div>
            <div className="flex justify-end space-x-4">
                <ButtonComponent
                    buttonText="Kirim Pesan"
                    addonLeft={SendIcon}
                    buttonType="submit"
                    isProcessing={processing}
                    onClick={() => setData('saveBack', 'true')}
                />
            </div>
        </Fieldset>
    );
};
