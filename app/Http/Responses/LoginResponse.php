<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

/**
 * Redirect setelah login per role: /dashboard tidak ada sebagai route,
 * jadi Fortify default mengarahkan otomatis ke path itu (404). Di sini
 * tiap role diteruskan ke dashboard miliknya masing-masing.
 */
class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        return redirect()->intended($this->home($request->user()));
    }

    protected function home(?Authenticatable $user): string
    {
        if ($user && method_exists($user, 'hasAnyRole')) {
            if ($user->hasAnyRole(['Administrators', 'Editors'])) {
                return route('admin.dashboard');
            }

            if ($user->hasRole('Fasilitator')) {
                return route('fasilitator.dashboard');
            }
        }

        // Role lain (Users/tanpa role) belum punya area khusus — arahkan ke beranda.
        return url('/');
    }
}
