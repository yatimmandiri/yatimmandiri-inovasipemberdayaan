<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Company\Category;
use App\Models\Company\Mitra;
use App\Models\Company\Program;
use App\Models\Company\Slider;
use App\Models\Company\Testimonial;

class MainController extends Controller
{
    public function index()
    {
        $sliders = Slider::with(['category.programs'])->get();
        $categories = Category::with(['programs'])->active()->recommended()->get();
        $mitras = Mitra::get();
        $testimonials = Testimonial::get();

        $data = [
            'pageTitle' => 'Home',
            'sliders' => $sliders,
            'categories' => $categories,
            'mitras' => $mitras,
            'testimonials' => $testimonials,
            'meta' => [
                'title' => 'Home',
                'description' => 'Welcome to the Home page.',
                'keywords' => 'home, welcome',
            ],
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

    public function berita(Request $request, NewsApiService $newsApi)
    {
        $page = max((int) $request->input('page', 1), 1);
        $news = $newsApi->paginate($page, 9, $request->input('search'));

        $data = [
            'pageTitle' => 'Berita',
            'news' => $news,
            'meta' => [
                'title' => 'Berita',
                'description' => 'Latest news and articles on the Berita page.',
                'keywords' => 'berita, news, articles',
            ],
        ];

        return inertia('home/berita/index', $data);
    }

    public function beritaDetail(string $slug, NewsApiService $newsApi)
    {
        $news = $newsApi->findBySlug($slug);

        if (! $news) {
            return redirect()->route('home.berita')->with('error', 'Berita tidak ditemukan.');
        }

        $data = [
            'pageTitle' => $news['title'] ?? 'Detail Berita',
            'news' => $news,
            'relatedNews' => collect($newsApi->latest(4))
                ->reject(fn ($item) => data_get($item, 'slug') === $slug)
                ->take(3)
                ->values(),
            'meta' => [
                'title' => $news['title'] ?? 'Detail Berita',
                'description' => $news['excerpt'] ?? 'Detail berita dan artikel.',
                'keywords' => 'berita, news, artikel',
            ],
        ];

        return inertia('home/berita/show', $data);
    }

    public function programs(Request $request)
    {
        $categories = Category::active()
            ->withCount(['programs' => fn ($query) => $query->where('status', true)])
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $programs = Program::with('category')
            ->where('status', true)
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->input('category'), function ($query, $category) {
                $query->whereHas('category', fn ($categoryQuery) => $categoryQuery->where('slug', $category));
            })
            ->latest()
            ->paginate(9)
            ->withQueryString();

        $data = [
            'pageTitle' => 'Program',
            'programs' => $programs,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
            'meta' => [
                'title' => 'Program',
                'description' => 'Daftar program pemberdayaan berkelanjutan.',
                'keywords' => 'program, pemberdayaan, inovasi',
            ],
        ];

        return inertia('home/programs/index', $data);
    }

    public function programDetail(Program $program)
    {
        abort_unless($program->status, 404);

        $program->load(['category', 'locations']);

        $relatedPrograms = Program::with('category')
            ->where('status', true)
            ->whereKeyNot($program->id)
            ->where('category_id', $program->category_id)
            ->latest()
            ->take(3)
            ->get();

        $data = [
            'pageTitle' => $program->name,
            'program' => $program,
            'relatedPrograms' => $relatedPrograms,
            'meta' => [
                'title' => $program->name,
                'description' => $program->excerpt ?? 'Detail program pemberdayaan.',
                'keywords' => 'program, pemberdayaan, inovasi',
            ],
        ];

        return inertia('home/programs/show', $data);
    }

    public function sponsorship()
    {
        return inertia('home/sponsorship/index', [
            'pageTitle' => 'Sponsorship',
            'partnershipTypes' => [
                'CSR',
                'Program Collaboration',
                'Event Sponsorship',
                'Media Partner',
                'Community Partnership',
            ],
            'meta' => [
                'title' => 'Sponsorship',
                'description' => 'Ajukan kerja sama dan sponsorship program pemberdayaan.',
                'keywords' => 'sponsorship, kerja sama, partnership',
            ],
        ]);
    }

    public function sponsorshipStore(Request $request)
    {
        $validated = $request->validate([
            'organization_name' => ['required', 'string', 'max:150'],
            'contact_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'phone' => ['required', 'string', 'max:30'],
            'partnership_type' => ['required', 'string', 'max:80'],
            'budget_range' => ['nullable', 'string', 'max:80'],
            'message' => ['required', 'string', 'max:2000'],
            'preferred_contact' => ['nullable', Rule::in(['email', 'phone', 'whatsapp'])],
        ]);

        if (Schema::hasTable('sponsorship_inquiries')) {
            /** @var class-string<\Illuminate\Database\Eloquent\Model>|null $model */
            $model = class_exists(\App\Models\SponsorshipInquiry::class)
                ? \App\Models\SponsorshipInquiry::class
                : null;

            if ($model) {
                $model::query()->create($validated);
            }
        }

        return redirect()
            ->route('home.sponsorship')
            ->with('success', 'Pengajuan kerja sama berhasil dikirim. Tim kami akan menghubungi Anda.');
    }

    public function contact()
    {
        $data = [
            'pageTitle' => 'Contact Us',
            'meta' => [
                'title' => 'Contact Us',
                'description' => 'Contact information and form on the Contact.',
                'keywords' => 'contact, information, form',
            ],
        ];

        return inertia('home/contact', $data);
    }
}
