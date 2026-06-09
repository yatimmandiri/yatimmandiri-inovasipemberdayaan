<?php

namespace App\Models\Company;

use App\Models\Company\Location;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;
use Spatie\Sluggable\Attributes\Sluggable;

#[Fillable([
    'name',
    'slug',
    'excerpt',
    'description',
    'featured_image',
    'status',
    'recommended',
    'benefits',
    'category_id',
])]

#[Sluggable(from: 'name', to: 'slug')]

class Program extends Model
{
    use LogsActivity;

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function locations(): HasMany
    {
        return $this->hasMany(Location::class, 'program_id');
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
