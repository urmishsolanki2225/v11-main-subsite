@extends('main')

@section('content')
   <div class="no_lead_image"></div> 

    <article class="article_main collection_introduction">
	    <header>
	        <h2>{{ __('eiie.Podcasts') }}</h2>
	    </header>
    </article>

    <main id="collection_main" class="collection_default collection_soundcloud">
        
        <ol class="collection_content">
            @foreach ($paginated as $track) 
                @php 
                $embed = \App\Actions\OEmbed::load($track['permalink_url']);
                if (!isset($track['created_at'])) {
                    echo '<!-- ';
                    print_r($track);
                    echo '-->';
                    continue;
                }
                $time = new \Carbon\Carbon($track['created_at']);
                @endphp 
                
                @if ($embed->title)
                <li>
                    <article class="card card-soundcloud">
                        <header>
                            <h3>{{ $track['title'] }}</h3>

                            @include('shared.date', ['date' => $time])
                        </header>    

                        <div class="soundcloud-embed-container">
                            {!! $embed->code->html !!}
                        </div>
                        
                        @if ($track['description'])
                        <div class="card-blurb">
                            <p>
                                {{ $track['description'] }}
                            </p>
                        </div>
                        @endif
                        
                    </article>
                </li>
                @endif
            @endforeach
        </ol>
        {{ $paginated->links() }}
    </main>
	    
@endsection
