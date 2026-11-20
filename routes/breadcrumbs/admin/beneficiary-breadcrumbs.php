<?php

use App\Models\Company\Beneficiary;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for(
    'admin.beneficiaries.index',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.dashboard')->push('Penerima Manfaat', route('admin.beneficiaries.index'))
);

Breadcrumbs::for(
    'admin.beneficiaries.data',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.beneficiaries.index')->push('Penerima Manfaat Data', route('admin.beneficiaries.data'))
);

Breadcrumbs::for(
    'admin.beneficiaries.create',
    fn (BreadcrumbTrail $trail) => $trail->parent('admin.beneficiaries.index')->push('Tambah Penerima Manfaat', route('admin.beneficiaries.create'))
);

Breadcrumbs::for(
    'admin.beneficiaries.show',
    fn (BreadcrumbTrail $trail, Beneficiary $beneficiary) => $trail->parent('admin.beneficiaries.index')->push('Detail: '.$beneficiary->name, route('admin.beneficiaries.show', $beneficiary))
);

Breadcrumbs::for(
    'admin.beneficiaries.edit',
    fn (BreadcrumbTrail $trail, Beneficiary $beneficiary) => $trail->parent('admin.beneficiaries.index')->push('Edit: '.$beneficiary->name, route('admin.beneficiaries.edit', $beneficiary))
);
