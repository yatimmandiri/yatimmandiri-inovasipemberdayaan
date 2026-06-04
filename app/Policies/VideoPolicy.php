<?php

namespace App\Policies;

use App\Models\Core\User;
use App\Models\Video;

class VideoPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-video');
    }

    public function view(User $user, Video $video): bool
    {
        return $user->hasPermissionTo('view-video');
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-video');
    }

    public function update(User $user, Video $video): bool
    {
        return $user->hasPermissionTo('update-video');
    }

    public function delete(User $user, Video $video): bool
    {
        return $user->hasPermissionTo('delete-video');
    }

    public function data(User $user): bool
    {
        return $user->hasPermissionTo('data-video');
    }
}
