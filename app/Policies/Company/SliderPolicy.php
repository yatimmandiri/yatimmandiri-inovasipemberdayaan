<?php

namespace App\Policies\Company;

use App\Models\Company\Slider;
use App\Models\Core\User;

class SliderPolicy
{
    /**
     * Determine whether the user can view any categories.
     *
     * This policy checks if the user has the 'view-slider' permission.
     * If the user has this permission, they can view all categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        // Check if the user has the 'view-slider' permission
        // If the user has this permission, they can view all categories
        return $user->hasPermissionTo('view-slider');
    }

    /**
     * Determine whether the user can view the Slider.
     *
     * This policy checks if the user has the 'view-slider' permission.
     * If the user has this permission, they can view the Slider.
     *
     * @param  User  $user
     * @param  Slider  $slider
     * @return bool
     */
    public function view(User $user, Slider $slider): bool
    {
        // Check if the user has the 'view-slider' permission
        // If the user has this permission, they can view the Slider
        return $user->hasPermissionTo('view-slider');
    }

    /**
     * Determine whether the user can create models.
     *
     * This policy checks if the user has the 'create-slider' permission.
     * If the user has this permission, they can create new categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function create(User $user): bool
    {
        // Check if the user has the 'create-slider' permission
        // If the user has this permission, they can create new categories
        return $user->hasPermissionTo('create-slider');
    }

    /**
     * Determine whether the user can update the Slider.
     *
     * This policy checks if the user has the 'update-slider' permission.
     * If the user has this permission, they can update the Slider.
     *
     * @param  User  $user
     * @param  Slider  $slider
     * @return bool
     */
    public function update(User $user, Slider $slider): bool
    {
        // Check if the user has the 'update-slider' permission
        // If the user has this permission, they can update the Slider
        return $user->hasPermissionTo('update-slider');
    }

    /**
     * Determine whether the user can delete the Slider.
     *
     * This policy checks if the user has the 'delete-slider' permission.
     * If the user has this permission, they can delete the Slider.
     *
     * @param  User  $user
     * @param  Slider  $slider
     * @return bool
     */
    public function delete(User $user, Slider $slider): bool
    {
        // Check if the user has the 'delete-slider' permission
        // If the user has this permission, they can delete the Slider
        return $user->hasPermissionTo('delete-slider');
    }

    /**
     * Determine whether the user can restore the Slider.
     *
     * This policy checks if the user has the 'restore-slider' permission.
     * If the user has this permission, they can restore the Slider.
     *
     * @param  User  $user
     * @param  Slider  $slider
     * @return bool
     */
    public function restore(User $user, Slider $slider): bool
    {
        // Check if the user has the 'restore-slider' permission
        // If the user has this permission, they can restore the Slider
        return $user->hasPermissionTo('restore-slider');
    }

    /**
     * Determine whether the user can permanently delete the Slider.
     *
     * This policy checks if the user has the 'force-delete-slider' permission.
     * If the user has this permission, they can permanently delete the Slider.
     *
     * @param  User  $user
     * @param  Slider  $slider
     * @return bool
     */
    public function forceDelete(User $user, Slider $slider): bool
    {
        // Check if the user has the 'force-delete-slider' permission
        // If the user has this permission, they can permanently delete the Slider
        return $user->hasPermissionTo('force-delete-slider');
    }

    /**
     * Determine whether the user can view the data of the given Slider.
     *
     * This policy checks if the user has the 'data-slider' permission.
     * If the user has this permission, they can view the data of any Slider.
     *
     * @param  User  $user
     * @param  Slider  $slider
     * @return bool
     */
    public function getData(User $user, Slider $slider): bool
    {
        // Check if the user has the 'data-slider' permission
        // If the user has this permission, they can view the data of any Slider
        return $user->hasPermissionTo('data-slider');
    }
}
