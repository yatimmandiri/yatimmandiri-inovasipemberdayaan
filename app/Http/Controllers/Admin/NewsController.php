<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Concerns\Traits\UploadFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    use LogActivity, UploadFiles;

    public function index()
    {
        $this->authorize('viewAny', News::class);

        return Inertia::render('admin/news/list');
    }

    public function create()
    {
        $this->authorize('create', News::class);

        return Inertia::render('admin/news/create');
    }

    public function store(StoreNewsRequest $request)
    {
        $this->authorize('create', News::class);

        $data = $request->only(['title', 'category', 'content', 'published_at']);
        $data['status'] = $request->boolean('status', true);
        $data['excerpt'] = Str::limit(strip_tags($request->content), 160);

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $this->uploadFile(null, $request->file('featured_image'), 'news');
        }

        $news = News::create($data);

        $this->logSuccess('create-news', "Created News: {$news->title}", [
            'news_id' => $news->id,
            'new_data' => $news->toArray(),
        ]);

        return redirect()->route('admin.news.index')->with('success', 'News Created Successfully');
    }

    public function show(News $news)
    {
        $this->authorize('view', $news);

        return Inertia::render('admin/news/show', [
            'news' => $news,
        ]);
    }

    public function edit(News $news)
    {
        $this->authorize('update', $news);

        return Inertia::render('admin/news/edit', [
            'news' => $news,
        ]);
    }

    public function update(UpdateNewsRequest $request, News $news)
    {
        $this->authorize('update', $news);

        $oldData = $news->replicate();

        $data = $request->only(['title', 'category', 'content', 'published_at']);
        $data['status'] = $request->boolean('status');
        $data['excerpt'] = Str::limit(strip_tags($request->content), 160);

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $this->replaceFile($news->featured_image, $request->file('featured_image'), 'news');
        }

        $news->update($data);

        $this->logSuccess('update-news', "Updated News: {$news->title}", [
            'news_id' => $news->id,
            'old_data' => $oldData->toArray(),
            'new_data' => $news->toArray(),
        ]);

        return redirect()->route('admin.news.index')->with('success', 'News Updated Successfully');
    }

    public function destroy(News $news)
    {
        $this->authorize('delete', $news);

        $news->delete();

        $this->logSuccess('delete-news', "Deleted News: {$news->title}", [
            'news_id' => $news->id,
        ]);

        return redirect()->route('admin.news.index')->with('success', 'News Deleted Successfully');
    }

    public function status(News $news)
    {
        $this->authorize('update', $news);

        $news->update([
            'status' => ! $news->status,
        ]);

        return redirect()->route('admin.news.index')->with('success', 'News Status Updated Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data', News::class);

        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');
        $allowedSorts = ['id', 'title', 'category', 'published_at', 'status', 'created_at', 'updated_at'];

        $query = News::query()
            ->search($globalSearch)
            ->orderBy(in_array($orderBy, $allowedSorts, true) ? $orderBy : 'id', $orderDirection === 'asc' ? 'asc' : 'desc');

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }
}
