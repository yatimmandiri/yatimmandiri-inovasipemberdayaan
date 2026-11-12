<?php

namespace App\Http\Requests\Company;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreGroupRequest extends FormRequest
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
        $groupId = $this->route('group')?->id;

        return [
            'branch_id' => ['required', 'integer', Rule::exists('branches', 'id')],
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('groups', 'name')->where(fn ($q) => $q->where('branch_id', $this->input('branch_id')))->ignore($groupId),
            ],
            'fasilitator_id' => [
                'nullable',
                'integer',
                Rule::exists('users', 'id'),
                Rule::unique('groups', 'fasilitator_id')->ignore($groupId),
            ],
            // Daftar nama PM anggota kelompok (array string bebas).
            'pms' => ['nullable', 'array', 'max:200'],
            'pms.*' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'fasilitator_id.unique' => 'Fasilitator ini sudah memegang kelompok lain (1 fasil = 1 kelompok).',
            'name.unique' => 'Nama kelompok sudah dipakai di cabang ini.',
        ];
    }
}
