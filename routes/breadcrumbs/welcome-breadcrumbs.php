<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('home.index', function (BreadcrumbTrail $trail) {
    $trail->push('Home', route('home.index'));
});

Breadcrumbs::for('home.about', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index')->push('Tentang Kami', route('home.about'));
});

Breadcrumbs::for('home.categories', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index')->push('Program', route('home.categories'));
});

Breadcrumbs::for('home.categories.detail', function (BreadcrumbTrail $trail, $slug) {
    $trail->parent('home.categories')->push($slug, route('home.categories.detail', $slug));
});

Breadcrumbs::for('home.programs', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index')->push('Program', route('home.programs'));
});

Breadcrumbs::for('home.programs.detail', function (BreadcrumbTrail $trail, $program) {
    $trail->parent('home.programs')->push($program->name, route('home.programs.detail', $program));
});

Breadcrumbs::for('home.programs.data', function (BreadcrumbTrail $trail) {
    $trail->parent('home.programs')->push('Programs Data', route('home.programs.data'));
});

Breadcrumbs::for('home.products', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index')->push('Products', route('home.products'));
});

Breadcrumbs::for('home.products.data', function (BreadcrumbTrail $trail) {
    $trail->parent('home.products')->push('Products Data', route('home.products.data'));
});

Breadcrumbs::for('home.products.detail', function (BreadcrumbTrail $trail, $slug) {
    $trail->parent('home.products')->push($slug, route('home.products.detail', $slug));
});

Breadcrumbs::for('home.articles', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index')->push('Berita', route('home.articles'));
});

Breadcrumbs::for('home.partnerships', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index')->push('Partnership', route('home.partnerships'));
});

Breadcrumbs::for('home.contact', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index')->push('Kontak', route('home.contact'));
});
