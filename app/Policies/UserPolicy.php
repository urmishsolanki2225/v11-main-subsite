<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
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
        return $user->role == "admin";
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function view(User $user, User $model)
    {
        return $user->role == "admin" || $user->id == $model->id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role == "admin";
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function update(User $user, User $model)
    {
        return $user->role == "admin" || $user->id == $model->id;
    }

    public function updateRole(User $user, User $model)
    {
        // you can not change your own role
        return $user->role == "admin" && $user->id != $model->id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function delete(User $user, User $model)
    {
        return $user->role == "admin" && $user->id != $model->id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function restore(User $user, User $model)
    {
        return $user->role == "admin";
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function forceDelete(User $user, User $model)
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

    // Subsite section start
    public function updateSubsite(User $user, User $model)
    {
        return $user->role == "admin" && $user->id != $model->id;
    }
    // Subsite section end
}
