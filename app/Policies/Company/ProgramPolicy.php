<?php

namespace App\Policies\Company;

use App\Models\Company\Program;
use App\Models\Core\User;

class ProgramPolicy
{
    /**
     * Determine whether the user can view any categories.
     *
     * This policy checks if the user has the 'view-program' permission.
     * If the user has this permission, they can view all categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        // Check if the user has the 'view-program' permission
        // If the user has this permission, they can view all categories
        return $user->hasPermissionTo('view-program');
    }

    /**
     * Determine whether the user can view the Program.
     *
     * This policy checks if the user has the 'view-program' permission.
     * If the user has this permission, they can view the Program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return bool
     */
    public function view(User $user, Program $program): bool
    {
        // Check if the user has the 'view-program' permission
        // If the user has this permission, they can view the Program
        return $user->hasPermissionTo('view-program');
    }

    /**
     * Determine whether the user can create models.
     *
     * This policy checks if the user has the 'create-program' permission.
     * If the user has this permission, they can create new categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function create(User $user): bool
    {
        // Check if the user has the 'create-program' permission
        // If the user has this permission, they can create new categories
        return $user->hasPermissionTo('create-program');
    }

    /**
     * Determine whether the user can update the Program.
     *
     * This policy checks if the user has the 'update-program' permission.
     * If the user has this permission, they can update the Program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return bool
     */
    public function update(User $user, Program $program): bool
    {
        // Check if the user has the 'update-program' permission
        // If the user has this permission, they can update the Program
        return $user->hasPermissionTo('update-program');
    }

    /**
     * Determine whether the user can delete the Program.
     *
     * This policy checks if the user has the 'delete-program' permission.
     * If the user has this permission, they can delete the Program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return bool
     */
    public function delete(User $user, Program $program): bool
    {
        // Check if the user has the 'delete-program' permission
        // If the user has this permission, they can delete the Program
        return $user->hasPermissionTo('delete-program');
    }

    /**
     * Determine whether the user can restore the Program.
     *
     * This policy checks if the user has the 'restore-program' permission.
     * If the user has this permission, they can restore the Program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return bool
     */
    public function restore(User $user, Program $program): bool
    {
        // Check if the user has the 'restore-program' permission
        // If the user has this permission, they can restore the Program
        return $user->hasPermissionTo('restore-program');
    }

    /**
     * Determine whether the user can permanently delete the Program.
     *
     * This policy checks if the user has the 'force-delete-program' permission.
     * If the user has this permission, they can permanently delete the Program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return bool
     */
    public function forceDelete(User $user, Program $program): bool
    {
        // Check if the user has the 'force-delete-program' permission
        // If the user has this permission, they can permanently delete the Program
        return $user->hasPermissionTo('force-delete-program');
    }

    /**
     * Determine whether the user can view the data of the given Program.
     *
     * This policy checks if the user has the 'data-program' permission.
     * If the user has this permission, they can view the data of any Program.
     *
     * @param  User  $user
     * @param  Program  $program
     * @return bool
     */
    public function getData(User $user, Program $program): bool
    {
        // Check if the user has the 'data-program' permission
        // If the user has this permission, they can view the data of any Program
        return $user->hasPermissionTo('data-program');
    }
}
