<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Branch Index
Breadcrumbs::for(
    'admin.branches.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Cabang', route('admin.branches.index'))
);

// Branch Data
Breadcrumbs::for(
    'admin.branches.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.branches.index')->push('Cabang Data', route('admin.branches.data'))
);

// Branch Create
Breadcrumbs::for(
    'admin.branches.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.branches.index')->push('Tambah Cabang', route('admin.branches.create'))
);

// Branch Edit
Breadcrumbs::for(
    'admin.branches.edit',
    fn (BreadcrumbTrail $trail, $branch) => $trail->parent('admin.branches.index')->push('Edit: '.$branch->name, route('admin.branches.edit', $branch))
);
