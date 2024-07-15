<?php

use App\Http\Controllers\Admin\CollectionController;
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\ResourceItemController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CoopProjectController;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;
use Laragear\ReCaptcha\Http\Middleware\Builders\ReCaptcha;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Couple of common wordpress attacks, filter them out to clean up our logs
Route::get("{any_pre}{wp_attack}{any_post}", function () {
    abort(500);
})
    ->where("wp_attack", "wp-admin|xmlrpc.php|robots.txt")
    ->where("any_pre", ".+")
    ->where("any_post", ".*");

// files
Route::get(
    "/img/original_{path}",
    fn($path) => redirect()->route("img", ["path" => $path], 301)
);

Route::get("/img/{path}", "ImageController@show")
    ->where("path", ".*")
    // ->middleware('cache.headers:public;max_age=2628000;etag')
    ->name("img");
Route::get(
    "/media_gallery/{path}",
    fn($path) => redirect()->route(
        "img",
        ["path" => str_replace("original_", "", $path)],
        301
    )
);
Route::get("/file/{file}/{name?}", "FileController@download")->name("file");

Route::redirect("/", url("/") . "/en");
Route::prefix("{locale}")
    ->where(["locale" => "[a-zA-Z]{2}"])
    ->middleware(["localized"])
    ->group(function () {
        //Added by Cyblance for Subsite section start
        $subdomain = getSubdomain();
        if ($subdomain != '' && $subdomain != '192.168') {
            // Subsite
            Route::get('/', 'SubsiteUserController@index')->name('subsite.home');
            Route::get("/who-we-are", "SubsiteUserController@aboutus")
                ->defaults("id", config("eiie.collection.about-us"))
                ->name("subsite.who-we-are");
            Route::get('/affiliates', 'SubsiteUserController@listAffiliates')->name('subsite.affiliates');
            Route::get('/governance', 'SubsiteUserController@getBylaws')
                ->defaults('id', config('eiie.collection.constitutional-documents'))
                ->name('subsite.governance');           
            Route::get('/news', 'SubsiteUserController@news_list')
                ->defaults('id', config('eiie.collection.news'))
                ->name('subsite.news');
            Route::get('/item/{id}:{slug?}', 'SubsiteUserController@item_detail')->name('subsite.item.show');
            Route::get("/worlds-of-education", "SubsiteUserController@news_list")
                ->defaults("id", config("eiie.collection.opinion"))
                ->name("subsite.opinion");
            Route::get("/opinion", fn() => redirect()->route("subsite.opinion"));
            Route::get("/statements", "SubsiteUserController@news_list")
                ->defaults("id", config("eiie.collection.statements"))
                ->name("subsite.statements");
            Route::get("/take-action", "SubsiteUserController@news_list")
                ->defaults("id", config("eiie.collection.take-action"))
                ->name("subsite.take-action");

            $campaigns = getprefix_id(config('eiie.collection.campaign'));
            Route::get('/campaigns', 'SubsiteUserController@getCampaigns')
                ->defaults('id', $campaigns)
                ->name('subsite.campaigns');

            Route::get('/dossier/{id}:{slug?}', 'SubsiteUserController@getCampaigns')
                ->name('subsite.dossier');

            Route::get('/dossier/{parent_id}:{parent_slug?}/{id}:{slug?}', 'SubsiteUserController@showSubDossier')
                ->name('subsite.dossier.sub');

             Route::get('/contact', 'SubsiteUserController@contactus')
                ->defaults("id", config("eiie.collection.contact-offices-subsite"))
                ->name('subsite.contact');
            Route::get('/newsletter', 'SubsiteUserController@getNewsletter')
                ->name('subsite.newsletter');

            Route::get('/author/{id}:{slug?}', 'SubsiteUserController@getCampaigns')
                ->name('author');
            Route::post('contact/subsite-save', 'SubsiteUserController@contactSave')
                ->middleware(ReCaptcha::score())
                ->name('subsite.contactform-save');
            Route::get('/collection/{id}:{slug?}', 'SubsiteUserController@show')->name('subsite.collection');
            Route::get('/workarea/{id}:{slug?}', 'CollectionController@show')->name('subsite.workarea');
            Route::get('/authores/{id}:{slug?}', 'CollectionController@show')->name('subsite.author');
            Route::get("/regions", "CollectionController@show")
                ->defaults("id", config("eiie.collection.regions-group"))
                ->name("subsite.region");
            Route::get('/search', 'SubsiteUserController@showSearch')
                ->name('subsite.search');

            Route::get("/region/{id}:{slug?}", "SubsiteUserController@show")->name("subsite.region");
            Route::get(
                "/country/{id}:{slug?}",
                "SubsiteUserController@showCountry"
            )->name("subsite.country");
            Route::get(
                "/country/{id}:{slug?}/details/{slotId}:{slotSlug?}",
                "SubsiteUserController@showCountrySlot"
            )->name("subsite.country.slot");
            Route::get(
                "/country/{id}:{slug?}/articles",
                "SubsiteUserController@listCountryArticles"
            )->name("subsite.country.articles");

            Route::get('/data-protection-policy', 'SubsiteUserController@showByOldIdNews')
                ->defaults('id', 15833)
                ->name('subsite.data-protection-policy');
            Route::get("/legal-notice", "SubsiteUserController@showByOldIdNews")
                ->defaults("id", 4380)
                ->name("subsite.legal-notice");

            Route::prefix("resources")
            ->name("subsite.")
            ->group(function () {
                // Coop Projects Routes
                Route::prefix("coop_projects")
                    ->name("resources.coop_projects.")
                    ->group(function () {
                        Route::get("", [CoopProjectController::class, "overview"])
                            ->name("overview");
                        Route::get("list", [CoopProjectController::class, "index"])
                            ->name("index");
                        Route::get("submission", [CoopProjectController::class, "create"])
                            ->name("create");
                        Route::post("submit", [CoopProjectController::class, "store"])
                            ->name("store");
                        Route::get("thanks", [CoopProjectController::class, "thanks"])
                            ->name("thanks");
                        Route::get("{id}/{slug?}", [ItemController::class, "show"])
                            ->name("show");
                    });

                // Other Resource Routes
                Route::get("world-congress-resolutions", "SubsiteUserController@show")
                    ->defaults("id", config("eiie.collection.congress-resolutions"))
                    ->name("resources.world-congress-resolutions");

                Route::get("videos", "SubsiteUserController@listResources")
                    ->defaults("subtype", "video")
                    ->name("resources.videos");

                Route::get("publications", "SubsiteUserController@listPublications")
                    ->defaults('id', config('eiie.collection.publications'))
                    ->name('resources.publications');

                Route::get("research", "SubsiteUserController@listPublications")
                    ->defaults("id", config("eiie.collection.research"))
                    ->name("resources.research");
            });


        } else {
                //Added by Cyblance for Subsite section end
                /* Generic routes */
                Route::get("/item/{id}:{slug?}", "ItemController@show")->name(
                    "item.show"
                );

                Route::get(
                    "/collection/{id}:{slug?}",
                    "CollectionController@show"
                )->name("collection");

                Route::get(
                    "/country/{id}:{slug?}",
                    "CollectionController@showCountry"
                )->name("country");
                Route::get(
                    "/country/{id}:{slug?}/details/{slotId}:{slotSlug?}",
                    "CollectionController@showCountrySlot"
                )->name("country.slot");
                Route::get(
                    "/country/{id}:{slug?}/articles",
                    "CollectionController@listCountryArticles"
                )->name("country.articles");
                Route::get(
                    "/country/{id}:{slug?}/development-cooperation-projects",
                    "CollectionController@listCountryDCProjects"
                )->name("country.dcprojects");

                Route::get("/region/{id}:{slug?}", "CollectionController@show")->name(
                    "region"
                );

                Route::get("/author/{id}:{slug?}", "CollectionController@show")->name(
                    "author"
                );
                Route::get("/authors", "CollectionController@listAuthors")->name(
                    "authors"
                );

                Route::get("/dossier/{id}:{slug?}", "CollectionController@show")->name(
                    "dossier"
                );
                Route::get(
                    "/dossier/{parent_id}:{parent_slug?}/{id}:{slug?}",
                    "CollectionController@showSub"
                )->name("dossier.sub");
                Route::get("/spotlight", "CollectionController@show")
                    ->defaults("id", config("eiie.collection.spotlight"))
                    ->name("spotlight");
                Route::get("/campaigns", "CollectionController@show")
                    ->defaults("id", config("eiie.collection.campaigns"))
                    ->name("campaigns");

                Route::get("/workarea/{id}:{slug?}", "CollectionController@show")->name(
                    "workarea"
                );

                /* STATIC routes */
                Route::get("/", "HomeController@show")->name("home");
                Route::get("/news", "CollectionController@show")
                    ->defaults("id", config("eiie.collection.news"))
                    ->name("news");
                Route::get("/regions", "CollectionController@show")
                    ->defaults("id", config("eiie.collection.regions-group"))
                    ->name("regions");
                Route::get("/priorities", "CollectionController@show")
                    ->defaults("id", config("eiie.collection.priorities"))
                    ->name("priorities");
                Route::get("/affiliates", "ItemController@listAffiliates")->name(
                    "affiliates"
                );

                /* API outputs, for exporting content elsewhere */
                Route::get("/api/affiliates", "ApiController@listAffiliates")->name(
                    "api.affiliates"
                );

                Route::get("/search", "SearchController@show")->name("search");
                // Route::get('/search/{keyword}', 'SearchController@search')
                //  ->name('search-keyword');

                Route::get("/news/take-action", "CollectionController@show")
                    ->defaults("id", config("eiie.collection.take-action"))
                    ->name("take-action");
                Route::get("/worlds-of-education", "CollectionController@show")
                    ->defaults("id", config("eiie.collection.opinion"))
                    ->name("opinion");
                Route::get("/opinion", fn() => redirect()->route("opinion"));
                Route::get("/news/statements", "CollectionController@show")
                    ->defaults("id", config("eiie.collection.statements"))
                    ->name("statements");

                /* ABOUT */
                Route::prefix("about")
                    ->name("about.")
                    ->group(function () {
                        Route::get("/who-we-are", "ItemController@show")
                            ->defaults("id", config("eiie.item.who-we-are"))
                            ->name("who-we-are");
                        Route::get("/origins-and-history", "ItemController@showByOldId")
                            ->defaults(
                                "id",
                                config("eiie.old_item.origins-and-history")
                            )
                            ->name("origins-and-history");
                        Route::get("/principal-aims", "ItemController@showByOldId")
                            ->defaults("id", config("eiie.old_item.principal-aims"))
                            ->name("principal-aims");
                        Route::get("/global-unions", "ItemController@showByOldId")
                            ->defaults("id", config("eiie.old_item.global-unions"))
                            ->name("global-unions");
                        Route::get("/jobs", "CollectionController@show")
                            ->defaults("id", config("eiie.collection.jobs"))
                            ->name("jobs");
                        Route::get("/call-for-proposals", "ItemController@showByOldId")
                            ->defaults("id", 15649)
                            ->name("call-for-proposals");
                        Route::get("/our-leaders", "CollectionController@show")
                            ->defaults("id", config("eiie.collection.executive-board"))
                            ->name("leaders");
                        Route::get("/our-team", "CollectionController@show")
                            ->defaults("id", config("eiie.collection.staff"))
                            ->name("team");
                    });
                /* GOVERNANCE */
                Route::get("/governance", "CollectionController@show")
                    ->defaults("id", config("eiie.collection.governance"))
                    ->name("governance");
                Route::prefix("governance")
                    ->name("governance.")
                    ->group(function () {
                        Route::get(
                            "/constitution-and-bylaws",
                            "CollectionController@show"
                        )
                            ->defaults(
                                "id",
                                config("eiie.collection.constitutional-documents")
                            )
                            ->name("constitution-and-bylaws");
                        Route::get("/world-congress", "CollectionController@show")
                            ->defaults("id", config("eiie.collection.world-congress"))
                            ->name("world-congress");
                        Route::prefix("reports")
                            ->name("reports.")
                            ->group(function () {
                                Route::get(
                                    "",
                                    "ActivityReportController@overview"
                                )->name("activity-reports-overview");
                                Route::get(
                                    "world-congress-report-{year_from}-{year_to}",
                                    "ActivityReportController@worldCongress"
                                )->name("world-congress-report");
                                Route::prefix("annual-report-{year}")
                                    ->name("annual-report.")
                                    ->group(function () {
                                        Route::get(
                                            "",
                                            "ActivityReportController@annual"
                                        )->name("show");
                                        Route::get(
                                            "download-pdf",
                                            "ActivityReportController@downloadPDF"
                                        )->name("download-pdf");
                                        Route::get(
                                            "{id}:{slug?}",
                                            "ActivityReportController@highlight"
                                        )->name("showHighlight");
                                    });
                            });
                    });

                /* CONTACT */
                Route::prefix("contact")
                    ->name("contact.")
                    ->group(function () {
                        Route::get("/ei-ie", "ContactController@show")->name("ei-ie");
                        Route::post("/ei-ie", "ContactController@contactPost")
                            ->middleware(ReCaptcha::score())
                            ->name("form-post");
                        // Route::get('/members', 'ItemController@listAffiliates')
                        //  ->name('members');
                        Route::get("/legal-notice", "ItemController@showByOldId")
                            ->defaults("id", 4380)
                            ->name("legal-notice");
                        Route::get(
                            "/data-protection-policy",
                            "ItemController@showByOldId"
                        )
                            ->defaults("id", 15833)
                            ->name("data-protection-policy");
                        Route::get("/newsletter", "NewsletterController@show")->name(
                            "newsletter"
                        );
                        Route::post(
                            "/newsletter",
                            "NewsletterController@subscribe"
                        )->name("newsletter-subscribe");
                        Route::get(
                            "/newsletter/thanks",
                            fn() => view("newsletter.thankyou", [
                                "newsletters_item" => \App\Models\Item::find(
                                    config("eiie.item.newsletters")
                                ),
                                "status" => __("eiie.Thank you for subscribing"),
                                "status_code" => 200,
                            ])
                        );
                    });

                Route::prefix("resources")
                    ->name("resources.")
                    ->group(function () {
                        Route::get(
                            "/world-congress-resolutions",
                            "CollectionController@show"
                        )
                            ->defaults(
                                "id",
                                config("eiie.collection.congress-resolutions")
                            )
                            ->name("world-congress-resolutions");
                        Route::get(
                            "/publications-and-research",
                            "CollectionController@show"
                        )
                            ->defaults(
                                "id",
                                config("eiie.collection.publications-and-research")
                            )
                            ->name("publications-and-research");
                        Route::get("/research", "CollectionController@show")
                            ->defaults("id", config("eiie.collection.research"))
                            ->name("research");
                        Route::get("/publications", "CollectionController@show")
                            ->defaults("id", config("eiie.collection.publications"))
                            ->name("publications");
                        Route::get("/policy-briefs", "CollectionController@show")
                            ->defaults("id", config("eiie.collection.policy-briefs"))
                            ->name("policy-briefs");
                        Route::get("/videos", "ItemController@listResources")
                            ->defaults("subtype", "video")
                            ->name("videos");
                        Route::get("/podcasts", "SoundCloudController@show")->name(
                            "podcasts"
                        );
                        Route::get(
                            "/development-cooperation-projects",
                            "ItemController@listDCProjects"
                        )->name("dcprojects");
                    });

                // Old site redirects
                Route::get(
                    "/child_dossier",
                    fn() => redirect()->route("spotlight", [], 301)
                );
                Route::get(
                    "/contactus",
                    fn() => redirect()->route("contact.ei-ie", [], 301)
                );
                Route::get(
                    "/country_profile_list",
                    fn() => redirect()->route("regions", [], 301)
                );
                Route::get(
                    "/country-profile-page/{id?}/{section_id?}/{title?}",
                    "RedirectController@country_profile"
                );
                Route::get(
                    "/country-profile",
                    fn() => redirect()->route("regions", [], 301)
                );
                Route::get(
                    "/dco_project/{country_id?}/{post_id?}/{title?}",
                    fn() => redirect()->route("dcprojects")
                );
                Route::get("/dco", fn() => redirect()->route("dcprojects"));
                Route::get(
                    "/dco/{country_id?}",
                    fn() => redirect()->route("dcprojects")
                );
                Route::get(
                    "/detail_eb/{id}/{slug?}",
                    "RedirectController@detail_executive_board"
                );
                Route::get(
                    "/detail_page/{id}/{slug?}",
                    "RedirectController@detail_page"
                );
                Route::get(
                    "/detail_staff/{id?}/{title?}",
                    fn() => redirect()->route("about.team", [], 301)
                );
                Route::get("/detail/{id}/{slug?}", "RedirectController@detail");
                Route::get(
                    "/documents",
                    fn() => redirect()->route(
                        "resources.publications-and-research",
                        [],
                        301
                    )
                );
                Route::get("/dossier", fn() => redirect()->route("spotlight", [], 301));
                Route::get(
                    "/dossierdetail/{id}/{slug?}",
                    "RedirectController@dossierdetail"
                );
                Route::get(
                    "/eiie-organizations",
                    fn() => redirect()->route("affiliates")
                );
                Route::get(
                    "/executive_board",
                    fn() => redirect()->route("about.leaders", [], 301)
                );
                Route::get("/issues_actions", fn() => redirect()->route("take-action"));
                Route::get(
                    "/media_detail/{id?}/{slug?}",
                    "RedirectController@detail_media"
                );
                Route::get(
                    "/media-list",
                    fn() => redirect()->route("resources.videos", [], 301)
                );
                Route::get(
                    "/medias",
                    fn() => redirect()->route("resources.videos", [], 301)
                );
                Route::get("/members", fn() => redirect()->route("affiliates"));
                Route::get(
                    "/podcasts",
                    fn() => redirect()->route("resources.podcasts", [], 301)
                );
                Route::get(
                    "/reseach_feed/{pageNo?}/{position?}",
                    fn() => redirect()->route(
                        "resources.publications-and-research",
                        [],
                        301
                    )
                );
                Route::get(
                    "/resolutions/constitution",
                    fn() => redirect()->route("governance.constitution-and-bylaws", 301)
                );
                Route::get(
                    "/resolutions/resolutions",
                    fn() => redirect()->route(
                        "resources.world-congress-resolutions",
                        301
                    )
                );
                Route::get(
                    "/resolutions/statements",
                    fn() => redirect()->route(
                        "collection",
                        [
                            "id" => config("eiie.collection.general-ei-declaration"),
                            "slug" => "-",
                        ],
                        301
                    )
                );
                Route::get("/searchitem", fn() => redirect()->route("search", [], 301));
                Route::get(
                    "/sound_cloud",
                    fn() => redirect()->route("resources.podcasts", [], 301)
                );
                Route::get(
                    "/soundcloud-tracks",
                    fn() => redirect()->route("resources.podcasts", [], 301)
                );
                Route::get(
                    "/staff_profiles",
                    fn() => redirect()->route("about.team", [], 301)
                );
                Route::get("/woe_homepage", fn() => redirect()->route("home", [], 301));
                Route::get(
                    "/woe_homepage/blog_article_list",
                    fn() => redirect()->route("opinion", [], 301)
                );
                Route::get(
                    "/woe_homepage/contact_us",
                    fn() => redirect()->route("contact.ei-ie", [], 301)
                );
                Route::get(
                    "/woe_homepage/contactus",
                    fn() => redirect()->route("contact.ei-ie", [], 301)
                );
                Route::get(
                    "/woe_homepage/detail_page/{id}/{slug?}",
                    "RedirectController@detail_page"
                );
                Route::get(
                    "/woe_homepage/woe_detail_page/{id}/{slug?}",
                    "RedirectController@detail_page"
                );
                Route::get(
                    "/woe_homepage/publications/{type?}",
                    fn() => redirect()->route(
                        "resources.publications-and-research",
                        [],
                        301
                    )
                );
                Route::get(
                    "/woe_homepage/resource_links",
                    fn() => redirect()->route(
                        "resources.publications-and-research",
                        [],
                        301
                    )
                );
                Route::get(
                    "/woe_homepage/resource_page",
                    fn() => redirect()->route(
                        "resources.publications-and-research",
                        [],
                        301
                    )
                );
                Route::get(
                    "/woe_homepage/video_detail/{id?}/{title?}",
                    fn() => redirect()->route("resources.videos", [], 301)
                );
                Route::get(
                    "/woe_homepage/videos",
                    fn() => redirect()->route("resources.videos", [], 301)
                );
                Route::get(
                    "/woe_homepage/detail/{id}/{slug?}",
                    "RedirectController@detail"
                );
                Route::get(
                    "/woe_homepage/woe_detail/{id}/{slug?}",
                    "RedirectController@detail"
                );

                // DEVELOPMENT COOPERATION PROJECTS
                Route::name("coop_projects.")
                    ->prefix("coop_projects")
                    ->group(function () {
                        Route::name("overview")->get("", [
                            CoopProjectController::class,
                            "overview",
                        ]);
                        Route::name("index")->get("list", [
                            CoopProjectController::class,
                            "index",
                        ]);
                        Route::name("create")->get("submission", [
                            CoopProjectController::class,
                            "create",
                        ]);
                        Route::name("store")->post("submit", [
                            CoopProjectController::class,
                            "store",
                        ]);
                        Route::name("thanks")->get("thanks", [
                            CoopProjectController::class,
                            "thanks",
                        ]);
                        Route::name("show")->get("{id}/{slug?}", [
                            ItemController::class,
                            "show",
                        ]);
                    });

                // End locale grouping
        }
    });
