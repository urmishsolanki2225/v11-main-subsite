@extends('subsite-main')

@section('title')
@if (isset($collection->content->title) && $collection->content->title)
    {{ $collection->content->title }}
@elseif (isset($title) && $title)
    {{ $title }}
@endif
@endsection

@section('pageclass')
    @parent

    page_collection
    page_collection_layout_{{ $collection->layout ?? 'default' }}
    page_collection_type_{{ $collection->type ?? '' }}
@endsection

@section('content')
    <x-figure
        :item="$collection"
        includeCaption
        class-not-found="no_lead_image"
        preset="lead" />
        <div class="blendmask">
    </div>
        <header class="landing_header detect_sticky">
            <a name="top"></a>
            @section('collection_header')
	            <h2>{{ $collection->content->title ?? '' }}</h2>
                <x-figure :item="$collection" type="icon" />
            @show
	    </header>
    <article class="article_main collection_introduction">

        <x-figure :item="$collection" type="portrait" preset="portrait" />
        @yield('collection_subnavigation')

        @yield('before_collection_introduction')

        <x-render-content :content="$collection->content" />

        @yield('collection_introduction_additional')

    </article>

    @yield('collection_content')

@endsection

@php
unset($item)
@endphp
