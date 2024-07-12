<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Collection;
use App\Sorts\CollectionContentTitleSort;
use App\Filters\CollectionsWithImageFilter;
use App\Filters\MissingTranslationsFilter;
use App\Filters\CollectionTreeSearchTitles;
use App\View\Components\RenderContent;

use App\Actions\Patch;
use App\Actions\CountCollectionsItems;
use App\Actions\ImportItems;
use App\Actions\CollectionCreateDefaults;
use App\Actions\AllowedCollectionsLayouts;
use App\Actions\SaveItemsOrdering;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

// Subsite section start
use App\Models\Subsite;
use App\Filters\SubsiteCampaignFilter;
// Subsite section end

class CollectionController extends Controller
{
    public function index(Request $request)
    {
        $isInertia = $request->input("_format") != "json";
        $types = explode(",", $request->input("filter.type"));

        $parentTypes = [];
        $childTypes = [];
        if (in_array("dossier", $types) && in_array("dossier_sub", $types)) {
            $parentTypes = ["dossier"];
            $childTypes = ["dossier_sub"];
        }
        if (in_array("sdi_group", $types) && in_array("workarea", $types)) {
            $parentTypes = ["sdi_group"];
            $childTypes = ["workarea"];
        }
        if (in_array("region", $types) && in_array("country", $types)) {
            $parentTypes = ["region"];
            $childTypes = ["country"];
        }
        $withTreeCollections = [];

        if (count($parentTypes)) {
            $withTreeCollections = [
                "subCollections" => fn($q) => $q
                    ->withoutGlobalScopes()
                    ->whereIn("type", $childTypes),
                "subCollections.contents:id,collection_id,title,lang",
                "parentCollections" => fn($q) => $q
                    ->withoutGlobalScopes()
                    ->whereIn("type", $parentTypes),
                "parentCollections.contents:id,collection_id,title,lang",
            ];
        } else {
            $withTreeCollections = [
                "subCollections" => fn($q) => $q->withoutGlobalScopes(),
                "subCollections.contents:id,collection_id,title,lang",
                "parentCollections" => fn($q) => $q->withoutGlobalScopes(),
                "parentCollections.contents:id,collection_id,title,lang",
            ];
        }

        $titleSort = AllowedSort::custom(
            "title",
            new CollectionContentTitleSort($parentTypes, $childTypes),
            "title"
        );
        $defaultSort = count($parentTypes) ? $titleSort : "-created_at";

        $collections = QueryBuilder::for(Collection::class)
            ->allowedFilters([
                AllowedFilter::exact("id"),
                AllowedFilter::exact("type"),
                AllowedFilter::exact("status"),
                AllowedFilter::exact("layout"),
                // AllowedFilter::partial('search', 'contents.title'),
                AllowedFilter::custom(
                    "search",
                    new CollectionTreeSearchTitles($parentTypes, $childTypes)
                ),
                AllowedFilter::custom(
                    "imageitem.id",
                    new CollectionsWithImageFilter()
                ),
                AllowedFilter::custom(
                    "missing_translations",
                    new MissingTranslationsFilter()
                ),
                AllowedFilter::callback(
                    "items_count",
                    fn($q, $val) => $q->having("items_count", $val)
                ),
                // Subsite section start
                AllowedFilter::custom(
                    "subsite.id",
                    new SubsiteCampaignFilter()
                ),
                // Subsite section end
                AllowedFilter::trashed()->default("no"),
            ])
            ->allowedSorts([
                "id",
                "created_at",
                "updated_at",
                "type",
                "layout",
                "status",
                $titleSort,
                AllowedSort::field("items_count", "items_count"),
            ])
            ->defaultSort($defaultSort, "id")
            ->with(["contents:id,collection_id,title,lang"])
            ->with($withTreeCollections)
            ->without([
                "content",
                "subCollections.content",
                "parentCollections.content",
            ])
            ->withCount(["items"])
            ->withoutGlobalScopes();

        if (
            $request->input("filter.status") == "published" &&
            count($parentTypes)
        ) {
            $collections = $collections->whereHas(
                "parentCollections",
                fn($q) => $q->where("status", "published")
            );
        }

        if ($isInertia) {
            $collections = $collections
                ->paginate(16)
                ->appends(request()->query());
        } else {
            $collections = $collections
                ->jsonPaginate()
                ->appends(request()->query());
        }

        // Subsite section start
        $regionId = Subsite::where("id", $request->user()->subsite_id)
            ->pluck("region_id")
            ->first();
        if (
            $request->input("filter.type") == "dossier,dossier_sub" ||
            $request->input("filter.type") == "listing,structure" ||
            $request->input("filter.type") == "structure,listing" ||
            $request->input("filter.type") == "dossier_sub" ||
            isset($request->input("filter")["subsite.id"]) ||
            (isset($request->input("filter")["type"]) &&
                $request->input("filter")["type"] == "region") ||
            (isset($request->input("filter")["type"]) &&
                $request->input("filter")["type"] == "country")
        ) {
            if (
                $request->user()->can("subsiteAdminAccess", Collection::class)
            ) {
                if (
                    isset($request->input("filter")["type"]) &&
                    $request->input("filter")["type"] == "region"
                ) {
                    $is_site = ["1"];
                    $collections = $collections->whereIn("is_site", $is_site);
                    $collections = $collections->where("id", $regionId);
                } elseif (
                    isset($request->input("filter")["type"]) &&
                    $request->input("filter")["type"] == "country"
                ) {
                    $is_site = ["1"];
                    $collections = $collections->whereIn("is_site", $is_site);
                    $collections = $collections->whereHas(
                        "parentCollections",
                        fn($q) => $q->where("parent_id", $regionId)
                    );
                } else {
                    $is_site = ["2"];
                    $collections = $collections->whereIn("is_site", $is_site);
                    $collections = $collections->whereHas(
                        "parentCollections",
                        fn($q) => $q->where("parent_id", $regionId)
                    );
                }
            } else {
                $is_site = ["1"];
                $collections = $collections->whereIn("is_site", $is_site);
            }
        } else {
            $is_site = ["1"];
            $collections = $collections->whereIn("is_site", $is_site);
        }
        // Subsite section end

        $result = [
            "collections" => $collections,
            "filter" => $request->all("filter"),
            "sort" => $request->input("sort"),
            "parent_types" => $parentTypes,
            "child_types" => $childTypes,
        ];

        if (!$isInertia) {
            return response()->json($result);
        }
        return Inertia::render("Collections/List", $result);
    }

