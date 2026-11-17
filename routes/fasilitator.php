<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Fasilitator\CashTransactionController;
use App\Http\Controllers\Fasilitator\GroupController;
use App\Http\Controllers\Fasilitator\VisitReportController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Fasilitator Routes — /fasilitator/*
|--------------------------------------------------------------------------
| Portal khusus fasilitator: dashboard + laporan pendampingan (visit reports).
| Guard: auth + verified + role:Fasilitator. Fasilitator tidak memiliki akses
| ke /admin (diblokir AdminMiddleware).
*/

Route::prefix('fasilitator')->as('fasilitator.')->middleware(['auth', 'verified', 'role:Fasilitator'])->group(function () {
    Route::redirect('/', '/fasilitator/dashboard')->name('index');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Laporan pendampingan milik fasilitator
    Route::get('visit-reports/data', [VisitReportController::class, 'getData'])->name('visit-reports.data');
    Route::resource('visit-reports', VisitReportController::class);

    // Pencatatan kas milik fasilitator (lingkup saldo: kelompoknya).
    // parameters() menamai ulang {ka} (hasil Str::singular 'kas') menjadi
    // {cashTransaction} agar cocok dengan nama parameter controller —
    // tanpa ini implicit binding gagal dan model kosong di-inject.
    Route::get('kas/data', [CashTransactionController::class, 'getData'])->name('kas.data');
    Route::resource('kas', CashTransactionController::class)
        ->except(['show'])
        ->parameters(['kas' => 'cashTransaction']);

    // Kelompok saya + daftar PM (roster PM diisi fasil sendiri)
    Route::get('kelompok', [GroupController::class, 'my'])->name('group.my');
    Route::post('kelompok/pms', [GroupController::class, 'storePm'])->name('group.pms.store');
    Route::delete('kelompok/pms/{pm}', [GroupController::class, 'destroyPm'])->name('group.pms.destroy');
});
