<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('home.index', function (BreadcrumbTrail $trail) {
    $trail->push('Home', route('home.index'));
});

Breadcrumbs::for('home.about', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index');
    $trail->push('About Us', route('home.about'));
});

Breadcrumbs::for('home.sponsorship', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index');
    $trail->push('Sponsorship', route('home.sponsorship'));
});

Breadcrumbs::for('home.contact', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index');
    $trail->push('Kontak', route('home.contact'));
});

Breadcrumbs::for('home.berita', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index');
    $trail->push('Berita', route('home.berita'));
});

Breadcrumbs::for('home.berita.show', function (BreadcrumbTrail $trail, $news) {
    $trail->parent('home.berita');
    $trail->push($news->title, route('home.berita.show', $news));
});

// Programs
Breadcrumbs::for('home.programs', function (BreadcrumbTrail $trail) {
    $trail->parent('home.index');
    $trail->push('Program', route('home.programs'));
});

Breadcrumbs::for('home.programs.show', function (BreadcrumbTrail $trail, $program) {
    $trail->parent('home.programs');
    $trail->push($program->name, route('home.programs.show', $program));
});
