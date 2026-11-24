<?php

use App\Models\Company\CashTransaction;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for(
    'admin.cash-transactions.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Laporan Kas Kelompok', route('admin.cash-transactions.index'))
);

Breadcrumbs::for(
    'admin.cash-transactions.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.cash-transactions.index')->push('Kas Data', route('admin.cash-transactions.data'))
);

Breadcrumbs::for(
    'admin.cash-transactions.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.cash-transactions.index')->push('Catat Transaksi Kas', route('admin.cash-transactions.create'))
);

Breadcrumbs::for(
    'admin.cash-transactions.show',
    fn (BreadcrumbTrail $trail, CashTransaction $cashTransaction) => $trail->parent('admin.cash-transactions.index')->push('Detail Transaksi #'.$cashTransaction->id, route('admin.cash-transactions.show', $cashTransaction))
);

Breadcrumbs::for(
    'admin.cash-transactions.edit',
    fn (BreadcrumbTrail $trail, CashTransaction $cashTransaction) => $trail->parent('admin.cash-transactions.index')->push('Edit Transaksi #'.$cashTransaction->id, route('admin.cash-transactions.edit', $cashTransaction))
);
