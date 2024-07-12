@extends('collection.subsite-base')

@section('collection_content')

    @if (isset($collection->subCollections) && count($collection->subCollections))
        <main id="collection_main" class="collection_country">
            <ul>
            @foreach ($collection->subCollections as $country)
                @if($country->type=="country")
                <li><x-link-subsite :collection="$country" /></li>
                @endif
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
                        @include('shared.subsite-card')
                    </li>
                @endforeach
            </ol>
            {{-- pagination --}}
            {{ $items->links() }}
        </main>
    @endif

@endsection
