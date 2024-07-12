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
    public function view(User $user, Collection $collection)
    {
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
        // Subsite section start
        return $user->role == "admin" ||
            $user->role == "subsiteadmin" ||
            $type == "author";
        // Subsite section end
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
        // Subsite section start
        return $user->role == "admin" ||
            $user->role == "editor" ||
            ($user->role == "subsiteadmin" &&
                in_array($collection->is_site, [2, 3]));
        // Subsite section end
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
        // Subsite section start
        return $user->role == "admin" ||
            ($user->role == "subsiteadmin" &&
                in_array($collection->is_site, [2, 3]));
        // Subsite section end
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
        // Subsite section start
        return $user->role == "admin" ||
            ($user->role == "subsiteadmin" &&
                in_array($collection->is_site, [2, 3]));
        // Subsite section end
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
        // Subsite section start
        return $user->role == "admin" ||
            ($user->role == "subsiteadmin" &&
                in_array($collection->is_site, [2, 3]));
        // Subsite section end
    }
    // Subsite section start
    public function deleteMany(User $user)
    {
        return $user->role == "admin" || $user->role == "subsiteadmin";
    }

    public function restoreMany(User $user)
    {
        return $user->role == "admin" || $user->role == "subsiteadmin";
    }

    public function forceDeleteMany(User $user)
    {
        return $user->role == "admin" || $user->role == "subsiteadmin";
    }
    // Subsite section end
}
