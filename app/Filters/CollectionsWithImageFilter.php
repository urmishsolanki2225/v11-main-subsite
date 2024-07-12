<?php 

/* 
 *   Filter items/collections for which item with give id is an image.
 */
namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class CollectionsWithImageFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->whereIn('id', function ($query) use ($value) {
            $query->from('collection_imageitems')
                ->select('collection_id')
                ->where('imageitem_id', $value);
        });
    }
}
