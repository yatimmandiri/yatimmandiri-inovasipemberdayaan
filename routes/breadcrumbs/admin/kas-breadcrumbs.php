<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Kas Index
Breadcrumbs::for(
    'admin.kas.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Pencatatan Kas', route('admin.kas.index'))
);

// Kas Data
Breadcrumbs::for(
    'admin.kas.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.kas.index')->push('Kas Data', route('admin.kas.data'))
);

// Kas Create
Breadcrumbs::for(
    'admin.kas.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.kas.index')->push('Tambah Transaksi Kas', route('admin.kas.create'))
);

// Kas Edit
Breadcrumbs::for(
    'admin.kas.edit',
    fn (BreadcrumbTrail $trail, $cashTransaction) => $trail->parent('admin.kas.index')->push('Edit Transaksi Kas', route('admin.kas.edit', $cashTransaction))
);
