@extends('collection.default')

@section('content')
    <x-figure 
        :item="$collection"
        include-caption="true" 
        class-not-found="no_lead_image" 
		preset="lead" />

    <article class="article_main collection_introduction">
	    <header>
            @section('collection_header')
	            <h2>{{ $collection->content->title ?? '' }}</h2>
                <x-figure :item="$collection" type="icon" />
            @show
	    </header>
		@isset($collection->portraitImages[0])
	        <x-figure :item="$collection" type="portrait" />
		@else 
			<figure class="author_fallback_portrait">
				<img src="/images/author_fallback.svg" alt="Fallback portrait authors" />
			</figure>
		@endisset

        @yield('collection_subnavigation')		

    </article>

	<main id="collection_main" class="collection_default">
		<x-render-content :content="$collection->content" blurbOnly />

		@if ($collection->sub_collections_count > 0)
			<ul class="subcollections_list">
				@php 
				$subCollections = $collection->subCollections()->take(6)->get()
				@endphp

				@foreach ($subCollections as $sub)
					<li><x-link :collection="$sub" /></li>
				@endforeach
			</ul>
			ToDo link to all subcollections
		@endif

        <h3 class="collection_content_title">{{ 
			__('eiie.Articles written by', 
				['name' => 
					isset($collection->content->title) ? $collection->content->title : '?'
				]
			 ) }}</h3>
		<ol class="collection_content">
			@php
			$items = isset($items) ? $items : $collection->items()->paginate(config('eiie.pagination_size', 18))->onEachSide(config('eiie.pagination_oneachside',1));
			@endphp
			@foreach ($items as $item) 
				<li>
					@include('shared.card', [
						'header_level' => 4,
						'show_blurb' => true,
					])
				</li>
			@endforeach
		</ol>
		{{-- pagination --}}
		{{ $items->links() }}

	</main>

@endsection
