@extends('collection.base')

@include('collection.sections.sibling_navigation')

@section('collection_content')

    <main id="collection_main" class="collection_jobs">

        @if (count($collection->items))
            {{-- <h3>{{ __('eiie.Current Vacancies') }}</h3> --}}
            <ol class="collection_content"> 
                @foreach ($collection->items as $item) 
                    <li>
                    @include('shared.card', [
                        'xheader_level' => 4, 
                        'show_blurb' => true
                    ])
                    </li>
                @endforeach
            </ol>
        @else
            <h3>{{ __('eiie.No Vacancies') }}</h3>
        @endif 
    
    </main>
    
@endsection
