<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

class StoreBeneficiaryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'nik' => ['nullable', 'string', 'max:30'],
            'kantor_id' => ['nullable', 'integer'],
            'kantor_name' => ['nullable', 'string', 'max:255'],
            'program_ids' => ['nullable', 'array'],
            'program_ids.*' => ['integer', 'exists:programs,id'],
            'fasilitator_id' => ['nullable', 'integer', 'exists:fasilitators,id'],
            'group_id' => ['nullable', 'integer', 'exists:groups,id'],
            'phone' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string'],
            'province_id' => ['nullable', 'string', 'max:2'],
            'regency_id' => ['nullable', 'string', 'max:4'],
            'district_id' => ['nullable', 'string', 'max:7'],
            'village_id' => ['nullable', 'string', 'max:10'],
            'status' => ['nullable', 'boolean'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
