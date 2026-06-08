<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('home.index', function (BreadcrumbTrail $trail) {
    $trail->push('Home', route('home.index'));
});

Breadcrumbs::for('home.about', function (BreadcrumbTrail $trail) {
    $trail->push('About Us', route('home.about'));
});

Breadcrumbs::for('home.contact', function (BreadcrumbTrail $trail) {
    $trail->push('Contact Us', route('home.contact'));
});
