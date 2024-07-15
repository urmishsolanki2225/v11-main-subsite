<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

use App\Actions\AllowedMembershipCollections;
//Added by Cyblance for Subsite section start
use App\Actions\FetchSubsite;
//Added by Cyblance for Subsite section end

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = "app";

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        // \Illuminate\Support\Facades\Log::debug(parent::share($request));
        return array_merge(parent::share($request), [
            "flash" => [
                "info" => fn() => $request->session()->get("info"),
            ],
            "can" => $request->user()
                ? [
                    "items" => [
                        "create" => $request
                            ->user()
                            ->can("create", Item::class),
                        "deleteMany" => $request
                            ->user()
                            ->can("deleteMany", Item::class),
                        "restoreMany" => $request
                            ->user()
                            ->can("restoreMany", Item::class),
                        "forceDeleteMany" => $request
                            ->user()
                            ->can("forceDeleteMany", Item::class),
                        //Added by Cyblance for Subsite section start
                        "subsiteAdminAccess" => $request
                            ->user()
                            ->can("subsiteAdminAccess", Item::class),
                        //Added by Cyblance for Subsite section end
                    ],
                    "users" => [
                        "create" => $request
                            ->user()
                            ->can("create", User::class),
                        "deleteMany" => $request
                            ->user()
                            ->can("deleteMany", User::class),
                        "restoreMany" => $request
                            ->user()
                            ->can("restoreMany", User::class),
                        "forceDeleteMany" => $request
                            ->user()
                            ->can("forceDeleteMany", User::class),
                    ],
                    "collections" => [
                        "create" => $request
                            ->user()
                            ->can("create", Collection::class),
                        "createLimited" => $request
                            ->user()
                            ->can("createLimited", Collection::class),
                        "deleteMany" => $request
                            ->user()
                            ->can("deleteMany", Collection::class),
                        "restoreMany" => $request
                            ->user()
                            ->can("restoreMany", Collection::class),
                        "forceDeleteMany" => $request
                            ->user()
                            ->can("forceDeleteMany", Collection::class),
                        //Added by Cyblance for Subsite section start
                        "view" => $request
                            ->user()
                            ->can('view', Collection::class),
                        "subsiteAdminAccess" => $request
                            ->user()
                            ->can("subsiteAdminAccess", Collection::class),
                        //Added by Cyblance for Subsite section end
                    ],
                    //Added by Cyblance for Annual-Reports section start
                    "annualreports" => [
                        "create" => $request
                            ->user()
                            ->can("create", Annualreport::class),
                        "deleteMany" => $request
                            ->user()
                            ->can("deleteMany", Annualreport::class),
                        "restoreMany" => $request
                            ->user()
                            ->can("restoreMany", Annualreport::class),
                        "forceDeleteMany" => $request
                            ->user()
                            ->can("forceDeleteMany", Annualreport::class),
                        "view" => $request
                            ->user()
                            ->can('view', Annualreport::class),
                    ],
                    //Added by Cyblance for Annual-Reports section start
                    //Added by Cyblance for Subsite section start
                    "subsiteadmin" => [
                        "create" => $request
                            ->user()
                            ->can('create', Subsite::class),
                        "canShareAccess" => $request
                            ->user()
                            ->can('canShareAccess', Subsite::class)
                    ],
                    //Added by Cyblance for Subsite section end
                ]
                : [],
            "user" => $request->user(),
            "allow" => fn() => $request->user()
                ? [
                    "membership" => AllowedMembershipCollections::execute(
                        $request
                    ),
                ]
                : [],
            //Added by Cyblance for Subsite section start
            "subsite" => FetchSubsite::execute($request),
            //Added by Cyblance for Subsite section end
            "session_lifetime" => config("session.lifetime") * 1,
        ]);
    }
}
