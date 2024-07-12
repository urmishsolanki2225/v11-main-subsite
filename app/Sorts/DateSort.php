<?php

namespace App\Sorts;

use Spatie\QueryBuilder\Sorts\Sort;
use Illuminate\Database\Eloquent\Builder;

class DateSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $query->orderByRaw(
            "COALESCE(publish_at, created_at) " . ($descending ? "desc" : "asc")
        );
    }
}
