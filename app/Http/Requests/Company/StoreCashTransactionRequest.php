<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

class StoreCashTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'group_id' => ['required', 'integer', 'exists:groups,id'],
            'fasilitator_id' => ['required', 'integer', 'exists:fasilitators,id'],
            'transaction_date' => ['required', 'date'],
            'type' => ['required', 'string', 'in:in,out'],
            'amount' => ['required', 'numeric', 'min:0.01', 'max:999999999999.99'],
            'category' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'proof' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,pdf', 'max:4096'],
            'status' => ['nullable', 'boolean'],
        ];
    }
}
