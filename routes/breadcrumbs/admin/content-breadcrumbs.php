<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Program Categories
Breadcrumbs::for(
    'admin.program-categories.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Program Categories', route('admin.program-categories.index'))
);

Breadcrumbs::for(
    'admin.program-categories.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.program-categories.index')->push('Create', route('admin.program-categories.create'))
);

Breadcrumbs::for(
    'admin.program-categories.show',
    fn (BreadcrumbTrail $trail, $item) => $trail->parent('admin.program-categories.index')->push($item->name, route('admin.program-categories.show', $item))
);

Breadcrumbs::for(
    'admin.program-categories.edit',
    fn (BreadcrumbTrail $trail, $item) => $trail->parent('admin.program-categories.show', $item)->push('Edit', route('admin.program-categories.edit', $item))
);

Breadcrumbs::for(
    'admin.program-categories.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.program-categories.index')->push('Program Categories Data', route('admin.program-categories.data'))
);

// Programs
Breadcrumbs::for(
    'admin.programs.index',
    fn ($trail) => $trail->parent('admin.dashboard')->push('Programs', route('admin.programs.index'))
);

Breadcrumbs::for(
    'admin.programs.create',
    fn ($trail) => $trail->parent('admin.programs.index')->push('Create', route('admin.programs.create'))
);

Breadcrumbs::for(
    'admin.programs.show',
    fn ($trail, $item) => $trail->parent('admin.programs.index')->push($item->name, route('admin.programs.show', $item))
);

Breadcrumbs::for(
    'admin.programs.edit',
    fn ($trail, $item) => $trail->parent('admin.programs.show', $item)->push('Edit', route('admin.programs.edit', $item))
);

Breadcrumbs::for(
    'admin.programs.data',
    fn ($trail) => $trail->parent('admin.programs.index')->push('Programs Data', route('admin.programs.data'))
);

// Testimonials
Breadcrumbs::for(
    'admin.testimonials.index',
    fn ($trail) => $trail->parent('admin.dashboard')->push('Testimonials', route('admin.testimonials.index'))
);

Breadcrumbs::for(
    'admin.testimonials.create',
    fn ($trail) => $trail->parent('admin.testimonials.index')->push('Create', route('admin.testimonials.create'))
);

Breadcrumbs::for(
    'admin.testimonials.show',
    fn ($trail, $item) => $trail->parent('admin.testimonials.index')->push($item->name, route('admin.testimonials.show', $item))
);

Breadcrumbs::for(
    'admin.testimonials.edit',
    fn ($trail, $item) => $trail->parent('admin.testimonials.show', $item)->push('Edit', route('admin.testimonials.edit', $item))
);

Breadcrumbs::for(
    'admin.testimonials.data',
    fn ($trail) => $trail->parent('admin.testimonials.index')->push('Testimonials Data', route('admin.testimonials.data'))
);

// News
Breadcrumbs::for(
    'admin.news.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Berita', route('admin.news.index'))
);

Breadcrumbs::for(
    'admin.news.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.news.index')->push('Create', route('admin.news.create'))
);

Breadcrumbs::for(
    'admin.news.show',
    fn (BreadcrumbTrail $trail, $item) => $trail->parent('admin.news.index')->push($item->title, route('admin.news.show', $item))
);

Breadcrumbs::for(
    'admin.news.edit',
    fn (BreadcrumbTrail $trail, $item) => $trail->parent('admin.news.show', $item)->push('Edit', route('admin.news.edit', $item))
);

Breadcrumbs::for(
    'admin.news.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.news.index')->push('Berita Data', route('admin.news.data'))
);

// Sponsorship Inquiries
Breadcrumbs::for(
    'admin.sponsorship-inquiries.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Sponsorship', route('admin.sponsorship-inquiries.index'))
);

Breadcrumbs::for(
    'admin.sponsorship-inquiries.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.sponsorship-inquiries.index')->push('Create', route('admin.sponsorship-inquiries.create'))
);

Breadcrumbs::for(
    'admin.sponsorship-inquiries.show',
    fn (BreadcrumbTrail $trail, $item) => $trail->parent('admin.sponsorship-inquiries.index')->push($item->organization_name, route('admin.sponsorship-inquiries.show', $item))
);

Breadcrumbs::for(
    'admin.sponsorship-inquiries.edit',
    fn (BreadcrumbTrail $trail, $item) => $trail->parent('admin.sponsorship-inquiries.show', $item)->push('Edit', route('admin.sponsorship-inquiries.edit', $item))
);

Breadcrumbs::for(
    'admin.sponsorship-inquiries.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.sponsorship-inquiries.index')->push('Sponsorship Data', route('admin.sponsorship-inquiries.data'))
);
