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
