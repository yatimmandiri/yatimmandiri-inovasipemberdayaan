<?php

namespace App\Policies\Company;

use App\Models\Company\CashTransaction;
use App\Models\Core\User;

class CashTransactionPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view-cash-transaction');
    }

    public function view(User $user, CashTransaction $cashTransaction): bool
    {
        return $user->can('view-cash-transaction');
    }

    public function create(User $user): bool
    {
        return $user->can('create-cash-transaction');
    }

    public function update(User $user, CashTransaction $cashTransaction): bool
    {
        return $user->can('update-cash-transaction');
    }

    public function delete(User $user, CashTransaction $cashTransaction): bool
    {
        return $user->can('delete-cash-transaction');
    }

    public function getData(User $user): bool
    {
        return $user->can('data-cash-transaction');
    }
}
