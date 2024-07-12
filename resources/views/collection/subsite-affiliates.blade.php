@extends('subsite-main')
@php $pageName = \Request::segment(2); @endphp
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
                <h2>{{ ucwords($pageName) }}</h2>
            @show
            <x-breadcrumbs/>
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
        @if(count($collections) > 0)
            @foreach ($collections as $country)
            <h3>{{ $country->content->title ?? '?' }}</h3>
            <ol class="collection_content collection_affiliates">
                @foreach ($country->items as $item)
                    <li>
                        @include('shared.card')
                    </li>
                @endforeach
            </ol>
            @endforeach
            {{ $collections->links() }}
        @else
            <div class="pt-50 pb-50"><b>{{ __('eiie.No search results') }}</b></div>
        @endif
    </main>

@endsection
