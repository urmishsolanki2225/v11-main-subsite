<?php 

/* 
 *   Filter items/collections for which item with give id is an image.
 */
namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class ItemsWithImageFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->whereIn('id', function ($query) use ($value) {
            $query->from('item_imageitems')
                ->select('item_id')
                ->where('imageitem_id', $value);
        });
    }
}
