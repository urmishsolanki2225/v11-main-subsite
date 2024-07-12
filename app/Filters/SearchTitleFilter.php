<?php

namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class SearchTitleFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $locale = \App::getLocale() ?? "en";
        if (is_array($value)) {
            $query->whereHas("contents", function ($q) use ($value, $locale) {
                $q->whereIn("lang", [$locale, "*"]);
                foreach ($value as $val) {
                    if (trim($val)) {
                        $q->where("title", "like", "%" . trim($val) . "%");
                    }
                }
            });
        } else {
            $query->whereHas("contents", function ($q) use ($value, $locale) {
                $q->whereIn("lang", [$locale, "*"])->where(
                    "title",
                    "like",
                    "%$value%"
                );
            });
        }
    }
}
