<?php 

namespace App\Sorts;

use App\Models\CollectionContent;
use Spatie\QueryBuilder\Sorts\Sort;
use Illuminate\Database\Eloquent\Builder;


class CollectionContentTitleSort implements Sort
{
    private $parentTypes;
    private $childTypes;

    function __construct($parentTypes = [], $childTypes = []) 
    {
        $this->parentTypes = $parentTypes;
        $this->childTypes = $childTypes;
    }

    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'DESC' : 'ASC';
        if (count($this->parentTypes) && count($this->childTypes)) {
            $query->orderByRaw(
                "concat(
                    if(`type` IN ('".implode("','", $this->childTypes)."'),
                        concat(
                            '/',
                            ifnull(
                                (select lcase(title)
                                    from collection_contents as content,
                                        collections as parent,
                                        collection_collection as cc
                                    where content.collection_id=parent.id 
                                        and content.lang='en'
                                        and parent.type IN ('"
                                            .implode("','", $this->parentTypes)."')
                                        and parent.id=cc.parent_id
                                        and cc.sub_id=collections.id
                                    limit 1
                                ),
                                'ZZZ'
                            )
                        ),
                        ''
                    ),
                    '/',
                    ifnull(
                        (select lcase(title)
                            from collection_contents 
                            where collection_contents.collection_id=collections.id 
                                and lang='en'
                        ),
                        'ZZZZ'
                    )
                ) ".$direction
            )->withoutGlobalScopes();
        } else {
            // $locale = \App::getLocale() ?? 'en';
            $query->orderBy(
                CollectionContent::select('title')
                    // ->whereIn('lang', [$locale, '*'])
                    ->whereColumn('collections.id', 'collection_id')
                    ->limit(1)
                    ,
                $direction
            );
        }
    }
}

