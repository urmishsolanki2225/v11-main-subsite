<?php

namespace App\Policies;

use App\Models\Collection;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CollectionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Collection  $collection
     * @return mixed
     */
    //Added by Cyblance for Subsite section start
    public function view(User $user)
    {
        //Added by Cyblance for Subsite section end
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user, $type = "")
    {
        // only authors are allowed to be created by non-admin
        return $user->role == "admin" || $type == "author";
    }

    public function createLimited(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Collection  $collection
     * @return mixed
     */
    public function update(User $user, Collection $collection)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Collection  $collection
     * @return mixed
     */
    public function delete(User $user, Collection $collection)
    {
        return $user->role == "admin";
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Collection  $collection
     * @return mixed
     */
    public function restore(User $user, Collection $collection)
    {
        return $user->role == "admin";
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Collection  $collection
     * @return mixed
     */
    public function forceDelete(User $user, Collection $collection)
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
