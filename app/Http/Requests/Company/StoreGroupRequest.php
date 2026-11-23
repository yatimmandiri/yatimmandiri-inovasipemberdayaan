<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

class StoreGroupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'kantor_id' => ['nullable', 'integer'],
            'kantor_name' => ['nullable', 'string', 'max:255'],
            'fasilitator_id' => ['nullable', 'integer', 'exists:fasilitators,id'],
            'program_id' => ['nullable', 'integer', 'exists:programs,id'],
            'leader_name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string'],
            'province_id' => ['nullable', 'string', 'max:2'],
            'regency_id' => ['nullable', 'string', 'max:4'],
            'district_id' => ['nullable', 'string', 'max:7'],
            'village_id' => ['nullable', 'string', 'max:10'],
            'status' => ['nullable', 'boolean'],
            'description' => ['nullable', 'string'],
        ];
    }
}
