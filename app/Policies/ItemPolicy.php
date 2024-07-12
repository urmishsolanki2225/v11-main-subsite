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
        // Subsite section start
        return $user->role == "admin" ||
            $user->role == "editor" ||
            ($user->role == "subsiteadmin" && in_array($item->is_site, [2, 3]));
        // Subsite section end
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
        // Subsite section start
        return $user->role == "admin" ||
            $user->role == "editor" ||
            ($user->role == "subsiteadmin" && in_array($item->is_site, [2, 3]));
        // Subsite section end
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
        // Subsite section start
        return $user->role == "admin" ||
            $user->role == "editor" ||
            ($user->role == "subsiteadmin" && in_array($item->is_site, [2, 3]));
        // Subsite section end
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
        // Subsite section start
        return $user->role == "admin" || $user->role == "subsiteadmin";
        // Subsite section end
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
        // Subsite section start
        return $user->role == "admin" || $user->role == "subsiteadmin";
        // Subsite section end
    }
    // Subsite section start
    public function subsiteAdminAccess(User $user)
    {
        return $user->role == "subsiteadmin";
    }
    public function addMainsite(User $user)
    {
        return $user->role == "admin";
    }
    // for Subsite section end
}