    public function edit(
        Request $request,
        AllowedCollectionsLayouts $allowedAction,
        $id
    ) {
        $collection = Collection::where("id", $id)
            ->with([
                "contents",
                "allImages",
                "allImages.contents",
                "allImages.contents.images",
                "slotItems",
                // 'subCollections',
                "subCollections" => function ($q) {
                    $q->withoutGlobalScopes();
                },
                "subCollections.contents",
                // 'parentCollections',
                "parentCollections" => function ($q) {
                    $q->withoutGlobalScopes();
                },
                "parentCollections.contents",
            ])
            ->withCount(["items"])
            ->withoutGlobalScopes()
            ->first();

        if ($collection->ordering === "partial_date") {
        }

        $data = [
            "collection" => $collection,
            "id" => $id,
            "items" => Inertia::lazy(function () use ($collection) {
                $items = $collection
                    ->items()
                    ->withoutGlobalScopes()
                    ->withPivot(["item_order"])
                    ->with(["contents:item_id,id,lang,title"])
                    ->orderBy("item_order");
                if ($collection->ordering === "partial_date") {
                    $items = $items->where("item_order", "<", 9999999);
                }
                return $items->get();
            }),
        ];

        $canCreate = $request->user()->can("create", Collection::class);
        $canCreateLimited = $request
            ->user()
            ->can("createLimited", Collection::class);
        //Added by Cyblance for Subsite section start
        $allowed = $allowedAction->execute(
            $canCreateLimited,
            $canCreate,
            "",
            $request->user()->role
        );
        //Added by Cyblance for Subsite section end
        if (isset($allowed["layouts"][$collection->type])) {
            $data["layouts"] = $allowed["layouts"][$collection->type];
        }

        if (false && $collection->slots_template_id) {
            $data["slots_template"] = \App\Models\CollectionSlot::where(
                "template_id",
                $collection->slots_template_id
            )
                ->orderBy("order")
                ->with(["title"])
                ->get();
        }

        return Inertia::render("Collections/Edit", $data);
    }

