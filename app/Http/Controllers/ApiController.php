<?php

namespace App\Http\Controllers;

use App\Http\Resources\AffiliateResource;
use App\Http\Resources\CountryResource;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Models\ItemContent;
use App\Models\Collection;
use App\Models\CoopProjectPartner;
use App\Sorts\CollectionContentTitleSort;
use App\Sorts\DateSort;
use App\Sorts\ItemContentTitleSort;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\Enums\SortDirection;
use Spatie\QueryBuilder\QueryBuilder;

class ApiController extends Controller
{
    public function listAffiliates(Request $request)
    {
        // $searchAffiliate = $request->input('filter.affiliate');
        // $affiliatePlaceholderCollection = Collection::find(config('eiie.collection.affiliates'));

        // $locale = \App::getLocale() ?? 'en';

        $titleSort = AllowedSort::custom(
            "title",
            new CollectionContentTitleSort(),
            "title"
        );
        $countries = QueryBuilder::for(Collection::class)
            ->where("type", "country")
            ->whereRelation("items", "type", "affiliate")
            // ->whereHas(
            //     "items",
            //     fn($query) => $query->where("type", "affiliate")
            // )
            ->allowedFilters([
                AllowedFilter::partial("country", "content.title"),
                AllowedFilter::exact("region_id", "parentCollections.id"),
                AllowedFilter::callback(
                    "search",
                    fn($q, $search) => $q->whereHas(
                        "items",
                        fn($q) => $q
                            ->whereRelation(
                                "content",
                                "title",
                                "like",
                                "%$search%"
                            )
                            ->orWhereRelation(
                                "affiliate",
                                "acronym",
                                "like",
                                "%$search%"
                            )
                    )
                ),
                // AllowedFilter::custom('affiliate', new SearchTitleFilter),
                AllowedFilter::callback(
                    "affiliate",
                    fn($query, $search) => $query->whereHas(
                        "items",
                        fn($query) => $query
                            ->where("type", "affiliate")
                            ->where(
                                fn($query) => $query
                                    ->whereHas(
                                        "content",
                                        fn($query) => $query->where(
                                            "title",
                                            "like",
                                            "%$search%"
                                        )
                                    )
                                    ->orWhereHas(
                                        "affiliate",
                                        fn($query) => $query->where(
                                            "acronym",
                                            "like",
                                            "%$search%"
                                        )
                                    )
                            )
                    )
                ),
            ])
            ->allowedSorts([$titleSort])
            ->defaultSort($titleSort)
            ->with([
                "items" => function ($query) {
                    $query
                        ->without(["collections", "images"])
                        ->with(["content:id,item_id,title"]);
                    $query->where("type", "affiliate");
                    // if ($searchAffiliate) {
                    //     $query->where(fn($query) =>
                    //         $query->whereHas('content', fn($query) =>
                    //             $query->where('title', 'like' , "%$searchAffiliate%")
                    //         )->orWhereHas('affiliate', fn($query) =>
                    //             $query->where('acronym', 'like', "%$searchAffiliate%")
                    //         )
                    //     );
                    // }
                    // remove the default country ordering (which is by date)
                    $query->reorder();
                    // and apply alphabetical ordering
                    $query->orderBy(
                        ItemContent::select("title")
                            ->whereColumn("item_id", "items.id")
                            ->orderBy("title", "asc")
                            ->limit(1)
                    );
                },
                "items.affiliate",
                "content:id,collection_id,lang,title",
            ])
            ->without(["items.content"])
            ->get();

        return CountryResource::collection($countries);
    }

    public function searchAffiliates(Request $request)
    {
        $titleSort = AllowedSort::custom(
            "title",
            new ItemContentTitleSort(),
            "title"
        );
        $affiliates = QueryBuilder::for(Item::class)
            ->where("type", "affiliate")
            ->allowedFilters([
                AllowedFilter::callback(
                    "country_id",
                    fn($q, $id) => $q->whereRelation(
                        "collections",
                        "collections.id",
                        $id
                    )
                ),
                AllowedFilter::callback(
                    "region_id",
                    fn($q, $id) => $q->whereHas(
                        "collections",
                        fn($q) => $q->whereRelation(
                            "parentCollections",
                            "parent_id",
                            $id
                        )
                    )
                ),
                AllowedFilter::callback(
                    "search",
                    fn($q, $search) => $q->where(
                        fn($q) => $q
                            ->whereRelation(
                                "content",
                                "title",
                                "like",
                                "%$search%"
                            )
                            ->orWhereRelation(
                                "affiliate",
                                "acronym",
                                "like",
                                "%$search%"
                            )
                            ->orWhereHas(
                                "collections",
                                fn($q) => $q
                                    ->where("type", "country")
                                    ->whereRelation(
                                        "content",
                                        "title",
                                        "like",
                                        "%$search%"
                                    )
                            )
                    )
                ),
            ])
            ->allowedSorts([$titleSort])
            ->defaultSort($titleSort)
            ->with([
                "affiliate",
                "content:id,item_id,lang,title",
                "collections" => fn($q) => $q->where("type", "country"),
            ]);

        $affiliates = $affiliates->jsonPaginate();

        // return AffiliateResource::collection($affiliates);
        // return ItemResource::collection($affiliates);
        return $affiliates;
    }

