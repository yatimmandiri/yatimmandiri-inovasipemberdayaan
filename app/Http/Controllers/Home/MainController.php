<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Company\Category;
use App\Models\Company\Mitra;
use App\Models\Company\Product;
use App\Models\Company\Program;
use App\Models\Company\Review;
use App\Models\Company\Slider;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index()
    {
        $sliders = Slider::with(['category.programs'])->get();
        $categories = Category::with(['programs'])->active()->get();
        $mitras = Mitra::get();
        $reviews = Review::get();

        $data = [
            'pageTitle' => 'Home',
            'sliders' => $sliders,
            'categories' => $categories,
            'mitras' => $mitras,
            'reviews' => $reviews,
            'meta' => [
                'title' => 'Home',
                'description' => 'Welcome to the Home page.',
                'keywords' => 'Yatim Mandiri, Inovasi Pemberdayaan',
            ],
        ];

        return inertia('home/index', $data);
    }

    public function categories()
    {
        $categories = Category::with(['programs'])->active()->get();

        $data = [
            'pageTitle' => 'Categories',
            'categories' => $categories,
            'meta' => [
                'title' => 'Program Categories',
                'description' => 'Jelajahi berbagai kategori program Inovasi Pemberdayaan yang berfokus pada pengembangan ekonomi, pendidikan, lingkungan, UMKM, pemberdayaan perempuan, dan pembangunan masyarakat berkelanjutan.',
                'keywords' => 'kategori program, inovasi pemberdayaan, pemberdayaan masyarakat, UMKM, pendidikan, lingkungan, pemberdayaan perempuan, ekonomi masyarakat, pembangunan berkelanjutan',
            ],
        ];

        return inertia('home/categories/index', $data);
    }

    public function categoriesDetail(string $slug)
    {
        $category = Category::with(['programs'])->active()->where('slug', $slug)->firstOrFail();

        $data = [
            'pageTitle' => $category->name,
            'category' => $category,
            'meta' => [
                'title' => $category->name . ' | Inovasi Pemberdayaan',
                'description' => $category->excerpt
                    ?: 'Pelajari lebih lanjut tentang program ' . $category->name . ' dalam mendukung pemberdayaan masyarakat yang mandiri, produktif, dan berkelanjutan.',
                'keywords' => implode(', ', [
                    $category->name,
                    'Inovasi Pemberdayaan',
                    'Program Pemberdayaan',
                    'Pemberdayaan Masyarakat',
                    'Inovasi Sosial',
                    'Pembangunan Berkelanjutan',
                ]),
            ],
        ];

        return inertia('home/categories/detail', $data);
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

    public function programs()
    {
        $categories = Category::active()
            ->withCount(['programs' => fn($query) => $query->where('status', true)])
            ->get();
        $programs = Program::get();

        $data = [
            'pageTitle' => 'Program',
            'categories' => $categories,
            'programs' => $programs,
            'meta' => [
                'title' => 'Program',
                'description' => 'Daftar program pemberdayaan berkelanjutan.',
                'keywords' => 'program, pemberdayaan, inovasi',
            ],
        ];

        return inertia('home/programs/index', $data);
    }

    public function programsData(Request $request)
    {
        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');

        $query = Category::query()
            ->latest()
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }

    public function programDetail(Program $program)
    {
        $program->load(['category', 'locations', 'products']);

        $relatedPrograms = Program::with(['category', 'locations'])
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

        return inertia('home/programs/detail', $data);
    }

    public function products()
    {
        $data = [
            'pageTitle' => 'Products',
            'meta' => [
                'title' => 'Products',
                'description' => 'Daftar produk pemberdayaan.',
                'keywords' => 'produk, pemberdayaan, inovasi',
            ],
        ];

        return inertia('home/products/index', $data);
    }

    public function productsData(Request $request)
    {
        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderBy = $request->input('orderBy', 'id');
        $orderDirection = $request->input('orderDirection', 'desc');

        $query = Product::query()
            ->latest()
            ->search($globalSearch)
            ->orderBy($orderBy, $orderDirection);

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }

    public function productsDetail(Product $product)
    {
        $data = [
            'pageTitle' => $product->name,
            'product' => $product,
            'meta' => [
                'title' => $product->name,
                'description' => $product->excerpt ?? 'Detail produk pemberdayaan.',
                'keywords' => 'produk, pemberdayaan, inovasi',
            ],
        ];

        return inertia('home/products/detail', $data);
    }

    public function articles()
    {
        $data = [
            'pageTitle' => 'Articles',
            'meta' => [
                'title' => 'Articles',
                'description' => 'Temukan artikel, berita, kisah inspiratif, dan informasi terbaru mengenai program pemberdayaan masyarakat, inovasi sosial, serta dampak yang dihasilkan oleh Inovasi Pemberdayaan.',
                'keywords' => 'artikel, berita, inovasi pemberdayaan, pemberdayaan masyarakat, inovasi sosial, program pemberdayaan, kisah inspiratif, dampak sosial, berita terbaru',
            ],
        ];

        return inertia('home/berita/index', $data);
    }

    public function partnership()
    {
        $programs = Program::select(['id', 'name'])->get();

        $data = [
            'pageTitle' => 'Partnerships',
            'programs' => $programs,
            'meta' => [
                'title' => 'Partnerships',
                'description' => 'Bangun kolaborasi bersama Inovasi Pemberdayaan melalui program pemberdayaan masyarakat, pengembangan UMKM, pendidikan, lingkungan, dan berbagai inisiatif sosial yang berkelanjutan.',
                'keywords' => 'partnership, kemitraan, kerja sama, kolaborasi, inovasi pemberdayaan, pemberdayaan masyarakat, CSR, program sosial, UMKM, pendidikan, lingkungan',
            ],
        ];

        return inertia('home/partnerships/index', $data);
    }

    public function contact()
    {
        $data = [
            'pageTitle' => 'Hubungi Kami',
            'meta' => [
                'title' => 'Hubungi Kami',
                'description' => 'Hubungi tim Inovasi Pemberdayaan untuk mendapatkan informasi mengenai program pemberdayaan masyarakat, kemitraan, kolaborasi, maupun peluang kerja sama dalam menciptakan dampak sosial yang berkelanjutan.',
                'keywords' => 'Inovasi Pemberdayaan, hubungi kami, kontak, program pemberdayaan, pemberdayaan masyarakat, kemitraan, kolaborasi, dampak sosial, inovasi sosial, pembangunan berkelanjutan',
            ],
        ];

        return inertia('home/contact', $data);
    }
}
