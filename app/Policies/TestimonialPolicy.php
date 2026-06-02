<?php

namespace App\Policies;

use App\Models\Core\User;
use App\Models\Testimonial;

class TestimonialPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-testimonial');
    }

    public function view(User $user, Testimonial $testimonial): bool
    {
        return $user->hasPermissionTo('view-testimonial');
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-testimonial');
    }

    public function update(User $user, Testimonial $testimonial): bool
    {
        return $user->hasPermissionTo('update-testimonial');
    }

    public function delete(User $user, Testimonial $testimonial): bool
    {
        return $user->hasPermissionTo('delete-testimonial');
    }
}
