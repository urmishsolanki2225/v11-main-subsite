<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemContent;
use App\Models\Collection;
use App\Sorts\CollectionContentTitleSort;
use App\Filters\SearchTitleFilter;

use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedFilter;

use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(string $locale, $id, $slug = null)
    {
        //
        $item = Item::with([
            "images.content.images",
            "collections.content",
            "attachmentGroups",
            "attachmentGroups.attachments" => fn($q) => $q->whereHas(
                "item.content"
            ),
        ])->findOrFail($id);

        $woeCollection = $item->collections->find(
            config("eiie.collection.opinion")
        );
        $woeSeriesCollections = $item
            ->collections()
            ->whereRelation("parentCollections", "parent_id", 7)
            ->get();

        $showOpinionDisclaimer = $woeCollection ? true : false;

        return view()->first(
            ["item." . $item->type, "item"],
            [
                "item" => $item,
                "relatedItems" => $item->relatedItems(),
                "showOpinionDisclaimer" => $showOpinionDisclaimer,
                "worldsOfEducation" => [
                    "main" => $woeCollection,
                    "series" => $woeSeriesCollections,
                ],
                "newsletterSubscribeForm" => $woeCollection
                    ? "newsletter_woe"
                    : false,
            ]
        );
    }

    public function showByOldId(string $locale, $oldId, $oldType = "post_page")
    {
        $item = Item::where("old_id", "=", $oldId);
        if ($oldType) {
            $item = $item->where("old_type", $oldType);
        }
        $item = $item->where("status", "published")->firstOrFail();
        return view("item", [
            "item" => $item,
            "relatedItems" => $item->relatedItems(),
        ]);
    }

    public function listResources(string $locale, $subtype = null)
    {
        return $this->list($locale, "resource", $subtype);
    }

    public function listNews()
    {
        return $this->list("news", null, "items", "News", [
            "show_blurb" => true,
        ]);
    }

    public function list(
        string $locale,
        $type = "resource",
        $subtype = null,
        $subLayout = "items",
        $title = "",
        $viewOptions = []
    ) {
        $items = Item::where("type", $type)
            ->whereHas("content")
            ->orderBy("created_at", "desc");
        if ($subtype) {
            $items = $items->where("subtype", $subtype);
            if (!$title) {
                $title = ucfirst($subtype) . " Resources";
            }
        }
        $items = $items
            ->paginate(config("eiie.pagination_size", 18))
            ->onEachSide(config("eiie.pagination_oneachside", 1));
        $viewOptions["title"] = $title;
        $viewOptions["items"] = $items;
        return view("collection." . $subLayout, $viewOptions);
    }

    public function listByOldType(string $locale, $type)
    {
        $items = Item::where("old_type", $type)
            ->paginate(config("eiie.pagination_size", 18))
            ->onEachSide(config("eiie.pagination_oneachside", 1));
        return view("collection.items", ["title" => $type, "items" => $items]);
    }

    // public function xlistAffiliates() {
    //     $items = Item::where('type', 'affiliate')
    //                 ->paginate(config('eiie.pagination_size_xl', 36))
    //                 ;
    //     return view('collection.items', ['title' => 'Members', 'items' => $items]);
    // }

    public function listAffiliates(Request $request)
    {
        $searchAffiliate = $request->input("filter.affiliate");
        $affiliatePlaceholderCollection = Collection::find(
            config("eiie.collection.affiliates")
        );

        $locale = \App::getLocale() ?? "en";

        $titleSort = AllowedSort::custom(
            "title",
            new CollectionContentTitleSort(),
            "title"
        );
        $countries = QueryBuilder::for(Collection::class)
            ->where("type", "country")
            ->whereHas(
                "items",
                fn($query) => $query->where("type", "affiliate")
            )
            ->allowedFilters([
                AllowedFilter::partial("country", "content.title"),
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
                "items" => function ($query) use ($searchAffiliate) {
                    $query->where("type", "affiliate");
                    if ($searchAffiliate) {
                        $query->where(
                            fn($query) => $query
                                ->whereHas(
                                    "content",
                                    fn($query) => $query->where(
                                        "title",
                                        "like",
                                        "%$searchAffiliate%"
                                    )
                                )
                                ->orWhereHas(
                                    "affiliate",
                                    fn($query) => $query->where(
                                        "acronym",
                                        "like",
                                        "%$searchAffiliate%"
                                    )
                                )
                        );
                    }
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
                "items.content",
                "items.affiliate",
            ])
            ->paginate(config("eiie.pagination_size", 12))
            ->onEachSide(config("eiie.pagination_oneachside", 1));

        return view()->first(
            ["collection.affiliates", "collection.collections"],
            [
                "title" => __("eiie.Our Members"),
                "collection" => $affiliatePlaceholderCollection,
                "collections" => $countries,
                "collectionClass" => "collection_affiliates",
                "filters" => [
                    [
                        "name" => "country",
                        "value" => $request->input("filter.country"),
                        "label" => __("eiie.Filter by country"),
                    ],
                    [
                        "name" => "affiliate",
                        "value" => $request->input("filter.affiliate"),
                        "label" => __("eiie.Filter by member"),
                    ],
                ],
            ]
        );
    }

    public function listDCProjects(Request $request)
    {
        // $affiliatePlaceholderCollection = Collection::find(config('eiie.collection.affiliates'));

        $locale = \App::getLocale() ?? "en";

        $titleSort = AllowedSort::custom(
            "title",
            new CollectionContentTitleSort(),
            "title"
        );
        $countries = QueryBuilder::for(Collection::class)
            ->where("type", "country")
            ->whereHas(
                "items",
                fn($query) => $query->where("type", "dcproject")
            )
            ->allowedFilters([
                AllowedFilter::partial("country", "content.title"),
            ])
            ->allowedSorts([$titleSort])
            ->defaultSort($titleSort)
            ->with([
                "items" => function ($query) {
                    $query->where("type", "dcproject");
                },
            ])
            ->paginate(config("eiie.pagination_size", 12))
            ->onEachSide(config("eiie.pagination_oneachside", 1));

        return view()->first(
            ["collection.dcprojects", "collection.collections"],
            [
                "title" => __("eiie.Development Cooperation Projects"),
                //    'collection' => $affiliatePlaceholderCollection,
                "collections" => $countries,
                "collectionClass" => "collection_dcprojects",
                "filters" => [
                    [
                        "name" => "country",
                        "value" => $request->input("filter.country"),
                        "label" => __("eiie.Filter by country"),
                    ],
                ],
            ]
        );
    }
}
