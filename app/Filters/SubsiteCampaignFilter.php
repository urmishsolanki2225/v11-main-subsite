<?php
namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Subsite;

class SubsiteCampaignFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
      $regionId = Subsite::select('region_id')->where('id',$value)->pluck('region_id')->first();
        $query->whereHas('parentCollections', function ($query) use ($regionId) {
            $query->where('parent_id', $regionId);
        });
    }
}