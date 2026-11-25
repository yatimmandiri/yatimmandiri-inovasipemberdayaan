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
        $user = $request->user();
        $isFasilitatorRole = $user && $user->hasRole('Fasilitator') && ! $user->hasRole(['Administrators', 'Editors']);
        $currentFasilitatorId = $isFasilitatorRole ? $user->fasilitator?->id : null;

        $kantorId = $request->query('kantor_id');
        $fasilitatorId = $isFasilitatorRole ? $currentFasilitatorId : $request->query('fasilitator_id');
        $groupId = $request->query('group_id');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $kantors = KantorService::getActive();
        $fasilitators = Fasilitator::query()
            ->active()
            ->when($isFasilitatorRole, fn ($q) => $q->where('id', $currentFasilitatorId ?? 0))
            ->select(['id', 'name', 'kantor_id', 'kantor_name'])
            ->orderBy('name')
            ->get();

        $groups = Group::query()
            ->active()
            ->when($isFasilitatorRole, fn ($q) => $q->where('fasilitator_id', $currentFasilitatorId ?? 0))
            ->select(['id', 'name', 'fasilitator_id', 'kantor_id', 'leader_name'])
            ->orderBy('name')
            ->get();

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

        $user = $request->user();
        $isFasilitatorRole = $user && $user->hasRole('Fasilitator') && ! $user->hasRole(['Administrators', 'Editors']);
        $currentFasilitatorId = $isFasilitatorRole ? $user->fasilitator?->id : null;

        $filterValue = $request->input('filterValue', []);
        if (is_string($filterValue)) {
            $filterValue = json_decode($filterValue, true) ?? [];
        }

        $query = ActivityReport::query()
            ->with(['fasilitator:id,name,kantor_id,kantor_name', 'group:id,name,kantor_id,kantor_name'])
            ->when(! empty($globalSearch), fn ($q) => $q->search($globalSearch))
            ->when($isFasilitatorRole, fn ($q) => $q->where('fasilitator_id', $currentFasilitatorId ?? 0))
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

        $user = $request->user();
        $isFasilitatorRole = $user && $user->hasRole('Fasilitator') && ! $user->hasRole(['Administrators', 'Editors']);
        $currentFasilitatorId = $isFasilitatorRole ? $user->fasilitator?->id : null;

        $filterValue = $request->input('filterValue', []);
        if (is_string($filterValue)) {
            $filterValue = json_decode($filterValue, true) ?? [];
        }

        $query = CashTransaction::query()
            ->with(['fasilitator:id,name,kantor_id,kantor_name', 'group:id,name,kantor_id,kantor_name'])
            ->when(! empty($globalSearch), fn ($q) => $q->search($globalSearch))
            ->when($isFasilitatorRole, fn ($q) => $q->where('fasilitator_id', $currentFasilitatorId ?? 0))
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
        $user = $request->user();
        $isFasilitatorRole = $user && $user->hasRole('Fasilitator') && ! $user->hasRole(['Administrators', 'Editors']);
        $currentFasilitatorId = $isFasilitatorRole ? $user->fasilitator?->id : null;

        $kantorId = $request->query('kantor_id');
        $fasilitatorId = $isFasilitatorRole ? $currentFasilitatorId : $request->query('fasilitator_id');
        $groupId = $request->query('group_id');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $kantors = KantorService::getActive();
        $fasilitators = Fasilitator::query()
            ->active()
            ->when($isFasilitatorRole, fn ($q) => $q->where('id', $currentFasilitatorId ?? 0))
            ->select(['id', 'name', 'kantor_id', 'kantor_name'])
            ->orderBy('name')
            ->get();

        $groups = Group::query()
            ->active()
            ->when($isFasilitatorRole, fn ($q) => $q->where('fasilitator_id', $currentFasilitatorId ?? 0))
            ->select(['id', 'name', 'fasilitator_id', 'kantor_id', 'leader_name'])
            ->orderBy('name')
            ->get();

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

    /**
     * Report Buku Besar Kas (General Ledger)
     * Menghitung saldo awal (kumulatif transaksi sebelum periode/bulan dipilih), mutasi kas masuk/keluar, dan saldo akhir.
     */
    public function ledger(Request $request)
    {
        $user = $request->user();
        $isFasilitatorRole = $user && $user->hasRole('Fasilitator') && ! $user->hasRole(['Administrators', 'Editors']);
        $currentFasilitatorId = $isFasilitatorRole ? $user->fasilitator?->id : null;

        $kantorId = $request->query('kantor_id');
        $fasilitatorId = $isFasilitatorRole ? $currentFasilitatorId : $request->query('fasilitator_id');
        $groupId = $request->query('group_id');
        $month = $request->query('month', now()->format('Y-m'));

        // Menentukan rentang tanggal periode bulan
        $startDate = $request->query('start_date') ?: ($month ? "{$month}-01" : now()->startOfMonth()->toDateString());
        $endDate = $request->query('end_date') ?: ($month ? \Carbon\Carbon::parse("{$month}-01")->endOfMonth()->toDateString() : now()->endOfMonth()->toDateString());

        $kantors = KantorService::getActive();
        $fasilitators = Fasilitator::query()
            ->active()
            ->when($isFasilitatorRole, fn ($q) => $q->where('id', $currentFasilitatorId ?? 0))
            ->select(['id', 'name', 'kantor_id', 'kantor_name'])
            ->orderBy('name')
            ->get();

        $groups = Group::query()
            ->active()
            ->when($isFasilitatorRole, fn ($q) => $q->where('fasilitator_id', $currentFasilitatorId ?? 0))
            ->select(['id', 'name', 'fasilitator_id', 'kantor_id', 'leader_name'])
            ->orderBy('name')
            ->get();

        // Base filter query callback
        $applyScope = function ($q) use ($kantorId, $fasilitatorId, $groupId) {
            $q->when($kantorId, function ($sub) use ($kantorId) {
                $sub->where(function ($s) use ($kantorId) {
                    $s->whereHas('group', fn ($g) => $g->where('kantor_id', $kantorId))
                        ->orWhereHas('fasilitator', fn ($f) => $f->where('kantor_id', $kantorId));
                });
            })
            ->when($fasilitatorId, fn ($sub) => $sub->where('fasilitator_id', $fasilitatorId))
            ->when($groupId, fn ($sub) => $sub->where('group_id', $groupId));
        };

        // 1. Saldo Awal: seluruh transaksi SEBELUM $startDate (akhir bulan lalu / sebelum periode)
        $priorIn = (float) CashTransaction::query()
            ->tap($applyScope)
            ->whereDate('transaction_date', '<', $startDate)
            ->where('type', 'in')
            ->sum('amount');

        $priorOut = (float) CashTransaction::query()
            ->tap($applyScope)
            ->whereDate('transaction_date', '<', $startDate)
            ->where('type', 'out')
            ->sum('amount');

        $openingBalance = $priorIn - $priorOut;

        // 2. Mutasi Periode Ini
        $periodIn = (float) CashTransaction::query()
            ->tap($applyScope)
            ->whereDate('transaction_date', '>=', $startDate)
            ->whereDate('transaction_date', '<=', $endDate)
            ->where('type', 'in')
            ->sum('amount');

        $periodOut = (float) CashTransaction::query()
            ->tap($applyScope)
            ->whereDate('transaction_date', '>=', $startDate)
            ->whereDate('transaction_date', '<=', $endDate)
            ->where('type', 'out')
            ->sum('amount');

        $closingBalance = $openingBalance + $periodIn - $periodOut;

        return Inertia::render('admin/reports/ledger', [
            'pageTitle' => 'Report Buku Besar Kas',
            'kantors' => $kantors,
            'fasilitators' => $fasilitators,
            'groups' => $groups,
            'filters' => [
                'kantor_id' => $kantorId,
                'fasilitator_id' => $fasilitatorId,
                'group_id' => $groupId,
                'month' => $month,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'summary' => [
                'opening_balance' => $openingBalance,
                'period_in' => $periodIn,
                'period_out' => $periodOut,
                'closing_balance' => $closingBalance,
            ],
        ]);
    }

    /**
     * Data table endpoint for General Ledger report list.
     */
    public function getLedgerData(Request $request)
    {
        $user = $request->user();
        $isFasilitatorRole = $user && $user->hasRole('Fasilitator') && ! $user->hasRole(['Administrators', 'Editors']);
        $currentFasilitatorId = $isFasilitatorRole ? $user->fasilitator?->id : null;

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', 1);
        $globalSearch = $request->input('globalSearch', '');

        $filterValue = $request->input('filterValue', []);
        if (is_string($filterValue)) {
            $filterValue = json_decode($filterValue, true) ?? [];
        }

        $kantorId = $filterValue['kantor_id'] ?? null;
        $fasilitatorId = $isFasilitatorRole ? $currentFasilitatorId : ($filterValue['fasilitator_id'] ?? null);
        $groupId = $filterValue['group_id'] ?? null;
        $month = $filterValue['month'] ?? now()->format('Y-m');

        $startDate = ! empty($filterValue['start_date']) ? $filterValue['start_date'] : ($month ? "{$month}-01" : now()->startOfMonth()->toDateString());
        $endDate = ! empty($filterValue['end_date']) ? $filterValue['end_date'] : ($month ? \Carbon\Carbon::parse("{$month}-01")->endOfMonth()->toDateString() : now()->endOfMonth()->toDateString());

        $applyScope = function ($q) use ($kantorId, $fasilitatorId, $groupId) {
            $q->when($kantorId, function ($sub) use ($kantorId) {
                $sub->where(function ($s) use ($kantorId) {
                    $s->whereHas('group', fn ($g) => $g->where('kantor_id', $kantorId))
                        ->orWhereHas('fasilitator', fn ($f) => $f->where('kantor_id', $kantorId));
                });
            })
            ->when($fasilitatorId, fn ($sub) => $sub->where('fasilitator_id', $fasilitatorId))
            ->when($groupId, fn ($sub) => $sub->where('group_id', $groupId));
        };

        // Saldo Awal sebelum $startDate
        $priorIn = (float) CashTransaction::query()
            ->tap($applyScope)
            ->whereDate('transaction_date', '<', $startDate)
            ->where('type', 'in')
            ->sum('amount');

        $priorOut = (float) CashTransaction::query()
            ->tap($applyScope)
            ->whereDate('transaction_date', '<', $startDate)
            ->where('type', 'out')
            ->sum('amount');

        $openingBalance = $priorIn - $priorOut;

        // Ambil seluruh transaksi periode secara kronologis (ASC) untuk menghitung running balance
        $transactions = CashTransaction::query()
            ->with(['fasilitator:id,name,kantor_id,kantor_name', 'group:id,name,kantor_id,kantor_name'])
            ->tap($applyScope)
            ->whereDate('transaction_date', '>=', $startDate)
            ->whereDate('transaction_date', '<=', $endDate)
            ->when(! empty($globalSearch), fn ($q) => $q->search($globalSearch))
            ->orderBy('transaction_date', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        $running = $openingBalance;
        $rows = collect();

        foreach ($transactions as $idx => $tx) {
            $in = $tx->type === 'in' ? (float) $tx->amount : 0;
            $out = $tx->type === 'out' ? (float) $tx->amount : 0;
            $running = $running + $in - $out;

            $rows->push([
                'id' => $tx->id,
                'row_number' => $idx + 1,
                'transaction_date' => $tx->transaction_date?->format('Y-m-d'),
                'type' => $tx->type,
                'category' => $tx->category,
                'description' => $tx->description,
                'group' => $tx->group ? ['id' => $tx->group->id, 'name' => $tx->group->name] : null,
                'fasilitator' => $tx->fasilitator ? ['id' => $tx->fasilitator->id, 'name' => $tx->fasilitator->name] : null,
                'cash_in' => $in,
                'cash_out' => $out,
                'running_balance' => $running,
                'created_at' => $tx->created_at?->format('Y-m-d H:i:s'),
            ]);
        }

        $total = $rows->count();
        if ($perPage) {
            $perPage = (int) $perPage;
            $page = (int) $page;
            $pagedData = $rows->forPage($page, $perPage)->values();

            return response()->json([
                'current_page' => $page,
                'data' => $pagedData,
                'from' => $total > 0 ? (($page - 1) * $perPage) + 1 : 0,
                'to' => min($page * $perPage, $total),
                'per_page' => $perPage,
                'total' => $total,
                'opening_balance' => $openingBalance,
                'closing_balance' => $running,
            ]);
        }

        return response()->json([
            'data' => $rows,
            'total' => $total,
            'opening_balance' => $openingBalance,
            'closing_balance' => $running,
        ]);
    }
}
