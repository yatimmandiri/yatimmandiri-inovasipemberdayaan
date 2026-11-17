<?php

namespace App\Models\Company;

use App\Models\Core\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

#[Fillable([
    'branch_id',
    'fasilitator_id',
    'name',
])]

class Group extends Model
{
    use LogsActivity, SoftDeletes;

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function facilitator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'fasilitator_id');
    }

    public function pms(): HasMany
    {
        return $this->hasMany(GroupPm::class);
    }

    public function cashTransactions(): HasMany
    {
        return $this->hasMany(CashTransaction::class);
    }

    public function visitReports(): HasMany
    {
        return $this->hasMany(VisitReport::class);
    }

    /**
     * Kelompok milik fasilitator tertentu (untuk portal fasilitator).
     */
    public function scopeOwnedBy(Builder $query, int $userId): Builder
    {
        return $query->where('fasilitator_id', $userId);
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return $query->when($search, function (Builder $q) use ($search) {
            $q->where(function (Builder $inner) use ($search) {
                $inner
                    ->where('name', 'like', "%{$search}%")
                    ->orWhereHas('branch', fn (Builder $branch) => $branch->where('name', 'like', "%{$search}%")->orWhere('label', 'like', "%{$search}%"))
                    ->orWhereHas('facilitator', fn (Builder $facilitator) => $facilitator->where('name', 'like', "%{$search}%"));
            });
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
