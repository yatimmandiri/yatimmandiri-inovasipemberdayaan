<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCashTransactionRequest;
use App\Http\Requests\Company\UpdateCashTransactionRequest;
use App\Models\Company\Branch;
use App\Models\Company\CashTransaction;
use App\Models\Company\Group;
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
            // Opsi filter toolbar: cabang & kelompok (di server, bukan klien).
            'filterBranches' => Branch::query()->orderBy('name')->get(['id', 'name', 'label']),
            'filterGroups' => Group::query()->orderBy('branch_id')->orderBy('name')->get(['id', 'name', 'branch_id']),
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
        // Filter tanggal hanya dipakai bila format Y-m-d valid (catatan
        // review ARC-001); nilai sampah diabaikan, bukan error.
        $dateFrom = $this->validDate($filterValue['date_from'] ?? null);
        $dateTo = $this->validDate($filterValue['date_to'] ?? null);

        $query = CashTransaction::query()
            ->with(['branch', 'group', 'facilitator'])
            ->withRunningBalance()
            ->search($globalSearch)
            ->when($filterValue['branch_id'] ?? null, fn ($q, $branchId) => $q->where('branch_id', $branchId))
            ->when($filterValue['group_id'] ?? null, fn ($q, $groupId) => $q->where('group_id', $groupId))
            ->when($filterValue['fasilitator_id'] ?? null, fn ($q, $userId) => $q->where('fasilitator_id', $userId))
            ->when($dateFrom, fn ($q, $from) => $q->where('transaction_date', '>=', $from))
            ->when($dateTo, fn ($q, $to) => $q->where('transaction_date', '<=', $to))
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
    }

    /**
     * Form tambah transaksi kas oleh admin (koreksi/entri manual).
     * Cabang mengikuti kelompok yang dipilih — admin hanya memilih kelompok.
     */
    public function create()
    {
        $this->authorize('create', CashTransaction::class);

        return Inertia::render('admin/cash-transactions/create', [
            'pageTitle' => 'Tambah Transaksi Kas',
            'groups' => $this->groupOptions(),
        ]);
    }

    /**
     * Store admin: kelompok dipilih eksplisit; fasil pemilik di-snapshot dari kelompok.
     */
    public function store(StoreCashTransactionRequest $request)
    {
        $this->authorize('create', CashTransaction::class);

        $group = Group::query()->findOrFail($request->input('group_id'));

        $data = $request->only(['transaction_date', 'description', 'debit', 'credit']);
        $data['branch_id'] = $group->branch_id;
        $data['group_id'] = $group->id;
        // Snapshot pemilik = fasil pemegang kelompok, BUKAN admin yang mengentri.
        $data['fasilitator_id'] = $group->fasilitator_id;
        $data['created_by'] = auth()->id();
        $data['debit'] = filled($data['debit'] ?? null) ? $data['debit'] : 0;
        $data['credit'] = filled($data['credit'] ?? null) ? $data['credit'] : 0;

        $cashTransaction = CashTransaction::create($data);

        if ($cashTransaction) {
            $this->logSuccess('create-cash-transaction', "Admin created Cash Transaction #{$cashTransaction->id} (Group: {$group->name})", [
                'cash_transaction_id' => $cashTransaction->id,
                'new_data' => $cashTransaction->toArray(),
            ]);
        } else {
            $this->logError('create-cash-transaction', 'Failed to create Cash Transaction (admin)', [
                'new_data' => $data,
            ]);
        }

        return redirect()->route('admin.kas.index')
            ->with('success', 'Transaksi Kas Berhasil Ditambahkan');
    }

    /**
     * Form edit transaksi kas oleh admin (koreksi data).
     */
    public function edit(CashTransaction $cashTransaction)
    {
        $this->authorize('update', $cashTransaction);

        return Inertia::render('admin/cash-transactions/edit', [
            'pageTitle' => 'Edit Transaksi Kas',
            'cashTransaction' => $cashTransaction->load(['branch', 'group.branch']),
            'groups' => $this->groupOptions(),
        ]);
    }

    /**
     * Update admin: cabang mengikuti kelompok yang dipilih; jejak lama dicatat di log.
     */
    public function update(UpdateCashTransactionRequest $request, CashTransaction $cashTransaction)
    {
        $this->authorize('update', $cashTransaction);

        $group = Group::query()->findOrFail($request->input('group_id'));

        $oldData = $cashTransaction->replicate();

        $data = $request->only(['transaction_date', 'description', 'debit', 'credit']);
        $data['branch_id'] = $group->branch_id;
        $data['group_id'] = $group->id;
        $data['fasilitator_id'] = $group->fasilitator_id;
        $data['debit'] = filled($data['debit'] ?? null) ? $data['debit'] : 0;
        $data['credit'] = filled($data['credit'] ?? null) ? $data['credit'] : 0;

        $cashTransaction->update($data);

        if ($cashTransaction) {
            $this->logSuccess('update-cash-transaction', "Admin updated Cash Transaction #{$cashTransaction->id}", [
                'cash_transaction_id' => $cashTransaction->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $cashTransaction->toArray(),
            ]);
        } else {
            $this->logError('update-cash-transaction', "Failed to update Cash Transaction #{$cashTransaction->id} (admin)", [
                'cash_transaction_id' => $cashTransaction->id,
            ]);
        }

        return redirect()->route('admin.kas.index')
            ->with('success', 'Transaksi Kas Berhasil Diubah');
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
     * Nilai filter tanggal hanya dipakai bila format Y-m-d valid;
     * selain itu diabaikan (bukan error) — sesuai catatan review ARC-001.
     */
    private function validDate(mixed $value): ?string
    {
        if (
            is_string($value)
            && preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)
            && strtotime($value) !== false
        ) {
            return $value;
        }

        return null;
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

    /**
     * Opsi kelompok untuk form admin (kelompok + cabang + fasil pemegang).
     */
    private function groupOptions()
    {
        return Group::query()
            ->with(['branch:id,name,label', 'facilitator:id,name'])
            ->orderBy('branch_id')
            ->orderBy('name')
            ->get(['id', 'name', 'branch_id', 'fasilitator_id']);
    }
}
