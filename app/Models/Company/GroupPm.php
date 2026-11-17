<?php

namespace App\Models\Company;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'group_id',
    'name',
])]

class GroupPm extends Model
{
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
