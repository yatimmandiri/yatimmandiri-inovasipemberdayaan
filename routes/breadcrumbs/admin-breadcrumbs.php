<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Admin root redirects to the real dashboard route under /admin/dashboard.
Breadcrumbs::for('admin.index', function (BreadcrumbTrail $trail) {
    $trail->push('Admin', route('admin.dashboard'));
});

require __DIR__.'/admin/core-breadcrumbs.php';
require __DIR__.'/admin/content-breadcrumbs.php';
