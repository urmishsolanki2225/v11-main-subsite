@extends('collection.base_landing')


@section('collection_header')
    @parent 

	@foreach ($collection->parentCollectionsOfType($collection->type) as $parent)
        <x-link :collection="$parent" class="link_back" />
    @endforeach

@endsection


@section('collection_content')
	<main id="collection_main" class="collection_default {{ $collection->layout ? 'collection_layout_'.$collection->layout : '' }}">
		
		@if ($collection->sub_collections_count > 0)
			<ul class="subcollections_list">
				@php 
				$counter = 0;
				$subCollections = $collection->subCollections()->take(6)->get()
				@endphp

				@foreach ($collection->subCollections as $sub)
					<li class="{{ $loop->index >= 5 ? 'subcollections_list_hide' : '' }}">
						<x-link :collection="$sub" />
					</li>
					@if ($loop->index == 5)
					<li class="subcollections_list_showall">
						<a href="#" class="subcollections_list_unhide_all_siblings">{{ __('eiie.Show all')}}</a>
					</li>
					@endif 
				@endforeach
			</ul>
		@endif

		<ol class="collection_content">
			@php
			$items = isset($items) ? $items : $collection->items()->paginate(config('eiie.pagination_size', 18))->onEachSide(config('eiie.pagination_oneachside',1));
			@endphp
			@foreach ($items as $item) 
				<li>
					@include('shared.card')
				</li>
			@endforeach
		</ol>
		{{-- pagination --}}
		{{ $items->links() }}

	</main>
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

    @yield('collection_subnavigation')

    @yield('before_collection_introduction')

    <x-render-content :content="$collection->content" />

    @yield('collection_introduction_additional')

    @yield('collection_content')

@endsection

@php 
unset($item)
@endphp
