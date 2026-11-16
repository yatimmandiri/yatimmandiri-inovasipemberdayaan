<?php

namespace App\Services\Views;

use App\Models\Company\CashTransaction;
use App\Models\Company\VisitReport;
use App\Models\Core\User;

class DashboardService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public static function handle(User $user): array
    {
        $role = $user->getRoleNames()->first();

        return match ($role) {
            'Administrators' => self::admin(),
            'Fasilitator' => self::fasilitator($user),
            default => self::user(),
        };
    }

    private static function admin()
    {
        $cash = CashTransaction::query()->selectRaw(
            'COALESCE(SUM(debit), 0) as total_debit, COALESCE(SUM(credit), 0) as total_credit, COALESCE(SUM(debit - credit), 0) as saldo'
        )->first();

        $pendingReports = VisitReport::query()->where('status', VisitReport::STATUS_SUBMITTED)->count();

        return [
            'view' => 'admin/dashboard/admin',
            'data' => [
                'pageTitle' => 'Dashboard Admin',
                'cashStats' => [
                    'total_debit' => (float) $cash->total_debit,
                    'total_credit' => (float) $cash->total_credit,
                    'saldo' => (float) $cash->saldo,
                ],
                'pendingReports' => $pendingReports,
            ],
        ];
    }

    private static function fasilitator(User $user)
    {
        $reports = VisitReport::query()->where('fasilitator_id', $user->id);

        $cash = CashTransaction::query()->where('fasilitator_id', $user->id)->selectRaw(
            'COALESCE(SUM(debit), 0) as total_debit, COALESCE(SUM(credit), 0) as total_credit, COALESCE(SUM(debit - credit), 0) as saldo'
        )->first();

        return [
            'view' => 'fasilitator/dashboard',
            'data' => [
                'pageTitle' => 'Dashboard Fasilitator',
                'stats' => [
                    'total' => (clone $reports)->count(),
                    'draft' => (clone $reports)->where('status', VisitReport::STATUS_DRAFT)->count(),
                    'submitted' => (clone $reports)->where('status', VisitReport::STATUS_SUBMITTED)->count(),
                    'revised' => (clone $reports)->where('status', VisitReport::STATUS_REVISED)->count(),
                    'reviewed' => (clone $reports)->where('status', VisitReport::STATUS_REVIEWED)->count(),
                ],
                'cashStats' => [
                    'total_debit' => (float) $cash->total_debit,
                    'total_credit' => (float) $cash->total_credit,
                    'saldo' => (float) $cash->saldo,
                ],
            ],
        ];
    }

    private static function user()
    {
        return [
            'view' => 'admin/dashboard/user',
            'data' => [
                'pageTitle' => 'Dashboard User',
            ],
        ];
    }
}
