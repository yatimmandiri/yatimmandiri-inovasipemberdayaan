<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Categories Index
Breadcrumbs::for(
    'admin.companies.categories.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.dashboard')->push('Categories', route('admin.companies.categories.index'))
);

// Categories Create
Breadcrumbs::for(
    'admin.companies.categories.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.companies.categories.index')->push('Create', route('admin.companies.categories.create'))
);

// Categories Show
Breadcrumbs::for(
    'admin.companies.categories.show',
    fn(BreadcrumbTrail $trail, $categories) =>
    $trail->parent('admin.companies.categories.index')->push($categories->name, route('admin.companies.categories.show', $categories))
);

// Categories Edit
Breadcrumbs::for(
    'admin.companies.categories.edit',
    fn(BreadcrumbTrail $trail, $categories) =>
    $trail->parent('admin.companies.categories.show', $categories)->push('Edit', route('admin.companies.categories.edit', $categories))
);

// Categories Data
Breadcrumbs::for(
    'admin.companies.categories.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.companies.categories.index')->push('categories Data', route('admin.companies.categories.data'))
);

// Mitra Index
Breadcrumbs::for(
    'admin.companies.mitras.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.dashboard')->push('Mitra', route('admin.companies.mitras.index'))
);

// Mitra Create
Breadcrumbs::for(
    'admin.companies.mitras.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.companies.mitras.index')->push('Create', route('admin.companies.mitras.create'))
);

// Mitra Show
Breadcrumbs::for(
    'admin.companies.mitras.show',
    fn(BreadcrumbTrail $trail, $mitra) =>
    $trail->parent('admin.companies.mitras.index')->push($mitra->name, route('admin.companies.mitras.show', $mitra))
);

// Mitra Edit
Breadcrumbs::for(
    'admin.companies.mitras.edit',
    fn(BreadcrumbTrail $trail, $mitra) =>
    $trail->parent('admin.companies.mitras.show', $mitra)->push('Edit', route('admin.companies.mitras.edit', $mitra))
);

// Mitra Data
Breadcrumbs::for(
    'admin.companies.mitras.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.companies.mitras.index')->push('Mitra Data', route('admin.companies.mitras.data'))
);

// Slider Index
Breadcrumbs::for(
    'admin.companies.sliders.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.dashboard')->push('Slider', route('admin.companies.sliders.index'))
);

// Slider Create
Breadcrumbs::for(
    'admin.companies.sliders.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.companies.sliders.index')->push('Create', route('admin.companies.sliders.create'))
);

// Slider Show
Breadcrumbs::for(
    'admin.companies.sliders.show',
    fn(BreadcrumbTrail $trail, $slider) =>
    $trail->parent('admin.companies.sliders.index')->push($slider->title, route('admin.companies.sliders.show', $slider))
);

// Slider Edit
Breadcrumbs::for(
    'admin.companies.sliders.edit',
    fn(BreadcrumbTrail $trail, $slider) =>
    $trail->parent('admin.companies.sliders.show', $slider)->push('Edit', route('admin.companies.sliders.edit', $slider))
);

// Slider Data
Breadcrumbs::for(
    'admin.companies.sliders.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.companies.sliders.index')->push('Slider Data', route('admin.companies.sliders.data'))
);

// Program Index
Breadcrumbs::for(
    'admin.companies.programs.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.dashboard')->push('Program', route('admin.companies.programs.index'))
);

// Program Create
Breadcrumbs::for(
    'admin.companies.programs.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.companies.programs.index')->push('Create', route('admin.companies.programs.create'))
);

// Program Show
Breadcrumbs::for(
    'admin.companies.programs.show',
    fn(BreadcrumbTrail $trail, $program) =>
    $trail->parent('admin.companies.programs.index')->push($program->name, route('admin.companies.programs.show', $program))
);

// Program Edit
Breadcrumbs::for(
    'admin.companies.programs.edit',
    fn(BreadcrumbTrail $trail, $program) =>
    $trail->parent('admin.companies.programs.show', $program)->push('Edit', route('admin.companies.programs.edit', $program))
);

// Program Data
Breadcrumbs::for(
    'admin.companies.programs.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.companies.programs.index')->push('Program Data', route('admin.companies.programs.data'))
);
