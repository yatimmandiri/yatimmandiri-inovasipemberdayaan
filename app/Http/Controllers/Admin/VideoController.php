<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\Traits\LogActivity;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class VideoController extends Controller
{
    use LogActivity;

    public function index()
    {
        $this->authorize('viewAny', Video::class);

        return Inertia::render('admin/videos/list');
    }

    public function create()
    {
        $this->authorize('create', Video::class);

        return Inertia::render('admin/videos/create');
    }

    public function store(StoreVideoRequest $request)
    {
        $this->authorize('create', Video::class);

        $data = $this->validatedData($request);
        $video = Video::create($data);

        $this->logSuccess('create-video', "Created Video: {$video->title}", [
            'video_id' => $video->id,
            'new_data' => $video->toArray(),
        ]);

        return redirect()->route('admin.videos.index')->with('success', 'Video Created Successfully');
    }

    public function show(Video $video)
    {
        $this->authorize('view', $video);

        return Inertia::render('admin/videos/show', [
            'video' => $video,
        ]);
    }

    public function edit(Video $video)
    {
        $this->authorize('update', $video);

        return Inertia::render('admin/videos/edit', [
            'video' => $video,
        ]);
    }

    public function update(UpdateVideoRequest $request, Video $video)
    {
        $this->authorize('update', $video);

        $oldData = $video->replicate();
        $video->update($this->validatedData($request));

        $this->logSuccess('update-video', "Updated Video: {$video->title}", [
            'video_id' => $video->id,
            'old_data' => $oldData->toArray(),
            'new_data' => $video->toArray(),
        ]);

        return redirect()->route('admin.videos.index')->with('success', 'Video Updated Successfully');
    }

    public function destroy(Video $video)
    {
        $this->authorize('delete', $video);

        $video->delete();

        $this->logSuccess('delete-video', "Deleted Video: {$video->title}", [
            'video_id' => $video->id,
        ]);

        return redirect()->route('admin.videos.index')->with('success', 'Video Deleted Successfully');
    }

    public function status(Video $video)
    {
        $this->authorize('update', $video);

        $video->update([
            'status' => ! $video->status,
        ]);

        return redirect()->route('admin.videos.index')->with('success', 'Video Status Updated Successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data', Video::class);

        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');
        $allowedSorts = ['id', 'title', 'category', 'published_at', 'status', 'created_at', 'updated_at'];

        $query = Video::query()
            ->search($globalSearch)
            ->orderBy(in_array($orderBy, $allowedSorts, true) ? $orderBy : 'id', $orderDirection === 'asc' ? 'asc' : 'desc');

        $data = $perPage
            ? $query->paginate($perPage, ['*'], 'page', $page)
            : $query->get();

        return response()->json($data);
    }

    private function validatedData(StoreVideoRequest|UpdateVideoRequest $request): array
    {
        $youtubeId = $this->extractYoutubeId($request->youtube_url);

        if (! $youtubeId) {
            throw ValidationException::withMessages([
                'youtube_url' => 'Please enter a valid YouTube video URL.',
            ]);
        }

        $data = $request->only(['title', 'category', 'description', 'youtube_url', 'thumbnail_url', 'published_at']);
        $data['status'] = $request->boolean('status', true);
        $data['youtube_id'] = $youtubeId;
        $data['thumbnail_url'] = $data['thumbnail_url'] ?: $this->youtubeThumbnailUrl($youtubeId);

        return $data;
    }

    private function extractYoutubeId(string $url): ?string
    {
        $host = parse_url($url, PHP_URL_HOST);
        $path = trim(parse_url($url, PHP_URL_PATH) ?? '', '/');
        parse_str(parse_url($url, PHP_URL_QUERY) ?? '', $query);

        if (isset($query['v'])) {
            return $query['v'];
        }

        if (str_contains((string) $host, 'youtu.be')) {
            return Str::before($path, '?');
        }

        if (str_contains($path, 'shorts/')) {
            return Str::after($path, 'shorts/');
        }

        if (str_contains($path, 'embed/')) {
            return Str::after($path, 'embed/');
        }

        return null;
    }

    private function youtubeThumbnailUrl(string $youtubeId): string
    {
        return "https://img.youtube.com/vi/{$youtubeId}/hqdefault.jpg";
    }
}
