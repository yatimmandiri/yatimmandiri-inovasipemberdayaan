<?php

namespace App\Policies\Company;

use App\Models\Company\Product;
use App\Models\Core\User;

class ProductPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-product');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Product $product): bool
    {
        return $user->hasPermissionTo('view-product');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-product');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Product $product): bool
    {
        return $user->hasPermissionTo('update-product');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Product $product): bool
    {
        return $user->hasPermissionTo('delete-product');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Product $product): bool
    {
        return $user->hasPermissionTo('restore-product');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Product $product): bool
    {
        return $user->hasPermissionTo('force-delete-product');
    }

    /**
     * Determine whether the user can view the data of the model.
     *
     * This policy checks if the user has the 'data-product' permission.
     * If the user has this permission, they can view the data of the model.
     *
     * @param User $user The user to check
     * @param Product $product The model to view
     * @return bool Whether the user can view the data of the model
     */
    public function getData(User $user, Product $product): bool
    {
        return $user->hasPermissionTo('data-product');
    }
}
