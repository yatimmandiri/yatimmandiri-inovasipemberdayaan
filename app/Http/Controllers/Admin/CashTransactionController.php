<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Models\Company\CashTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashTransactionController extends Controller
{
    use LogActivity;

    /**
     * Monitoring kas: daftar seluruh transaksi + rekap saldo per kelompok/fasil.
     */
    public function index()
    {
        $this->authorize('viewAny', CashTransaction::class);

        $summary = CashTransaction::query()->selectRaw(
            'COALESCE(SUM(debit), 0) as total_debit, COALESCE(SUM(credit), 0) as total_credit, COALESCE(SUM(debit - credit), 0) as saldo'
        )->first();

        $perGroup = $this->rekapPerGroup();

        return Inertia::render('admin/cash-transactions/list', [
            'pageTitle' => 'Pencatatan Kas',
            'summary' => [
                'total_debit' => (float) $summary->total_debit,
                'total_credit' => (float) $summary->total_credit,
                'saldo' => (float) $summary->saldo,
            ],
            'perGroup' => $perGroup,
        ]);
    }

    /**
     * Endpoint DataTable: seluruh transaksi kas dengan filter cabang/kelompok/fasil/periode
     * dan kolom saldo berjalan per kelompok.
     */
    public function getData(Request $request)
    {
        $this->authorize('data-cash-transaction', CashTransaction::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'desc'));

        $allowedSorts = ['id', 'transaction_date', 'description', 'debit', 'credit', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'desc';
        }

        $filterValue = (array) $request->input('filterValue', []);

        $query = CashTransaction::query()
            ->with(['branch', 'group', 'facilitator'])
            ->withRunningBalance()
            ->search($globalSearch)
            ->when($filterValue['branch_id'] ?? null, fn ($q, $branchId) => $q->where('branch_id', $branchId))
            ->when($filterValue['group_id'] ?? null, fn ($q, $groupId) => $q->where('group_id', $groupId))
            ->when($filterValue['fasilitator_id'] ?? null, fn ($q, $userId) => $q->where('fasilitator_id', $userId))
            ->when($filterValue['date_from'] ?? null, fn ($q, $from) => $q->where('transaction_date', '>=', $from))
            ->when($filterValue['date_to'] ?? null, fn ($q, $to) => $q->where('transaction_date', '<=', $to))
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Remove the specified cash transaction.
     */
    public function destroy(CashTransaction $cashTransaction)
    {
        $this->authorize('delete', $cashTransaction);

        $cashTransaction->delete();

        if ($cashTransaction) {
            $this->logSuccess('delete-cash-transaction', "Delete Cash Transaction #{$cashTransaction->id}", [
                'cash_transaction_id' => $cashTransaction->id,
                'old_data' => $cashTransaction->toArray(),
            ]);
        } else {
            $this->logError('delete-cash-transaction', "Failed to delete Cash Transaction #{$cashTransaction->id}", [
                'cash_transaction_id' => $cashTransaction->id,
            ]);
        }

        return back()->with('success', 'Transaksi Kas Berhasil Dihapus');
    }

    /**
     * Rekap saldo per kelompok (saldo lingkup kas = per kelompok/akun fasil).
     */
    private function rekapPerGroup()
    {
        return CashTransaction::query()
            ->join('groups', 'groups.id', '=', 'cash_transactions.group_id')
            ->join('branches', 'branches.id', '=', 'groups.branch_id')
            ->leftJoin('users', 'users.id', '=', 'groups.fasilitator_id')
            ->selectRaw(
                'groups.id as group_id, groups.name as group_name, branches.name as branch_name, users.name as fasilitator_name, '.
                'COALESCE(SUM(cash_transactions.debit), 0) as total_debit, COALESCE(SUM(cash_transactions.credit), 0) as total_credit, '.
                'COALESCE(SUM(cash_transactions.debit - cash_transactions.credit), 0) as saldo'
            )
            ->groupBy('groups.id', 'groups.name', 'branches.name', 'users.name')
            ->orderBy('branch_name')
            ->orderBy('group_name')
            ->get();
    }
}
