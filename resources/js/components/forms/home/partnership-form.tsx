import { InputTextComponent } from '@/components/partials/input-component';
import { SelectComponent } from '@/components/partials/select-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import { formatNumberWhatsapp } from '@/utils/formatNumber';
import { Button, Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    Mail,
    Phone,
    Send,
    UserRound,
} from 'lucide-react';

export const PartnershipForm = () => {
    const { programs } = usePage<any>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        organization_name: '',
        contact_name: '',
        email: '',
        phone: '',
        program_id: 'CSR',
        budget_range: '',
        preferred_contact: 'whatsapp',
        message: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // post('/sponsorship', {
        //     preserveScroll: true,
        //     onSuccess: () => reset(),
        // });
    };

    return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col space-y-4"
        >
            <div className="grid gap-5 md:grid-cols-2">
                <InputTextComponent
                    id="organization_name"
                    name="organization_name"
                    label="Nama Perusahaan/Organisasi"
                    placeholder="PT / Komunitas / Instansi"
                    value={data.organization_name}
                    handleOnChange={(value: string) =>
                        setData('organization_name', value)
                    }
                    errors={
                        errors.organization_name && errors.organization_name
                    }
                    helperText={
                        errors.organization_name && errors.organization_name
                    }
                    color={errors.organization_name ? 'danger' : 'default'}
                    addonLeft={Building2}
                    group={true}
                />
                <InputTextComponent
                    id="contact_name"
                    name="contact_name"
                    label="Nama Penanggung Jawab"
                    placeholder="Nama lengkap"
                    value={data.contact_name}
                    handleOnChange={(value: string) =>
                        setData('contact_name', value)
                    }
                    errors={errors.contact_name && errors.contact_name}
                    helperText={errors.contact_name && errors.contact_name}
                    color={errors.contact_name ? 'danger' : 'default'}
                    addonLeft={UserRound}
                    group={true}
                />
                <InputTextComponent
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    value={data.email}
                    handleOnChange={(value: string) => setData('email', value)}
                    errors={errors.email && errors.email}
                    helperText={errors.email && errors.email}
                    color={errors.email ? 'danger' : 'default'}
                    addonLeft={Mail}
                    group={true}
                />
                <InputTextComponent
                    id="phone"
                    name="phone"
                    label="Nomor Telepon"
                    placeholder="628xxxxxxxxxx"
                    value={data.phone}
                    handleOnChange={(value: string) =>
                        setData('phone', formatNumberWhatsapp(value))
                    }
                    errors={errors.phone && errors.phone}
                    helperText={errors.phone && errors.phone}
                    color={errors.phone ? 'danger' : 'default'}
                    addonLeft={Phone}
                    group={true}
                />
                <SelectComponent
                    id="program_id"
                    name="program_id"
                    label="Program"
                    data={programs.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                    dataSelected={data.program_id}
                    handleOnChange={(value: string) =>
                        setData('program_id', value)
                    }
                    errors={errors.program_id && errors.program_id}
                    helperText={errors.program_id && errors.program_id}
                    color={errors.program_id ? 'danger' : 'default'}
                />
                <SelectComponent
                    id="budget_range"
                    name="budget_range"
                    label="Anggaran"
                    data={[
                        { value: '0-5000000', label: '0 - 5.000.000' },
                        {
                            value: '5000000-10000000',
                            label: '5.000.000 - 10.000.000',
                        },
                        {
                            value: '10000000-15000000',
                            label: '10.000.000 - 15.000.000',
                        },
                        {
                            value: '15000000-20000000',
                            label: '15.000.000 - 20.000.000',
                        },
                        {
                            value: '20000000-25000000',
                            label: '20.000.000 - 25.000.000',
                        },
                        {
                            value: '25000000-30000000',
                            label: '25.000.000 - 30.000.000',
                        },
                        {
                            value: '30000000-35000000',
                            label: '30.000.000 - 35.000.000',
                        },
                        {
                            value: '35000000-40000000',
                            label: '35.000.000 - 40.000.000',
                        },
                    ]}
                    dataSelected={data.budget_range}
                    handleOnChange={(value: string) =>
                        setData('budget_range', value)
                    }
                    errors={errors.budget_range && errors.budget_range}
                    helperText={errors.budget_range && errors.budget_range}
                    color={errors.budget_range ? 'danger' : 'default'}
                />
            </div>
            <TextAreaComponent
                id="message"
                name="message"
                label="Rencana Kerja Sama"
                placeholder="Ceritakan tujuan, bentuk dukungan, target penerima manfaat, atau timeline kerja sama."
                value={data.message}
                handleOnChange={(value: string) => setData('message', value)}
                errors={errors.message && errors.message}
                helperText={errors.message && errors.message}
                color={errors.message ? 'danger' : 'default'}
            />
            <Button
                type="submit"
                disabled={processing}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Send className="h-5 w-5" />
                Kirim Pengajuan
                <ArrowRight className="h-5 w-5" />
            </Button>
        </Fieldset>
    );
};
