@extends('main')

@section('content')
   <div class="no_lead_image"></div> 

    <article class="article_main collection_introduction">
	    <header>
	        <h2>{{ $title ?? '' }}</h2>
	    </header>
    </article>

    <main id="collection_main" class="collection_default">
        
        <ol class="collection_content">
            @foreach ($collections as $item) 
                <li>
                    @include('shared.card')
                </li>
            @endforeach
        </ol>
        {{ $collections->links() }}
    </main>
	    
@endsection
