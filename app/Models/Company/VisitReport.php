<?php

namespace App\Models\Company;

use App\Models\Core\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

#[Fillable([
    'program_id',
    'fasilitator_id',
    'group_id',
    'event_name',
    'visit_date',
    'start_time',
    'end_time',
    'activity_description',
    'obstacles',
    'pm_count',
    'photo',
    'status',
    'reviewed_by',
    'reviewed_at',
    'review_notes',
])]

class VisitReport extends Model
{
    use LogsActivity, SoftDeletes;

    public const STATUS_DRAFT = 'draft';

    public const STATUS_SUBMITTED = 'submitted';

    public const STATUS_REVISED = 'revised';

    public const STATUS_REVIEWED = 'reviewed';

    /**
     * Status alur laporan: fasilitator draft/submit revisi -> admin review.
     */
    public const STATUSES = [
        self::STATUS_DRAFT,
        self::STATUS_SUBMITTED,
        self::STATUS_REVISED,
        self::STATUS_REVIEWED,
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function facilitator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'fasilitator_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Laporan milik fasilitator tertentu (untuk portal fasilitator).
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
                    ->where('event_name', 'like', "%{$search}%")
                    ->orWhereHas('program', fn (Builder $program) => $program->where('name', 'like', "%{$search}%"))
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
