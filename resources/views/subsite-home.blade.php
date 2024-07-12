@extends('subsite-main')

@section('title', __('eiie.Education International'))

@section('content')

@isset($featured->items[0])
    <section id="features">
        @include('shared.subsite-carousel', ['items' => $featured->items()->take(6)->get(), 'skipCollectionId' => $featured->id])
    </section>
@endisset

<article class="article_main collection_introduction home_introduction">
	<header>
            <h2>{{ $home_item->content->title ?? __('eiie.Education International') }}</h2>
	</header>
        @isset ($home_item)
            <x-render-content :content="$home_item->content" blurbOnly />
            <p><a href="{{ route('subsite.who-we-are') }}">{{ __('eiie.Read More') }}...</a></p>
        @else
            {!! __('eiie.home_intro') !!}
        @endisset
    @isset($collection->content->title)
    <a class="link_subscribe_newsletters">{{ __("eiie.Welcome to Education International's") }} {{ $collection->content->title }} {{ __("eiie.Region!") }}</a>
    @endisset
</article>
<main id="collection_main" class="collection_default" style="border-left: 20px solid {{ $subsitedata->primary_color }}">
	<section class="collection_content news-listing">
        <h3 class="collectionHeader">{{ __('eiie.Latest Updates') }}</h3>
        <ol class="collection_content">
        @foreach ($updates as $item)
            <li>
                @include('shared.subsite-card', ['show_blurb' => true, 'primary_collection_variant' => 'typology'])
            </li>
        @endforeach
        </ol>
    </section>
    <section id="home-more-updates">
        <h3 class="collectionHeader">{{ __('eiie.More updates') }}</h3>
        <a href="{{ route('subsite.news') }}">{{ __('eiie.News') }}</a>
        <a href="{{ route('subsite.opinion') }}" class="home-more-updates-worlds-of-education">{{ __('eiie.Worlds of Education') }}</a>
        <a href="{{ route('subsite.statements') }}">{{ __('eiie.Statements') }}</a>
        <a href="{{ route('subsite.take-action') }}">{{ __('eiie.Take action!') }}</a>
    </section>
</main>
@endsection
