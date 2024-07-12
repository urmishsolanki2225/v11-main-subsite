@extends('collection.subsite-base')

@section('collection_header')
    @parent


@endsection

@section('collection_content')
    @if($collection->subCollections!="")
    <main id="collection_main" class="collection_subcollections" style="border-left: 20px solid{{$subsitedata->primary_color}} ">
        <ol class="collection_content">
        @foreach ($collection->subCollections as $item)
            <li>
                @include('shared.cards.subsite-collection_bylaws', [
                    'collection' => $item,
                    'skipCollectionId' => $collection->id,
                    'hideFirstCollection' => true
                ])
            </li>
        @endforeach
        </ol>
    </main>
    @endif
@endsection
