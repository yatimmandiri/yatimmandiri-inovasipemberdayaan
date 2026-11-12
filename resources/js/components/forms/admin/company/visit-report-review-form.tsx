import { ButtonComponent } from '@/components/partials/button-component';
import { TextAreaComponent } from '@/components/partials/textarea-component';
import visitReports from '@/routes/admin/visit-reports';
import { Fieldset } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { CheckIcon, RotateCcwIcon } from 'lucide-react';

/**
 * Panel review administrator laporan pendampingan:
 * disetujui (revised notes kosong) atau diminta revisi (wajib catatan).
 */
export const VisitReportReviewForm = ({ dataId }: { dataId: number }) => {
    const { data, setData, put, processing, errors }: any = useForm({
        status: '',
        review_notes: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        put(visitReports.review(dataId).url);
    };

    return (
        <Fieldset
            as="form"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
        >
            <TextAreaComponent
                label="Catatan Review (wajib jika meminta revisi)"
                name="review_notes"
                value={data.review_notes}
                handleOnChange={(value: string) =>
                    setData('review_notes', value)
                }
                errors={errors.review_notes && errors.review_notes}
                helperText={errors.review_notes && errors.review_notes}
                color={errors.review_notes && 'danger'}
            />
            <div className="flex justify-end space-x-4">
                <ButtonComponent
                    buttonText="Minta Revisi"
                    addonLeft={RotateCcwIcon}
                    buttonType="submit"
                    isProcessing={processing}
                    onClick={() => setData('status', 'revised')}
                />
                <ButtonComponent
                    buttonText="Setujui"
                    addonLeft={CheckIcon}
                    buttonType="submit"
                    isProcessing={processing}
                    onClick={() => setData('status', 'reviewed')}
                />
            </div>
        </Fieldset>
    );
};
