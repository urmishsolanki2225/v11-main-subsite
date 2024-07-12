<?php

namespace App\View\Components;

use Illuminate\Support\Facades\App;
use Illuminate\View\Component;

class Link extends Component
{
    public $class;
    public $href;
    public $title;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        $item = null,
        $collection = null,
        $class = null,
        $parent = null,
        $title = null,
        array $query = []
    ) {
        $this->class = $class ? ' class="' . $class . '" ' : "";

        $routeName = "";
        $id = null;
        $slug = "_";
        $_title = "?";
        $parentId = null;
        $parentSlug = "-";

        if (isset($collection)) {
            $id = $collection->id;
            $slug = isset($collection->content)
                ? $collection->content->slug
                : $slug;
            $_title = isset($collection->content)
                ? $collection->content->title
                : $_title;

            $collectionRouteMap = [
                config("eiie.collection.news") => "news",
                config("eiie.collection.opinion") => "opinion",
                config("eiie.collection.statements") => "statements",
                config(
                    "eiie.collection.world-congress"
                ) => "governance.world-congress",
                config("eiie.collection.spotlight") => "spotlight",
                config("eiie.collection.campaigns") => "campaigns",
                config("eiie.collection.news") => "news",
                config("eiie.collection.regions-group") => "regions",
                config("eiie.collection.governance") => "governance",
                config("eiie.collection.priorities") => "priorities",
                config("eiie.collection.take-action") => "take-action",
                config("eiie.collection.jobs") => "about.jobs",
                config("eiie.collection.executive-board") => "about.leaders",
                config("eiie.collection.staff") => "about.team",
                config(
                    "eiie.collection.constitutional-documents"
                ) => "governance.constitution-and-bylaws",
                config(
                    "eiie.collection.world-congress"
                ) => "governance.world-congress",
                config(
                    "eiie.collection.annual-reports"
                ) => "governance.reports.activity-reports-overview",
                config(
                    "eiie.collection.congress-resolutions"
                ) => "resources.world-congress-resolutions",
                config(
                    "eiie.collection.publications-and-research"
                ) => "resources.publications-and-research",
                config(
                    "eiie.collection.policy-briefs"
                ) => "resources.policy-briefs",
                config(
                    "eiie.collection.publications"
                ) => "resources.publications",
                config("eiie.collection.research") => "resources.research",
            ];
            if (isset($collectionRouteMap[$id])) {
                $routeName = $collectionRouteMap[$id];
            }

            if ($routeName) {
                $id = null;
                $slug = null;
            } else {
                switch ($collection->type) {
                    case "country":
                    case "region":
                    case "workarea":
                    case "dossier":
                    case "author":
                        $routeName = $collection->type;
                        break;
                    case "dossier_sub":
                        $routeName = "dossier.sub";
                        if (!isset($parent)) {
                            $parent = $collection->parentCollections->firstWhere(
                                "type",
                                "dossier"
                            );
                        }
                        if (isset($parent->content->title)) {
                            $_title = $parent->content->title . " | " . $_title;
                        }
                        if (!isset($parent->id)) {
                            $routeName = "collection";
                        }
                        break;
                    default:
                        // ToDo maybe here make possible to make nice collection-urls for e.g. annual reports
                        $routeName = "collection";
                }
            }
        } elseif (isset($item)) {
            $_title = isset($item->content->title)
                ? $item->content->title
                : $_title;
            if ($item->type === "resource" && $item->subtype === "link") {
                if (isset($item->content->links[0]->url)) {
                    $this->title = $title ? $title : $_title;
                    $this->href = $item->content->links[0]->url;
                    return;
                }
            }
            $id = $item->id;
            $routeName = "item.show";
            $slug = isset($item->content->slug) ? $item->content->slug : $slug;
        } else {
            abort(500);
        }
        $args = [
            ...$query,
            "id" => $id,
            "slug" => $slug,
            "locale" => App::getLocale() ?? config("app.fallback_locale"),
        ];

        if (isset($parent)) {
            $args["parent_id"] = $parent->id;
            $args["parent_slug"] = isset($parent->content)
                ? $parent->content->slug
                : $parentSlug;
        }

        $this->title = $title ? $title : $_title;
        $this->href = route($routeName, $args);
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view("components.link");
    }
}
