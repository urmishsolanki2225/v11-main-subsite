<?php

namespace App\View\Components;
use Illuminate\View\Component;
use Illuminate\Http\Request;

use Spatie\Menu\Laravel\Menu;
use Spatie\Menu\Laravel\Link;

use App\Models\Subsite;
use App\Models\Collection;

class PrimaryNavigationSubsite extends Component
{
	public function render()
	{
		$subdomain = getSubdomain();
		$region_data = Subsite::select('region_id', 'is_active')->where('aliase_name', $subdomain)->first();

		$campaignsColl = Collection::with([
            "content",
            "subCollections" => function($query) use ($region_data) {
                $query->whereHas('parentCollections', function($q) use ($region_data) {
                    $q->where('parent_id', $region_data->region_id); // Adjusted where clause
                });
            },
            "subCollections.content",
        ])->firstWhere("id", getprefix_id(config('eiie.collection.campaign')));
        $campaigns = isset($campaignsColl->subCollections[0])
            ? $campaignsColl->subCollections->take(4)
            : [];

        $subdomain = getSubdomain();
        $label = "";
        if($subdomain=="africa"){
        	$label = __("eiie.Africa");
        }else if($subdomain=="asia-pacific"){
			$label = __("eiie.Asia–Pacific");
        }else if($subdomain=="northamerica"){
			$label = __("eiie.North America");
        }else if($subdomain=="accrs"){
			$label = __("eiie.ACCRS");
        }else if($subdomain=="latin-america"){
			$label = __("eiie.Latin America");
        }

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
                            ->prepend("<h2>" . $label . "</h2>")
                            ->addParentClass("nav_drop_section")
                            ->addClass("nav_drop_listing")
                            ->route("subsite.who-we-are", __("eiie.Who we are"))
                            ->route("subsite.affiliates", __("eiie.Our Members"))
                            ->route("subsite.governance.constitution-and-bylaws", __("eiie.Governance"))
                            ->add(
                                Link::toRoute(
                                    "subsite.newsletter",
                                    __("eiie.Subscribe to Our Newsletters")
                                )->addParentClass("nav_newsletter")
                            )
                            ->route("subsite.contact", __("eiie.Contact Us"))
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
                            ->route("subsite.news", __("eiie.News"))
                            ->add(
                                Link::toRoute(
                                    "subsite.opinion",
                                    __("eiie.Worlds of Education")
                                )->addParentClass("nav_worlds-of-education")
                            )
                            ->route("subsite.statements", __("eiie.Statements"))
                            ->route("subsite.take-action", __("eiie.Take action!"))
                    )
            )
            ->addIf(
                !!$campaigns,
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
                            ->fill(collect($campaigns)->all(), function (
                                $menu,
                                $campaign
                            ) {
                                if (isset($campaign->content)) {
                                    $menu->route(
                                        "subsite.dossier",
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
                                    "subsite.campaigns",
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
                            ->route("subsite.resources.research", __("eiie.Research"))
                            ->route(
                                "subsite.resources.publications",
                                __("eiie.Publications")
                            )
                            ->route("subsite.resources.videos", __("eiie.Videos"))
                            ->route(
                                "subsite.resources.world-congress-resolutions",
                                __("eiie.World Congress resolutions")
                            )
                            ->route(
                                "subsite.resources.coop_projects.overview",
                                __("eiie.Cooperation Projects")
                            )
                    )
            )
            ->add(
				Menu::new()
					->add(Link::to('https://www.ei-ie.org/en', __("eiie.Visit") . " www.ei-ie.org")->addClass('nav_main_title'))
					->addParentClass('nav_main_item nosubmenu')
			)
            ->setActiveFromRequest();
		return $menu;
	}
}
