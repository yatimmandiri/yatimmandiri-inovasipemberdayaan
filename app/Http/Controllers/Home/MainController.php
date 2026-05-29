<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;

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
        ];

        return inertia('home/index', $data);
    }
}
