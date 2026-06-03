<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\Attributes\Sluggable;

#[Fillable([
    'name',
    'slug',
    'description',
    'status',
])]
#[Sluggable(from: 'name', to: 'slug')]
class ProgramCategory extends Model
{
    protected function casts(): array
    {
        return [
            'status' => 'boolean',
        ];
    }

    public function programs(): HasMany
    {
        return $this->hasMany(Program::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', true);
    }
}
