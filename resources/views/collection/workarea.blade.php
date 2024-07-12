@extends('collection.base')

@section('collection_introduction_additional')
    @parent
    @include('shared.special.top_link')
@endsection 

@section('collection_content')
    <main id="collection_main" class="collection_default">
        
        <h3 class="collection_content_title">{{ __('eiie.Our work in this area') }}</h3>
        <ol class="collection_content">
            @foreach ($items as $item) 
                <li>
                    @include('shared.card', [
                        'header_level' => 4, 
                        'primary_collection_variant' => 'typology',
                        'show_blurb' => true
                    ])
                </li>
            @endforeach
        </ol>
        {{ $items->links() }}
    </main>
@endsection