    public function update(Request $request, Patch $patchAction, $id)
    {
        $collection = Collection::withoutGlobalScopes()->findOrFail($id);
        if ($request->user()->cannot("update", $collection)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }
        // check collection associations

        // patching according to JSON diff delta format
        // https://github.com/benjamine/jsondiffpatch/blob/master/docs/deltas.md
        $patchAction->execute($collection, $request->all());
        $collection->refresh();

        // Subsite section start
        if ($collection->type === "dossier") {
            $subsites = Subsite::all();
            $campaignMapping = $subsites
                ->pluck("aliase_name", "region_id")
                ->map(function ($item) {
                    return "eiie.collection.campaign." . $item;
                })
                ->toArray();

            if (
                isset($request->parent_collections) &&
                is_array($request->parent_collections)
            ) {
                $syncData = [];
                foreach ($request->parent_collections as $parentCollection) {
                    if (
                        isset($parentCollection[0]["type"]) &&
                        isset($parentCollection[0]["id"]) &&
                        isset($campaignMapping[$parentCollection[0]["id"]])
                    ) {
                        $campaignId = config(
                            $campaignMapping[$parentCollection[0]["id"]]
                        );

                        // Use Eloquent model to check if campaignId exists
                        if (
                            \App\Models\Collection::where(
                                "id",
                                $campaignId
                            )->exists()
                        ) {
                            $syncData[$campaignId] = ["parent_order" => 1];
                        }
                    }
                }

                if (!empty($syncData)) {
                    $collection
                        ->parentCollections()
                        ->syncWithoutDetaching($syncData);
                }
            }
        }
        // Subsite section start

        foreach ($collection->contents as $content) {
            $content->slug = Str::slug($content->title ? $content->title : "-");
            $renderBlurb = new RenderContent(
                $content,
                "html",
                null,
                null,
                true
            );
            $content->blurb = $renderBlurb->output;
        }
        $collection->push();

        return Redirect::route("admin.collections.edit", $collection)->with([
            "info" => "Collection updated",
        ]);
    }

    public function create(
        Request $request,
        AllowedCollectionsLayouts $allowedAction
    ) {
        $canCreate = $request->user()->can("create", Collection::class);
        $canCreateLimited = $request
            ->user()
            ->can("createLimited", Collection::class);
        if (!$canCreate && !$canCreateLimited) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        $data = $allowedAction->execute(
            $canCreateLimited,
            $canCreate,
            $request->input("parent_collection_id"),
            // Subsite section start
            $request->user()->role
            // Subsite section end
        );

        $collection = false;
        if ($request->has("parent_collection_id")) {
            $collection = Collection::where(
                "id",
                $request->input("parent_collection_id")
            )
                ->withoutGlobalScopes()
                ->with(["contents:id,lang,title"])
                ->first();
            $data["parentCollection"] = $collection;
        }

        return Inertia::render("Collections/Create", $data);
    }

    public function store(
        Request $request,
        CollectionCreateDefaults $createDefaultsAction
    ) {
        $canCreate = $request->user()->can("create", Collection::class);
        $canCreateLimited = $request
            ->user()
            ->can("createLimited", Collection::class);
        if (!$canCreate && !$canCreateLimited) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        $create = $request->only(["type", "layout"]);
        $create["status"] = "draft";
        // Subsite section start
        if ($request->user()->role == "subsiteadmin") {
            $create["is_site"] = 2;
        }
        // Subsite section end
        $collection = Collection::create($create);
        $createDefaultsAction->execute($collection);

        if ($parentCollectionId = $request->input("parent_collection_id")) {
            $collection->parentCollections()->attach($parentCollectionId, [
                "parent_order" => 0,
                "sub_order" => 9999,
            ]);
        }

        // Subsite section start
        if ($request->user()->can("subsiteAdminAccess", Item::class)) {
            $regionId = Subsite::where("id", $request->user()->subsite_id)
                ->pluck("region_id")
                ->first();
            $collection->parentCollections()->attach($regionId);
        }
        // Subsite section end

        return Redirect::route("admin.collections.edit", $collection)->with([
            "info" => "Collection created",
        ]);
    }

