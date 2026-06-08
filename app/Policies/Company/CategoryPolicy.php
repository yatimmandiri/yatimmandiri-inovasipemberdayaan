<?php

namespace App\Policies\Company;

use App\Models\Company\Category;
use App\Models\Core\User;

class CategoryPolicy
{
    /**
     * Determine whether the user can view any categories.
     *
     * This policy checks if the user has the 'view-category' permission.
     * If the user has this permission, they can view all categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        // Check if the user has the 'view-category' permission
        // If the user has this permission, they can view all categories
        return $user->hasPermissionTo('view-category');
    }

    /**
     * Determine whether the user can view the category.
     *
     * This policy checks if the user has the 'view-category' permission.
     * If the user has this permission, they can view the category.
     *
     * @param  User  $user
     * @param  Category  $category
     * @return bool
     */
    public function view(User $user, Category $category): bool
    {
        // Check if the user has the 'view-category' permission
        // If the user has this permission, they can view the category
        return $user->hasPermissionTo('view-category');
    }

    /**
     * Determine whether the user can create models.
     *
     * This policy checks if the user has the 'create-category' permission.
     * If the user has this permission, they can create new categories.
     *
     * @param  User  $user
     * @return bool
     */
    public function create(User $user): bool
    {
        // Check if the user has the 'create-category' permission
        // If the user has this permission, they can create new categories
        return $user->hasPermissionTo('create-category');
    }

    /**
     * Determine whether the user can update the category.
     *
     * This policy checks if the user has the 'update-category' permission.
     * If the user has this permission, they can update the category.
     *
     * @param  User  $user
     * @param  Category  $category
     * @return bool
     */
    public function update(User $user, Category $category): bool
    {
        // Check if the user has the 'update-category' permission
        // If the user has this permission, they can update the category
        return $user->hasPermissionTo('update-category');
    }

    /**
     * Determine whether the user can delete the category.
     *
     * This policy checks if the user has the 'delete-category' permission.
     * If the user has this permission, they can delete the category.
     *
     * @param  User  $user
     * @param  Category  $category
     * @return bool
     */
    public function delete(User $user, Category $category): bool
    {
        // Check if the user has the 'delete-category' permission
        // If the user has this permission, they can delete the category
        return $user->hasPermissionTo('delete-category');
    }

    /**
     * Determine whether the user can restore the category.
     *
     * This policy checks if the user has the 'restore-category' permission.
     * If the user has this permission, they can restore the category.
     *
     * @param  User  $user
     * @param  Category  $category
     * @return bool
     */
    public function restore(User $user, Category $category): bool
    {
        // Check if the user has the 'restore-category' permission
        // If the user has this permission, they can restore the category
        return $user->hasPermissionTo('restore-category');
    }

    /**
     * Determine whether the user can permanently delete the category.
     *
     * This policy checks if the user has the 'force-delete-category' permission.
     * If the user has this permission, they can permanently delete the category.
     *
     * @param  User  $user
     * @param  Category  $category
     * @return bool
     */
    public function forceDelete(User $user, Category $category): bool
    {
        // Check if the user has the 'force-delete-category' permission
        // If the user has this permission, they can permanently delete the category
        return $user->hasPermissionTo('force-delete-category');
    }

    /**
     * Determine whether the user can view the data of the given category.
     *
     * This policy checks if the user has the 'data-category' permission.
     * If the user has this permission, they can view the data of any category.
     *
     * @param  User  $user
     * @param  Category  $category
     * @return bool
     */
    public function getData(User $user, Category $category): bool
    {
        // Check if the user has the 'data-category' permission
        // If the user has this permission, they can view the data of any category
        return $user->hasPermissionTo('data-category');
    }
}
