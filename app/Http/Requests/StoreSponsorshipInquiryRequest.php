<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSponsorshipInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'contact_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
            'organization_name' => ['required', 'string', 'max:255'],
            'organization_type' => ['nullable', 'string', 'max:255'],
            'organization_address' => ['nullable', 'string'],
            'organization_phone' => ['nullable', 'string', 'max:50'],
            'organization_email' => ['nullable', 'email', 'max:255'],
            'collaboration_type' => ['required', 'string', 'max:255'],
            'support_type' => ['required', 'string', 'max:255'],
            'preferred_program' => ['nullable', 'string', 'max:255'],
            'estimated_budget' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'status' => ['nullable', 'string', 'in:new,contacted,in_review,approved,rejected'],
        ];
    }
}
