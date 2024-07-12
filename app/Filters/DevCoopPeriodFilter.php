<?php

namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class DevCoopPeriodFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query
            ->where("year_start", "<=", $value)
            ->where("year_end", ">=", $value);
    }
}
