@extends('collection.base')

@include('collection.sections.sibling_navigation')

@section('collection_content')

    <main id="collection_main" class="collection_persons">

    @if (count($collection->subCollections) == 0) 
        <ol class="collection_content"> 
            @foreach (isset($items) ? $items : $collection->items as $item) 
                <li>
                    <x-figure type="portrait" :item="$item" preset="portrait" />
                    <h4><x-link :item="$item" /></h4>
                    @isset ($item->content->subtitle)
                        <h5>{{ $item->content->subtitle }}</h5>
                    @endisset
                </li>
            @endforeach
        </ol>
    @else 
        {{-- grouped in subcollections --}}
        @foreach ($collection->subCollections as $sub) 
            <h3>{{ $sub->content->title }}</h3>
            <ol class="collection_content"> 
                @foreach ($sub->items as $item) 
                    <li>
                        <x-figure type="portrait" :item="$item" preset="portrait" />
                        <h4><x-link :item="$item" /></h4>
                        @isset ($item->content->subtitle)
                            <h5>{{ $item->content->subtitle }}</h5>
                        @endisset
                    </li>
                @endforeach
            </ol>
        @endforeach
    @endif 

    </main>
    
@endsection
