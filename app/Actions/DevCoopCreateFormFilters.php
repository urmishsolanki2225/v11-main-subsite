<?php

namespace App\Actions;

use App\Models\Collection;
use App\Models\CoopProject;
use App\Models\CoopProjectPartner;

class DevCoopCreateFormFilters
{
    public function execute()
    {
        $activeFilters = collect(request()->query("filter") ?? [])->map(
            fn($filter) => explode(",", $filter)
        );

        $countryIds = CoopProjectPartner::select("country_collection_id")
            ->whereHas("project", fn($q) => $q->published())
            ->whereNotNull("country_collection_id")
            ->distinct()
            ->get()
            ->pluck("country_collection_id");

        $countries = Collection::whereIn("id", $countryIds)
            ->with([
                "content",
                "parentCollections" => fn($q) => $q->where("type", "region"),
            ])
            ->get();
        $countryOptions = $countries->map(
            fn($c) => [
                "id" => $c->id,
                "label" => $c->content->title,
                "active" => $activeFilters->has("country")
                    ? in_array($c->id, $activeFilters["country"])
                    : false,
            ]
        );

        $regions = Collection::where("type", "region")
            ->whereHas(
                "subCollections",
                fn($q) => $q->whereIn("sub_id", $countryIds)
            )
            ->get();
        $regionOptions = $regions->map(
            fn($r) => [
                "id" => $r->id,
                "label" => $r->content->title,
                "active" => $activeFilters->has("region")
                    ? in_array($r->id, $activeFilters["region"])
                    : false,
            ]
        );

        $minYear = CoopProject::published()->min("year_start");
        $maxYear = CoopProject::published()->max("year_end");
        $periodOptions = collect()
            ->range($maxYear, $minYear)
            ->map(
                fn($y) => [
                    "id" => $y,
                    "label" => $y,
                    "active" => $activeFilters->has("period")
                        ? in_array($y, $activeFilters["period"])
                        : false,
                ]
            );

        $taxonomy = Collection::with([
            "subCollections",
            "subCollections.subCollections",
        ])->find(config("eiie.collection.coop-projects-taxonomy"));

        $advanced = [];

        $advanced[] = [
            "name" => "partner_benefitting",
            "submit_as" => "partner",
            "label" => trans_choice("eiie.Benefitting Organizations",2),
            "advanced" => true,
            "group_by" => "country",
            "options" => CoopProjectPartner::whereNotNull("name")
                ->whereHas("project", fn($q) => $q->published())
                ->where("role", "benefitting")
                ->with("country.content")
                ->select("name", "acronym", "country_collection_id")
                ->distinct()
                ->orderBy("name")
                ->get()
                ->map(
                    fn($partner) => [
                        "id" => $partner->name,
                        "country" => $partner->country->content->title ?? "_",
                        "label" =>
                            $partner->name .
                            ($partner->acronym
                                ? " (" . $partner->acronym . ")"
                                : ""),
                        "active" => $activeFilters->has("partner")
                            ? in_array(
                                $partner->name,
                                $activeFilters["partner"]
                            )
                            : false,
                    ]
                )
                ->unique("id")
                ->sortBy("country")
                ->values(),
        ];

        $advanced[] = [
            "name" => "partner_coop",
            "submit_as" => "partner",
            "label" => trans_choice("eiie.Cooperation Partners",2),
            "advanced" => true,
            "group_by" => "country",
            "options" => CoopProjectPartner::whereNotNull("name")
                ->whereHas("project", fn($q) => $q->published())
                ->where("role", "dev_coop")
                ->with("country.content")
                ->distinct()
                ->orderBy("name")
                ->get()
                ->map(
                    fn($partner) => [
                        "id" => $partner->name,
                        "country" => $partner->country->content->title ?? "_",
                        "label" =>
                            $partner->name .
                            ($partner->acronym
                                ? " (" . $partner->acronym . ")"
                                : ""),
                        "active" => $activeFilters->has("partner")
                            ? in_array(
                                $partner->name,
                                $activeFilters["partner"]
                            )
                            : false,
                        // .
                        // (!empty($partner->country->content->title)
                        //     ? " - " . $partner->country->content->title
                        //     : ""),
                    ]
                )
                ->unique("id")
                ->sortBy("country")
                ->values(),
        ];

        if (!empty($taxonomy->subCollections)) {
            $advanced = array_merge(
                $advanced,
                $taxonomy->subCollections
                    ->map(
                        fn($coll, $i) => [
                            "name" => "taxonomy_{$i}",
                            "advanced" => true,
                            "submit_as" => "taxonomy",
                            "label" => $coll->content->title ?? "",
                            "options" => $coll->subCollections->map(
                                fn($c) => [
                                    "id" => $c->id,
                                    "label" => $c->content->title ?? "",
                                    "active" => $activeFilters->has("taxonomy")
                                        ? in_array(
                                            $c->id,
                                            $activeFilters["taxonomy"]
                                        )
                                        : false,
                                ]
                            ),
                        ]
                    )
                    ->all()
            );
        }

        return [
            [
                "label" => __("eiie.Country"),
                "name" => "country",
                "options" => $countryOptions,
            ],
            [
                "label" => __("eiie.Region"),
                "name" => "region",
                "options" => $regionOptions,
            ],
            [
                "label" => __("eiie.Year"),
                "name" => "period",
                "options" => $periodOptions,
            ],
            ...$advanced,
        ];
    }
}
