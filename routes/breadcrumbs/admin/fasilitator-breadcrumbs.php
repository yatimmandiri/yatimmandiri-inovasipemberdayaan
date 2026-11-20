<?php

use App\Models\Company\Fasilitator;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for(
    'admin.fasilitators.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Fasilitator', route('admin.fasilitators.index'))
);

Breadcrumbs::for(
    'admin.fasilitators.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.fasilitators.index')->push('Fasilitator Data', route('admin.fasilitators.data'))
);

Breadcrumbs::for(
    'admin.fasilitators.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.fasilitators.index')->push('Tambah Fasilitator', route('admin.fasilitators.create'))
);

Breadcrumbs::for(
    'admin.fasilitators.show',
    fn (BreadcrumbTrail $trail, Fasilitator $fasilitator) => $trail->parent('admin.fasilitators.index')->push('Detail: '.$fasilitator->name, route('admin.fasilitators.show', $fasilitator))
);

Breadcrumbs::for(
    'admin.fasilitators.edit',
    fn (BreadcrumbTrail $trail, Fasilitator $fasilitator) => $trail->parent('admin.fasilitators.index')->push('Edit: '.$fasilitator->name, route('admin.fasilitators.edit', $fasilitator))
);
