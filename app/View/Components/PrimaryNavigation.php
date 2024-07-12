<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\Http\Request;

use Spatie\Menu\Laravel\Menu;
use Spatie\Menu\Laravel\Link;

use App\Models\Collection;

class PrimaryNavigation extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        $priorities = Collection::with([
            "content",
            "subCollections",
            "subCollections.content",
        ])->firstWhere("id", config("eiie.collection.priorities"));
        if ($priorities) {
            $priorities = $priorities->subCollections;
        } else {
            $priorities = [];
        }

        $campaignsColl = Collection::with([
            "content",
            "subCollections",
            "subCollections.content",
        ])->firstWhere("id", config("eiie.collection.campaigns"));
        $campaigns = isset($campaignsColl->subCollections[0])
            ? $campaignsColl->subCollections->take(4)
            : [];

        $spotlight = Collection::with([
            "content",
            "subCollections",
            "subCollections.content",
        ])->firstWhere("id", config("eiie.collection.spotlight"));
        if ($spotlight) {
            $spotlight = $spotlight->subCollections->take(4);
        } else {
            $spotlight = [];
        }

        /* https://docs.spatie.be/menu */
        $menu = Menu::new()
            ->addClass("nav_main")
            ->add(
                Menu::new()
                    ->prepend(
                        '<span class="nav_main_title"><span class="full">' .
                            __("eiie.About EI") .
                            '</span><span class="short">' .
                            __("eiie.About") .
                            "</span></span>"
                    )
                    ->addParentClass("nav_main_item nav_two")
                    ->addClass("nav_drop nav_two_sub")
                    ->add(
                        Menu::new()
                            ->prepend("<h2>" . __("eiie.About EI") . "</h2>")
                            ->addParentClass("nav_drop_section")
                            ->addClass("nav_drop_listing")
                            ->route("about.who-we-are", __("eiie.Who we are"))
                            ->route(
                                "about.origins-and-history",
                                __("eiie.Origins and history")
                            )
                            ->route("affiliates", __("eiie.Our Members"))
                            ->route("about.leaders", __("eiie.Our Leaders"))
                            // ->route('about.team', __('eiie.Our Team'))
                            ->route(
                                "about.jobs",
                                __("eiie.Career Opportunities")
                            )
                            ->route("regions", __("eiie.Regions and Countries"))
                            ->route("governance", __("eiie.Governance"))
                            ->route(
                                "about.global-unions",
                                __("eiie.Global Unions")
                            )
                            ->add(
                                Link::toRoute(
                                    "contact.newsletter",
                                    __("eiie.Subscribe to Our Newsletters")
                                )->addParentClass("nav_newsletter")
                            )
                            ->route("contact.ei-ie", __("eiie.Contact Us"))
                    )
            )
            ->add(
                Menu::new()
                    ->prepend(
                        '<span class="nav_main_title">' .
                            __("eiie.Our Work") .
                            "</span>"
                    )
                    ->addParentClass("nav_main_item nav_one")
                    ->addClass("nav_drop nav_one_sub")
                    ->add(
                        Menu::new()
                            ->prepend("<h2>" . __("eiie.Latest") . "</h2>")
                            ->addParentClass("nav_drop_section")
                            ->addClass("nav_drop_listing")
                            ->route("news", __("eiie.News"))
                            ->add(
                                Link::toRoute(
                                    "opinion",
                                    __("eiie.Worlds of Education")
                                )->addParentClass("nav_worlds-of-education")
                            )
                            ->route("statements", __("eiie.Statements"))
                            ->route("take-action", __("eiie.Take action!"))
                    )
                    ->add(
                        Menu::new()
                            ->prepend(
                                "<h2>" . __("eiie.Our Priorities") . "</h2>"
                            )
                            ->addParentClass("nav_drop_section")
                            ->addClass("nav_drop_listing")
                            ->fill($priorities->all(), function (
                                $menu,
                                $workarea
                            ) {
                                if (isset($workarea->content)) {
                                    $menu->route(
                                        "workarea",
                                        $workarea->content->title,
                                        [
                                            "id" => $workarea->id,
                                            "slug" => $workarea->content->slug,
                                        ]
                                    );
                                }
                            })
                    )
                    // ->add(Link::toRoute('spotlight', __('eiie.Spotlight')))
                    ->add(
                        Menu::new()
                            ->prepend("<h2>" . __("eiie.Spotlight") . "</h2>")
                            ->addParentClass("nav_drop_section")
                            ->addClass("nav_drop_listing")
                            ->fill($spotlight->all(), function (
                                $menu,
                                $dossier
                            ) {
                                if (isset($dossier->content)) {
                                    $menu->route(
                                        "dossier",
                                        $dossier->content->title,
                                        [
                                            "id" => $dossier->id,
                                            "slug" => $dossier->content->slug,
                                        ]
                                    );
                                }
                            })
                            ->add(
                                Link::toRoute(
                                    "spotlight",
                                    __("eiie.Show all")
                                )->addParentClass("nav_drop_listing_footer")
                            )
                    )
            )
            ->addIf(
                !!$campaignsColl,
                Menu::new()
                    ->prepend(
                        '<span class="nav_main_title">' .
                            __("eiie.Campaigns") .
                            "</span>"
                    )
                    ->addParentClass("nav_main_item nav_three")
                    ->addClass("nav_drop nav_three_sub")
                    ->add(
                        Menu::new()
                            ->prepend("<h2>" . __("eiie.Campaigns") . "</h2>")
                            ->addParentClass("nav_drop_section")
                            ->addClass("nav_drop_listing")
                            ->fill($campaigns->all(), function (
                                $menu,
                                $campaign
                            ) {
                                if (isset($campaign->content)) {
                                    $menu->route(
                                        "dossier",
                                        $campaign->content->title,
                                        [
                                            "id" => $campaign->id,
                                            "slug" => $campaign->content->slug,
                                        ]
                                    );
                                }
                            })
                            ->add(
                                Link::toRoute(
                                    "campaigns",
                                    __("eiie.Show all")
                                )->addParentClass("nav_drop_listing_footer")
                            )
                    )
            )
            ->add(
                Menu::new()
                    ->prepend(
                        '<span class="nav_main_title">' .
                            __("eiie.Resources") .
                            "</span>"
                    )
                    ->addParentClass("nav_main_item nav_three")
                    ->addClass("nav_drop nav_three_sub")
                    ->add(
                        Menu::new()
                            ->prepend("<h2>" . __("eiie.Resources") . "</h2>")
                            ->addParentClass("nav_drop_section")
                            ->addClass("nav_drop_listing")
                            ->route("resources.research", __("eiie.Research"))
                            ->route(
                                "resources.publications",
                                __("eiie.Publications")
                            )
                            ->route(
                                "resources.policy-briefs",
                                __("eiie.Policy briefs")
                            )
                            ->route(
                                "resources.world-congress-resolutions",
                                __("eiie.World Congress resolutions")
                            )
                            // ->route('resources.podcasts',
                            // 		__('eiie.Podcasts'))
                            ->route("resources.videos", __("eiie.Videos"))
                            ->route("authors", __("eiie.Authors"))
                            ->route(
                                "coop_projects.overview",
                                __("eiie.Cooperation Projects")
                            )
                    )
            )

            ->setActiveFromRequest();

        return $menu;
    }
}
