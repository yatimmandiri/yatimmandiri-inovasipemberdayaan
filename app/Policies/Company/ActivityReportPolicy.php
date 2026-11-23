<?php

namespace App\Policies\Company;

use App\Models\Company\ActivityReport;
use App\Models\Core\User;

class ActivityReportPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view-activity-report');
    }

    public function view(User $user, ActivityReport $activityReport): bool
    {
        return $user->can('view-activity-report');
    }

    public function create(User $user): bool
    {
        return $user->can('create-activity-report');
    }

    public function update(User $user, ActivityReport $activityReport): bool
    {
        return $user->can('update-activity-report');
    }

    public function delete(User $user, ActivityReport $activityReport): bool
    {
        return $user->can('delete-activity-report');
    }

    public function getData(User $user): bool
    {
        return $user->can('data-activity-report');
    }
}
