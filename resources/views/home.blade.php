@extends('main')

@section('title', __('eiie.Education International'))

@section('content')

@isset($featured->items[0])
    <section id="features">
        @include('shared.carousel', ['items' => $featured->items()->get(), 'skipCollectionId' => $featured->id])
    </section>
@endisset

<article class="article_main collection_introduction home_introduction">
	<header>
            <h2>{{ $home_item->content->title ?? __('eiie.Education International') }}</h2>            
	</header>
        @isset ($home_item)
            <x-render-content :content="$home_item->content" blurbOnly />
        @else 
            {!! __('eiie.home_intro') !!}
        @endisset
    <a class="link_subscribe_newsletters" href="{{ route('contact.newsletter') }}">{{ __('eiie.Subscribe to Our Newsletters') }}</a>
</article>
@isset ($priorities->subCollections[0])
<section id="workareas">
     <h3 class="collectionHeader" >
        {{ $priorities->content->title ?? __('eiie.Our Priorities') }}
    </h3>
    <x-figure :item="$priorities" class="workareas_image" preset="lead" />
    <div class="workareas_intro">
        <x-render-content :content="$priorities->content" blurbOnly />
    </div>
    <ol id="workareas_list">
	@foreach ($priorities->subCollections as $workarea)
        <li>
            <x-link :collection="$workarea">
                {{-- <x-figure :item="$workarea" type="icon" class="collection_icon workarea_icon" /> --}}
				<h4>
						{{ $workarea->content->title ?? '?'}}
				</h4>
            </x-link>
        </li>
    @endforeach
    </ol>
</section>
@endisset 

<main id="collection_main" class="collection_default">
	<section class="collection_content news-listing">
        <h3 class="collectionHeader">{{ __('eiie.Latest Updates') }}</h3>
        <ol class="collection_content">
        @foreach ($updates as $item)
            <li>
                @include('shared.card', ['show_blurb' => true, 'primary_collection_variant' => 'typology'])
            </li>
        @endforeach
        </ol>
    </section>

    <section id="home-more-updates">
        <h3 class="collectionHeader">{{ __('eiie.More updates') }}</h3>
        <a href="{{ route('news') }}">{{ __('eiie.News') }}</a>
        <a href="{{ route('opinion') }}" class="home-more-updates-worlds-of-education">{{ __('eiie.Worlds of Education') }}</a>
        <a href="{{ route('statements') }}">{{ __('eiie.Statements') }}</a>
        <a href="{{ route('take-action') }}">{{ __('eiie.Take action!') }}</a>
    </section>
</main>
@endsection
