<?php

namespace App\Sorts;

use App\Models\ItemContent;
use Spatie\QueryBuilder\Sorts\Sort;
use Illuminate\Database\Eloquent\Builder;

class DevCoopPeriodSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $query
            ->orderBy("year_start", $descending ? "asc" : "desc")
            ->orderBy("year_end", $descending ? "asc" : "desc");
    }
}
