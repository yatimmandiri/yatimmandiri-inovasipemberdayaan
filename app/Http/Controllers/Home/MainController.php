<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\Testimonial;

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
                ->active()
                ->latest()
                ->limit(6)
                ->get(['id', 'name', 'slug', 'excerpt', 'description', 'featured_image']),
            'testimonials' => Testimonial::query()
                ->active()
                ->latest()
                ->limit(8)
                ->get(['id', 'name', 'position', 'description', 'photo', 'rating']),
        ];

        return inertia('home/index', $data);
    }
}
