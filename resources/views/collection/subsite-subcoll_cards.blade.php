@extends('collection.subsite-base')
@section('collection_header')
    @parent
@endsection
@section('collection_content')
    <main id="collection_main" class="collection_subcollections">
        <ol class="collection_content">
            @foreach ($collection->subCollections as $item)
                <li>
                    @include('shared.subsite-card', [
                        'collection' => $item,
                        'skipCollectionId' => $collection->id,
                        'hideFirstCollection' => true
                    ])
                </li>
            @endforeach
        </ol>
    </main>
 @endsection
