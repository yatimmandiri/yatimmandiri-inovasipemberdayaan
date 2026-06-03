<?php

namespace App\Policies;

use App\Models\Core\User;
use App\Models\News;

class NewsPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-news');
    }

    public function view(User $user, News $news): bool
    {
        return $user->hasPermissionTo('view-news');
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-news');
    }

    public function update(User $user, News $news): bool
    {
        return $user->hasPermissionTo('update-news');
    }

    public function delete(User $user, News $news): bool
    {
        return $user->hasPermissionTo('delete-news');
    }

    public function data(User $user): bool
    {
        return $user->hasPermissionTo('data-news');
    }
}
