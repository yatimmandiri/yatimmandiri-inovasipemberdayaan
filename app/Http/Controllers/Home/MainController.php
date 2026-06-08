<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Company\Category;
use App\Models\Company\Mitra;
use App\Models\Company\Slider;

class MainController extends Controller
{
    public function index()
    {
        $sliders = Slider::with(['category.programs'])->get();
        $categories = Category::with(['programs'])->active()->recommended()->get();
        $mitras = Mitra::get();

        $data = [
            'pageTitle' => 'Home',
            'sliders' => $sliders,
            'categories' => $categories,
            'mitras' => $mitras,
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

        $data = [
            'pageTitle' => 'Program',
            'meta' => [
                'title' => 'Program',
                'description' => 'Daftar program pemberdayaan berkelanjutan.',
                'keywords' => 'program, pemberdayaan, inovasi',
            ],
        ];

        return inertia('home/programs/index', $data);
    }
}
