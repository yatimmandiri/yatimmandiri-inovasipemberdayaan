<?php

use App\Http\Controllers\Home\MainController;
use Illuminate\Support\Facades\Route;

Route::as('home.')->group(function () {
    Route::get('/', [MainController::class, 'index'])->name('index');
    Route::get('about', [MainController::class, 'about'])->name('about');

    Route::get('categories/{category:slug}', [MainController::class, 'categoriesDetail'])->name('categories.detail');
    Route::get('categories', [MainController::class, 'categories'])->name('categories');

    Route::get('programs/{program:slug}', [MainController::class, 'programDetail'])->name('programs.detail');
    Route::get('programs/data', [MainController::class, 'programsData'])->name('programs.data');
    Route::get('programs', [MainController::class, 'programs'])->name('programs');

    Route::get('articles', [MainController::class, 'articles'])->name('articles');
    Route::get('partnerships', [MainController::class, 'partnership'])->name('partnerships');

    Route::get('contact', [MainController::class, 'contact'])->name('contact');
});
