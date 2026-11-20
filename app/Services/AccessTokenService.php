<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class AccessTokenService
{
    /**
     * Get active Bearer access token for external microservice API calls.
     * Hierarchy: 1) Explicit token parameter -> 2) Auth session access_token -> 3) Request input -> 4) OAuth Client Credentials fallback
     */
    public static function get(?string $explicit = null): ?string
    {
        if (! empty($explicit)) {
            return $explicit;
        }

        if ($token = Auth::user()?->access_token) {
            return $token;
        }

        if ($token = request()?->input('access_token')) {
            return $token;
        }

        $token = Cache::get('perbankan_client_access_token');
        if (! empty($token)) {
            return $token;
        }

        try {
            $baseUrl = rtrim((string) config('services.passport.base_url', 'https://nova.yatimmandiri.org'), '/');
            $clientId = config('services.passport.client_id');
            $clientSecret = config('services.passport.client_secret');

            if (empty($clientId) || empty($clientSecret)) {
                return null;
            }

            $response = Http::asForm()->acceptJson()->post("{$baseUrl}/oauth/token", [
                'grant_type' => 'client_credentials',
                'client_id' => $clientId,
                'client_secret' => $clientSecret,
                'scope' => '',
            ]);

            if ($response->successful() && $token = $response->json('access_token')) {
                Cache::put('perbankan_client_access_token', $token, now()->addMinutes(50));

                return $token;
            }
        } catch (Throwable $e) {
            Log::warning('AccessTokenService fallback failed: ' . $e->getMessage());
        }

        return null;
    }
}
