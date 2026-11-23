<?php

namespace App\Models\Company;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

#[Fillable([
    'fasilitator_id',
    'group_id',
    'activity_date',
    'title',
    'type',
    'location',
    'participants_count',
    'description',
    'photo',
    'status',
])]
class ActivityReport extends Model
{
    use HasFactory, LogsActivity, SoftDeletes;

    protected function casts(): array
    {
        return [
            'activity_date' => 'date',
            'participants_count' => 'integer',
            'status' => 'boolean',
        ];
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('System');
    }

    public function fasilitator(): BelongsTo
    {
        return $this->belongsTo(Fasilitator::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', true);
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (blank($search)) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
                ->orWhere('type', 'like', "%{$search}%")
                ->orWhere('location', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhereHas('group', fn (Builder $group) => $group->where('name', 'like', "%{$search}%"))
                ->orWhereHas('fasilitator', fn (Builder $fasilitator) => $fasilitator->where('name', 'like', "%{$search}%"));
        });
    }
}
