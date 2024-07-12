@extends('collection.base')

{{--
  special collection view for regions sublistings
--}}

@include('collection.sections.sibling_navigation')

@section('collection_content')

    <main id="collection_main" class="collection_country">

        @foreach ($collection->subCollections as $i => $regions)
            @if ($i > 0) 
                <h3>{{ $regions->content->title ?? '' }}</h3>
            @endif

            <ul>
                @foreach ($regions->subCollections as $region) 
                    <li><x-link :collection="$region" /></li>
                @endforeach
            </ul>
        @endforeach 

    </main>
    
@endsection
