<?php

namespace App\Models\Company;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;
use Spatie\Sluggable\Attributes\Sluggable;

#[Fillable([
    'name',
    'slug',
    'excerpt',
    'description',
    'icon',
    'featured_image',
    'status',
    'recommended',
    'benefits',
])]

#[Sluggable(from: 'name', to: 'slug')]

class Category extends Model
{
    use SoftDeletes, LogsActivity;

    public function programs(): HasMany
    {
        return $this->hasMany(Program::class, 'category_id');
    }

    public function scopeSelectBasicColumn(Builder $query)
    {
        return $query->with([
            'programs' => fn($q) => $q->select(['id', 'name', 'slug', 'excerpt', 'featured_image', 'category_id']),
        ])->select(['id', 'name', 'slug', 'excerpt', 'icon', 'featured_image']);
    }

    public function scopeActive(Builder $query)
    {
        return $query->where('status', true);
    }

    public function scopeRecommended(Builder $query)
    {
        return $query->where('recommended', true);
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