Route::get("/api/affiliates/search", "ApiController@searchAffiliates")->name(
    "api.affiliates.search"
);
Route::get("/api/dcpartners/search", "ApiController@searchDCPartners")->name(
    "api.dcpartners.search"
);
Route::get("/api/countries/search", "ApiController@searchCountries")->name(
    "api.countries.search"
);
Route::get("/api/regions/search", "ApiController@searchRegions")->name(
    "api.regions.search"
);
Route::get("/api/content/search", "ApiController@searchContent")->name(
    "api.content.search"
);
Route::get(
    "/api/map/items_count",
    "MapController@indexCollectionItemsCount"
)->name("api.map.items_count");

//azure login route & callback added by Cyblance
Route::get("/login/azure", "\App\Http\Middleware\AppAzure@azure")->name(
    "azure"
);
Route::get(
    "/login/azurecallback",
    "\App\Http\Middleware\AppAzure@azurecallback"
);

Route::get("login", "Admin\LoginController@login")->name("login");
Route::post("login", "Admin\LoginController@authenticate")->name(
    "login.submit"
);
Route::post("logout", "Admin\LoginController@logout")->name("logout");
Route::get(
    "login/forgot-password",
    "Admin\LoginController@passwordForgot"
)->name("password.request");
Route::post(
    "login/forgot-password",
    "Admin\LoginController@passwordRequest"
)->name("password.email");
Route::get(
    "login/reset-password/{token}",
    "Admin\LoginController@passwordReset"
)->name("password.reset");
Route::post(
    "login/reset-password",
    "Admin\LoginController@passwordUpdate"
)->name("password.update");

