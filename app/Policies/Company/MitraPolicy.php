<?php

namespace App\Policies\Company;

use App\Models\Company\Mitra;
use App\Models\Core\User;

class MitraPolicy
{
    /**
     * Determine whether the user can view any categories.
     *
     * This policy checks if the user has the 'view-mitra' permission.
     * If the user has this permission, they can view all categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        // Check if the user has the 'view-mitra' permission
        // If the user has this permission, they can view all categories
        return $user->hasPermissionTo('view-mitra');
    }

    /**
     * Determine whether the user can view the Mitra.
     *
     * This policy checks if the user has the 'view-mitra' permission.
     * If the user has this permission, they can view the Mitra.
     *
     * @param  User  $user
     * @param  Mitra  $mitra
     * @return bool
     */
    public function view(User $user, Mitra $mitra): bool
    {
        // Check if the user has the 'view-mitra' permission
        // If the user has this permission, they can view the Mitra
        return $user->hasPermissionTo('view-mitra');
    }

    /**
     * Determine whether the user can create models.
     *
     * This policy checks if the user has the 'create-mitra' permission.
     * If the user has this permission, they can create new categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function create(User $user): bool
    {
        // Check if the user has the 'create-mitra' permission
        // If the user has this permission, they can create new categories
        return $user->hasPermissionTo('create-mitra');
    }

    /**
     * Determine whether the user can update the Mitra.
     *
     * This policy checks if the user has the 'update-mitra' permission.
     * If the user has this permission, they can update the Mitra.
     *
     * @param  User  $user
     * @param  Mitra  $mitra
     * @return bool
     */
    public function update(User $user, Mitra $mitra): bool
    {
        // Check if the user has the 'update-mitra' permission
        // If the user has this permission, they can update the Mitra
        return $user->hasPermissionTo('update-mitra');
    }

    /**
     * Determine whether the user can delete the Mitra.
     *
     * This policy checks if the user has the 'delete-mitra' permission.
     * If the user has this permission, they can delete the Mitra.
     *
     * @param  User  $user
     * @param  Mitra  $mitra
     * @return bool
     */
    public function delete(User $user, Mitra $mitra): bool
    {
        // Check if the user has the 'delete-mitra' permission
        // If the user has this permission, they can delete the Mitra
        return $user->hasPermissionTo('delete-mitra');
    }

    /**
     * Determine whether the user can restore the Mitra.
     *
     * This policy checks if the user has the 'restore-mitra' permission.
     * If the user has this permission, they can restore the Mitra.
     *
     * @param  User  $user
     * @param  Mitra  $mitra
     * @return bool
     */
    public function restore(User $user, Mitra $mitra): bool
    {
        // Check if the user has the 'restore-mitra' permission
        // If the user has this permission, they can restore the Mitra
        return $user->hasPermissionTo('restore-mitra');
    }

    /**
     * Determine whether the user can permanently delete the Mitra.
     *
     * This policy checks if the user has the 'force-delete-mitra' permission.
     * If the user has this permission, they can permanently delete the Mitra.
     *
     * @param  User  $user
     * @param  Mitra  $mitra
     * @return bool
     */
    public function forceDelete(User $user, Mitra $mitra): bool
    {
        // Check if the user has the 'force-delete-mitra' permission
        // If the user has this permission, they can permanently delete the Mitra
        return $user->hasPermissionTo('force-delete-mitra');
    }

    /**
     * Determine whether the user can view the data of the given Mitra.
     *
     * This policy checks if the user has the 'data-mitra' permission.
     * If the user has this permission, they can view the data of any Mitra.
     *
     * @param  User  $user
     * @param  Mitra  $mitra
     * @return bool
     */
    public function getData(User $user, Mitra $mitra): bool
    {
        // Check if the user has the 'data-mitra' permission
        // If the user has this permission, they can view the data of any Mitra
        return $user->hasPermissionTo('data-mitra');
    }
}
