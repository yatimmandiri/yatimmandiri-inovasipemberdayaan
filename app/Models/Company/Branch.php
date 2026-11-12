<?php

namespace App\Models\Company;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

#[Fillable([
    'name',
    'label',
])]

class Branch extends Model
{
    use LogsActivity, SoftDeletes;

    /**
     * Nama yang ditampilkan: label jika ada (mis. PUSAT 2 tampil sebagai SURABAYA), else name.
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->label ?: $this->name;
    }

    public function groups(): HasMany
    {
        return $this->hasMany(Group::class);
    }

    public function cashTransactions(): HasMany
    {
        return $this->hasMany(CashTransaction::class);
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return $query->when($search, fn (Builder $q) => $q->where(function (Builder $inner) use ($search) {
            $inner->where('name', 'like', "%{$search}%")->orWhere('label', 'like', "%{$search}%");
        }));
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('System');
    }
}
