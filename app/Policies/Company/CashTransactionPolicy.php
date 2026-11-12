<?php

namespace App\Policies\Company;

use App\Models\Company\CashTransaction;
use App\Models\Core\User;

class CashTransactionPolicy
{
    /**
     * NOTE: Gate::before Spatie memeriksa permission dengan nama ability.
     * Ability 'view'/'update'/'delete' tidak sama dengan nama permission apa pun,
     * sehingga selalu jatuh ke policy ini — rule kepemilikan di sini tidak bisa dilewati.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-cash-transaction');
    }

    public function view(User $user, CashTransaction $cashTransaction): bool
    {
        if ($user->hasRole('Administrators') || $user->hasRole('Editors')) {
            return $user->hasPermissionTo('view-cash-transaction');
        }

        return $cashTransaction->fasilitator_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-cash-transaction');
    }

    public function update(User $user, CashTransaction $cashTransaction): bool
    {
        if ($user->hasRole('Administrators') || $user->hasRole('Editors')) {
            return $user->hasPermissionTo('update-cash-transaction');
        }

        return $cashTransaction->fasilitator_id === $user->id;
    }

    public function delete(User $user, CashTransaction $cashTransaction): bool
    {
        if ($user->hasRole('Administrators') || $user->hasRole('Editors')) {
            return $user->hasPermissionTo('delete-cash-transaction');
        }

        return $cashTransaction->fasilitator_id === $user->id;
    }

    public function dataCashTransaction(User $user): bool
    {
        return $user->hasPermissionTo('data-cash-transaction');
    }
}