    public function searchDCPartners(Request $request)
    {
        $partners = QueryBuilder::for(CoopProjectPartner::class)
            ->whereNull("affiliate_item_id")
            ->allowedFilters([AllowedFilter::partial("search", "name")])
            ->allowedSorts(["name"])
            ->defaultSort("name")
            ->groupBy("name");
        // ->selectRaw("DISTINCT `name`")
        // ->addSelect("coop_project_partners.*");

        return $partners->jsonPaginate();
    }

    public function searchCountries(Request $request)
    {
        $titleSort = AllowedSort::custom(
            "title",
            new CollectionContentTitleSort(),
            "title"
        );
        $countries = QueryBuilder::for(Collection::class)
            ->where("type", "country")
            ->allowedFilters([
                AllowedFilter::callback(
                    "search",
                    fn($q, $search) => $q->whereRelation(
                        "content",
                        "title",
                        "like",
                        "$search%"
                    )
                ),
            ])
            ->allowedSorts([$titleSort])
            ->defaultSort($titleSort);

        $countries = $countries->jsonPaginate();

        return $countries;
    }

    public function searchRegions(Request $request)
    {
        $titleSort = AllowedSort::custom(
            "title",
            new CollectionContentTitleSort(),
            "title"
        );
        $regions = QueryBuilder::for(Collection::class)
            ->where("type", "region")
            ->allowedFilters([
                AllowedFilter::callback(
                    "search",
                    fn($q, $search) => $q->whereRelation(
                        "content",
                        "title",
                        "like",
                        "$search%"
                    )
                ),
            ])
            ->allowedSorts([$titleSort])
            ->defaultSort($titleSort);

        $regions = $regions->jsonPaginate();

        return $regions;
    }

    public function searchContent(Request $request)
    {
        $lang = $request->input("lang", config("app.fallback_locale"));
        App::setLocale($lang);
        URL::defaults(["locale" => App::getLocale()]);
        $titleSort = AllowedSort::custom(
            "title",
            new ItemContentTitleSort(),
            "title"
        );
        $dateSort = AllowedSort::custom(
            "publish_at",
            new DateSort(),
            "publish_at"
        )->defaultDirection(SortDirection::DESCENDING);

        $items = QueryBuilder::for(Item::class)
            ->allowedFilters([
                AllowedFilter::exact("type")->default("article"),
                AllowedFilter::callback(
                    "search",
                    fn($q, $search) => $q->whereRelation(
                        "content",
                        "title",
                        "like",
                        "$search%"
                    )
                ),
                AllowedFilter::callback("collection", function ($q, $ids) {
                    if (!is_array($ids)) {
                        $ids = [$ids];
                    }
                    foreach ($ids as $id) {
                        $q->whereRelation("collections", "collections.id", $id);
                        //                         ->orWhereHas(
                        //     "collections",
                        //     fn($q) => $q->whereHas(
                        //         "parentCollections",
                        //         fn($q) => $q->whereIn("parent_id", $ids)
                        //     )
                        // )
                    }
                }),
                AllowedFilter::callback(
                    "parent_collection",
                    fn($q, $id) => $q->whereHas(
                        "collections",
                        fn($q) => $q
                            ->where("collections.id", $id)
                            ->orWhereHas(
                                "parentCollections",
                                fn($q) => $q->where("parent_id", $id)
                            )
                    )
                ),
                AllowedFilter::scope("published_after"),
                AllowedFilter::scope("published_before"),
            ])
            ->allowedSorts($dateSort, $titleSort)
            ->defaultSort($dateSort)
            ->with(["content", "images.content.images"])
            ->when(
                $request->input("filter.parent_collection"),
                fn($q) => $q->with([
                    "collections" => fn($q) => $q->whereRelation(
                        "parentCollections",
                        "parent_id",
                        $request->input("filter.parent_collection")
                    ),
                ])
            );

        $items = $items->jsonPaginate();

        return ItemResource::collection($items);
    }
}
