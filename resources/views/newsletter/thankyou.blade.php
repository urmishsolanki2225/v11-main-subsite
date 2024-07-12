@extends('main')

@section('content')

<article class="article_main collection_introduction newsletters_introduction">
	<header>
            <h2>{{ $newsletters_item->content->title ?? __('eiie.Our Newsletters') }}</h2>            
	</header>
    @isset ($newsletters_item)
        <x-render-content :content="$newsletters_item->content" blurbOnly />
    @endisset
</article>

<section>
    <h2 class="newsletter_status">{{ $status }}</h2>
    <!-- {{ $status_code }} -->
    <p><a href="{{ route('contact.newsletter') }}">{{ __('eiie.Return to subscription page.') }}<a></p>
</section>

@endsection 
