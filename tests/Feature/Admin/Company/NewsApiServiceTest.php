<?php

use App\Services\NewsApiService;
use Illuminate\Support\Facades\Http;

test('featured image stays a string when the news api returns array payloads', function () {
    config([
        'cache.default' => 'array',
        'services.news_api.posts_url' => 'https://news.test/wp-json/ymapi/v2/posts',
    ]);

    Http::fake([
        'news.test/*' => Http::response([
            [
                'id' => 1,
                'title' => ['rendered' => '<p>Judul Berita</p>'],
                'content' => ['rendered' => '<p>Isi berita yang cukup panjang.</p>'],
                'excerpt' => ['rendered' => '<p>Ringkasan berita.</p>'],
                'slug' => 'judul-berita',
                'link' => 'https://news.test/judul-berita',
                'date' => '2026-06-01T00:00:00',
                '_embedded' => [
                    'wp:featuredmedia' => [
                        ['source_url' => 'https://news.test/wp-uploads/gambar-utama.jpg'],
                    ],
                ],
            ],
        ], 200),
    ]);

    $result = app(NewsApiService::class)->paginate();

    expect($result['data'])->toHaveLength(1);

    $item = $result['data'][0];

    expect($item['title'])->toBe('Judul Berita')
        ->and($item['featured_image'])->toBeString()
        ->and($item['featured_image'])->toBe('https://news.test/wp-uploads/gambar-utama.jpg');
});

test('featured image is null-safe when no image candidate exists', function () {
    config([
        'cache.default' => 'array',
        'services.news_api.posts_url' => 'https://news.test/wp-json/ymapi/v2/posts',
    ]);

    Http::fake([
        'news.test/*' => Http::response([
            [
                'id' => 2,
                'title' => 'Berita Tanpa Gambar',
                'content' => 'Isi tanpa gambar.',
                'slug' => 'berita-tanpa-gambar',
                'link' => 'https://news.test/berita-tanpa-gambar',
            ],
        ], 200),
    ]);

    $result = app(NewsApiService::class)->paginate();

    expect($result['data'][0]['featured_image'])->toBeNull();
});
