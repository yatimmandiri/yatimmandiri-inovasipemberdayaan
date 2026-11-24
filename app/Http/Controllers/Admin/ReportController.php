<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company\ActivityReport;
use App\Models\Company\CashTransaction;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Tampilan utama Report Data Pemberdayaan (Aktivitas & Kas per Kelompok per Fasilitator)
     */
    public function index(Request $request)
    {
        $fasilitatorId = $request->query('fasilitator_id');
        $groupId = $request->query('group_id');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        // Master fasilitator & group untuk filter dropdown
        $fasilitators = Fasilitator::query()->active()->select(['id', 'name', 'kantor_name'])->orderBy('name')->get();
        $groups = Group::query()->active()->select(['id', 'name', 'fasilitator_id', 'leader_name'])->orderBy('name')->get();

        // 1. Query Kas Masuk & Keluar
        $cashQuery = CashTransaction::query()
            ->with(['group:id,name,fasilitator_id', 'fasilitator:id,name'])
            ->when($fasilitatorId, fn ($q) => $q->where('fasilitator_id', $fasilitatorId))
            ->when($groupId, fn ($q) => $q->where('group_id', $groupId))
            ->when($startDate, fn ($q) => $q->whereDate('transaction_date', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('transaction_date', '<=', $endDate))
            ->orderBy('transaction_date', 'desc');

        $totalCashIn = (float) (clone $cashQuery)->where('type', 'in')->sum('amount');
        $totalCashOut = (float) (clone $cashQuery)->where('type', 'out')->sum('amount');
        $cashBalance = $totalCashIn - $totalCashOut;
        $cashTransactionsList = (clone $cashQuery)->limit(50)->get();

        // 2. Query Laporan Aktivitas
        $activityQuery = ActivityReport::query()
            ->with(['group:id,name,fasilitator_id', 'fasilitator:id,name'])
            ->when($fasilitatorId, fn ($q) => $q->where('fasilitator_id', $fasilitatorId))
            ->when($groupId, fn ($q) => $q->where('group_id', $groupId))
            ->when($startDate, fn ($q) => $q->whereDate('activity_date', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('activity_date', '<=', $endDate))
            ->orderBy('activity_date', 'desc');

        $totalActivities = (clone $activityQuery)->count();
        $totalParticipants = (int) (clone $activityQuery)->sum('participants_count');
        $activitiesList = (clone $activityQuery)->limit(50)->get();

        // 3. Ringkasan Rekapitulasi per Kelompok
        $groupsSummary = Group::query()
            ->with(['fasilitator:id,name'])
            ->when($fasilitatorId, fn ($q) => $q->where('fasilitator_id', $fasilitatorId))
            ->when($groupId, fn ($q) => $q->where('id', $groupId))
            ->withCount(['activityReports' => function ($q) use ($startDate, $endDate) {
                $q->when($startDate, fn ($query) => $query->whereDate('activity_date', '>=', $startDate))
                    ->when($endDate, fn ($query) => $query->whereDate('activity_date', '<=', $endDate));
            }])
            ->get()
            ->map(function ($group) use ($startDate, $endDate) {
                $in = (float) CashTransaction::where('group_id', $group->id)
                    ->where('type', 'in')
                    ->when($startDate, fn ($q) => $q->whereDate('transaction_date', '>=', $startDate))
                    ->when($endDate, fn ($q) => $q->whereDate('transaction_date', '<=', $endDate))
                    ->sum('amount');

                $out = (float) CashTransaction::where('group_id', $group->id)
                    ->where('type', 'out')
                    ->when($startDate, fn ($q) => $q->whereDate('transaction_date', '>=', $startDate))
                    ->when($endDate, fn ($q) => $q->whereDate('transaction_date', '<=', $endDate))
                    ->sum('amount');

                return [
                    'group_id' => $group->id,
                    'group_name' => $group->name,
                    'leader_name' => $group->leader_name,
                    'fasilitator_name' => $group->fasilitator?->name ?? '-',
                    'activities_count' => $group->activity_reports_count,
                    'total_cash_in' => $in,
                    'total_cash_out' => $out,
                    'balance' => $in - $out,
                ];
            });

        return Inertia::render('admin/reports/index', [
            'pageTitle' => 'Report Data Aktivitas & Kas Kelompok',
            'fasilitators' => $fasilitators,
            'groups' => $groups,
            'filters' => [
                'fasilitator_id' => $fasilitatorId,
                'group_id' => $groupId,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'summary' => [
                'total_cash_in' => $totalCashIn,
                'total_cash_out' => $totalCashOut,
                'cash_balance' => $cashBalance,
                'total_activities' => $totalActivities,
                'total_participants' => $totalParticipants,
            ],
            'groupsSummary' => $groupsSummary,
            'cashTransactionsList' => $cashTransactionsList,
            'activitiesList' => $activitiesList,
        ]);
    }
}
