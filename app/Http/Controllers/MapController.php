<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Spatie\QueryBuilder\QueryBuilder;

class MapController extends Controller
{
    public function indexCollectionItemsCount(Request $request)
    {
        $request->validate([
            "filter.collection" => "nullable|exists:collections,id",
            "filter.parent_collection" => "nullable|exists:collections,id",
        ]);
        $lang = $request->input("lang", config("app.fallback_locale"));
        App::setLocale($lang);
        URL::defaults(["locale" => App::getLocale()]);

        if ($request->input("filter.parent_collection")) {
            $collectionId = $request->input("filter.parent_collection");
            $subCollections = Collection::whereRelation(
                "parentCollections",
                "parent_id",
                $collectionId
            )->pluck("id");
        } else {
            $collectionId = $request->input("filter.collection");
            $subCollections = [];
        }

        $query = Collection::where("type", "country")
            ->with(["content"])
            ->withCount([
                "items" => fn($q) => $q
                    ->where(
                        fn($q) => $q
                            ->whereRelation(
                                "collections",
                                "collections.id",
                                $collectionId
                            )
                            ->orWhereHas(
                                "collections",
                                fn($q) => $q->whereIn(
                                    "collections.id",
                                    $subCollections
                                )
                            )
                    )
                    ->when(
                        $request->has("filter.published_before"),
                        fn($q) => $q->publishedBefore(
                            $request->input("filter.published_before")
                        )
                    )
                    ->when(
                        $request->has("filter.published_after"),
                        fn($q) => $q->publishedAfter(
                            $request->input("filter.published_after")
                        )
                    ),
            ]);

        $mapData = $query->lazy()->mapWithKeys(function ($country) {
            $countryCode = $country->content->meta["country_code"] ?? "";
            $data = [
                "id" => $country->id,
                "country_code" => $countryCode,
                "name" => $country->content->title,
                "items_count" => $country->items_count,
            ];
            return [$countryCode => $data];
        });

        return $mapData;
    }
}
