<?php 

namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class SearchContentsAndResourcesFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->whereHas('contents', function ($q) use ($value) {
            $q->where('title', 'like', "%$value%")
                ->orWhere('blurb', 'like', "%$value%")
                ->orWhereHas('links', function($ql) use ($value) {
                    $ql->where('url', 'like', "%$value%")
                        ;
                })
                ;
            // $q->dump();
            // $q->where('item_contents.title', 'like', "%$value%")
            //     ->orWhere('item_contents.subtitle', 'like', "%$value%")
            //     ->orWhere('resource_links.url', 'like', "%$value%")                
            //     ;
        });
        // $query->whereIn('id', function ($query) use ($value) {
        //     $query->from('item_collection')
        //         ->select('item_id')
        //         ->where('collection_id', $value);
        // });
    }
}
