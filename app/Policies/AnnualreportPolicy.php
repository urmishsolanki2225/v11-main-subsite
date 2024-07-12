<?php

namespace App\Policies;

use App\Models\Annualreport;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AnnualreportPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        //return true;
    }

    public function view(User $user)
    {
        return $user->role == "admin";
    }

    public function create(User $user)
    {
        return $user->role == "admin";
    }

    public function update(User $user, Annualreport $annualreport)
    {
        return $user->role == "admin";
        // return $user->role == 'admin';
    }

    public function delete(User $user, Annualreport $annualreport)
    {
        return $user->role == "admin";
    }

    public function restore(User $user, Annualreport $annualreport)
    {
        return $user->role == "admin";
    }

    public function forceDelete(User $user, Annualreport $annualreport)
    {
        return $user->role == "admin";
    }

    public function deleteMany(User $user)
    {
        return $user->role == "admin";
    }

    public function restoreMany(User $user)
    {
        return $user->role == "admin";
    }

    public function forceDeleteMany(User $user)
    {
        return $user->role == "admin";
    }
}
