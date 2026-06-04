<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'program_category_id' => ['nullable', 'exists:program_categories,id'],
            'description' => ['required', 'string'],
            'featured_image' => ['nullable', 'image', 'max:2048'],
            'status' => ['nullable', 'boolean'],
        ];
    }
}
