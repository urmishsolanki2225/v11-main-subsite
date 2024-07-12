<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class RedirectController extends Controller
{
    public function detail(
        string $locale,
        $id,
        $slug = null,
        $types = ["post_post", "post_page"]
    ) {
        $item = Item::where("old_id", $id)
            ->whereIn("old_type", $types)
            ->withoutGlobalScopes()
            ->with(["content"])
            ->first();
        if (!$item) {
            abort(404);
        }
        if ($item->status != "published") {
            // item is not published anymore, redirect to first workarea collection
            $collection = $item
                ->collections()
                ->where("type", "workarea")
                ->first();
            if ($collection) {
                return redirect()->route(
                    "collection",
                    [
                        "id" => $collection->id,
                        "slug" => $collection->content->slug ?? "-",
                    ],
                    301
                );
            }
            if (isset($item->content->title) && $item->content->title) {
                return redirect()->route(
                    "search",
                    ["keyword" => $item->content->title],
                    301
                );
            }
            abort(404);
        }
        if (isset($item->content->slug)) {
            $slug = $item->content->slug;
        }
        return redirect()->route(
            "item.show",
            [
                "id" => $item->id,
                "slug" => $slug,
                "locale" => App::getLocale(),
            ],
            301
        );
    }

    public function detail_page(string $locale, $id, $slug = "-")
    {
        switch ($id) {
            case 4432:
                return redirect()->route(
                    "governance.reports.activity-reports-overview",
                    [],
                    301
                );
            case 4660:
                return redirect()->route(
                    "resources.publications-and-research",
                    [],
                    301
                );

            case 4647:
                return redirect()->route(
                    "dossier",
                    ["id" => 1299, "slug" => $slug],
                    301
                );
            case 4638:
                return redirect()->route(
                    "dossier",
                    ["id" => 1253, "slug" => $slug],
                    301
                );
            case 4642:
                return redirect()->route(
                    "dossier",
                    ["id" => 1368, "slug" => $slug],
                    301
                );
            case 4646:
                return redirect()->route(
                    "dossier",
                    ["id" => 1369, "slug" => $slug],
                    301
                );
            case 4649:
                return redirect()->route(
                    "dossier",
                    ["id" => 1367, "slug" => $slug],
                    301
                );
            case 4650:
                return redirect()->route(
                    "dossier",
                    ["id" => 1370, "slug" => $slug],
                    301
                );

            case 15279:
                return redirect()->route(
                    "workarea",
                    ["id" => 1318, "slug" => $slug],
                    301
                );
            case 4639:
                return redirect()->route(
                    "workarea",
                    ["id" => 1317, "slug" => $slug],
                    301
                );
            case 4641:
                return redirect()->route(
                    "workarea",
                    ["id" => 1326, "slug" => $slug],
                    301
                );
            case 4371:
                return redirect()->route(
                    "workarea",
                    ["id" => 1323, "slug" => $slug],
                    301
                );
            case 4643:
                return redirect()->route(
                    "workarea",
                    ["id" => 1318, "slug" => $slug],
                    301
                );
            case 4653:
                return redirect()->route(
                    "workarea",
                    ["id" => 1323, "slug" => $slug],
                    301
                );
            case 4654:
                return redirect()->route(
                    "workarea",
                    ["id" => 1312, "slug" => $slug],
                    301
                );
            case 4655:
                return redirect()->route(
                    "workarea",
                    ["id" => 1324, "slug" => $slug],
                    301
                );
            case 4659:
                return redirect()->route(
                    "workarea",
                    ["id" => 1318, "slug" => $slug],
                    301
                );
            case 4918:
                return redirect()->route(
                    "workarea",
                    ["id" => 1311, "slug" => $slug],
                    301
                );
            case 4656:
                return redirect()->route(
                    "workarea",
                    ["id" => 1318, "slug" => $slug],
                    301
                );
            case 4648:
                return redirect()->route(
                    "workarea",
                    ["id" => 1324, "slug" => $slug],
                    301
                );
        }
        return $this->detail($locale, $id);
    }

    public function detail_executive_board(string $locale, $id, $slug = null)
    {
        return $this->detail($locale, $id, $slug, ["post_Executive Board"]);
    }

    public function detail_media(string $locale, $id, $slug = "")
    {
        return $this->detail($locale, $id, $slug, ["media"]);
    }

    public function old_collection(
        string $locale,
        $id,
        $slug = null,
        $types = ["post_dossier_parent"]
    ) {
        $collection = Collection::where("old_id", $id)
            ->whereIn("old_type", $types)
            ->withoutGlobalScopes()
            ->with(["content"])
            ->first();
        if (!$collection) {
            abort(404);
        }
        if ($collection->status != "published") {
            // collection is not published anymore, redirect to a search
            if (
                isset($collection->content->title) &&
                $collection->content->title
            ) {
                return redirect()->route(
                    "search",
                    ["keyword" => $collection->content->title],
                    301
                );
            }
            abort(404);
        }
        if (isset($collection->content->slug)) {
            $slug = $collection->content->slug;
        }
        return redirect()->route(
            "collection",
            ["id" => $collection->id, "slug" => $slug],
            301
        );
    }

    public function dossierdetail(string $locale, $id, $slug = null)
    {
        return $this->old_collection($locale, $id, $slug, [
            "post_dossier_parent",
        ]);
    }

    public function country_profile(
        string $locale,
        $id,
        $section_id,
        $title = null
    ) {
        return $this->old_collection($locale, $id, $title, ["country"]);
    }
}
