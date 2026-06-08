<?php

use App\Http\Controllers\Home\MainController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MainController::class, 'index'])->name('home.index');
Route::get('/about', [MainController::class, 'about'])->name('home.about');
// Route::get('/program', [MainController::class, 'programs'])->name('home.programs');
// Route::get('/program/{program:slug}', [MainController::class, 'programDetail'])->name('home.programs.show');
Route::get('/berita', [MainController::class, 'berita'])->name('home.berita');
Route::get('/berita/{slug}', [MainController::class, 'beritaDetail'])->name('home.berita.show');
Route::get('/sponsorship', [MainController::class, 'sponsorship'])->name('home.sponsorship');
Route::post('/sponsorship', [MainController::class, 'sponsorshipStore'])->name('home.sponsorship.store');
// Route::get('/berita/{news:slug}', [MainController::class, 'beritaDetail'])->name('home.berita.show');
// Route::get('/sponsorship', [MainController::class, 'sponsorship'])->name('home.sponsorship');
// Route::post('/sponsorship', [MainController::class, 'sponsorshipStore'])->name('home.sponsorship.store');
Route::get('/kontak', [MainController::class, 'contact'])->name('home.contact');
