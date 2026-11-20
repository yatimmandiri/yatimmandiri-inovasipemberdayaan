<?php

namespace App\Policies\Company;

use App\Models\Company\Fasilitator;
use App\Models\Core\User;

class FasilitatorPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view-fasilitator');
    }

    public function view(User $user, Fasilitator $fasilitator): bool
    {
        return $user->can('view-fasilitator');
    }

    public function create(User $user): bool
    {
        return $user->can('create-fasilitator');
    }

    public function update(User $user, Fasilitator $fasilitator): bool
    {
        return $user->can('update-fasilitator');
    }

    public function delete(User $user, Fasilitator $fasilitator): bool
    {
        return $user->can('delete-fasilitator');
    }

    public function createUser(User $user, Fasilitator $fasilitator): bool
    {
        return $user->can('update-fasilitator');
    }

    public function getData(User $user): bool
    {
        return $user->can('data-fasilitator');
    }
}
