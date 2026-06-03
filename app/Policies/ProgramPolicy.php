<?php

namespace App\Policies;

use App\Models\Core\User;
use App\Models\Program;

class ProgramPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-program');
    }

    public function view(User $user, Program $program): bool
    {
        return $user->hasPermissionTo('view-program');
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-program');
    }

    public function update(User $user, Program $program): bool
    {
        return $user->hasPermissionTo('update-program');
    }

    public function delete(User $user, Program $program): bool
    {
        return $user->hasPermissionTo('delete-program');
    }

    public function data(User $user): bool
    {
        return $user->hasPermissionTo('data-program');
    }
}
