<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Monev Index
Breadcrumbs::for(
    'admin.visit-reports.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Monitoring Evaluasi', route('admin.visit-reports.index'))
);

// Monev Data
Breadcrumbs::for(
    'admin.visit-reports.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.visit-reports.index')->push('Monitoring Evaluasi Data', route('admin.visit-reports.data'))
);

// Monev Review
Breadcrumbs::for(
    'admin.visit-reports.review',
    fn (BreadcrumbTrail $trail, $visitReport) => $trail->parent('admin.visit-reports.show', $visitReport)->push('Review', route('admin.visit-reports.review', $visitReport))
);

// Monev Show
Breadcrumbs::for(
    'admin.visit-reports.show',
    fn (BreadcrumbTrail $trail, $visitReport) => $trail->parent('admin.visit-reports.index')->push('Monev #'.$visitReport->id, route('admin.visit-reports.show', $visitReport))
);
