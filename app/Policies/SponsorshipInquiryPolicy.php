<?php

namespace App\Policies;

use App\Models\Core\User;

class SponsorshipInquiryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view-sponsorship-inquiry');
    }

    public function view(User $user): bool
    {
        return $user->can('view-sponsorship-inquiry');
    }

    public function create(User $user): bool
    {
        return $user->can('create-sponsorship-inquiry');
    }

    public function update(User $user): bool
    {
        return $user->can('update-sponsorship-inquiry');
    }

    public function delete(User $user): bool
    {
        return $user->can('delete-sponsorship-inquiry');
    }

    public function data(User $user): bool
    {
        return $user->can('data-sponsorship-inquiry');
    }
}
