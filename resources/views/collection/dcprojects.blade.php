@extends('main')

@section('content')
    @isset ($collection)
        <x-figure 
            :item="$collection"
            class-not-found="no_lead_image" 
            preset="lead" />
    @else 
        <div class="no_lead_image"></div>
    @endisset

    <article class="article_main collection_introduction">
	    <header>
            @section('collection_header')
	            <h2>{{ $collection->content->title ?? $title ?? '' }}</h2>
            @show
	    </header>
        @yield('collection_subnavigation')

        @isset($filters) 
            <form method="get" action="{{ url()->current() }}" class="filter_search">
            @foreach ($filters as $filter)
                <label>{{ $filter['label']}}
                    <input type="search" name="filter[{{ $filter['name'] }}]" value="{{ $filter['value'] }}" />
                </label>
                {{-- 
                @if ($filter['value'])
                    <button type="submit" name="filter[{{ $filter['name'] }}]" value="">
                        {{ __('eiie.Show all') }}
                    </button>
                @endif
                --}}
            @endforeach
            <button type="submit">{{ __('eiie.Search') }}</button>
            </form>
        @endisset 

		@php
        if (isset($blurb)) {
        	echo \App\Actions\CleanHtml::clean($blurb);
        }
        @endphp

    </article>

    <main id="collection_main" class="collection_affiliates">
        @foreach ($collections as $country)
        <h3>{{ $country->content->title ?? '?' }}</h3>
        <ol class="collection_content collection_affiliates">
            @foreach ($country->items as $item)
                <li>
                    @include('shared.card', ['header_level' => 4])
                </li>
            @endforeach
        </ol>
        @endforeach
        {{ $collections->links() }}
    </main>
    
@endsection
