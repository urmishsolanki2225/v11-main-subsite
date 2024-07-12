<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Password;
// Subsite section start
use App\Models\{User, Subsite};
// Subsite section end
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

// Added by Cyblance for search by id in listing start
use App\Filters\SearchUserFilter;
// Added by Cyblance for search by id in listing end

class UserController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->cannot("viewAny", User::class)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }
        $users = QueryBuilder::for(User::class)
            ->allowedFilters([
                AllowedFilter::exact("type"),
                AllowedFilter::exact("subtype"),
                // Added by Cyblance for search by id in listing start
                AllowedFilter::custom("search", new SearchUserFilter()),
                // AllowedFilter::partial("search", "name"),
                // Added by Cyblance for search by id in listing end
                AllowedFilter::exact("role"),
                AllowedFilter::trashed()->default("no"),
            ])
            ->allowedSorts([
                "id",
                "created_at",
                "updated_at",
                "name",
                "email",
                "role",
            ])
            ->defaultSort("name")
            ->withoutGlobalScopes()
            ->paginate(16);

        $result = [
            "users" => $users,
            "filter" => $request->all("filter"),
            "sort" => $request->get("sort"),
        ];
        return Inertia::render("Users/List", $result);
    }

    public function edit(Request $request, $id)
    {
        $user = User::withTrashed()->findOrFail($id);

        if ($request->user()->cannot("update", $user)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        // Subsite section start
        $subsites = Subsite::where("is_active", "active")->get();
        $get_subsite = $subsites->pluck("name", "id")->toArray();
        // Subsite section end

        $data = [
            "userModel" => $user,
            "can" => [
                "role" => [
                    "update" => $request->user()->can("updateRole", $user),
                ],
                "user" => ["delete" => $request->user()->can("delete", $user)],
                // Subsite section start
                "subsite" => [
                    "updateSubsite" => $request
                        ->user()
                        ->can("updateSubsite", $user),
                ],
                // Subsite section end
            ],
            // Subsite section start
            "roles" => [
                "editor" => "Editor",
                "admin" => "Admin",
                "subsiteadmin" => "Subsite Admin",
            ],
            "subsite_edit" => [$get_subsite],
            // Subsite section end
        ];
        $sharedCan = Inertia::getShared("can");
        if ($sharedCan) {
            $data["can"] = array_merge_recursive($sharedCan, $data["can"]);
        }

        return Inertia::render("Users/Edit", $data);
    }

    public function create(Request $request)
    {
        if ($request->user()->cannot("create", User::class)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        // Subsite section start
        $subsites = Subsite::where("is_active", "active")->get();
        $get_subsite = $subsites->pluck("name", "id")->toArray();

        return Inertia::render("Users/Create", [
            "roles" => [
                "editor" => "Editor",
                "admin" => "Admin",
                "subsiteadmin" => "Subsite Admin",
            ],
            "get_subsite" => $get_subsite,
        ]);
        // Subsite section end
    }

    public function store(Request $request)
    {
        if ($request->user()->cannot("create", User::class)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        $request->validate([
            "name" => "required",
            "role" => "required",
            "email" => ["required", "email", Rule::unique("users")],
        ]);
        // Subsite section start
        $subsite_id = (string) $request->subsite_id;
        $request->subsite_id = $subsite_id;
        $create = $request->only(["name", "email", "role", "subsite_id"]);
        // Subsite section end
        $create["password"] = Str::random(12);
        $user = User::create($create);

        return Redirect::route("admin.users.edit", $user)->with([
            "info" => "User created",
        ]);
    }

    public function update(Request $request, User $user)
    {
        if ($request->user()->cannot("update", $user)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        $request->validate([
            "name" => "string|filled",
            "role" => "string|filled",
            "email" => ["email", Rule::unique("users")->ignore($user->id)],
        ]);
        // update

        if ($request->has("name")) {
            $user->name = $request->input("name");
        }
        if ($request->has("email")) {
            $user->email = $request->input("email");
        }
        if ($request->has("role")) {
            if (
                $request->input("role") != $user->role &&
                $request->user()->cannot("updateRole", $user)
            ) {
                return Redirect::back()->withErrors([
                    "error" => "Not authorized to change role",
                ]);
            }
            $user->role = $request->input("role");
        }
        // Subsite section start
        if (
            $request->has("subsite_id") &&
            $request->input("subsite_id") != null
        ) {
            $user->subsite_id = $request->input("subsite_id");
        } else {
            $user->subsite_id = null;
        }
        // Subsite section end
        $user->save();

        return Redirect::route("admin.users.edit", $user)->with([
            "info" => "User updated",
        ]);
    }

    public function resetPassword(Request $request, User $user)
    {
        if ($request->user()->cannot("update", $user)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        $status = Password::sendResetLink(["email" => $user->email]);

        return $status === Password::RESET_LINK_SENT
            ? back()->with(["info" => __("Password reset link was emailed")])
            : back()->withErrors(["error" => __($status)]);
    }

    public function destroyMultiple(Request $request)
    {
        $this->authorize("forceDeleteMany", [User::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);

        User::withoutGlobalScopes()
            ->withTrashed()

            ->whereIn("id", $request->ids)
            ->forceDelete();

        return redirect()
            ->back()
            ->with(["info" => "Users deleted"]);
    }

    public function trashMultiple(Request $request)
    {
        $this->authorize("deleteMany", [User::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);

        User::withoutGlobalScopes()
            ->whereIn("id", $request->ids)
            ->delete();

        return redirect()
            ->back()
            ->with(["info" => "Users moved to trash"]);
    }

    public function restoreMultiple(Request $request)
    {
        $this->authorize("restoreMany", [User::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);

        User::withoutGlobalScopes()
            ->withTrashed()
            ->whereIn("id", $request->ids)
            ->restore();

        return redirect()
            ->back()
            ->with(["info" => "Users restored"]);
    }

    public function destroy($id)
    {
        $user = User::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("forceDelete", $user);
        $type = $user->type;
        $user->forceDelete();
        return redirect()
            ->route("admin.users.index", [
                "filter" => ["type" => $type],
            ])
            ->with(["info" => "User permanently deleted"]);
    }

    public function trash($id)
    {
        $user = User::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("delete", $user);
        $user->delete();
        return redirect()
            ->back()
            ->with(["info" => "User moved to trash"]);
    }

    public function restore($id)
    {
        $user = User::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("restore", $user);
        $user->restore();
        return redirect()
            ->back()
            ->with(["info" => "User restored"]);
    }
}
