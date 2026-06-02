<?php

use App\Http\Controllers\Home\MainController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MainController::class, 'index'])->name('home.index');
