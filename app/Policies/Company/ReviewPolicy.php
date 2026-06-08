<?php

namespace App\Policies\Company;

use App\Models\Company\Review;
use App\Models\Core\User;

class ReviewPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-review');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Review $review): bool
    {
        return $user->hasPermissionTo('view-review');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-review');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Review $review): bool
    {
        return $user->hasPermissionTo('update-review');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Review $review): bool
    {
        return $user->hasPermissionTo('delete-review');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Review $review): bool
    {
        return $user->hasPermissionTo('restore-review');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Review $review): bool
    {
        return $user->hasPermissionTo('force-delete-review');
    }

    /**
     * Determine whether the user can view the data of the model.
     *
     * This policy checks if the user has the 'data-review' permission.
     * If the user has this permission, they can view the data of the model.
     *
     * @param User $user The user to check
     * @param Review $review The model to view
     * @return bool Whether the user can view the data of the model
     */
    public function getData(User $user, Review $review): bool
    {
        return $user->hasPermissionTo('data-review');
    }
}
