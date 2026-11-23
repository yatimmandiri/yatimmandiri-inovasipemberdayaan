<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Throwable;

class KantorService
{
    /**
     * Normalisasi baris kantor (name/nama, type/kantor_type).
     */
    public static function normalizeRow(mixed $item): mixed
    {
        if (! is_array($item)) {
            return $item;
        }

        $name = (string) ($item['name'] ?? $item['nama'] ?? '');
        $type = (string) ($item['type'] ?? $item['kantor_type'] ?? '');

        $item['name'] = $name;
        $item['nama'] = $name;
        $item['type'] = $type;
        $item['kantor_type'] = $type;

        if (isset($item['children']) && is_array($item['children'])) {
            $item['children'] = array_map(fn ($child) => self::normalizeRow($child), $item['children']);
        }

        return $item;
    }

    /**
     * Fallback data kantor dari storage JSON lokal.
     */
    protected static function getLocalFallback(): array
    {
        $path = storage_path('app/private/json/kantors.json');
        if (File::exists($path)) {
            $data = json_decode(File::get($path), true);
            if (is_array($data)) {
                return array_map(fn ($k) => self::normalizeRow($k), $data);
            }
        }

        return [];
    }

    public static function getAll(): array
    {
        return Cache::remember('sdm_kantors_all', now()->addMinutes(10), function () {
            try {
                $token = AccessTokenService::get();
                $sdmUrl = rtrim((string) config('services.sdm.url', 'https://sdm.yatimmandiri.org'), '/');

                $request = Http::acceptJson()->timeout(5);
                if ($token) {
                    $request = $request->withToken($token);
                }

                $response = $request->get("{$sdmUrl}/api/kantors");

                if ($response->successful()) {
                    $data = $response->json();
                    $rows = $data['data']['data'] ?? $data['data'] ?? $data;

                    if (is_array($rows)) {
                        return array_values(array_map(fn ($k) => self::normalizeRow($k), $rows));
                    }
                }
            } catch (Throwable) {
                // Gunakan fallback lokal bila koneksi/auth SDM tidak tersedia
            }

            return self::getLocalFallback();
        });
    }

    public static function getActive(): array
    {
        return Cache::remember('sdm_kantors_active', now()->addMinutes(10), function () {
            try {
                $token = AccessTokenService::get();
                $sdmUrl = rtrim((string) config('services.sdm.url', 'https://sdm.yatimmandiri.org'), '/');

                $request = Http::acceptJson()->timeout(5);
                if ($token) {
                    $request = $request->withToken($token);
                }

                $response = $request->get("{$sdmUrl}/api/kantors-active");

                if ($response->successful()) {
                    $data = $response->json();
                    $rows = $data['data']['data'] ?? $data['data'] ?? $data;

                    if (is_array($rows)) {
                        return array_values(array_map(fn ($k) => self::normalizeRow($k), $rows));
                    }
                }
            } catch (Throwable) {
                // Gunakan fallback lokal bila koneksi/auth SDM tidak tersedia
            }

            return self::getLocalFallback();
        });
    }

    public static function getById(int $id): array
    {
        return Cache::remember("sdm_kantor_{$id}", now()->addMinutes(10), function () use ($id) {
            try {
                $token = AccessTokenService::get();
                $sdmUrl = rtrim((string) config('services.sdm.url', 'https://sdm.yatimmandiri.org'), '/');

                $request = Http::acceptJson()->timeout(5);
                if ($token) {
                    $request = $request->withToken($token);
                }

                $response = $request->get("{$sdmUrl}/api/kantor/{$id}");

                if ($response->successful()) {
                    $data = $response->json();
                    return $data ?? [];
                }
            } catch (Throwable) {
                // Ignore and use fallback
            }

            $all = self::getAll();
            foreach ($all as $kantor) {
                if (($kantor['id'] ?? 0) === $id) {
                    return $kantor;
                }
            }

            return [];
        });
    }

    public static function find(Request $request): array
    {
        $term = trim((string) $request->input('term', ''));
        $kantors = self::getActive();

        if (blank($term)) {
            return array_map(fn ($k) => [
                'id' => $k['id'],
                'text' => $k['name'],
                'name' => $k['name'],
            ], $kantors);
        }

        return collect($kantors)
            ->filter(function ($kantor) use ($term) {
                $name = $kantor['name'] ?? '';
                return stripos($name, $term) !== false && ($kantor['is_deleted'] ?? 0) == 0;
            })
            ->values()
            ->map(fn ($kantor) => [
                'id' => $kantor['id'],
                'text' => $kantor['name'],
                'name' => $kantor['name'],
            ])
            ->toArray();
    }
}
