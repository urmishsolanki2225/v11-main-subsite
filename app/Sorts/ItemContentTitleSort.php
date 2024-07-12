<?php 

namespace App\Sorts;

use App\Models\ItemContent;
use Spatie\QueryBuilder\Sorts\Sort;
use Illuminate\Database\Eloquent\Builder;

class ItemContentTitleSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';
        $locale = \App::getLocale() ?? 'en';

        $query->orderBy(
            ItemContent::select('title')
                ->whereIn('lang', [$locale, '*'])
                ->whereColumn('items.id', 'item_id')
                ->limit(1)
                , 
            $direction
        );
    }
}
