<?php
namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Subsite;

class SubsiteCollectionFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
      $query_get = Subsite::select('region_id')->where('id',$value)->pluck('region_id')->first();
        $query->whereIn('id', function ($query) use ($query_get) {
            $query->from('item_collection')
                ->select('item_id')
                ->where('collection_id', $query_get);
        });
    }
}