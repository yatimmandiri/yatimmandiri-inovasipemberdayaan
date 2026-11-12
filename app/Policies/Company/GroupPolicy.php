<?php

namespace App\Policies\Company;

use App\Models\Company\Group;
use App\Models\Core\User;

class GroupPolicy
{
    /**
     * NOTE: Gate::before Spatie memeriksa permission dengan nama ability.
     * Ability 'view'/'update'/'delete' tidak sama dengan nama permission apa pun,
     * sehingga selalu jatuh ke policy ini — rule kepemilikan di sini tidak bisa dilewati.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-group');
    }

    public function view(User $user, Group $group): bool
    {
        if ($user->hasRole('Administrators') || $user->hasRole('Editors')) {
            return $user->hasPermissionTo('view-group');
        }

        return $group->fasilitator_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-group');
    }

    public function update(User $user, Group $group): bool
    {
        return $user->hasPermissionTo('update-group');
    }

    public function delete(User $user, Group $group): bool
    {
        return $user->hasPermissionTo('delete-group');
    }

    public function dataGroup(User $user): bool
    {
        return $user->hasPermissionTo('data-group');
    }

    /**
     * Fasilitator mengelola daftar nama PM kelompoknya sendiri (roster PM diisi fasil).
     */
    public function managePms(User $user, Group $group): bool
    {
        if ($user->hasRole('Administrators') || $user->hasRole('Editors')) {
            return $user->hasPermissionTo('update-group');
        }

        return $group->fasilitator_id === $user->id;
    }
}
