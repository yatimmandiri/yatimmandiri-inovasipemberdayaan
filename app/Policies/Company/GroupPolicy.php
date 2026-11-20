<?php

namespace App\Policies\Company;

use App\Models\Company\Group;
use App\Models\Core\User;

class GroupPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view-group');
    }

    public function view(User $user, Group $group): bool
    {
        return $user->can('view-group');
    }

    public function create(User $user): bool
    {
        return $user->can('create-group');
    }

    public function update(User $user, Group $group): bool
    {
        return $user->can('update-group');
    }

    public function delete(User $user, Group $group): bool
    {
        return $user->can('delete-group');
    }

    public function getData(User $user): bool
    {
        return $user->can('data-group');
    }
}
