<?php

use App\Models\Company\Group;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for(
    'admin.groups.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Kelompok Binaan', route('admin.groups.index'))
);

Breadcrumbs::for(
    'admin.groups.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.groups.index')->push('Kelompok Data', route('admin.groups.data'))
);

Breadcrumbs::for(
    'admin.groups.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.groups.index')->push('Tambah Kelompok', route('admin.groups.create'))
);

Breadcrumbs::for(
    'admin.groups.show',
    fn (BreadcrumbTrail $trail, Group $group) => $trail->parent('admin.groups.index')->push('Detail: '.$group->name, route('admin.groups.show', $group))
);

Breadcrumbs::for(
    'admin.groups.edit',
    fn (BreadcrumbTrail $trail, Group $group) => $trail->parent('admin.groups.index')->push('Edit: '.$group->name, route('admin.groups.edit', $group))
);
