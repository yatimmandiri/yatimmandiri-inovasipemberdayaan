<?php

namespace App\Http\Requests\Company;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCashTransactionRequest extends FormRequest
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
     * Tanggal kas bebas backdate (tidak ada batas bawah), tapi tidak boleh masa depan.
     * Satu baris = satu arah mutasi: debit XOR credit (divalidasi di after()).
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'transaction_date' => ['required', 'date', 'before_or_equal:today'],
            // branch_id SELALU diturunkan server dari kelompok (fasil maupun admin);
            // input klien tidak dipercaya, jadi rule cukup nullable.
            'branch_id' => ['nullable', 'integer', Rule::exists('branches', 'id')],
            'group_id' => ['required', 'integer', Rule::exists('groups', 'id')],
            'description' => ['required', 'string', 'min:3', 'max:500'],
            'debit' => ['nullable', 'numeric', 'min:0', 'max:9999999999999.99'],
            'credit' => ['nullable', 'numeric', 'min:0', 'max:9999999999999.99'],
        ];
    }

    /**
     * Debit dan kredit tidak boleh keduanya terisi (atau keduanya kosong/0).
     */
    public function after(): array
    {
        return [
            function ($validator) {
                $debit = (float) ($this->input('debit') ?: 0);
                $credit = (float) ($this->input('credit') ?: 0);

                if (($debit > 0 && $credit > 0) || ($debit <= 0 && $credit <= 0)) {
                    $validator->errors()->add(
                        'debit',
                        'Isi salah satu saja: Debit (arus masuk) atau Kredit (arus keluar).'
                    );
                }
            },
        ];
    }
}
