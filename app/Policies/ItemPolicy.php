<?php

namespace App\Policies;

use App\Models\Item;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ItemPolicy
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
     * @param  \App\Models\Item  $item
     * @return mixed
     */
    public function view(User $user, Item $item)
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Item  $item
     * @return mixed
     */
    public function update(User $user, Item $item)
    {
        return true;
        // return $user->role == 'admin';
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Item  $item
     * @return mixed
     */
    public function delete(User $user, Item $item)
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Item  $item
     * @return mixed
     */
    public function restore(User $user, Item $item)
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Item  $item
     * @return mixed
     */
    public function forceDelete(User $user, Item $item)
    {
        return $user->role == "admin";
    }

    public function deleteMany(User $user)
    {
        return true;
    }

    public function restoreMany(User $user)
    {
        return true;
    }

    public function forceDeleteMany(User $user)
    {
        return $user->role == "admin";
    }
}
