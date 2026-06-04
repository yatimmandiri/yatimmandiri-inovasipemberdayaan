<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Services\NewsApiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', News::class);

        return Inertia::render('admin/news/list');
    }

    public function create()
    {
        abort(404);
    }

    public function store(Request $request)
    {
        abort(404);
    }

    public function show(string $news)
    {
        abort(404);
    }

    public function edit(string $news)
    {
        abort(404);
    }

    public function update(Request $request, string $news)
    {
        abort(404);
    }

    public function destroy(string $news)
    {
        abort(404);
    }

    public function status(string $news)
    {
        abort(404);
    }

    public function getData(Request $request, NewsApiService $newsApi)
    {
        $this->authorize('data', News::class);

        $perPage = (int) $request->input('perPage', 10);
        $page = (int) $request->input('page', 1);
        $globalSearch = $request->input('globalSearch', '');

        return response()->json($newsApi->paginate($page, $perPage, $globalSearch));
    }
}
