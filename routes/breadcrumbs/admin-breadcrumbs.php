<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Dashboard Admin (root)
Breadcrumbs::for(
    'admin.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.dashboard')->push('Dashboard', route('admin.index'))
);

require __DIR__ . '/admin/core-breadcrumbs.php';
require __DIR__ . '/admin/company-breadcrumbs.php';
require __DIR__ . '/admin/fasilitator-breadcrumbs.php';
require __DIR__ . '/admin/group-breadcrumbs.php';
require __DIR__ . '/admin/beneficiary-breadcrumbs.php';
require __DIR__ . '/admin/activity-report-breadcrumbs.php';
require __DIR__ . '/admin/cash-transaction-breadcrumbs.php';

Breadcrumbs::for('admin.reports.activities', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard')->push('Report Aktivitas', route('admin.reports.activities'));
});

Breadcrumbs::for('admin.reports.activities.data', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.reports.activities')->push('Data', route('admin.reports.activities.data'));
});

Breadcrumbs::for('admin.reports.cash', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard')->push('Report Kas Kelompok', route('admin.reports.cash'));
});

Breadcrumbs::for('admin.reports.cash.data', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.reports.cash')->push('Data', route('admin.reports.cash.data'));
});

Breadcrumbs::for('admin.news.index', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard')->push('Berita', route('admin.news.index'));
});

Breadcrumbs::for('admin.news.data', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.news.index')->push('Berita Data', route('admin.news.data'));
});
