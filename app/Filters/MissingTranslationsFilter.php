<?php 

namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class MissingTranslationsFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(fn($q) =>
                $q->whereDoesntHave('contents')
                    ->orWhereDoesntHave('contents', fn($q) => $q->where('lang', '=', '*'))                
            )
            ->withCount('contents')
            ->having('contents_count', '<', 3)
            ;
    }
}
