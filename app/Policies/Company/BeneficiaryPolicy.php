<?php

namespace App\Policies\Company;

use App\Models\Company\Beneficiary;
use App\Models\Core\User;

class BeneficiaryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view-beneficiary');
    }

    public function view(User $user, Beneficiary $beneficiary): bool
    {
        return $user->can('view-beneficiary');
    }

    public function create(User $user): bool
    {
        return $user->can('create-beneficiary');
    }

    public function update(User $user, Beneficiary $beneficiary): bool
    {
        return $user->can('update-beneficiary');
    }

    public function delete(User $user, Beneficiary $beneficiary): bool
    {
        return $user->can('delete-beneficiary');
    }

    public function getData(User $user): bool
    {
        return $user->can('data-beneficiary');
    }
}
