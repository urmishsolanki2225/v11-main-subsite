<?php

namespace App\Actions;

use App\Models\Annualreport;
use App\Models\Item;
use Illuminate\Support\Arr;

class FetchActivityReport
{
    public static function fetch(string $yearFrom, string $yearTo = null)
    {
        if (!$yearTo) {
            $yearTo = $yearFrom;
        }
        if ($yearFrom > $yearTo) {
            $tmp = $yearFrom;
            $yearFrom = $yearTo;
            $yearTo = $tmp;
        }

        $result = [];
        for ($year = $yearFrom; $year <= $yearTo; ++$year) {
            $result[$year] = [];
        }

        $highlights = Annualreport::with(["content", "allImages"])
            ->where("type", "highlight")
            ->where("year", ">=", $yearFrom)
            ->where("year", "<=", $yearTo)
            ->where("status", "published")
            ->has("content")
            ->orderBy("year", "asc")
            ->orderBy("month", "asc")
            ->get()
            ->groupBy(["year", "month"]);

        $headlines = Item::with(["content"])
            ->has("content")
            ->where("annual_headline", "1")
            ->whereRaw("YEAR(COALESCE(publish_at, created_at)) >= ?", [
                $yearFrom,
            ])
            ->whereRaw("YEAR(COALESCE(publish_at, created_at)) <= ?", [$yearTo])
            ->get()
            ->groupBy([
                fn($item) => $item->publish_at->format("Y"),
                fn($item) => $item->publish_at->format("n"),
            ]);

        foreach ($result as $year => &$data) {
            for ($month = 1; $month <= 12; ++$month) {
                $data[$month] = [
                    "highlights" => Arr::get(
                        $highlights,
                        "$year.$month",
                        collect()
                    )->all(),
                    "headlines" => Arr::get(
                        $headlines,
                        "$year.$month",
                        collect()
                    )->all(),
                ];
            }
        }

        return $result;
    }
}
