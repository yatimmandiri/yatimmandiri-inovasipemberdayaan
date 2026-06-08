<?php

use App\Http\Controllers\Admin\Company\CategoryController;
use App\Http\Controllers\Admin\Company\MitraController;
use App\Http\Controllers\Admin\Company\ProgramController;
use App\Http\Controllers\Admin\Company\ReviewController;
use App\Http\Controllers\Admin\Company\SliderController;
use App\Http\Controllers\Admin\Company\TestimonialController;
use App\Http\Controllers\Admin\Core\PermissionController;
use App\Http\Controllers\Admin\Core\Region\DistrictController;
use App\Http\Controllers\Admin\Core\Region\ProvinceController;
use App\Http\Controllers\Admin\Core\Region\RegencyController;
use App\Http\Controllers\Admin\Core\Region\VillageController;
use App\Http\Controllers\Admin\Core\RoleController;
use App\Http\Controllers\Admin\Core\UserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Settings\LogActivityController;
use App\Http\Controllers\Admin\Settings\SiteSettingsController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->as('admin.')->middleware(['auth', 'verified', 'auth.admin'])->group(function () {
    Route::redirect('/', '/admin/dashboard')->name('index');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('settings')->as('settings.')->group(function () {
        Route::get('site', [SiteSettingsController::class, 'edit'])->name('site.edit');
        Route::put('site', [SiteSettingsController::class, 'update'])->name('site.update');
        Route::put('profile', [AuthController::class, 'updateProfile'])->name('profile.update');
    });

    Route::prefix('logs')->as('logs.')->group(function () {
        Route::get('activities/data', [LogActivityController::class, 'getData'])->name('activities.data');
        Route::get('activities', [LogActivityController::class, 'index'])->name('activities.index');
    });

    Route::prefix('core')->as('core.')->group(function () {
        Route::get('permissions/data', [PermissionController::class, 'getData'])->name('permissions.data');
        Route::resource('permissions', PermissionController::class);

        Route::get('roles/data', [RoleController::class, 'getData'])->name('roles.data');
        Route::resource('roles', RoleController::class);

        Route::post('users/bulk-action', [UserController::class, 'bulkAction'])->name('users.bulk-action');
        Route::put('users/{user}/verify', [UserController::class, 'verify'])->name('users.verify');
        Route::get('users/data', [UserController::class, 'getData'])->name('users.data');
        Route::resource('users', UserController::class);

        Route::prefix('regions')->as('regions.')->group(function () {
            Route::get('provinces/data', [ProvinceController::class, 'getData'])->name('provinces.data');
            Route::resource('provinces', ProvinceController::class);

            Route::get('regencies/data', [RegencyController::class, 'getData'])->name('regencies.data');
            Route::resource('regencies', RegencyController::class);

            Route::get('districts/data', [DistrictController::class, 'getData'])->name('districts.data');
            Route::resource('districts', DistrictController::class);

            Route::get('villages/data', [VillageController::class, 'getData'])->name('villages.data');
            Route::resource('villages', VillageController::class);
        });
    });

    Route::prefix('companies')->as('companies.')->group(function () {
        Route::put('categories/{category}/recommended', [CategoryController::class, 'recommended'])->name('categories.recommended');
        Route::put('categories/{category}/status', [CategoryController::class, 'status'])->name('categories.status');
        Route::get('categories/data', [CategoryController::class, 'getData'])->name('categories.data');
        Route::resource('categories', CategoryController::class);

        Route::put('programs/{program}/recommended', [ProgramController::class, 'recommended'])->name('programs.recommended');
        Route::put('programs/{program}/status', [ProgramController::class, 'status'])->name('programs.status');
        Route::get('programs/data', [ProgramController::class, 'getData'])->name('programs.data');
        Route::resource('programs', ProgramController::class);

        Route::get('sliders/data', [SliderController::class, 'getData'])->name('sliders.data');
        Route::resource('sliders', SliderController::class);

        Route::get('mitras/data', [MitraController::class, 'getData'])->name('mitras.data');
        Route::resource('mitras', MitraController::class);

        Route::get('reviews/data', [ReviewController::class, 'getData'])->name('reviews.data');
        Route::resource('reviews', ReviewController::class);

        Route::get('testimonials/data', [TestimonialController::class, 'getData'])->name('testimonials.data');
        Route::resource('testimonials', TestimonialController::class);
    });
});
