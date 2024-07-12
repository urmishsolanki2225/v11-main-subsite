{{-- 
    only show siblings when current collection has exactly 1 parent and multiple subcollections 
--}}

@if (isset($collection->parentCollections[0]->subCollections) 
        && count($collection->parentCollections) == 1
        && count($collection->parentCollections[0]->subCollections) > 1)

    @section('collection_subnavigation')    
        <ol class="collection_siblings_nav">
            @foreach ($collection->parentCollections[0]->subCollections as $sibling)
                @if ($sibling->id != $collection->id)
                    <li><x-link :collection="$sibling" /></li>
                @else 
                    <li class="active"><x-link :collection="$sibling" /></li>
                @endif 
            @endforeach
        </ol>
    @endsection

@endif 
