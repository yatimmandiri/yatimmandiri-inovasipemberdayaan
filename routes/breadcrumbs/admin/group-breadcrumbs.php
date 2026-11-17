<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Group Index
Breadcrumbs::for(
    'admin.groups.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Kelompok Fasilitator', route('admin.groups.index'))
);

// Group Data
Breadcrumbs::for(
    'admin.groups.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.groups.index')->push('Kelompok Data', route('admin.groups.data'))
);

// Group Create
Breadcrumbs::for(
    'admin.groups.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.groups.index')->push('Buat Kelompok', route('admin.groups.create'))
);

// Group Show
Breadcrumbs::for(
    'admin.groups.show',
    fn (BreadcrumbTrail $trail, $group) => $trail->parent('admin.groups.index')->push($group->name, route('admin.groups.show', $group))
);

// Group Edit
Breadcrumbs::for(
    'admin.groups.edit',
    fn (BreadcrumbTrail $trail, $group) => $trail->parent('admin.groups.show', $group)->push('Edit', route('admin.groups.edit', $group))
);
