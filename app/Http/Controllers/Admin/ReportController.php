<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company\ActivityReport;
use App\Models\Company\CashTransaction;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use App\Services\KantorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Report Data Aktivitas Pemberdayaan (Rekap Kegiatan & Partisipan per Kelompok per Fasilitator)
     */
    public function activities(Request $request)
    {
        $kantorId = $request->query('kantor_id');
        $fasilitatorId = $request->query('fasilitator_id');
        $groupId = $request->query('group_id');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $kantors = KantorService::getActive();
        $fasilitators = Fasilitator::query()->active()->select(['id', 'name', 'kantor_id', 'kantor_name'])->orderBy('name')->get();
        $groups = Group::query()->active()->select(['id', 'name', 'fasilitator_id', 'kantor_id', 'leader_name'])->orderBy('name')->get();

        // Query Laporan Aktivitas
        $activityQuery = ActivityReport::query()
            ->with(['group:id,name,fasilitator_id,kantor_id,kantor_name', 'fasilitator:id,name,kantor_id,kantor_name'])
            ->when($kantorId, function ($q) use ($kantorId) {
                $q->where(function ($sub) use ($kantorId) {
                    $sub->whereHas('group', fn ($g) => $g->where('kantor_id', $kantorId))
                        ->orWhereHas('fasilitator', fn ($f) => $f->where('kantor_id', $kantorId));
                });
            })
            ->when($fasilitatorId, fn ($q) => $q->where('fasilitator_id', $fasilitatorId))
            ->when($groupId, fn ($q) => $q->where('group_id', $groupId))
            ->when($startDate, fn ($q) => $q->whereDate('activity_date', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('activity_date', '<=', $endDate))
            ->orderBy('activity_date', 'desc');

        $totalActivities = (clone $activityQuery)->count();
        $totalParticipants = (int) (clone $activityQuery)->sum('participants_count');
        $activitiesList = (clone $activityQuery)->get();

        // Rekapitulasi jumlah kegiatan per kelompok
        $groupsSummary = Group::query()
            ->with(['fasilitator:id,name'])
            ->when($kantorId, fn ($q) => $q->where('kantor_id', $kantorId))
            ->when($fasilitatorId, fn ($q) => $q->where('fasilitator_id', $fasilitatorId))
            ->when($groupId, fn ($q) => $q->where('id', $groupId))
            ->withCount(['activityReports' => function ($q) use ($startDate, $endDate) {
                $q->when($startDate, fn ($query) => $query->whereDate('activity_date', '>=', $startDate))
                    ->when($endDate, fn ($query) => $query->whereDate('activity_date', '<=', $endDate));
            }])
            ->get()
            ->map(function ($group) {
                return [
                    'group_id' => $group->id,
                    'group_name' => $group->name,
                    'leader_name' => $group->leader_name,
                    'kantor_name' => $group->kantor_name ?? '-',
                    'fasilitator_name' => $group->fasilitator?->name ?? '-',
                    'activities_count' => $group->activity_reports_count,
                ];
            });

        return Inertia::render('admin/reports/activities', [
            'pageTitle' => 'Report Data Aktivitas Pemberdayaan',
            'kantors' => $kantors,
            'fasilitators' => $fasilitators,
            'groups' => $groups,
            'filters' => [
                'kantor_id' => $kantorId,
                'fasilitator_id' => $fasilitatorId,
                'group_id' => $groupId,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'summary' => [
                'total_activities' => $totalActivities,
                'total_participants' => $totalParticipants,
            ],
            'groupsSummary' => $groupsSummary,
            'activitiesList' => $activitiesList,
        ]);
    }

    /**
     * Data table endpoint for activities report list.
     */
    public function getActivitiesData(Request $request)
    {
        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'activity_date');
        $orderDirection = strtolower($request->input('orderDirection', 'desc'));

        $allowedSorts = ['id', 'title', 'type', 'activity_date', 'participants_count', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'activity_date';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'desc';
        }

        $filterValue = $request->input('filterValue', []);
        if (is_string($filterValue)) {
            $filterValue = json_decode($filterValue, true) ?? [];
        }

        $query = ActivityReport::query()
            ->with(['fasilitator:id,name,kantor_id,kantor_name', 'group:id,name,kantor_id,kantor_name'])
            ->when(! empty($globalSearch), fn ($q) => $q->search($globalSearch))
            ->when(! empty($filterValue['kantor_id']), function ($q) use ($filterValue) {
                $q->where(function ($sub) use ($filterValue) {
                    $sub->whereHas('group', fn ($g) => $g->where('kantor_id', $filterValue['kantor_id']))
                        ->orWhereHas('fasilitator', fn ($f) => $f->where('kantor_id', $filterValue['kantor_id']));
                });
            })
            ->when(! empty($filterValue['fasilitator_id']), fn ($q) => $q->where('fasilitator_id', $filterValue['fasilitator_id']))
            ->when(! empty($filterValue['group_id']), fn ($q) => $q->where('group_id', $filterValue['group_id']))
            ->when(! empty($filterValue['start_date']), fn ($q) => $q->whereDate('activity_date', '>=', $filterValue['start_date']))
            ->when(! empty($filterValue['end_date']), fn ($q) => $q->whereDate('activity_date', '<=', $filterValue['end_date']))
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Data table endpoint for cash transactions report list.
     */
    public function getCashData(Request $request)
    {
        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'transaction_date');
        $orderDirection = strtolower($request->input('orderDirection', 'desc'));

        $allowedSorts = ['id', 'transaction_date', 'type', 'amount', 'category', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'transaction_date';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'desc';
        }

        $filterValue = $request->input('filterValue', []);
        if (is_string($filterValue)) {
            $filterValue = json_decode($filterValue, true) ?? [];
        }

        $query = CashTransaction::query()
            ->with(['fasilitator:id,name,kantor_id,kantor_name', 'group:id,name,kantor_id,kantor_name'])
            ->when(! empty($globalSearch), fn ($q) => $q->search($globalSearch))
            ->when(! empty($filterValue['kantor_id']), function ($q) use ($filterValue) {
                $q->where(function ($sub) use ($filterValue) {
                    $sub->whereHas('group', fn ($g) => $g->where('kantor_id', $filterValue['kantor_id']))
                        ->orWhereHas('fasilitator', fn ($f) => $f->where('kantor_id', $filterValue['kantor_id']));
                });
            })
            ->when(! empty($filterValue['type']), fn ($q) => $q->where('type', $filterValue['type']))
            ->when(! empty($filterValue['fasilitator_id']), fn ($q) => $q->where('fasilitator_id', $filterValue['fasilitator_id']))
            ->when(! empty($filterValue['group_id']), fn ($q) => $q->where('group_id', $filterValue['group_id']))
            ->when(! empty($filterValue['start_date']), fn ($q) => $q->whereDate('transaction_date', '>=', $filterValue['start_date']))
            ->when(! empty($filterValue['end_date']), fn ($q) => $q->whereDate('transaction_date', '<=', $filterValue['end_date']))
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Report Data Kas Masuk / Keluar (Rekap Kas & Saldo per Kelompok per Fasilitator)
     */
    public function cash(Request $request)
    {
        $kantorId = $request->query('kantor_id');
        $fasilitatorId = $request->query('fasilitator_id');
        $groupId = $request->query('group_id');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $kantors = KantorService::getActive();
        $fasilitators = Fasilitator::query()->active()->select(['id', 'name', 'kantor_id', 'kantor_name'])->orderBy('name')->get();
        $groups = Group::query()->active()->select(['id', 'name', 'fasilitator_id', 'kantor_id', 'leader_name'])->orderBy('name')->get();

        // Query Kas
        $cashQuery = CashTransaction::query()
            ->with(['group:id,name,fasilitator_id,kantor_id,kantor_name', 'fasilitator:id,name,kantor_id,kantor_name'])
            ->when($kantorId, function ($q) use ($kantorId) {
                $q->where(function ($sub) use ($kantorId) {
                    $sub->whereHas('group', fn ($g) => $g->where('kantor_id', $kantorId))
                        ->orWhereHas('fasilitator', fn ($f) => $f->where('kantor_id', $kantorId));
                });
            })
            ->when($fasilitatorId, fn ($q) => $q->where('fasilitator_id', $fasilitatorId))
            ->when($groupId, fn ($q) => $q->where('group_id', $groupId))
            ->when($startDate, fn ($q) => $q->whereDate('transaction_date', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('transaction_date', '<=', $endDate))
            ->orderBy('transaction_date', 'desc');

        $totalCashIn = (float) (clone $cashQuery)->where('type', 'in')->sum('amount');
        $totalCashOut = (float) (clone $cashQuery)->where('type', 'out')->sum('amount');
        $cashBalance = $totalCashIn - $totalCashOut;
        $cashTransactionsList = (clone $cashQuery)->get();

        // Rekapitulasi saldo per kelompok
        $groupsSummary = Group::query()
            ->with(['fasilitator:id,name'])
            ->when($kantorId, fn ($q) => $q->where('kantor_id', $kantorId))
            ->when($fasilitatorId, fn ($q) => $q->where('fasilitator_id', $fasilitatorId))
            ->when($groupId, fn ($q) => $q->where('id', $groupId))
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
                    'kantor_name' => $group->kantor_name ?? '-',
                    'fasilitator_name' => $group->fasilitator?->name ?? '-',
                    'total_cash_in' => $in,
                    'total_cash_out' => $out,
                    'balance' => $in - $out,
                ];
            });

        return Inertia::render('admin/reports/cash', [
            'pageTitle' => 'Report Data Kas Pemberdayaan',
            'kantors' => $kantors,
            'fasilitators' => $fasilitators,
            'groups' => $groups,
            'filters' => [
                'kantor_id' => $kantorId,
                'fasilitator_id' => $fasilitatorId,
                'group_id' => $groupId,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'summary' => [
                'total_cash_in' => $totalCashIn,
                'total_cash_out' => $totalCashOut,
                'cash_balance' => $cashBalance,
            ],
            'groupsSummary' => $groupsSummary,
            'cashTransactionsList' => $cashTransactionsList,
        ]);
    }
}
