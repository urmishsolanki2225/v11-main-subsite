@extends('main')

@php
if (!isset($show_blurb)) {
    $show_blurb = false;
}
@endphp 

@section('content')
   <div class="no_lead_image"></div> 

    <article class="article_main collection_introduction">
	    <header>
	        <h2>{{ $title ?? '' }}</h2>
	    </header>
    </article>

    <main id="collection_main" class="collection_default">
        
        <ol class="collection_content">
            @foreach ($items as $item) 
                <li>
                    @include('shared.card', ['show_blurb' => $show_blurb])
                </li>
            @endforeach
        </ol>
        {{ $items->links() }}
    </main>
	    
@endsection
