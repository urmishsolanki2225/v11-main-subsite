<?php 

namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class CollectionMemberFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->whereIn('id', function ($query) use ($value) {
            $query->from('item_collection')
                ->select('item_id')
                ->where('collection_id', $value);
        });
    }
}
