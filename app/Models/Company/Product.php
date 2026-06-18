<?php

namespace App\Models\Company;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;
use Spatie\Sluggable\Attributes\Sluggable;

#[Fillable([
    'name',
    'slug',
    'link',
    'description',
    'featured_image',
    'status',
    'recommended',
    'unit',
    'price',
    'stock',
    'program_id',
])]

#[Sluggable(from: 'name', to: 'slug')]

class Product extends Model
{
    use LogsActivity, SoftDeletes;

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    public function scopeSearch(Builder $query, ?string $search)
    {
        return $query->when($search, function ($q, $search) {
            $q->where('name', 'like', "%{$search}%");
        });
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('System');
    }
}