    public function itemsOrdering(
        Request $request,
        SaveItemsOrdering $saveItemsOrdering,
        $id
    ) {
        $collection = Collection::withoutGlobalScopes()->findOrFail($id);
        if ($request->user()->cannot("update", $collection)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        $ids = explode(",", $request->input("item_ids"));
        $unorderIds = explode(",", $request->input("unordered_item_ids"));
        $saveItemsOrdering->execute($collection, $ids, $unorderIds);

        return response()->json(["success" => true]);
    }

    public function itemsCount(
        Request $request,
        CountCollectionsItems $countCollectionsItems,
        $ids
    ) {
        if (!$ids) {
            return response()->json(["count" => 0]);
        }
        $ids = explode(",", $ids);
        $result = $countCollectionsItems->execute(
            $ids,
            $request->input("existing_collection_id")
        );
        return response()->json($result);
    }

    public function itemsImport(Request $request, ImportItems $importItems, $id)
    {
        $request->validate([
            "collection_id" => "required|array",
            "collection_id.*" => "integer",
        ]);

        $collection = Collection::withoutGlobalScopes()->findOrFail($id);
        $ids = $request->input("collection_id");

        $result = $importItems->execute($collection, $ids);

        return Redirect::route("admin.collections.edit", $collection)->with([
            "info" => "Items imported",
        ]);
    }

    public function destroyMultiple(Request $request)
    {
        $itemType = "Collections";
        $succesMessage = item_success_message($itemType);

        $this->authorize("forceDeleteMany", [Collection::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);

        Collection::withoutGlobalScopes()
            ->withTrashed()

            ->whereIn("id", $request->ids)
            ->forceDelete();

        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " deleted"]);
    }

    public function trashMultiple(Request $request)
    {
        $itemType = "Collections";
        $succesMessage = item_success_message($itemType);

        $this->authorize("deleteMany", [Collection::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);

        Collection::withoutGlobalScopes()
            ->whereIn("id", $request->ids)
            ->delete();

        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " moved to trash"]);
    }

    public function restoreMultiple(Request $request)
    {
        $itemType = "Collections";
        $succesMessage = item_success_message($itemType);

        $this->authorize("restoreMany", [Collection::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);

        Collection::withoutGlobalScopes()
            ->withTrashed()
            ->whereIn("id", $request->ids)
            ->restore();

        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " restored"]);
    }

    public function destroy($id)
    {
        $collection = Collection::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("forceDelete", $collection);
        $type = $collection->type;
        $succesMessage = item_success_message($type);
        $collection->forceDelete();
        // Subsite section start
        $role = auth()->user();
        if ($role->role == "subsiteadmin") {
            return redirect()
                ->route("admin.collections.index", [
                    "filter" => [
                        "type" => $type,
                        "subsite.id" => $role->subsite_id,
                    ],
                ])
                ->with(["info" => $succesMessage . " permanently deleted"]);
        } else {
            return redirect()
                ->route("admin.collections.index", [
                    "filter" => ["type" => $type],
                ])
                ->with(["info" => $succesMessage . " permanently deleted"]);
        }
        // Subsite section end
    }

    public function trash($id)
    {
        $collection = Collection::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("delete", $collection);
        $succesMessage = item_success_message($collection->type);
        $collection->delete();
        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " moved to trash"]);
    }

    public function restore($id)
    {
        $collection = Collection::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("restore", $collection);
        $succesMessage = item_success_message($collection->type);
        $collection->restore();
        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " restored"]);
    }
}
