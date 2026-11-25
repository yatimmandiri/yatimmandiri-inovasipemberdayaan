<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Auth;

abstract class Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Determine whether the authenticated user only has the Fasilitator role.
     */
    protected function isFasilitatorOnly(): bool
    {
        $user = Auth::user();

        return $user !== null
            && $user->hasRole('Fasilitator')
            && ! $user->hasRole(['Administrators', 'Editors']);
    }

    /**
     * Get the fasilitator ID associated with the current user session.
     */
    protected function currentFasilitatorId(): ?int
    {
        return $this->isFasilitatorOnly() ? Auth::user()?->fasilitator?->id : null;
    }

    /**
     * Abort with 403 if a Fasilitator-only user attempts to access another fasilitator's record.
     */
    protected function authorizeFasilitatorOwnership(?int $fasilitatorId): void
    {
        if (! $this->isFasilitatorOnly()) {
            return;
        }

        $currentId = $this->currentFasilitatorId();

        if ($currentId === null || (int) $fasilitatorId !== $currentId) {
            abort(403, 'Anda tidak memiliki akses ke data fasilitator lain.');
        }
    }
}
