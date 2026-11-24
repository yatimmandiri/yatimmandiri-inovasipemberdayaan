<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCashTransactionRequest;
use App\Http\Requests\Company\UpdateCashTransactionRequest;
use App\Models\Company\CashTransaction;
use App\Models\Company\Fasilitator;
use App\Models\Company\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashTransactionController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Kategori umum transaksi kas.
     *
     * @var list<string>
     */
    private const CATEGORIES = [
        'Iuran Anggota',
        'Penjualan Produk',
        'Bantuan Modal / Hibah',
        'Pembelian Bahan Baku',
        'Biaya Operasional',
        'Bagi Hasil / Simpanan',
        'Lainnya',
    ];

    /**
     * Display a listing of cash transactions.
     */
    public function index()
    {
        $this->authorize('viewAny', CashTransaction::class);

        return Inertia::render('admin/cash-transactions/list', [
            'pageTitle' => 'Laporan Kas Kelompok',
        ]);
    }

    /**
     * Endpoint DataTable.
     */
    public function getData(Request $request)
    {
        $this->authorize('data-cash-transaction', CashTransaction::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = strtolower($request->input('orderDirection', 'desc'));

        $allowedSorts = ['id', 'transaction_date', 'type', 'amount', 'category', 'status', 'created_at'];
        if (! in_array($orderBy, $allowedSorts, true)) {
            $orderBy = 'id';
        }
        $direction = $orderDirection === 'asc' ? 'asc' : 'desc';

        $filterValue = $request->input('filterValue', []);
        if (is_string($filterValue)) {
            $filterValue = json_decode($filterValue, true) ?? [];
        }

        $query = CashTransaction::query()
            ->with(['group:id,name,fasilitator_id', 'fasilitator:id,name'])
            ->when(! empty($globalSearch), fn ($q) => $q->search($globalSearch))
            ->when(isset($filterValue['type']) && $filterValue['type'] !== 'all' && ! empty($filterValue['type']), function ($q) use ($filterValue) {
                $q->where('type', $filterValue['type']);
            })
            ->when(isset($filterValue['fasilitator_id']) && ! empty($filterValue['fasilitator_id']), function ($q) use ($filterValue) {
                $q->where('fasilitator_id', $filterValue['fasilitator_id']);
            })
            ->when(isset($filterValue['group_id']) && ! empty($filterValue['group_id']), function ($q) use ($filterValue) {
                $q->where('group_id', $filterValue['group_id']);
            })
            ->when(isset($filterValue['status']) && $filterValue['status'] !== 'all' && $filterValue['status'] !== '', function ($q) use ($filterValue) {
                $q->where('status', filter_var($filterValue['status'], FILTER_VALIDATE_BOOLEAN));
            })
            ->orderBy($orderBy, $direction);

        // Ringkasan total kas masuk, keluar, dan saldo berdasarkan filter saat ini
        $summaryQuery = clone $query;
        $totalIn = (float) (clone $summaryQuery)->where('type', 'in')->sum('amount');
        $totalOut = (float) (clone $summaryQuery)->where('type', 'out')->sum('amount');
        $balance = $totalIn - $totalOut;

        if ($perPage) {
            $data = $query->paginate((int) $perPage, ['*'], 'page', (int) $page);
            $response = $data->toArray();
            $response['summary'] = [
                'total_in' => $totalIn,
                'total_out' => $totalOut,
                'balance' => $balance,
            ];

            return response()->json($response);
        }

        return response()->json([
            'data' => $query->get(),
            'summary' => [
                'total_in' => $totalIn,
                'total_out' => $totalOut,
                'balance' => $balance,
            ],
        ]);
    }

    /**
     * Show the form for creating a new cash transaction.
     */
    public function create()
    {
        $this->authorize('create', CashTransaction::class);

        return Inertia::render('admin/cash-transactions/create', [
            'pageTitle' => 'Catat Transaksi Kas',
            'fasilitators' => Fasilitator::query()->active()->select(['id', 'name'])->orderBy('name')->get(),
            'groups' => Group::query()->active()->select(['id', 'name', 'fasilitator_id'])->orderBy('name')->get(),
            'categories' => self::CATEGORIES,
        ]);
    }

    /**
     * Store a newly created cash transaction in storage.
     */
    public function store(StoreCashTransactionRequest $request)
    {
        $this->authorize('create', CashTransaction::class);

        $validated = $request->validated();

        if ($request->hasFile('proof')) {
            $validated['proof'] = $this->uploadFile($request->file('proof'), 'uploads/cash-transactions');
        }

        $validated['status'] = $request->boolean('status', true);

        $transaction = CashTransaction::create($validated);

        $this->logSuccess('create', 'Menambahkan transaksi kas: '.$transaction->type.' senilai '.$transaction->amount);

        return redirect()
            ->route('admin.cash-transactions.index')
            ->with('success', 'Transaksi kas berhasil dicatat.');
    }

    /**
     * Display the specified cash transaction.
     */
    public function show(CashTransaction $cashTransaction)
    {
        $this->authorize('view', $cashTransaction);

        $cashTransaction->load(['group', 'fasilitator']);

        return Inertia::render('admin/cash-transactions/show', [
            'pageTitle' => 'Detail Transaksi Kas',
            'cashTransaction' => $cashTransaction,
        ]);
    }

    /**
     * Show the form for editing the specified cash transaction.
     */
    public function edit(CashTransaction $cashTransaction)
    {
        $this->authorize('update', $cashTransaction);

        return Inertia::render('admin/cash-transactions/edit', [
            'pageTitle' => 'Edit Transaksi Kas',
            'cashTransaction' => $cashTransaction,
            'fasilitators' => Fasilitator::query()->active()->select(['id', 'name'])->orderBy('name')->get(),
            'groups' => Group::query()->active()->select(['id', 'name', 'fasilitator_id'])->orderBy('name')->get(),
            'categories' => self::CATEGORIES,
        ]);
    }

    /**
     * Update the specified cash transaction in storage.
     */
    public function update(UpdateCashTransactionRequest $request, CashTransaction $cashTransaction)
    {
        $this->authorize('update', $cashTransaction);

        $validated = $request->validated();

        if ($request->hasFile('proof')) {
            $validated['proof'] = $this->replaceFile(
                $request->file('proof'),
                $cashTransaction->proof,
                'uploads/cash-transactions'
            );
        } else {
            unset($validated['proof']);
        }

        $validated['status'] = $request->boolean('status', true);

        $cashTransaction->update($validated);

        $this->logSuccess('update', 'Memperbarui transaksi kas #'.$cashTransaction->id);

        return redirect()
            ->route('admin.cash-transactions.index')
            ->with('success', 'Transaksi kas berhasil diperbarui.');
    }

    /**
     * Remove the specified cash transaction from storage.
     */
    public function destroy(CashTransaction $cashTransaction)
    {
        $this->authorize('delete', $cashTransaction);

        if ($cashTransaction->proof) {
            $this->deleteFile($cashTransaction->proof);
        }

        $cashTransaction->delete();

        $this->logSuccess('delete', 'Menghapus transaksi kas #'.$cashTransaction->id);

        return redirect()
            ->route('admin.cash-transactions.index')
            ->with('success', 'Transaksi kas berhasil dihapus.');
    }

    /**
     * Toggle status active/deactive.
     */
    public function status(CashTransaction $cashTransaction)
    {
        $this->authorize('update', $cashTransaction);

        $cashTransaction->update(['status' => ! $cashTransaction->status]);

        $this->logSuccess('update', 'Mengubah status transaksi kas #'.$cashTransaction->id.' menjadi '.($cashTransaction->status ? 'Aktif' : 'Nonaktif'));

        return redirect()
            ->back()
            ->with('success', 'Status transaksi kas berhasil diperbarui.');
    }
}
