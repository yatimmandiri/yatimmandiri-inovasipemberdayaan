<?php

use App\Models\Company\ActivityReport;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for(
    'admin.activity-reports.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Laporan Aktivitas', route('admin.activity-reports.index'))
);

Breadcrumbs::for(
    'admin.activity-reports.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.activity-reports.index')->push('Laporan Aktivitas Data', route('admin.activity-reports.data'))
);

Breadcrumbs::for(
    'admin.activity-reports.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.activity-reports.index')->push('Tambah Laporan Aktivitas', route('admin.activity-reports.create'))
);

Breadcrumbs::for(
    'admin.activity-reports.show',
    fn (BreadcrumbTrail $trail, ActivityReport $activityReport) => $trail->parent('admin.activity-reports.index')->push('Detail: '.$activityReport->title, route('admin.activity-reports.show', $activityReport))
);

Breadcrumbs::for(
    'admin.activity-reports.edit',
    fn (BreadcrumbTrail $trail, ActivityReport $activityReport) => $trail->parent('admin.activity-reports.index')->push('Edit: '.$activityReport->title, route('admin.activity-reports.edit', $activityReport))
);
