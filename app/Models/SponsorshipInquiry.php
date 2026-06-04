<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SponsorshipInquiry extends Model
{
    protected $fillable = [
        'contact_name',
        'phone',
        'email',
        'address',
        'organization_name',
        'organization_type',
        'organization_address',
        'organization_phone',
        'organization_email',
        'collaboration_type',
        'support_type',
        'preferred_program',
        'estimated_budget',
        'message',
        'status',
    ];
}
