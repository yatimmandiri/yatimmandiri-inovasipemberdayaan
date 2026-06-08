<?php

namespace App\Policies\Company;

use App\Models\Company\Testimonial;
use App\Models\Core\User;

class TestimonialPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-testimonial');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Testimonial $testimonial): bool
    {
        return $user->hasPermissionTo('view-testimonial');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-testimonial');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Testimonial $testimonial): bool
    {
        return $user->hasPermissionTo('update-testimonial');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Testimonial $testimonial): bool
    {
        return $user->hasPermissionTo('delete-testimonial');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Testimonial $testimonial): bool
    {
        return $user->hasPermissionTo('restore-testimonial');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Testimonial $testimonial): bool
    {
        return $user->hasPermissionTo('force-delete-testimonial');
    }

    /**
     * Determine whether the user can view the data of the model.
     *
     * This policy checks if the user has the 'data-testimonial' permission.
     * If the user has this permission, they can view the data of the model.
     *
     * @param User $user The user to check
     * @param Testimonial $testimonial The model to view
     * @return bool Whether the user can view the data of the model
     */
    public function getData(User $user, Testimonial $testimonial): bool
    {
        return $user->hasPermissionTo('data-testimonial');
    }
}
