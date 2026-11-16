<?php

namespace App\Http\Requests\Company;

use Illuminate\Contracts\Validation\ValidationRule;

class UpdateCashTransactionRequest extends StoreCashTransactionRequest
{
    /**
     * Update memakai rules yang sama dengan store — tanggal kas bebas backdate
     * sehingga tidak ada pengecualian tanggal lama seperti pada laporan monev.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return parent::rules();
    }
}
