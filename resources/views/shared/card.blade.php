@php
    $header_level = isset($header_level) ? $header_level : 3;
    $firstColl = false;    
@endphp 


@if ($item::class == 'App\Models\Collection')
    @includeFirst([
        'shared.cards.collection.'.$item->type, 
        'shared.cards.collection'
    ])
@elseif ($item::class == 'App\Models\Annualreport')
    @include('shared.cards.annualreport')
@else 
    @php
        $firstColl = \App\Actions\PrimaryCollection::get(
            $item->collections, 
            ['variant' => isset($primary_collection_variant) ? $primary_collection_variant : false]
        );
        $stickyClass = isset($collection) && ($collection->ordering == 'partial_date') 
                            && (isset($item->pivot) && $item->pivot->item_order < 9999999) 
                        ? 'sticky-item' 
                        : '';
        if (empty($firstColl)) {
            $stickyClass .= ' no-first-collection ';
        }
    @endphp 

    @includeFirst([
        'shared.cards.'.$item->type.'.'.$item->subtype, 
        'shared.cards.'.$item->type, 
        'shared.cards.item'
    ])
@endif 
