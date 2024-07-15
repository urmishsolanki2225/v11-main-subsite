<?php

namespace App\Policies;

use App\Models\Subsite;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SubsitePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        //
    }

    public function view(User $user, Subsite $subsite)
    {
        return $user->role == 'admin';
    }

    public function create(User $user)
    {
        return $user->role == 'admin';
    }

    public function update(User $user, Subsite $subsite)
    {
        return $user->role == 'admin';
    }

    public function delete(User $user, Subsite $subsite)
    {
        return $user->role == 'admin';
    }

    public function restore(User $user, Subsite $subsite)
    {
        return $user->role == 'admin';
    }

    public function canShareAccess(User $user)
    {
        // return true;
        return $user->role != "subsiteadmin";
    }
}
