<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Throwable;

class NewsApiService
{
    public function paginate(int $page = 1, int $perPage = 10, ?string $search = null): array
    {
        $params = array_filter([
            'page' => $page,
            'per_page' => $perPage,
            'search' => $search,
        ], fn ($value) => filled($value));

        $payload = $this->fetch($params);
        $items = $this->items($payload);

        return [
            'data' => collect($items)->map(fn ($item) => $this->normalize($item))->values(),
            'current_page' => $page,
            'per_page' => $perPage,
            'total' => $this->total($payload, $items, $page, $perPage),
            'from' => count($items) ? (($page - 1) * $perPage) + 1 : null,
            'to' => count($items) ? (($page - 1) * $perPage) + count($items) : null,
        ];
    }

    public function latest(int $limit = 3): array
    {
        return collect($this->paginate(1, $limit)['data'])
            ->take($limit)
            ->values()
            ->all();
    }

    public function findBySlug(string $slug): ?array
    {
        $payload = $this->fetch(['page' => 1, 'slug' => $slug]);
        $items = $this->items($payload);

        $item = collect($items)->first(fn ($item) => data_get($item, 'slug') === $slug)
            ?: Arr::first($items);

        return $item ? $this->normalize($item) : null;
    }

    private function fetch(array $params = []): array
    {
        $url = config('services.news_api.posts_url');

        if (! is_string($url) || blank($url)) {
            report('News API posts URL is not configured.');

            return [];
        }

        $key = 'external-news:'.md5($url.json_encode($params));

        if (Cache::has($key)) {
            return Cache::get($key, []);
        }

        try {
            $response = Http::timeout(10)
                ->retry(2, 300)
                ->acceptJson()
                ->get($url, $params);

            if (! $response->successful()) {
                report("News API failed with status {$response->status()}");

                return [];
            }

            $payload = $response->json() ?: [];
            Cache::put($key, $payload, 3600);

            return $payload;
        } catch (Throwable $exception) {
            report($exception);

            return [];
        }
    }

    private function items(array $payload): array
    {
        if (array_is_list($payload)) {
            return $payload;
        }

        return data_get($payload, 'data')
            ?? data_get($payload, 'posts')
            ?? data_get($payload, 'items')
            ?? [];
    }

    private function total(array $payload, array $items, int $page, int $perPage): int
    {
        return (int) (
            data_get($payload, 'total')
            ?? data_get($payload, 'meta.total')
            ?? (($page - 1) * $perPage) + count($items)
        );
    }

    private function normalize(array $item): array
    {
        $title = data_get($item, 'title.rendered') ?? data_get($item, 'title') ?? '';
        $content = data_get($item, 'content.rendered') ?? data_get($item, 'content') ?? '';
        $excerpt = data_get($item, 'excerpt.rendered') ?? data_get($item, 'excerpt') ?? '';
        $image = $this->image($item);

        return [
            'id' => data_get($item, 'id') ?? data_get($item, 'ID'),
            'title' => html_entity_decode(strip_tags($title)),
            'slug' => data_get($item, 'slug'),
            'category' => data_get($item, 'category') ?? data_get($item, 'category_name'),
            'excerpt' => trim(html_entity_decode(strip_tags($excerpt ?: Str::limit(strip_tags($content), 160)))),
            'content' => $content,
            'featured_image' => $image,
            'published_at' => data_get($item, 'published_at') ?? data_get($item, 'date') ?? data_get($item, 'post_date'),
            'url' => data_get($item, 'url') ?? data_get($item, 'link'),
        ];
    }

    private function image(array $item): ?string
    {
        $candidates = [
            data_get($item, 'featured_image'),
            data_get($item, 'thumbnail'),
            data_get($item, 'image'),
            data_get($item, 'better_featured_image.source_url'),
            data_get($item, '_embedded.wp:featuredmedia.0.source_url'),
            data_get($item, 'yoast_head_json.og_image.0.url'),
        ];

        foreach ($candidates as $candidate) {
            $url = $this->imageUrl($candidate);

            if ($url) {
                return $url;
            }
        }

        return null;
    }

    private function imageUrl(mixed $value): ?string
    {
        if (is_string($value) && filled($value)) {
            return $value;
        }

        if (! is_array($value)) {
            return null;
        }

        $nested = data_get($value, 'url')
            ?? data_get($value, 'source_url')
            ?? data_get($value, 'src')
            ?? data_get($value, 'sizes.full')
            ?? data_get($value, 'sizes.medium');

        if (is_string($nested) && filled($nested)) {
            return $nested;
        }

        foreach ($value as $item) {
            $url = $this->imageUrl($item);

            if ($url) {
                return $url;
            }
        }

        return null;
    }
}
