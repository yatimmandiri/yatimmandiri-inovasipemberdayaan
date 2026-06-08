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

Breadcrumbs::for('admin.news.index', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard')->push('Berita', route('admin.news.index'));
});

Breadcrumbs::for('admin.news.data', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.news.index')->push('Berita Data', route('admin.news.data'));
});
