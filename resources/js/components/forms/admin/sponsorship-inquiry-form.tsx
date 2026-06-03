import { ButtonComponent } from '@/components/partials/button-component';
import sponsorshipInquiries from '@/routes/admin/sponsorship-inquiries';
import { Fieldset } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type StatusOption = {
    value: string;
    label: string;
};

export const SponsorshipInquiryForm = ({ dataId }: { dataId?: number }) => {
    const { inquiry, statuses } = usePage<any>().props;

    const { data, setData, post, processing, errors, transform } = useForm({
        contact_name: inquiry?.contact_name || '',
        phone: inquiry?.phone || '',
        email: inquiry?.email || '',
        address: inquiry?.address || '',
        organization_name: inquiry?.organization_name || '',
        organization_type: inquiry?.organization_type || '',
        organization_address: inquiry?.organization_address || '',
        organization_phone: inquiry?.organization_phone || '',
        organization_email: inquiry?.organization_email || '',
        collaboration_type: inquiry?.collaboration_type || '',
        support_type: inquiry?.support_type || '',
        preferred_program: inquiry?.preferred_program || '',
        estimated_budget: inquiry?.estimated_budget || '',
        message: inquiry?.message || '',
        status: inquiry?.status || 'new',
    });

    transform((data: any) => ({
        ...data,
        ...(dataId && { _method: 'put' }),
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (dataId) {
            post(sponsorshipInquiries.update(dataId).url, {});
            return;
        }

        post(sponsorshipInquiries.store().url, {});
    };

    return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-8"
        >
            <FormSection title="Contact Person">
                <Field
                    label="Contact Name"
                    value={data.contact_name}
                    error={errors.contact_name}
                    onChange={(value) => setData('contact_name', value)}
                />
                <Field
                    label="Phone"
                    value={data.phone}
                    error={errors.phone}
                    onChange={(value) => setData('phone', value)}
                />
                <Field
                    label="Email"
                    type="email"
                    value={data.email}
                    error={errors.email}
                    onChange={(value) => setData('email', value)}
                />
                <Field
                    label="Address"
                    value={data.address}
                    error={errors.address}
                    onChange={(value) => setData('address', value)}
                />
            </FormSection>

            <FormSection title="Organization">
                <Field
                    label="Organization Name"
                    value={data.organization_name}
                    error={errors.organization_name}
                    onChange={(value) => setData('organization_name', value)}
                />
                <Field
                    label="Organization Type"
                    value={data.organization_type}
                    error={errors.organization_type}
                    onChange={(value) => setData('organization_type', value)}
                />
                <Field
                    label="Organization Phone"
                    value={data.organization_phone}
                    error={errors.organization_phone}
                    onChange={(value) => setData('organization_phone', value)}
                />
                <Field
                    label="Organization Email"
                    type="email"
                    value={data.organization_email}
                    error={errors.organization_email}
                    onChange={(value) => setData('organization_email', value)}
                />
                <TextArea
                    label="Organization Address"
                    value={data.organization_address}
                    error={errors.organization_address}
                    onChange={(value) => setData('organization_address', value)}
                />
            </FormSection>

            <FormSection title="Collaboration">
                <Field
                    label="Collaboration Type"
                    value={data.collaboration_type}
                    error={errors.collaboration_type}
                    onChange={(value) => setData('collaboration_type', value)}
                />
                <Field
                    label="Support Type"
                    value={data.support_type}
                    error={errors.support_type}
                    onChange={(value) => setData('support_type', value)}
                />
                <Field
                    label="Preferred Program"
                    value={data.preferred_program}
                    error={errors.preferred_program}
                    onChange={(value) => setData('preferred_program', value)}
                />
                <Field
                    label="Estimated Budget"
                    value={data.estimated_budget}
                    error={errors.estimated_budget}
                    onChange={(value) => setData('estimated_budget', value)}
                />
                <label className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Status</span>
                    <select
                        value={data.status}
                        onChange={(event) =>
                            setData('status', event.target.value)
                        }
                        className={`h-10 rounded-md border bg-background px-3 text-sm outline-none ${
                            errors.status ? 'border-destructive' : ''
                        }`}
                    >
                        {(statuses || []).map((status: StatusOption) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                    {errors.status && (
                        <span className="text-xs text-destructive">
                            {errors.status}
                        </span>
                    )}
                </label>
                <TextArea
                    label="Message"
                    value={data.message}
                    error={errors.message}
                    onChange={(value) => setData('message', value)}
                />
            </FormSection>

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

const FormSection = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => (
    <section className="space-y-4">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </section>
);

const Field = ({
    label,
    value,
    error,
    onChange,
    type = 'text',
}: {
    label: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
    type?: string;
}) => (
    <label className="flex flex-col space-y-2">
        <span className="text-sm font-semibold">{label}</span>
        <input
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={`h-10 rounded-md border bg-background px-3 text-sm outline-none ${
                error ? 'border-destructive' : ''
            }`}
        />
        {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
);

const TextArea = ({
    label,
    value,
    error,
    onChange,
}: {
    label: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}) => (
    <label className="flex flex-col space-y-2 md:col-span-2">
        <span className="text-sm font-semibold">{label}</span>
        <textarea
            value={value}
            rows={5}
            onChange={(event) => onChange(event.target.value)}
            className={`rounded-md border bg-background px-3 py-2 text-sm outline-none ${
                error ? 'border-destructive' : ''
            }`}
        />
        {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
);
