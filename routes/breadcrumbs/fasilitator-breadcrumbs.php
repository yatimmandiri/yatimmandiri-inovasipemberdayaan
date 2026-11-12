<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Fasilitator Dashboard (root)
Breadcrumbs::for(
    'fasilitator.dashboard',
    fn (BreadcrumbTrail $trail) => $trail->push('Dashboard', route('fasilitator.dashboard'))
);

// Fasilitator — Monev Index
Breadcrumbs::for(
    'fasilitator.visit-reports.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('fasilitator.dashboard')->push('Laporan Monitoring Evaluasi', route('fasilitator.visit-reports.index'))
);

// Fasilitator — Monev Data
Breadcrumbs::for(
    'fasilitator.visit-reports.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('fasilitator.visit-reports.index')->push('Data Laporan', route('fasilitator.visit-reports.data'))
);

// Fasilitator — Monev Create
Breadcrumbs::for(
    'fasilitator.visit-reports.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('fasilitator.visit-reports.index')->push('Buat Monev', route('fasilitator.visit-reports.create'))
);

// Fasilitator — Monev Show
Breadcrumbs::for(
    'fasilitator.visit-reports.show',
    fn (BreadcrumbTrail $trail, $visitReport) => $trail->parent('fasilitator.visit-reports.index')->push('Monev #'.$visitReport->id, route('fasilitator.visit-reports.show', $visitReport))
);

// Fasilitator — Monev Edit
Breadcrumbs::for(
    'fasilitator.visit-reports.edit',
    fn (BreadcrumbTrail $trail, $visitReport) => $trail->parent('fasilitator.visit-reports.show', $visitReport)->push('Edit', route('fasilitator.visit-reports.edit', $visitReport))
);

// Fasilitator — Kas Index
Breadcrumbs::for(
    'fasilitator.kas.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('fasilitator.dashboard')->push('Pencatatan Kas', route('fasilitator.kas.index'))
);

// Fasilitator — Kas Data
Breadcrumbs::for(
    'fasilitator.kas.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('fasilitator.kas.index')->push('Kas Saya Data', route('fasilitator.kas.data'))
);

// Fasilitator — Kas Create
Breadcrumbs::for(
    'fasilitator.kas.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('fasilitator.kas.index')->push('Catat Kas', route('fasilitator.kas.create'))
);

// Fasilitator — Kas Edit
Breadcrumbs::for(
    'fasilitator.kas.edit',
    fn (BreadcrumbTrail $trail, $cashTransaction) => $trail->parent('fasilitator.kas.index')->push('Edit Transaksi #'.$cashTransaction->id, route('fasilitator.kas.edit', $cashTransaction))
);

// Fasilitator — Kelompok Saya
Breadcrumbs::for(
    'fasilitator.group.my',
    fn (BreadcrumbTrail $trail) => $trail->parent('fasilitator.dashboard')->push('Kelompok Saya', route('fasilitator.group.my'))
);
