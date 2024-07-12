<?php

namespace App\Sorts;

use App\Models\ItemContent;
use Spatie\QueryBuilder\Sorts\Sort;
use Illuminate\Database\Eloquent\Builder;

class DevCoopTitleSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $locale = \App::getLocale() ?? "en";

        $query->orderBy(
            ItemContent::select("title")
                ->whereIn("lang", [$locale, "*"])
                ->whereColumn("coop_projects.content_id", "item_contents.id")
                ->limit(1),
            $descending ? "DESC" : "ASC"
        );
    }
}
