<?php

namespace App\Http\Controllers;

use App\Actions\CreateResourceItem;
use App\Actions\DevCoopCreateFormFilters;
use App\Actions\StoreResizedImages;
use App\Filters\DevCoopPeriodFilter;
use App\Filters\DevCoopRegionFilter;
use App\Mail\CoopProjectReceived;
use App\Models\Collection;
use App\Models\CollectionContent;
use App\Models\CoopProject;
use App\Models\CoopProjectPartner;
use App\Models\Item;
use App\Models\ItemContent;
use App\Sorts\DevCoopPeriodSort;
use App\Sorts\DevCoopTitleSort;
use App\Sorts\ItemContentTitleSort;
use Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class CoopProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(
        Request $request,
        DevCoopCreateFormFilters $devCoopCreateFormFilters
    ) {
        $request->validate([]);

        $taxonomy = Collection::with([
            "subCollections",
            "subCollections.subCollections",
        ])->find(config("eiie.collection.coop-projects-taxonomy"));

        $titleSort = AllowedSort::custom("title", new DevCoopTitleSort());
        $periodSort = AllowedSort::custom("period", new DevCoopPeriodSort());
        $countrySort = AllowedSort::field("country", "country_name");
        $filters = $devCoopCreateFormFilters->execute();
        $activeFilters = collect($filters ? $filters : [])
            ->map(function ($f) {
                if (is_array($f)) {
                    $f["options"] = ($f["options"]
                        ? $f["options"]
                        : collect([])
                    )->filter(fn($option) => $option["active"]);
                }
                return $f;
            })
            ->filter(fn($f) => $f && count($f["options"]));

        $defaultSort = $titleSort;
        if (
            // $activeFilters->contains("name", "country") ||
            $activeFilters->contains("name", "region")
        ) {
            $defaultSort = $countrySort;
        }

        $projects = QueryBuilder::for(CoopProject::class)
            ->allowedFilters([
                AllowedFilter::exact("taxonomy", "content.item.collections.id"),
                AllowedFilter::exact(
                    "country",
                    "partners.country_collection_id"
                ),
                AllowedFilter::custom("period", new DevCoopPeriodFilter()),
                AllowedFilter::exact(
                    "region",
                    "partners.country.parentCollections.id"
                ),
                AllowedFilter::exact("partner", "partners.name"),
            ])
            ->published() // this checks published status
            ->with([
                "partners",
                "content",
                "content.item",
                "content.item.collections",
                "content.item.collections.content",
                "content.item.collections.parentCollections",
                "content.item.collections.parentCollections.content",
            ]);
        $totalCount = $projects->count();
        if (
            $request->sort === "country" ||
            $request->sort === "-country" ||
            ($defaultSort === $countrySort && !$request->sort)
        ) {
            //$projects->where("regional", 0);
            if (!($request->page > 1)) {
                // first page
            }
            $countryJoinSubSelect = CollectionContent::select("*");
            $regionFilter = $activeFilters->firstWhere("name", "region");
            if ($regionFilter) {
                $countryJoinSubSelect = $countryJoinSubSelect->whereHas(
                    "collection.parentCollections",
                    fn($q) => $q->whereIn(
                        "parent_id",
                        $regionFilter["options"]->pluck("id")
                    )
                );
            }
            $projects = $projects
                ->orderBy("regional", "DESC")
                ->select("coop_projects.*")
                ->selectRaw(
                    "IF(`regional`, '" .
                        __("eiie.Regional Projects") .
                        "', `country`.`title`) AS country_name"
                )
                ->distinct()
                ->joinSub(
                    CoopProjectPartner::where("role", "benefitting"),
                    "partner",
                    fn($join) => $join->on(
                        "partner.coop_project_id",
                        "=",
                        "coop_projects.id"
                    )
                )
                ->joinSub(
                    $countryJoinSubSelect,
                    "country",
                    fn($join) => $join->on(
                        "partner.country_collection_id",
                        "=",
                        "country.collection_id"
                    )
                );
        }
        $projects = $projects
            ->allowedSorts([$titleSort, $periodSort, $countrySort])
            ->defaultSort($defaultSort)
            ->orderBy("year_start") // default fallback that always works
            ->orderBy("year_end")
            ->paginate()
            ->appends(request()->query());

        return view("coop_projects/listing", [
            "taxonomy" => $taxonomy,
            "projects" => $projects,
            "filters" => $filters,
            "total_count" => $totalCount,
            "active_filters" => $activeFilters,
            "active_sort" => $request->input(
                "sort",
                $defaultSort === $countrySort ? "country" : "title"
            ),
            "sorting" => [
                [
                    "label" => __("eiie.Project title"),
                    "name" => "title",
                ],
                [
                    "label" => __("eiie.Year"),
                    "name" => "period",
                ],
                [
                    "label" => __("eiie.Country"),
                    "name" => "country",
                ],
                // [
                //     "label" => __("Region"),
                //     "name" => "region",
                // ],
            ],
        ]);
    }

    public function overview(DevCoopCreateFormFilters $devCoopCreateFormFilters)
    {
        $taxonomy = Collection::with([
            "subCollections",
            "subCollections.subCollections",
        ])->find(config("eiie.collection.coop-projects-taxonomy"));
        $filters = $devCoopCreateFormFilters->execute();

        $currentProjects = CoopProject::published()
            ->with([
                "partners",
                "content",
                "content.item",
                "content.item.collections.content",
            ])
            ->current()
            ->inRandomOrder()
            ->take(6)
            ->get();

        $mapData = Collection::where("type", "country")
            ->whereHas("countryCoopProjects", fn($q) => $q->published())
            ->with([
                "content",
                "countryCoopProjects" => fn($q) => $q->published(),
            ])
            ->lazy()
            ->mapWithKeys(function ($country) {
                $countryCode = $country->content->meta["country_code"] ?? "";
                $projects = $country->countryCoopProjects;
                $members = collect();
                $partnerCountries = collect();
                foreach ($projects as $project) {
                    $members = $members->concat(
                        $project
                            ->partners()
                            ->where("country_collection_id", $country->id)
                            ->whereNotNull("affiliate_item_id")
                            ->get()
                    );
                    $partnerCountries = $partnerCountries->concat(
                        $project
                            ->partnerCountries()
                            ->where("country_collection_id", "!=", $country->id)
                            ->select("collections.id")
                            ->with(["content:collection_id,title"])
                            ->get()
                            ->map(
                                fn($country) => [
                                    "id" => $country->id,
                                    "name" => $country->content->title,
                                    "country_code" =>
                                        $country->content->meta[
                                            "country_code"
                                        ] ?? "",
                                ]
                            )
                    );
                }
                $members = $members->unique("affiliate_item_id");
                $partnerCountries = $partnerCountries->unique("id");
                $data = [
                    "id" => $country->id,
                    "currentProjects" => $country
                        ->countryCoopProjects()
                        ->published()
                        ->current()
                        ->distinct("coop_projects.id")
                        ->count(),
                    "totalProjects" => $country
                        ->countryCoopProjects()
                        ->published()
                        ->distinct("coop_projects.id")
                        ->count(),
                    "name" => $country->content->title,
                    "members" => $members,
                    "partnerCountries" => array_values(
                        $partnerCountries->all()
                    ),
                    // affiliates: DevCoopProjectPartner[];
                    // partnerCountries: { name: string; id: number }[];
                ];
                return [$countryCode => $data];
            });

        $introItem = Item::withoutGlobalScopes()->find(
            config("eiie.item.dev_coop_project_intro")
        );

        return view("coop_projects/overview", [
            "taxonomy" => $taxonomy,
            "projects" => $currentProjects,
            "filters" => $filters,
            "map_data" => $mapData,
            "intro_item" => $introItem,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // return view("coop_projects.entry_form");
        $taxonomy = Collection::withoutGlobalScopes()
            ->with(["subCollections", "subCollections.subCollections"])
            ->find(config("eiie.collection.coop-projects-taxonomy"));

        return Inertia::render("CoopProject/SubmissionPage", [
            "taxonomy" => $taxonomy,
        ])->rootView("front_app");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(
        Request $request,
        CreateResourceItem $createResourceItem
    ) {
        $request->validate([
            "title" => "required|string",
            "language" => "required|string",
            "year_start" => "required|numeric|min:1900",
            "year_end" => "required|numeric|gte:year_start",
            "partners_benefitting" => "array",
            "partners_dev_coop" => "array",
            "taxonomy_collection_ids" => "array",
            "description" => "required|string",
            "objectives" => "required|string",
            "activities" => "required|string",
            "outcomes" => "string|nullable",
            "url" => "url|nullable",
            "public_email" => "email|nullable",
            "contact_name" => "required",
            "contact_email" => "email|required",
            "funding" => "required",
            "budget_currency" => "string|nullable",
            "budget_amount" => "numeric|nullable",
            "remark_internal" => "string|nullable",
            "image" => "file|image|nullable",
            "files" => "array|nullable",
            "files.*" => "file",
        ]);

        Item::disableAuditing();
        ItemContent::disableAuditing();

        $item = Item::create([
            "type" => "dev_coop_project",
            "status" => "draft",
        ]);

        // taxonomy collections
        $item
            ->collections()
            ->sync($request->input("taxonomy_collection_ids", []));

        // item content (title and language)
        $content = $item->contents()->create([
            "lang" => $request->language,
            "title" => $request->title,
        ]);
        $project = $content
            ->devCoopProject()
            ->create(
                $request->only([
                    "year_start",
                    "year_end",
                    "description",
                    "objectives",
                    "activities",
                    "outcomes",
                    "url",
                    "public_email",
                    "contact_name",
                    "contact_email",
                    "funding",
                    "budget_currency",
                    "budget_amount",
                    "remark_internal",
                ])
            );

        // partners
        foreach ($request->input("partners_benefitting", []) as $partner) {
            // id?, name, country_id?
            $project->partners()->create([
                "role" => "benefitting",
                "affiliate_item_id" => Arr::get($partner, "affiliate_item_id"),
                "country_collection_id" => Arr::get(
                    $partner,
                    "country_collection_id"
                ),
                "name" => Arr::get($partner, "name"),
                "acronym" => Arr::get($partner, "acronym"),
            ]);
        }
        foreach ($request->input("partners_dev_coop", []) as $partner) {
            // id?, name, country_id?
            $project->partners()->create([
                "role" => "dev_coop",
                "affiliate_item_id" => Arr::get($partner, "affiliate_item_id"),
                "country_collection_id" => Arr::get(
                    $partner,
                    "country_collection_id"
                ),
                "name" => Arr::get($partner, "name"),
                "acronym" => Arr::get($partner, "acronym"),
            ]);
        }

        // attachments
        if ($request->hasFile("files")) {
            // create an attachment group
            $attachmentGroup = $item->attachmentGroups()->create([]);
            foreach ($request->file("files") as $file) {
                // add each file as its own item
                // and attach those items
                $fileItemContent = $createResourceItem->createItemAndContents([
                    "subtype" => "file",
                    "title" => $file->getClientOriginalName(),
                    "subtitle" => $request->title,
                ]);
                $path = $file->store("files");
                $path = Str::replaceFirst("files/", "", $path);
                $fileItemContent->files()->create([
                    "path" => $path,
                    "original_filename" => $file->getClientOriginalName(),
                    // "label" => $request->input("label"),
                ]);
                $attachmentGroup
                    ->attachments()
                    ->create(["item_id" => $fileItemContent->item_id]);
            }
        }

        // lead image
        if ($request->hasFile("image")) {
            $file = $request->file("image");
            $path = "image/" . $file->hashName();
            $file->storeAs($path, "original");
            StoreResizedImages::dispatchSync($path);
            // $path = $file->store("img");
            // $path = Str::replaceFirst("img/", "", $path);
            $originalFileName = $file->getClientOriginalName();
            // create item for the image
            $imgItem = Item::create([
                "type" => "resource",
                "subtype" => "image",
                "status" => "published",
            ]);
            $imgItemContent = $imgItem
                ->contents()
                ->create(["lang" => "*", "title" => $originalFileName]);
            $imgItemContent->images()->create([
                "path" => $path,
            ]);
            $item->images()->save($imgItem, ["order" => 1]);
        }

        // Mail::to($request->contact_email)->send(
        //     new CoopProjectReceived($request->title)
        // );

        return Inertia::render("CoopProject/ThanksPage", [
            "title" => $request->title,
        ])->rootView("front_app");
    }

    public function thanks()
    {
        return Inertia::render("CoopProject/ThanksPage", [])->rootView(
            "front_app"
        );
    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  $id Item id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show($id)
    // {
    //     $item = Item::find($id);

    //     return
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  *
    //  * @param  \App\Models\CoopProject  $coopProject
    //  * @return \Illuminate\Http\Response
    //  */
    // public function edit(CoopProject $coopProject)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  \App\Models\CoopProject  $coopProject
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, CoopProject $coopProject)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CoopProject  $coopProject
     * @return \Illuminate\Http\Response
     */
    public function destroy(CoopProject $coopProject)
    {
        //
    }
}
