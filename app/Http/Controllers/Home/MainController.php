<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Company\Category;
use App\Models\Company\Location;
use App\Models\Company\Mitra;
use App\Models\Company\Program;
use App\Models\Company\Slider;
use App\Models\Company\Testimonial;
use Illuminate\Http\Request;

class MainController extends Controller
{
    private const PROGRAMS_PER_PAGE = 9;

    public function index()
    {
        $sliders = Slider::with(['category.programs'])->get();
        $categories = Category::with(['programs'])->active()->recommended()->get();
        $mitras = Mitra::get();
        $testimonials = Testimonial::get();
        $activeProgramQuery = Program::where('status', true);
        $activeProgramLocationQuery = Location::whereHas(
            'program',
            fn($query) => $query->where('status', true)
        );

        $heroStats = [
            'beneficiaries' => (clone $activeProgramLocationQuery)->count(),
            'activePrograms' => (clone $activeProgramQuery)->count(),
            'collaborationCities' => (clone $activeProgramLocationQuery)
                ->distinct('regency_id')
                ->count('regency_id'),
            'activeVolunteers' => Mitra::count(),
        ];

        $data = [
            'pageTitle' => 'Home',
            'sliders' => $sliders,
            'categories' => $categories,
            'mitras' => $mitras,
            'testimonials' => $testimonials,
            'heroStats' => $heroStats,
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

    public function berita()
    {
        $data = [
            'pageTitle' => 'Berita',
            'meta' => [
                'title' => 'Berita',
                'description' => 'Latest news and articles on the Berita page.',
                'keywords' => 'berita, news, articles',
            ],
        ];

        return inertia('home/berita/index', $data);
    }

    public function programs()
    {
        $perPage = self::PROGRAMS_PER_PAGE;

        $categories = Category::active()
            ->withCount([
                'programs' => fn($query) => $query->where('status', true)
            ])
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $programs = Program::with('category')
            ->where('status', true)
            ->latest()
            ->paginate($perPage);

        return inertia('home/programs/index', [
            'pageTitle' => 'Program',
            'programs' => $programs,
            'categories' => $categories,
            'perPage' => $perPage,
            'filters' => [
                'search' => '',
                'category' => '',
            ],
            'meta' => [
                'title' => 'Program',
                'description' => 'Daftar program pemberdayaan berkelanjutan.',
                'keywords' => 'program, pemberdayaan, inovasi',
            ],
        ]);
    }

    public function searchPrograms(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $perPage = (int) $request->input('per_page', self::PROGRAMS_PER_PAGE);
        $perPage = max(1, min($perPage, 24));

        $programs = Program::with('category')
            ->where('status', true)
            ->when($search, function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($category, function ($query) use ($category) {
                $query->whereHas('category', function ($categoryQuery) use ($category) {
                    $categoryQuery->where('slug', $category);
                });
            })
            ->latest()
            ->paginate($perPage);

        return response()->json($programs);
    }

    public function programDetail(Request $request, string $slug)
    {
        $category = Category::active()
            ->where('slug', $slug)
            ->first();

        if ($category) {
            return $this->programCategory($request, $category);
        }

        $program = Program::where('slug', $slug)->firstOrFail();

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

    private function programCategory(Request $request, Category $category)
    {
        $perPage = self::PROGRAMS_PER_PAGE;
        $search = $request->input('search');

        $categories = Category::active()
            ->withCount([
                'programs' => fn($query) => $query->where('status', true)
            ])
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $programs = Program::with('category')
            ->where('status', true)
            ->where('category_id', $category->id)
            ->when($search, function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return inertia('home/programs/index', [
            'pageTitle' => $category->name,
            'programs' => $programs,
            'categories' => $categories,
            'selectedCategory' => $category,
            'perPage' => $perPage,
            'filters' => [
                'search' => $search,
                'category' => $category->slug,
            ],
            'meta' => [
                'title' => $category->name,
                'description' => $category->excerpt ?? 'Daftar program pemberdayaan berdasarkan kategori.',
                'keywords' => 'program, kategori program, pemberdayaan, inovasi',
            ],
        ]);
    }

    public function sponsorship()
    {
        $data =  [
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
        ];

        return inertia('home/sponsorship/index', $data);
    }

    public function sponsorshipStore(Request $request)
    {
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
