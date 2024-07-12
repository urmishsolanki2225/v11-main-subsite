@extends('collection.base')

@include('collection.sections.sibling_navigation')

@section('collection_introduction_additional')
    @parent
    @include('shared.special.top_link')
@endsection 

@section('collection_content')
    
    @if (isset($collection->subCollections) && count($collection->subCollections))
        <main id="collection_main" class="collection_country">

            <ul>
            @foreach ($collection->subCollections as $country) 
                <li><x-link :collection="$country" /></li>
            @endforeach
            </ul>

        </main>
    @else 
        {{-- region without subcollections, so we show the related items as a regular listing --}}
        <main id="collection_main" class="collection_default">

            <ol class="collection_content">
                @php
                $items = isset($items) ? $items : $collection->items()->paginate(config('eiie.pagination_size', 18))->onEachSide(config('eiie.pagination_oneachside',1));
                @endphp
                @foreach ($items as $item) 
                    <li>
                        @include('shared.card')
                    </li>
                @endforeach
            </ol>
            {{-- pagination --}}
            {{ $items->links() }}
        </main>
    @endif 
    
@endsection
