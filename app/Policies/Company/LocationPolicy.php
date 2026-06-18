<?php

namespace App\Policies\Company;

use App\Models\Company\Location;
use App\Models\Core\User;

class LocationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-location');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Location $location): bool
    {
        return $user->hasPermissionTo('view-location');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-location');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Location $location): bool
    {
        return $user->hasPermissionTo('update-location');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Location $location): bool
    {
        return $user->hasPermissionTo('delete-location');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Location $location): bool
    {
        return $user->hasPermissionTo('restore-location');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Location $location): bool
    {
        return $user->hasPermissionTo('force-delete-location');
    }

    /**
     * Determine whether the user can view the data of the model.
     *
     * This policy checks if the user has the 'data-location' permission.
     * If the user has this permission, they can view the data of the model.
     *
     * @param User $user The user to check
     * @param Location $location The model to view
     * @return bool Whether the user can view the data of the model
     */
    public function getData(User $user, Location $location): bool
    {
        return $user->hasPermissionTo('data-location');
    }
}
