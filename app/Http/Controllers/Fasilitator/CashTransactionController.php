<?php

namespace App\Http\Controllers\Fasilitator;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCashTransactionRequest;
use App\Http\Requests\Company\UpdateCashTransactionRequest;
use App\Models\Company\CashTransaction;
use App\Models\Company\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashTransactionController extends Controller
{
    use LogActivity;

    /**
     * Halaman kas milik fasilitator yang login.
     */
    public function index()
    {
        $this->authorize('viewAny', CashTransaction::class);

        $group = $this->myGroup();

        // Fasil tanpa kelompok TIDAK boleh melihat/menghitung kas kelompok lain:
        // tanpa filter ini summary akan membaca seluruh tabel (kebocoran data).
        // Halaman tetap terbuka dengan saldo 0 + pesan 'belum ditugaskan' (bukan 500).
        $summary = CashTransaction::query()
            ->where('group_id', $group->id ?? 0)
            ->selectRaw(
                'COALESCE(SUM(debit), 0) as total_debit, COALESCE(SUM(credit), 0) as total_credit, COALESCE(SUM(debit - credit), 0) as saldo'
            )
            ->first();

        return Inertia::render('fasilitator/cash-transactions/list', [
            'pageTitle' => 'Pencatatan Kas Saya',
            'myGroup' => $group?->load(['branch', 'pms']),
            'summary' => [
                'total_debit' => (float) $summary->total_debit,
                'total_credit' => (float) $summary->total_credit,
                'saldo' => (float) $summary->saldo,
            ],
        ]);
    }

    /**
     * Show the form for creating a new kas record.
     */
    public function create()
    {
        $this->authorize('create', CashTransaction::class);

        $group = $this->myGroup();

        abort_if($group === null, 403, 'Anda belum memiliki kelompok. Hubungi admin untuk ditugaskan ke kelompok.');

        return Inertia::render('fasilitator/cash-transactions/create', [
            'pageTitle' => 'Catat Kas',
            'myGroup' => $group->load('branch'),
        ]);
    }

    /**
     * Store a newly created kas record.
     */
    public function store(StoreCashTransactionRequest $request)
    {
        $this->authorize('create', CashTransaction::class);

        $group = $this->myGroup();

        if ($group === null) {
            return back()->with('error', 'Anda belum memiliki kelompok. Hubungi admin untuk ditugaskan ke kelompok.');
        }

        $data = $request->only(['transaction_date', 'description', 'debit', 'credit']);

        // Cabang & kelompok TIDAK diinput manual: mengikuti kelompok yang dipegang fasilitator.
        $data['branch_id'] = $group->branch_id;
        $data['group_id'] = $group->id;
        $data['fasilitator_id'] = auth()->id();
        $data['created_by'] = auth()->id();
        // Kolom debit/kredit default 0 (bukan null) agar konsisten dengan kolom DB.
        $data['debit'] = filled($data['debit'] ?? null) ? $data['debit'] : 0;
        $data['credit'] = filled($data['credit'] ?? null) ? $data['credit'] : 0;

        $cashTransaction = CashTransaction::create($data);

        if ($cashTransaction) {
            $this->logSuccess('create-cash-transaction', "Created Cash Transaction #{$cashTransaction->id} (Group: {$group->name})", [
                'cash_transaction_id' => $cashTransaction->id,
                'new_data' => $cashTransaction->toArray(),
            ]);
        } else {
            $this->logError('create-cash-transaction', 'Failed to create Cash Transaction', [
                'new_data' => $data,
            ]);
        }

        return redirect()->route('fasilitator.kas.index')
            ->with('success', 'Transaksi Kas Berhasil Dicatat');
    }

    /**
     * Show the form for editing the specified kas record.
     */
    public function edit(CashTransaction $cashTransaction)
    {
        $this->authorize('update', $cashTransaction);

        $group = $this->myGroup();

        abort_if($group === null, 403, 'Anda belum memiliki kelompok. Hubungi admin untuk ditugaskan ke kelompok.');

        return Inertia::render('fasilitator/cash-transactions/edit', [
            'pageTitle' => 'Edit Transaksi Kas',
            'cashTransaction' => $cashTransaction,
            'myGroup' => $group->load('branch'),
        ]);
    }

    /**
     * Update the specified kas record.
     */
    public function update(UpdateCashTransactionRequest $request, CashTransaction $cashTransaction)
    {
        $this->authorize('update', $cashTransaction);

        $group = $this->myGroup();

        if ($group === null) {
            return back()->with('error', 'Anda belum memiliki kelompok. Hubungi admin untuk ditugaskan ke kelompok.');
        }

        $data = $request->only(['transaction_date', 'description', 'debit', 'credit']);

        $oldData = $cashTransaction->replicate();

        $data['branch_id'] = $group->branch_id;
        $data['group_id'] = $group->id;
        // Kolom debit/kredit default 0 (bukan null) agar konsisten dengan kolom DB.
        $data['debit'] = filled($data['debit'] ?? null) ? $data['debit'] : 0;
        $data['credit'] = filled($data['credit'] ?? null) ? $data['credit'] : 0;

        $cashTransaction->update($data);

        if ($cashTransaction) {
            $this->logSuccess('update-cash-transaction', "Updated Cash Transaction #{$cashTransaction->id}", [
                'cash_transaction_id' => $cashTransaction->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $cashTransaction->toArray(),
            ]);
        } else {
            $this->logError('update-cash-transaction', "Failed to update Cash Transaction #{$cashTransaction->id}", [
                'cash_transaction_id' => $cashTransaction->id,
                'old_data' => $oldData->toArray(),
            ]);
        }

        return redirect()->route('fasilitator.kas.index')
            ->with('success', 'Transaksi Kas Berhasil Diperbarui');
    }

    /**
     * Remove the specified kas record.
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

        return redirect()->route('fasilitator.kas.index')
            ->with('success', 'Transaksi Kas Berhasil Dihapus');
    }

    /**
     * Endpoint DataTable: hanya transaksi kas milik fasil yang login (lingkup saldo = kelompoknya).
     */
    public function getData(Request $request)
    {
        $this->authorize('data-cash-transaction', CashTransaction::class);

        $group = $this->myGroup();

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'asc'));

        $allowedSorts = ['id', 'transaction_date', 'description', 'debit', 'credit', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        if (! in_array($orderDirection, ['asc', 'desc'], true)) {
            $orderDirection = 'asc';
        }

        // Whitelist filter dari toolbar (periode). Nilai lain diabaikan.
        $filterValue = (array) $request->input('filterValue', []);
        // Filter tanggal hanya dipakai bila format Y-m-d valid (catatan
        // review ARC-001); nilai sampah diabaikan, bukan error.
        $dateFrom = $this->validDate($filterValue['date_from'] ?? null);
        $dateTo = $this->validDate($filterValue['date_to'] ?? null);

        // Fasil tanpa kelompok: filter TIDAK dilewati — paksa hasil kosong
        // (group_id 0 tidak ada) supaya tidak melihat kas milik fasil lain.
        $query = CashTransaction::query()
            ->with(['branch', 'group'])
            ->withRunningBalance()
            ->where('group_id', $group->id ?? 0)
            ->search($globalSearch)
            // Filter periode: kunci whitelist (value tetap parameter binding).
            ->when($dateFrom, fn ($q, $from) => $q->where('transaction_date', '>=', $from))
            ->when($dateTo, fn ($q, $to) => $q->where('transaction_date', '<=', $to))
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate((int) $perPage, ['*'], 'page', (int) $page)
            : $query->get();

        return response()->json($data);
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
     * Kelompok milik fasil yang login (aturan: 1 fasil = 1 kelompok).
     */
    private function myGroup(): ?Group
    {
        return Group::query()->ownedBy(auth()->id())->first();
    }
}
