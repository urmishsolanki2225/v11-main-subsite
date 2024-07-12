<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\GeodataSetResource;
use App\Models\Collection;
use App\Models\GeodataMap;
use App\Models\GeodataSet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class GeoDataController extends Controller
{
    public function prepareImport()
    {
        $countries = Collection::where("type", "country")
            ->get()
            ->map(
                fn($coll) => [
                    "id" => $coll->id,
                    "name" => $coll->content->title,
                    "country_code" => $coll->content->meta["country_code"],
                ]
            )
            ->all();

        return Inertia::render("GeoData/Import", ["countries" => $countries]);
    }

    public function import(Request $request)
    {
        $request->validate([
            "label" => "string|nullable",
            "source_label" => "string|nullable",
            "source_link" => "string|nullable",
            "columns" => "array",
            "columns.*.index" => "numeric",
            "columns.*.type" => "string",
            "columns.*.label_en" => "string",
            "data" => "array",
            "data.*.country_id" => "numeric",
            "data.*.values" => "array",
            "data.*.values.*.column_index" => "numeric",
        ]);
        // clock($request->input("data.0.values.0.value"));

        $set = GeodataSet::create([
            "label" => $request->input("label") ?: "",
            "source_label" => $request->input("source_label") ?: "",
            "source_link" => $request->input("source_link") ?: "",
        ]);
        $columns = [];
        foreach ($request->input("columns", []) as $col) {
            $column = $set->columns()->create(["data_type" => $col["type"]]);
            $column
                ->labels()
                ->createMany([
                    ["lang" => "en", "label" => $col["label_en"]],
                    ["lang" => "es", "label" => $col["label_es"]],
                    ["lang" => "fr", "label" => $col["label_fr"]],
                ]);
            $columns[$col["index"]] = $column;
        }
        foreach ($request->input("data", []) as $data) {
            $countryId = $data["country_id"];
            foreach ($data["values"] as $entry) {
                $column = $columns[$entry["column_index"]];
                if ($column) {
                    $column->values()->create([
                        "country_id" => $countryId,
                        "value" => $entry["value"],
                    ]);
                }
            }
        }

        return redirect()->route("admin.geodata.map.create", [
            "set_id" => $set->id,
        ]);
    }

    public function indexSets(Request $request)
    {
        $isInertia = $request->input("_format") != "json";

        $items = QueryBuilder::for(GeodataSet::class)
            ->allowedFilters([AllowedFilter::partial("search", "label")])
            ->allowedSorts(["label", "created_at"])
            ->defaultSort("-created_at", "label")
            // ->with(["contents:id,item_id,title,lang"])
            ->withoutGlobalScopes();

        if ($isInertia) {
            $items = $items->paginate(16)->appends(request()->query());
        } else {
            $items = $items->jsonPaginate()->appends(request()->query());
        }

        $result = [
            "user" => $request->user(),
            "datasets" => $items,
            "filter" => $request->all("filter"),
            "sort" => $request->get("sort"),
        ];

        if (!$isInertia) {
            return response()->json($result);
        }
        return Inertia::render("GeoData/SetList", $result);
    }

    public function create(Request $request)
    {
        $request->validate(["set_id" => "required|exists:geodata_sets,id"]);

        $dataset = GeodataSet::findOrFail($request->set_id);
        $dataset->loadMissing(["columns", "columns.labels", "columns.values"]);

        $countries = Collection::where("type", "country")
            ->get()
            ->map(
                fn($coll) => [
                    "id" => $coll->id,
                    "name" => $coll->content->title,
                    "country_code" => $coll->content->meta["country_code"],
                ]
            )
            ->all();

        return Inertia::render("GeoData/MapCreate", [
            "dataset" => $dataset,
            "countries" => $countries,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "label" => "string",
            "dataset_id" => "required|exists:geodata_sets,id",
            "config" => "json",
        ]);

        GeodataMap::create([
            "label" => $request->label,
            "dataset_id" => $request->dataset_id,
            "config" => json_decode($request->config),
        ]);

        return redirect()->route("admin.geodata.map.index");
    }

    public function index(Request $request)
    {
        $isInertia = $request->input("_format") != "json";

        $maps = QueryBuilder::for(GeodataMap::class)
            ->allowedFilters([AllowedFilter::partial("search", "label")])
            ->allowedSorts(["label", "created_at"])
            ->defaultSort("-created_at", "label")
            ->withoutGlobalScopes();

        if ($isInertia) {
            $maps = $maps->paginate(16)->appends(request()->query());
        } else {
            $maps = $maps->jsonPaginate()->appends(request()->query());
        }

        $result = [
            "user" => $request->user(),
            "maps" => $maps,
            "filter" => $request->all("filter"),
            "sort" => $request->get("sort"),
        ];

        if (!$isInertia) {
            return response()->json($result);
        }
        return Inertia::render("GeoData/MapList", $result);
    }
}
