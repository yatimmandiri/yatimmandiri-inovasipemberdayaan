<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFasilitatorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'program_id' => ['nullable', 'integer', 'exists:programs,id'],
            'phone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
            'province_id' => ['nullable', 'string', 'max:2'],
            'regency_id' => ['nullable', 'string', 'max:4'],
            'district_id' => ['nullable', 'string', 'max:7'],
            'village_id' => ['nullable', 'string', 'max:10'],
            'status' => ['nullable', 'boolean'],
        ];
    }
}
