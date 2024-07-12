@extends('collection.base')

@section('collection_header')
    @parent 


@endsection

@section('collection_content')

    <main id="collection_main" class="collection_subcollections">

        <ol class="collection_content"> 
        @foreach ($collection->subCollections as $item) 
            <li>
                @include('shared.card', [
                    'skipCollectionId' => $collection->id, 
                    'hideFirstCollection' => true,
                    'show_blurb' => true
                ])
            </li>
        @endforeach
        </ol>

    </main>
    
@endsection
