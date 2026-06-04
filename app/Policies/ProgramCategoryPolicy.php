<?php

namespace App\Policies;

use App\Models\Core\User;
use App\Models\ProgramCategory;

class ProgramCategoryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-program-category');
    }

    public function view(User $user, ProgramCategory $programCategory): bool
    {
        return $user->hasPermissionTo('view-program-category');
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-program-category');
    }

    public function update(User $user, ProgramCategory $programCategory): bool
    {
        return $user->hasPermissionTo('update-program-category');
    }

    public function delete(User $user, ProgramCategory $programCategory): bool
    {
        return $user->hasPermissionTo('delete-program-category');
    }

    public function data(User $user): bool
    {
        return $user->hasPermissionTo('data-program-category');
    }
}
