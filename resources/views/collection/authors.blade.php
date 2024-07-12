@extends('main')

@section('content')
    @isset ($leadImage)
        <x-figure 
            :item="$leadImage"
            class-not-found="no_lead_image" />
    @else 
        <div class="no_lead_image"></div>
    @endisset

    <article class="article_main collection_introduction">
	    <header>
            @section('collection_header')
	            <h2>{{ $title ?? '' }}</h2>
            @show
	    </header>
        @yield('collection_subnavigation')

        @isset($filter) 
            <form method="get" action="{{ url()->current() }}" class="filter_search">
                <input type="search" name="filter[{{ $filter['name'] }}]" value="{{ $filter['value'] }}" />
                <button type="submit">{{ __('eiie.Search') }}</button>
            </form>
            @if ($filter['value'])
                <form method="get" action="{{ url()->current() }}" class="filter_search">
                    <input type="hidden" name="filter[{{ $filter['name'] }}]" value="" />
                    <button type="submit">{{ __('eiie.Show all') }}</button>
                </form>
            @endif
        @endisset 

		@php
        if (isset($blurb)) {
        	echo \App\Actions\CleanHtml::clean($blurb);
        }
        @endphp

    </article>

    <main id="collection_main" class="collection_collections {{ $collectionClass ?? '' }}">
        <ol class="collection_content"> 
            @foreach ($collections as $item) 
                <li>
                    @include('shared.card', ['show_image' => false])
                </li>
            @endforeach
        </ol>
        {{ $collections->links() }}
    </main>
    
@endsection
