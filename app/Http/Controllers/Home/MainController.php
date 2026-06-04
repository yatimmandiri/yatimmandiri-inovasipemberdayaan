<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Program;
use App\Models\ProgramCategory;
use App\Models\SponsorshipInquiry;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index()
    {
        $data = [
            'pageTitle' => 'Home',
            'meta' => [
                'title' => 'Home',
                'description' => 'Welcome to the Home page.',
                'keywords' => 'home, welcome',
            ],
            'programs' => Program::query()
                ->with('category:id,name,slug')
                ->active()
                ->latest()
                ->limit(6)
                ->get(['id', 'program_category_id', 'name', 'slug', 'excerpt', 'description', 'featured_image']),
            'testimonials' => Testimonial::query()
                ->active()
                ->latest()
                ->limit(8)
                ->get(['id', 'name', 'position', 'description', 'photo', 'rating']),
            'news' => News::query()
                ->active()
                ->latest('published_at')
                ->limit(3)
                ->get(['id', 'title', 'slug', 'category', 'excerpt', 'content', 'featured_image', 'published_at']),
        ];

        return inertia('home/index', $data);
    }

    public function about()
    {
        $data = [
            'pageTitle' => 'About Us',
            'meta' => [
                'title' => 'About Us',
                'description' => 'Learn more about us on the About page.',
                'keywords' => 'about, us, company',
            ],
        ];

        return inertia('home/about/index', $data);
    }

    public function berita()
    {
        $data = [
            'pageTitle' => 'Berita',
            'meta' => [
                'title' => 'Berita',
                'description' => 'Latest news and articles on the Berita page.',
                'keywords' => 'berita, news, articles',
            ],
            'news' => News::query()
                ->active()
                ->latest('published_at')
                ->paginate(9, ['id', 'title', 'slug', 'category', 'excerpt', 'content', 'featured_image', 'published_at']),
        ];

        return inertia('home/berita/index', $data);
    }

    public function beritaDetail(News $news)
    {
        abort_unless($news->status, 404);

        $data = [
            'pageTitle' => $news->title,
            'meta' => [
                'title' => $news->title,
                'description' => $news->excerpt,
                'keywords' => "{$news->category}, berita, artikel",
            ],
            'news' => $news,
            'relatedNews' => News::query()
                ->active()
                ->whereKeyNot($news->id)
                ->when($news->category, fn ($query) => $query->where('category', $news->category))
                ->latest('published_at')
                ->limit(3)
                ->get(['id', 'title', 'slug', 'category', 'excerpt', 'content', 'featured_image', 'published_at']),
        ];

        return inertia('home/berita/show', $data);
    }

    public function programs(Request $request)
    {
        $search = $request->string('search')->toString();
        $category = $request->string('category')->toString();

        $data = [
            'pageTitle' => 'Program',
            'meta' => [
                'title' => 'Program',
                'description' => 'Daftar program pemberdayaan berkelanjutan.',
                'keywords' => 'program, pemberdayaan, inovasi',
            ],
            'categories' => ProgramCategory::query()
                ->active()
                ->withCount(['programs' => fn ($query) => $query->active()])
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
            'programs' => Program::query()
                ->with('category:id,name,slug')
                ->active()
                ->search($search)
                ->when(
                    $category,
                    fn ($query) => $query->whereHas(
                        'category',
                        fn ($categoryQuery) => $categoryQuery->where('slug', $category),
                    ),
                )
                ->latest()
                ->paginate(9, ['id', 'program_category_id', 'name', 'slug', 'excerpt', 'description', 'featured_image'])
                ->withQueryString(),
        ];

        return inertia('home/programs/index', $data);
    }

    public function programDetail(Program $program)
    {
        abort_unless($program->status, 404);

        $program->load('category:id,name,slug,description');

        $data = [
            'pageTitle' => $program->name,
            'meta' => [
                'title' => $program->name,
                'description' => $program->excerpt,
                'keywords' => "{$program->category?->name}, program, pemberdayaan",
            ],
            'program' => $program,
            'relatedPrograms' => Program::query()
                ->with('category:id,name,slug')
                ->active()
                ->whereKeyNot($program->id)
                ->when(
                    $program->program_category_id,
                    fn ($query) => $query->where('program_category_id', $program->program_category_id),
                )
                ->latest()
                ->limit(3)
                ->get(['id', 'program_category_id', 'name', 'slug', 'excerpt', 'description', 'featured_image']),
        ];

        return inertia('home/programs/show', $data);
    }

    public function sponsorship()
    {
        return inertia('home/sponsorship/index', [
            'pageTitle' => 'Sponsorship',
            'meta' => [
                'title' => 'Sponsorship',
                'description' => 'Ajukan kerja sama sponsorship untuk mendukung program pemberdayaan berkelanjutan.',
                'keywords' => 'sponsorship, kerja sama, kemitraan, pemberdayaan',
            ],
        ]);
    }

    public function sponsorshipStore(Request $request)
    {
        $validated = $request->validate([
            'contact_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
            'organization_name' => ['required', 'string', 'max:255'],
            'organization_type' => ['nullable', 'string', 'max:255'],
            'organization_address' => ['nullable', 'string'],
            'organization_phone' => ['nullable', 'string', 'max:50'],
            'organization_email' => ['nullable', 'email', 'max:255'],
            'collaboration_type' => ['required', 'string', 'max:255'],
            'support_type' => ['required', 'string', 'max:255'],
            'preferred_program' => ['nullable', 'string', 'max:255'],
            'estimated_budget' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        SponsorshipInquiry::create($validated);

        return back()->with('success', 'Pengajuan sponsorship berhasil dikirim. Tim kami akan menghubungi Anda.');
    }

    public function contact()
    {
        return inertia('home/contact/index', [
            'pageTitle' => 'Kontak',
            'meta' => [
                'title' => 'Kontak',
                'description' => 'Hubungi tim Inovasi Pemberdayaan untuk informasi program, kolaborasi, dan dukungan.',
                'keywords' => 'kontak, informasi, bantuan, pemberdayaan',
            ],
        ]);
    }
}
