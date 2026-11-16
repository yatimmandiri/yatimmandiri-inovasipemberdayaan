<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Role yang hanya boleh memakai area publik, tidak boleh masuk /admin
        $blockedRoles = ['Users', 'Fasilitator'];

        if (Auth::check() && $user->hasAnyRole($blockedRoles)) {
            abort(403, 'User does not have the right roles.');
        }

        return $next($request);
    }
}
