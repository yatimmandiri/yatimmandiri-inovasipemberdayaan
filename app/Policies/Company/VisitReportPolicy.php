<?php

namespace App\Policies\Company;

use App\Models\Company\VisitReport;
use App\Models\Core\User;

class VisitReportPolicy
{
    /**
     * NOTE: Gate::before Spatie memeriksa permission dengan nama ability.
     * Ability 'view'/'update'/'review' tidak sama dengan nama permission apa pun,
     * sehingga selalu jatuh ke policy ini — rule kepemilikan di sini tidak bisa dilewati.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-visit-report');
    }

    public function view(User $user, VisitReport $visitReport): bool
    {
        if ($user->hasRole('Administrators') || $user->hasRole('Editors')) {
            return $user->hasPermissionTo('view-visit-report');
        }

        return $visitReport->fasilitator_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-visit-report');
    }

    public function update(User $user, VisitReport $visitReport): bool
    {
        if ($user->hasRole('Administrators') || $user->hasRole('Editors')) {
            return $user->hasPermissionTo('update-visit-report');
        }

        // Fasilitator hanya boleh merevisi laporannya sendiri saat masih draft / diminta revisi.
        return $visitReport->fasilitator_id === $user->id
            && in_array($visitReport->status, [VisitReport::STATUS_DRAFT, VisitReport::STATUS_REVISED], true);
    }

    public function delete(User $user, VisitReport $visitReport): bool
    {
        if ($user->hasRole('Administrators') || $user->hasRole('Editors')) {
            return $user->hasPermissionTo('delete-visit-report');
        }

        // Fasilitator hanya boleh menghapus laporan miliknya yang masih draft.
        return $visitReport->fasilitator_id === $user->id
            && $visitReport->status === VisitReport::STATUS_DRAFT;
    }

    /**
     * Fasilitator mengajukan laporan (draft/revised -> submitted).
     */
    public function submit(User $user, VisitReport $visitReport): bool
    {
        return $visitReport->fasilitator_id === $user->id
            && in_array($visitReport->status, [VisitReport::STATUS_DRAFT, VisitReport::STATUS_REVISED], true);
    }

    /**
     * Administrator memeriksa laporan (submitted -> reviewed/revised).
     */
    public function review(User $user, VisitReport $visitReport): bool
    {
        return $user->hasPermissionTo('review-visit-report')
            && $visitReport->status === VisitReport::STATUS_SUBMITTED;
    }

    public function dataVisitReport(User $user): bool
    {
        return $user->hasPermissionTo('data-visit-report');
    }
}
