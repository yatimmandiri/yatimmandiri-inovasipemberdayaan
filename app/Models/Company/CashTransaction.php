<?php

namespace App\Models\Company;

use App\Models\Core\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

#[Fillable([
    'transaction_date',
    'branch_id',
    'group_id',
    'fasilitator_id',
    'description',
    'debit',
    'credit',
    'created_by',
])]

class CashTransaction extends Model
{
    use LogsActivity, SoftDeletes;

    /**
     * Saldo berjalan per kelompok: kumulatif (debit - credit) urut tanggal lalu id.
     * Dihitung on-the-fly dengan window function — saldo TIDAK disimpan sebagai kolom,
     * supaya tetap konsisten saat ada edit/hapus/backdate transaksi.
     */
    public function scopeWithRunningBalance(Builder $query): Builder
    {
        return $query
            ->select('*')
            ->addSelect(DB::raw(
                'SUM(debit - credit) OVER (PARTITION BY group_id ORDER BY transaction_date, cash_transactions.id) as running_balance'
            ));
    }

    /**
     * Transaksi milik fasilitator tertentu (untuk portal fasilitator).
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
                    ->where('description', 'like', "%{$search}%")
                    ->orWhereHas('group', fn (Builder $group) => $group->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('branch', fn (Builder $branch) => $branch->where('name', 'like', "%{$search}%")->orWhere('label', 'like', "%{$search}%"))
                    ->orWhereHas('facilitator', fn (Builder $facilitator) => $facilitator->where('name', 'like', "%{$search}%"));
            });
        });
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function facilitator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'fasilitator_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('System');
    }
}
