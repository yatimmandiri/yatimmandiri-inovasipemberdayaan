<?php

namespace App\Http\Requests\Company;

use Illuminate\Contracts\Validation\ValidationRule;

class UpdateGroupRequest extends StoreGroupRequest
{
    /**
     * Update memakai rules store (unique name per cabang + unique fasilitator, diabaikan untuk diri sendiri).
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return parent::rules();
    }
}
