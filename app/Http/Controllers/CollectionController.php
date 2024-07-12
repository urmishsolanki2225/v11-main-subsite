<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Sorts\CollectionContentTitleSort;
use App\Filters\SearchTitleFilter;

use App\Actions\ApplyCollectionRules;

use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedFilter;

//Added by Cyblance for Annual-Reports section start
use App\Models\Annualreport;
//Added by Cyblance for Annual-Reports section end

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class CollectionController extends BaseController
{
    public function show(ApplyCollectionRules $rules, string $locale, $id)
    {
        $collection = Collection::with(["images.content.images"])
            ->withCount(["subCollections"])
            ->findOrFail($id);

        $showBlurb = in_array($collection->id, [
            config("eiie.collection.news"),
            config("eiie.collection.opinion"),
            config("eiie.collection.take-action"),
            config("eiie.collection.statements"),
            config("eiie.collection.publications-and-research"),
        ]);

        $showBlurb =
            $showBlurb ||
            (isset($collection->parentCollections[0]) &&
                in_array($collection->parentCollections[0]->id, [
                    config("eiie.collection.opinion"),
                ]));

        $items = $collection->items()->with([
            "content",
            "images",
            "images.content.images",
            "collections",
            "collections.content:id,title,slug,collection_id,lang",
            "affiliate",
            // // 'collections.parentCollections'
        ]);

        if ($collection->layout == "persons") {
            // views are grouped by subcollection, load those items
            $collection->loadMissing([
                "subCollections.content",
                // 'subCollections.items',
                // 'subCollections.items.content',
                // 'subCollections.items.portraitImages',
                // 'subCollections.items.portraitImages.content.images',
            ]);
        }

        if ($collection->layout == "dossier") {
            $collection->loadMissing([
                "items.content.videos",
                "items.content.links",
                "subCollections" => fn($q) => $q->where("type", "dossier_sub"),
                "subCollections.content",
                // 'subCollections.items',
                // 'subCollections.items.content',
                // 'subCollections.items.content.images',
                // 'subCollections.items.content.links',
                // 'subCollections.items.content.videos',
                // 'subCollections.items.images',
                // 'subCollections.items.images.content.images',
            ]);
        }
        $groupedItems = $collection->itemsByType();
        // $groupedItems = $items->get()->groupBy('type');
        $rulesItems = $rules->execute($collection, $items, $groupedItems);

        return view()->first(
            ["collection." . $collection->layout, "collection.default"],
            [
                "collection" => $collection,
                "groupedItems" => $groupedItems,
                "show_blurb" => $showBlurb,
                "items" => $items
                    ->paginate(config("eiie.pagination_size", 18))
                    ->onEachSide(config("eiie.pagination_oneachside", 1)),
                "special" => $rulesItems,
            ]
        );
    }

    public function showSub(
        ApplyCollectionRules $rules,
        string $locale,
        $parentId,
        $parentSlug,
        $id
    ) {
        return $this->show($rules, $locale, $id);
    }

    public function showCountry(
        ApplyCollectionRules $rules,
        string $locale,
        $id
    ) {
        return $this->show($rules, $locale, $id);
    }

    /*
    public function showCountrySlot($id, $slug, $slotId, $slotSlug) {
        $country = Collection::with([
                        'slotItems' => fn($q) => $q->where('slot_id', 12)
                    ])
                    ->findOrFail($id);
        return view('collection.country_slot', [
                        'collection' => $country,
                        'slotId' => $slotId,
                        'slotItem' => $country->slotItems()->where('id', $slotId)->first()
                    ]);
    }
    */

    public function listCountryArticles(string $locale, $id, $slug = null)
    {
        $country = Collection::findOrFail($id);
        $items = $country
            ->items()
            ->with([
                "content",
                "images",
                "images.content.images",
                "collections",
                "collections.content:id,title,slug,collection_id,lang",
            ])
            ->where("type", "article")
            ->paginate(config("eiie.pagination_size", 18))
            ->onEachSide(config("eiie.pagination_oneachside", 1));
        return view("collection.country_items", [
            "collection" => $country,
            "title" =>
                __("eiie.Articles from") . " " . $country->content->title,
            "items" => $items,
        ]);
    }

    public function listCountryDCProjects(string $locale, $id, $slug = null)
    {
        $country = Collection::findOrFail($id);
        $dcprojects = $country
            ->items()
            ->with([
                "affiliate",
                "content",
                "images",
                "images.content.images",
                "collections",
                "collections.content:id,title,slug,collection_id,lang",
            ])
            ->where("type", "dcproject")
            ->paginate(config("eiie.pagination_size", 18))
            ->onEachSide(config("eiie.pagination_oneachside", 1));
        return view("collection.country_items", [
            "collection" => $country,
            "title" =>
                __("eiie.Development Cooperation Projects") .
                ": " .
                $country->content->title,
            "items" => $dcprojects,
        ]);
    }

    public function listAuthors(Request $request)
    {
        $titleSort = AllowedSort::custom(
            "title",
            new CollectionContentTitleSort(),
            "title"
        );
        $collections = QueryBuilder::for(Collection::class)
            ->where("type", "author")
            ->has("items")
            ->allowedFilters([
                AllowedFilter::custom("name", new SearchTitleFilter()),
            ])
            ->allowedSorts([$titleSort])
            ->defaultSort($titleSort)
            ->with(["content"])
            ->paginate(config("eiie.pagination_size_xl", 36))
            ->onEachSide(config("eiie.pagination_oneachside_xl", 1));

        return view()->first(
            ["collection.authors", "collection.collections"],
            [
                "title" => __("eiie.Authors"),
                "collections" => $collections,
                "collectionClass" => "collection_persons",
                "filter" => [
                    "name" => "name",
                    "value" => $request->input("filter.name"),
                ],
            ]
        );
    }

    public function showDossiers()
    {
        $dossiers = Collection::where("type", "dossiers")->first();

        return view("collection.collections", [
            "collections" => $dossiers
                ->subCollections()
                ->paginate(config("eiie.pagination_size_xl", 18))
                ->onEachSide(config("eiie.pagination_oneachside", 1)),
            "title" => $dossiers->content->title,
        ]);
    }

    public function showByOldIdAndType(
        ApplyCollectionRules $rules,
        string $locale,
        $oldId,
        $oldType
    ) {
        $coll = Collection::where("old_type", $oldType)
            ->where("old_id", "=", $oldId)
            ->first();
        return $this->show($rules, $locale, $coll->id);
    }
}
