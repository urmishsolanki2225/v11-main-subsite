<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Item;
use App\Models\Collection;
use App\Models\ItemContent;
use App\Filters\CollectionMemberFilter;
use App\Filters\ItemsWithImageFilter;
use App\Filters\MissingTranslationsFilter;
use App\Sorts\ItemContentTitleSort;
use App\View\Components\RenderContent;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

use App\Actions\Patch;
use App\Actions\CleanHtml;
use App\Filters\MissingFilesFilter;
use Illuminate\Support\Carbon;

// use App\Actions\UpdateItemContents;
// use App\Actions\UpdateItemImages;
// use App\Actions\AssociateItemCollections;
// use App\Actions\UpdateAttachmentGroups;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $isInertia = $request->input("_format") != "json";

        $items = QueryBuilder::for(Item::class)
            ->allowedFilters([
                AllowedFilter::exact("type"),
                AllowedFilter::exact("subtype"),
                AllowedFilter::exact("status"),
                AllowedFilter::partial("search", "contents.title"),
                // AllowedFilter::exact('collection.id', null, false)
                AllowedFilter::custom(
                    "collection.id",
                    new CollectionMemberFilter()
                ),
                AllowedFilter::custom(
                    "imageitem.id",
                    new ItemsWithImageFilter()
                ),
                AllowedFilter::custom(
                    "missing_translations",
                    new MissingTranslationsFilter()
                ),
                AllowedFilter::custom(
                    "missing_files",
                    new MissingFilesFilter()
                ),
                AllowedFilter::callback(
                    "missing_workarea",
                    fn($q) => $q->whereDoesntHave(
                        "collections",
                        fn($q) => $q->where("type", "workarea")
                    )
                ),
                AllowedFilter::trashed()->default("no"),
                AllowedFilter::scope("published_after"),
                AllowedFilter::scope("published_before"),
            ])
            ->allowedSorts([
                "id",
                "created_at",
                "updated_at",
                "publish_at",
                "type",
                "layout",
                AllowedSort::custom(
                    "title",
                    new ItemContentTitleSort(),
                    "title"
                ),
                // AllowedSort::field('items_count', 'items_count')
            ])
            ->defaultSort("-created_at", "id")
            ->with(["contents:id,item_id,title,lang"])
            ->withoutGlobalScopes();

        if ($isInertia) {
            $items = $items->paginate(16)->appends(request()->query());
        } else {
            $items = $items->jsonPaginate()->appends(request()->query());
        }

        $result = [
            "user" => $request->user(),
            "items" => $items,
            "filter" => $request->all("filter"),
            "sort" => $request->get("sort"),
        ];
        if (isset($result["filter"]["filter"]["collection.id"])) {
            $collectionId = $result["filter"]["filter"]["collection.id"];
            $result["collection"] = Collection::where("id", $collectionId)
                ->withoutGlobalScopes()
                ->with(["contents:id,lang,title"])
                ->first();
        }

        if (!$isInertia) {
            return response()->json($result);
        }
        return Inertia::render("Items/List", $result);
    }

    public function edit(Request $request, CleanHtml $cleanHtmlAction, $id)
    {
        $item = Item::where("id", $id)
            ->with([
                "contents",
                "contents.images",
                "contents.videos",
                "contents.files",
                "contents.links",
                //Added by Cyblance for Annual-Reports section start
                "contents.embeds",
                //Added by Cyblance for Annual-Reports section end
                "contents.contacts",
                "contents.devCoopProject",
                // "contents.dcprojects" => fn($q) => $q->withoutGlobalScopes(),
                // "contents.dcprojects.hostOrganisations",
                // "contents.dcprojects.hostOrganisations.content",
                // "contents.dcprojects.hostOrganisations.affiliate:item_id,acronym,official_name",
                // "contents.dcprojects.cooperatingOrganisations",
                // "contents.dcprojects.cooperatingOrganisations.content",
                // "contents.dcprojects.cooperatingOrganisations.affiliate:item_id,acronym,official_name",
                "allImages" => fn($q) => $q->withoutGlobalScopes(),
                "allImages.contents",
                "allImages.contents.images",
                "collections" => fn($q) => $q->withoutGlobalScopes(),
                "collections.contents:id,collection_id,title,lang",
                "collections.parentCollections" => fn(
                    $q
                ) => $q->withoutGlobalScopes(),
                "collections.parentCollections.content:id,collection_id,title,lang",
                "attachmentGroups",
                "attachmentGroups.contents" => fn(
                    $q
                ) => $q->withoutGlobalScopes(),
                "attachmentGroups.attachments",
                "attachmentGroups.attachments.item" => fn($q) => $q
                    ->withoutGlobalScopes()
                    ->without("content"),
                "attachmentGroups.attachments.item.contents:id,item_id,title,lang",
                "attachmentGroups.attachments.item.contents.links",
                "attachmentGroups.attachments.item.contents.videos",
                "attachmentGroups.attachments.item.contents.files",
                "activityReportCongress",
            ])
            ->withCount(["imageForItems", "imageForCollections"])
            ->without([
                "collections.slotItems",
                "contents.updated_at",
                "contents.created_at",
            ])
            ->withoutGlobalScopes()
            ->first();

        // $cleanHtmlAction->execute($item);

        $audits = [
            "main" => $item
                ->audits()
                ->with("user")
                ->latest()
                ->take(10)
                ->get(),
            "contents" => $item->contents->map(
                fn($content) => [
                    "lang" => $content->lang,
                    "audits" => $content
                        ->audits()
                        ->with("user")
                        ->latest()
                        ->take(10)
                        ->get(),
                ]
            ),
        ];

        // we have to remove country_name field for now from the coop partners because it confuses the patching
        // bit hacky for now, in a future we move away from patching but for now this is the way to go still
        if (!empty($item->contents)) {
            foreach ($item->contents as &$content) {
                if (!empty($content->devCoopProject->partners)) {
                    foreach ($content->devCoopProject->partners as &$partner) {
                        unset($partner->country_name);
                    }
                }
            }
        }
        $item->makeHidden(["contents.devCoopProject.partners.*.country_name"]);

        $data = [
            "item" => $item,
            "audits" => $audits,
            "id" => $id,
        ];

        return Inertia::render("Items/Edit", $data);
    }

    public function create(Request $request)
    {
        if ($request->user()->cannot("create", Item::class)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        $collection = false;
        if ($request->has("collection_id")) {
            $collection = Collection::where(
                "id",
                $request->input("collection_id")
            )
                ->withoutGlobalScopes()
                ->with(["contents:id,lang,title"])
                ->first();
        }

        $result = [
            "types" => [
                "article" => "Article",
                "static" => "Page",
                "resource" => "Resource",
                "contact" => "Contact card",
                "person" => "Person",
                "library" => "Library",
                // 'slot' => 'Collection slot',
                // "dcproject" => "DC Project",
                "dev_coop_project" => "DC Project",
            ],
            "subtypes" => [
                "resource" => [
                    "file" => "File",
                    "image" => "Image",
                    "image.icon" => "Icon Image",
                    "image.square" => "Square Image",
                    "image.portrait" => "Portrait Image",
                    "video" => "Video",
                    "link" => "External Link",
                    //Added by Cyblance for Annual-Reports section start
                    "embed" => "Embed Social",
                    //Added by Cyblance for Annual-Reports section end
                ],
            ],
            "collection_prepick" => [
                "default" => [
                    [
                        "label" => "Priorities",
                        "filter" => ["type" => "sdi_group,workarea"],
                        "onlyChildTypes" => true,
                        "groupByParent" => true,
                    ],
                    [
                        "label" => "Dossiers",
                        "filter" => ["type" => "dossier,dossier_sub"],
                        "onlyChildTypes" => true,
                        "groupByParent" => true,
                    ],
                    ["label" => "Regions", "filter" => ["type" => "region"]],
                    ["label" => "Countries", "filter" => ["type" => "country"]],
                ],
                "article" => [
                    [
                        "label" => "Latest",
                        "filter" => [
                            "id" => implode(",", [
                                config("eiie.collection.news"),
                                config("eiie.collection.opinion"),
                                config("eiie.collection.take-action"),
                                config("eiie.collection.statements"),
                            ]),
                        ],
                        "mode" => "radio",
                    ],
                ],
                "resource" => [
                    [
                        "label" => "Libraries",
                        "filter" => ["type" => "library"],
                    ],
                ],
            ],
        ];

        // foreach ($result['regions'] as $region) {
        //     $result['region_'.$region->id] = Inertia::lazy(fn() => $region->subCollections);
        // }
        // foreach ($result['dossiers'] as $dossier) {
        //     $result['dossier_'.$dossier->id] = Inertia::lazy(fn() => $dossier->subCollections);
        // }

        if ($collection) {
            $result["collection"] = $collection;

            if ($collection->type == "contacts") {
                $result["types"] = ["contact" => "Contact"];
            }
            if ($collection->type == "library") {
                $result["types"] = ["library" => "Library"];
            }
            if ($collection->type == "persons") {
                $result["types"] = ["person" => "Person"];
            }
        }

        return Inertia::render("Items/Create", $result);
    }

    public function store(Request $request)
    {
        if ($request->user()->cannot("create", Item::class)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        $request->validate([
            "type" => "required",
            "subtype" => "",
            "collection_id" => "integer",
            "collection_ids" => "array",
            "collection_ids.*" => "integer",
            "languages" => "array",
            "languages.*" => "string",
        ]);

        $create = $request->only(["type", "subtype"]);
        $create["status"] = "draft";
        $item = Item::create($create);
        $item->publish_at = Carbon::now()->subMinute(1);
        $languages = $request->input("languages");
        if (empty($languages)) {
            $languages[0] = "en";
            if (
                $item->type == "resource" ||
                $item->type == "contact" ||
                $item->type == "person"
            ) {
                $languages[0] = "*";
            }
        }
        foreach ($languages as $lang) {
            $content = $item->contents()->create(["lang" => $lang]);
            switch ($request->input("type")) {
                case "contact":
                case "person":
                    $content->contacts()->create();
                    break;
                case "dcproject":
                    $content->dcProjects()->create();
                    break;
                case "dev_coop_project":
                    $content->devCoopProject()->create([
                        "year_start" => Carbon::now()->format("Y"),
                        "year_end" => Carbon::now()->format("Y"),
                        "description" => "",
                        "objectives" => "",
                        "activities" => "",
                        "contact_name" => "",
                        "contact_email" => "",
                        "funding" => "",
                    ]);
                    break;
                case "resource":
                    switch ($request->input("subtype")) {
                        case "video":
                            $content->videos()->create([
                                "provider" => "youtube",
                                "provider_id" => "",
                            ]);
                            break;
                        case "link":
                            $content->links()->create(["url" => ""]);
                            break;
                        //Added by Cyblance for Annual-Reports section start
                        case "embed":
                            $content->embeds()->create([
                                "provider" => "Linkedin",
                                "provider_id" => "",
                            ]);
                            break;
                        //Added by Cyblance for Annual-Reports section end
                    }
            }
        }
        if ($collectionId = $request->input("collection_id")) {
            $item->collections()->attach($collectionId);
        }
        if ($collectionIds = $request->input("collection_ids")) {
            $item->collections()->attach($collectionIds);
        }
        if ($item->type === "activityreport_congress") {
            $item->activityReportCongress()->create([]);
        }
        $item->push();

        return Redirect::route("admin.items.edit", $item)->with([
            "info" => "Item created",
        ]);
    }

    public function update(
        Request $request,
        Patch $patchAction,
        // UpdateItemContents $contentsAction,
        // UpdateItemImages $imagesAction,
        // UpdateAttachmentGroups $attachmentsAction,
        // AssociateItemCollections $collectionsAction,
        $id
    ) {
        $item = Item::withoutGlobalScopes()->findOrFail($id);
        if ($request->user()->cannot("update", $item)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        // patching according to JSON diff delta format
        // https://github.com/benjamine/jsondiffpatch/blob/master/docs/deltas.md

        $patchAction->execute($item, $request->all());
        $item->refresh();
        foreach ($item->contents as $content) {
            $content->slug = Str::slug($content->title ? $content->title : "-");
            $renderBlurb = new RenderContent(
                $content,
                "html",
                null,
                null,
                true
            );
            $renderContent = new RenderContent(
                $content,
                "html",
                null,
                null,
                false,
                true
            );
            $content->blurb = $renderBlurb->output;
            $content->content = $renderContent->output;
        }
        $item->push();
        // $item->update($request->only(['status', 'publish_at']));

        // $contentsAction->execute($item, $request->contents);
        // $imagesAction->execute($item, $request->all_images);
        // $attachmentsAction->execute($item, $request->attachment_groups);
        // $collectionsAction->execute($item, $request->collections);

        return Redirect::route("admin.items.edit", $item)->with([
            "info" => "Item updated",
        ]);
    }

    public function destroyMultiple(Request $request)
    {
        $subtype = "";
        $itemType = "Items";
        $succesMessage = item_success_message($itemType, $subtype);

        $this->authorize("forceDeleteMany", [Item::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);

        Item::withoutGlobalScopes()
            ->withTrashed()

            ->whereIn("id", $request->ids)
            ->forceDelete();

        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " permanently deleted"]);
    }

    public function trashMultiple(Request $request)
    {
        $subtype = "";
        $itemType = "Items";

        $succesMessage = item_success_message($itemType, $subtype);

        $this->authorize("deleteMany", [Item::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);

        Item::withoutGlobalScopes()
            ->whereIn("id", $request->ids)
            ->delete();

        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " moved to trash"]);
    }

    public function restoreMultiple(Request $request)
    {
        $subtype = "";
        $itemType = "Items";

        $succesMessage = item_success_message($itemType, $subtype);

        $this->authorize("restoreMany", [Item::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);

        Item::withoutGlobalScopes()
            ->withTrashed()
            ->whereIn("id", $request->ids)
            ->restore();

        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " restored"]);
    }

    public function destroy($id)
    {
        $item = Item::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("forceDelete", $item);
        $type = $item->type;
        $succesMessage = item_success_message($type, $item->subtype);
        $item->forceDelete();
        return redirect()
            ->route("admin.items.index", [
                "filter" => ["type" => $type],
            ])
            ->with(["info" => $succesMessage . " permanently deleted"]);
    }

    public function trash($id)
    {
        $item = Item::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("delete", $item);
        $succesMessage = item_success_message($item->type, $item->subtype);
        $item->delete();
        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " moved to trash."]);
    }

    public function restore($id)
    {
        $item = Item::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("restore", $item);
        $succesMessage = item_success_message($item->type, $item->subtype);
        $item->restore();
        return redirect()
            ->back()
            ->with(["info" => $succesMessage . " restored."]);
    }
}
