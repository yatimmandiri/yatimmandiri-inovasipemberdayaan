<?php

namespace App\Policies\Company;

use App\Models\Company\Gallery;
use App\Models\Core\User;

class GalleryPolicy
{
    /**
     * Determine whether the user can view any categories.
     *
     * This policy checks if the user has the 'view-gallery' permission.
     * If the user has this permission, they can view all categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        // Check if the user has the 'view-gallery' permission
        // If the user has this permission, they can view all categories
        return $user->hasPermissionTo('view-gallery');
    }

    /**
     * Determine whether the user can view the gallery.
     *
     * This policy checks if the user has the 'view-gallery' permission.
     * If the user has this permission, they can view the gallery.
     *
     * @param  User  $user
     * @param  Gallery  $gallery
     * @return bool
     */
    public function view(User $user, Gallery $gallery): bool
    {
        // Check if the user has the 'view-gallery' permission
        // If the user has this permission, they can view the gallery
        return $user->hasPermissionTo('view-gallery');
    }

    /**
     * Determine whether the user can create models.
     *
     * This policy checks if the user has the 'create-gallery' permission.
     * If the user has this permission, they can create new categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function create(User $user): bool
    {
        // Check if the user has the 'create-gallery' permission
        // If the user has this permission, they can create new categories
        return $user->hasPermissionTo('create-gallery');
    }

    /**
     * Determine whether the user can update the gallery.
     *
     * This policy checks if the user has the 'update-gallery' permission.
     * If the user has this permission, they can update the gallery.
     *
     * @param  User  $user
     * @param  Gallery  $gallery
     * @return bool
     */
    public function update(User $user, Gallery $gallery): bool
    {
        // Check if the user has the 'update-gallery' permission
        // If the user has this permission, they can update the gallery
        return $user->hasPermissionTo('update-gallery');
    }

    /**
     * Determine whether the user can delete the gallery.
     *
     * This policy checks if the user has the 'delete-gallery' permission.
     * If the user has this permission, they can delete the gallery.
     *
     * @param  User  $user
     * @param  Gallery  $gallery
     * @return bool
     */
    public function delete(User $user, Gallery $gallery): bool
    {
        // Check if the user has the 'delete-gallery' permission
        // If the user has this permission, they can delete the gallery
        return $user->hasPermissionTo('delete-gallery');
    }

    /**
     * Determine whether the user can restore the gallery.
     *
     * This policy checks if the user has the 'restore-gallery' permission.
     * If the user has this permission, they can restore the gallery.
     *
     * @param  User  $user
     * @param  Gallery  $gallery
     * @return bool
     */
    public function restore(User $user, Gallery $gallery): bool
    {
        // Check if the user has the 'restore-gallery' permission
        // If the user has this permission, they can restore the gallery
        return $user->hasPermissionTo('restore-gallery');
    }

    /**
     * Determine whether the user can permanently delete the gallery.
     *
     * This policy checks if the user has the 'force-delete-gallery' permission.
     * If the user has this permission, they can permanently delete the gallery.
     *
     * @param  User  $user
     * @param  Gallery  $gallery
     * @return bool
     */
    public function forceDelete(User $user, Gallery $gallery): bool
    {
        // Check if the user has the 'force-delete-gallery' permission
        // If the user has this permission, they can permanently delete the gallery
        return $user->hasPermissionTo('force-delete-gallery');
    }

    /**
     * Determine whether the user can view the data of the given gallery.
     *
     * This policy checks if the user has the 'data-gallery' permission.
     * If the user has this permission, they can view the data of any gallery.
     *
     * @param  User  $user
     * @param  Gallery  $gallery
     * @return bool
     */
    public function getData(User $user, Gallery $gallery): bool
    {
        // Check if the user has the 'data-gallery' permission
        // If the user has this permission, they can view the data of any gallery
        return $user->hasPermissionTo('data-gallery');
    }
}
