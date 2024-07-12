<?php 

namespace App\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class CollectionTreeSearchTitles implements Filter
{
    private $parentTypes;
    private $childTypes;

    function __construct($parentTypes = [], $childTypes = []) 
    {
        $this->parentTypes = $parentTypes;
        $this->childTypes = $childTypes;
    }    
    
    public function __invoke(Builder $query, $value, string $property)
    {

        $query->where(function($q) use ($value) {
            $locale = \App::getLocale() ?? 'en';
            
            $q->whereHas('contents', fn($q) => 
                $q->whereIn('lang', [$locale, '*'])
                ->where('title', 'like', "%$value%")
            );

            if (count($this->parentTypes)) {
                $q->orWhereHas('parentCollections', fn($q) => 
                    $q->whereIn('type', $this->parentTypes)
                    ->whereHas('contents', fn($q) => 
                        $q->whereIn('lang', [$locale, '*'])
                        ->where('title', 'like', "%$value%")
                    ) 
                );
            }
            if (count($this->childTypes)) {
                $q->orWhereHas('subCollections', fn($q) => 
                    $q->whereIn('type', $this->childTypes)
                    ->whereHas('contents', fn($q) => 
                        $q->whereIn('lang', [$locale, '*'])
                        ->where('title', 'like', "%$value%")
                    ) 
                );
            }
        });
    }
}
