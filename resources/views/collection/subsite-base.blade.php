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

@section('article_mainClass')
@endsection

@section('content')
    <x-figure
        :item="$collection"
        includeCaption
        class-not-found="no_lead_image"
        preset="lead" />

    <article class="article_main collection_introduction @yield('article_main_class')">
	    <header class=" @yield('article_header_class')">
            <a name="top"></a>
            @section('collection_header')
	            <h2>{{ $collection->content->title ?? '' }}</h2>
                <x-breadcrumbs :item="$collection"/>
                <x-figure :item="$collection" type="icon" />
            @show
	    </header>
        <x-figure :item="$collection" type="portrait" preset="portrait" />
        @yield('collection_subnavigation')
        @isset($collection->content)
        <x-render-content :content="$collection->content" />
        @endisset
        @yield('collection_introduction_additional')

    </article>

    @yield('collection_content')

@endsection

@php
unset($item)
@endphp
