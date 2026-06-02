<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Programs
Breadcrumbs::for(
    'admin.programs.index',
    fn($trail) =>
    $trail->parent('admin.dashboard')->push('Programs', route('admin.programs.index'))
);

Breadcrumbs::for(
    'admin.programs.create',
    fn($trail) =>
    $trail->parent('admin.programs.index')->push('Create', route('admin.programs.create'))
);

Breadcrumbs::for(
    'admin.programs.show',
    fn($trail, $item) =>
    $trail->parent('admin.programs.index')->push($item->name, route('admin.programs.show', $item))
);

Breadcrumbs::for(
    'admin.programs.edit',
    fn($trail, $item) =>
    $trail->parent('admin.programs.show', $item)->push('Edit', route('admin.programs.edit', $item))
);

Breadcrumbs::for(
    'admin.programs.data',
    fn($trail) =>
    $trail->parent('admin.programs.index')->push('Programs Data', route('admin.programs.data'))
);

// Testimonials
Breadcrumbs::for(
    'admin.testimonials.index',
    fn($trail) =>
    $trail->parent('admin.dashboard')->push('Testimonials', route('admin.testimonials.index'))
);

Breadcrumbs::for(
    'admin.testimonials.create',
    fn($trail) =>
    $trail->parent('admin.testimonials.index')->push('Create', route('admin.testimonials.create'))
);

Breadcrumbs::for(
    'admin.testimonials.show',
    fn($trail, $item) =>
    $trail->parent('admin.testimonials.index')->push($item->name, route('admin.testimonials.show', $item))
);

Breadcrumbs::for(
    'admin.testimonials.edit',
    fn($trail, $item) =>
    $trail->parent('admin.testimonials.show', $item)->push('Edit', route('admin.testimonials.edit', $item))
);

Breadcrumbs::for(
    'admin.testimonials.data',
    fn($trail) =>
    $trail->parent('admin.testimonials.index')->push('Testimonials Data', route('admin.testimonials.data'))
);
