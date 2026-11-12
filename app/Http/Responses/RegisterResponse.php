<?php

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

/**
 * Redirect setelah registrasi — default Fortify menuju /dashboard yang tidak
 * ada. User baru tanpa role diteruskan ke verifikasi email/beranda publik;
 * redirect verifikasi email tetap ditangani Fortify sendiri.
 */
class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        return redirect(url('/'));
    }
}
