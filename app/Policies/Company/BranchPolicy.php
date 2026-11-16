<?php

namespace App\Policies\Company;

use App\Models\Company\Branch;
use App\Models\Core\User;

class BranchPolicy
{
    /**
     * Branch adalah master data: hanya role dengan permission manage yang boleh mengelola.
     * 'view' untuk kebutuhan dropdown di seluruh sistem (admin & fasilitator).
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('Administrators')
            || $user->hasRole('Editors')
            || $user->hasRole('Fasilitator');
    }

    public function view(User $user, Branch $branch): bool
    {
        return $this->viewAny($user);
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('manage-branch');
    }

    public function update(User $user, Branch $branch): bool
    {
        return $user->hasPermissionTo('manage-branch');
    }

    public function delete(User $user, Branch $branch): bool
    {
        return $user->hasPermissionTo('manage-branch');
    }

    public function dataBranch(User $user): bool
    {
        return $user->hasRole('Administrators')
            || $user->hasRole('Editors')
            || $user->hasRole('Fasilitator');
    }
}