//Added by Cyblance for Subsite section start
if (isset($_SERVER['HTTP_HOST'])) {
    $subdomain = getSubdomain();
    if ($subdomain == '' || $subdomain == '192.168') {
         //Added by Cyblance for Subsite section end
        Route::prefix("admin")
            ->name("admin.")
            ->middleware(["auth"])
            ->group(function () {
                Route::get("/", "Admin\DashboardController@home")->name("dashboard");

                /** Items */
                Route::delete(
                    "items/multiple",
                    "Admin\ItemController@destroyMultiple"
                )->name("items.multiple.destroy");
                Route::post(
                    "items/multiple/trash",
                    "Admin\ItemController@trashMultiple"
                )->name("items.multiple.trash");
                Route::post(
                    "items/multiple/restore",
                    "Admin\ItemController@restoreMultiple"
                )->name("items.multiple.restore");

                Route::post("items/{id}/trash", "Admin\ItemController@trash")->name(
                    "items.trash"
                );
                Route::post("items/{id}/restore", "Admin\ItemController@restore")->name(
                    "items.restore"
                );

                Route::resource("items", AdminItemController::class);
                Route::resource("resourceitems", ResourceItemController::class);

                /** Collections */
                Route::delete(
                    "collections/multiple",
                    "Admin\CollectionController@destroyMultiple"
                )->name("collections.multiple.destroy");
                Route::post(
                    "collections/multiple/trash",
                    "Admin\CollectionController@trashMultiple"
                )->name("collections.multiple.trash");
                Route::post(
                    "collections/multiple/restore",
                    "Admin\CollectionController@restoreMultiple"
                )->name("collections.multiple.restore");

                Route::post(
                    "collections/{id}/trash",
                    "Admin\CollectionController@trash"
                )->name("collections.trash");
                Route::post(
                    "collections/{id}/restore",
                    "Admin\CollectionController@restore"
                )->name("collections.restore");
                Route::resource("collections", CollectionController::class);

                /** Users */
                Route::delete(
                    "users/multiple",
                    "Admin\UserController@destroyMultiple"
                )->name("users.multiple.destroy");
                Route::post(
                    "users/multiple/trash",
                    "Admin\UserController@trashMultiple"
                )->name("users.multiple.trash");
                Route::post(
                    "users/multiple/restore",
                    "Admin\UserController@restoreMultiple"
                )->name("users.multiple.restore");

                Route::post("users/{id}/trash", "Admin\UserController@trash")->name(
                    "users.trash"
                );
                Route::post("users/{id}/restore", "Admin\UserController@restore")->name(
                    "users.restore"
                );
                Route::resource("users", UserController::class);

                Route::post(
                    "users/{user}/resetPassword",
                    "Admin\UserController@resetPassword"
                )->name("users.resetPassword");

                Route::post(
                    "users/{user}/resetPassword",
                    "Admin\UserController@resetPassword"
                )->name("users.resetPassword");

                /* Collections ordering and import/count */
                Route::post(
                    "collections/{id}/items/ordering",
                    "Admin\CollectionController@itemsOrdering"
                )->name("collection.items.ordering");
                Route::post(
                    "collections/{id}/items/import",
                    "Admin\CollectionController@itemsImport"
                )->name("collection.items.import");
                Route::get(
                    "collections/{ids}/items/count",
                    "Admin\CollectionController@itemsCount"
                )->name("collections.items.count");

                Route::prefix("share")
                    ->name("share.")
                    ->group(function () {
                        Route::get("status", "Admin\ShareController@status")->name(
                            "status"
                        );
                        Route::post("share", "Admin\ShareController@share")->name(
                            "share"
                        );

                        Route::prefix("authorize")
                            ->name("authorize.")
                            ->group(function () {
                                Route::get(
                                    "twitter",
                                    "Admin\ShareController@twitterAuthorize"
                                )->name("twitter");
                                Route::get(
                                    "twitter/callback",
                                    "Admin\ShareController@twitterCallback"
                                )->name("twitter.callback");
                                Route::get(
                                    "linkedin",
                                    "Admin\ShareController@linkedinAuthorize"
                                )->name("linkedin");
                                Route::get(
                                    "linkedin/callback",
                                    "Admin\ShareController@linkedinCallback"
                                )->name("linkedin.callback");
                                Route::get(
                                    "facebook",
                                    "Admin\ShareController@facebookAuthorize"
                                )->name("facebook");
                                Route::get(
                                    "facebook/callback",
                                    "Admin\ShareController@facebookCallback"
                                )->name("facebook.callback");
                            });
                    });

                /* Resource items upload */
                Route::prefix("resourceitem")
                    ->name("resourceitem.")
                    ->group(function () {
                        Route::post(
                            "file/upload",
                            "Admin\ResourceItemController@uploadFile"
                        )->name("file.upload");
                        Route::post(
                            "image/replace",
                            "Admin\ResourceItemController@replaceImage"
                        )->name("image.replace");
                    });

                Route::prefix("geodata")
                    ->name("geodata.")
                    ->group(function () {
                        Route::get(
                            "import",
                            "Admin\GeoDataController@prepareImport"
                        )->name("import.create");
                        Route::post("import", "Admin\GeoDataController@import")->name(
                            "import.store"
                        );
                        Route::get(
                            "datasets",
                            "Admin\GeoDataController@indexSets"
                        )->name("dataset.index");
                        Route::delete(
                            "dataset/{id}",
                            "Admin\GeoDataController@destroyImport"
                        )->name("dataset.destroy");

                        Route::prefix("map")
                            ->name("map.")
                            ->group(function () {
                                Route::get("", "Admin\GeoDataController@index")->name(
                                    "index"
                                );
                                Route::get(
                                    "create",
                                    "Admin\GeoDataController@create"
                                )->name("create");
                                Route::post("", "Admin\GeoDataController@store")->name(
                                    "store"
                                );
                                Route::get(
                                    "{map}",
                                    "Admin\GeoDataController@edit"
                                )->name("edit");
                                Route::put(
                                    "{map}",
                                    "Admin\GeoDataController@update"
                                )->name("update");
                                Route::delete(
                                    "{map}",
                                    "Admin\GeoDataController@destroy"
                                )->name("destroy");
                            });
                    });

                Route::get(
                    "worldcongress_reports",
                    "Admin\WorldCongressReportController@index"
                )->name("worldcongress_reports.index");

                Route::post(
                    "annualreport/hideItem/{id}",
                    "Admin\ReportController@hideItem"
                )->name("annualreport.hideItem");
                Route::match(
                    ["get", "post"],
                    "annualreport/publishedreport",
                    "Admin\ReportController@publishedreport"
                )->name("annualreport.publishedreport");
                Route::match(
                    ["get", "post"],
                    "updateOrder",
                    "Admin\ReportController@updateOrder"
                )->name("updateOrder");
                Route::delete(
                    "annualreport/{id}/destroy/{code}",
                    "Admin\ReportController@destroy"
                )->name("annualreport.destroyreport");
                Route::post(
                    "annualreport/{id}/trash",
                    "Admin\ReportController@trash"
                )->name("annualreport.trash");
                Route::post(
                    "annualreport/{id}/restore",
                    "Admin\ReportController@restore"
                )->name("annualreport.restore");
                Route::match(["get", "post"], "annualreports/{id}", [
                    ReportController::class,
                    "index",
                ])->name("annualreports.tabbing");
                Route::post(
                    "annualreport/videos",
                    "Admin\ReportController@savevideos"
                )->name("annualreport.videos");
                Route::post(
                    "annualreport/removevideos",
                    "Admin\ReportController@removevideos"
                )->name("annualreport.removevideos");
                Route::resource("annualreport", ReportController::class);
                Route::post(
                    "annualreport/generatePDF",
                    "Admin\ReportController@generatePDF"
                )->name("annualreport.generatePDF");
                Route::post(
                    "annualreport/printreport",
                    "Admin\ReportController@printreport"
                )->name("annualreport.printreport");

                //Added by Cyblance for Subsite section start
                Route::resource('subsites', Admin\SubsiteController::class);
                Route::post('subsiteDelete/{id?}', 'Admin\SubsiteController@subsiteDelete')->name('subsiteDelete');
                Route::match (['get', 'post'], 'subsite-items', 'Admin\SubsiteController@getall_items_model')->name("getallitemsmodel");
                Route::post("items/addmainsite", "Admin\SubsiteController@add_mainsite")->name("items.addmainsite");
                Route::match (['get', 'post'], '/fetch-subsite-user/{ids}', 'Admin\SubsiteController@get_subsite')->name('fetch.subsiteuser');
                Route::delete("contact-inquiry/multiple", "Admin\SubsiteController@destroyMultipleInquiry")->name("contactus.inquiry.destroy");
                Route::post("contact-inquiry/multiple/trash", "Admin\SubsiteController@trashMultipleInquiry")->name("contactus.inquiry.trash");
                Route::post("contact-inquiry/multiple/restore", "Admin\SubsiteController@restoreMultipleInquiry")->name("contactus.inquiry.restore");
                Route::match (['get', 'post'], 'subsite-lang', 'Admin\SubsiteController@getall_lang')->name("subsite.language");
                Route::post("items/removedpublication", "Admin\SubsiteController@removed_publication")->name("items.removedpublication");
                //Added by Cyblance for Subsite section end
            });            
    //Added by Cyblance for Subsite section start
    }
}
//Added by Cyblance for Subsite section end

Route::get("/clear-cache", function () {
    Artisan::call("cache:clear");
    Artisan::call("config:clear");
    Artisan::call("view:clear");
    Artisan::call("config:cache");
    // return what you want
    echo "Cache succussfully cleared.";
});

Route::get("/pdf-queue-jobs", function () {
    Artisan::call("queue:work");
});
