<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'status' => ['nullable', 'boolean'],
        ];
    }
}
