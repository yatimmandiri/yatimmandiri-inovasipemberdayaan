<?php

namespace App\Http\Requests\Company;

use App\Models\Company\VisitReport;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVisitReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Fasilitator mengedit ulang laporan yang mungkin dibuat lama (mis. diminta
        // revisi setelah beberapa hari). Window 3 hari hanya ditegakkan bila tanggal
        // kunjungan DIUBAH dari nilai aslinya; tanggal asli tetap sah.
        $report = $this->route('visit_report');
        $originalDate = $report instanceof VisitReport
            ? $report->visit_date
            : null;
        $minDate = now()->subDays(3)->toDateString();

        $visitDateRules = ['required', 'date', 'before_or_equal:today'];

        if ($originalDate !== $this->input('visit_date')) {
            $visitDateRules[] = "after_or_equal:{$minDate}";
        }

        return [
            'program_id' => ['required', 'integer', Rule::exists('programs', 'id')],
            'event_name' => ['required', 'string', 'max:255'],
            'visit_date' => $visitDateRules,
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'activity_description' => ['required', 'string', 'min:10', 'max:5000'],
            'obstacles' => ['nullable', 'string', 'max:5000'],
            'pm_count' => ['required', 'integer', 'min:1', 'max:100000'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:5120'],
            'submit' => ['nullable', 'boolean'],
        ];
    }
}
