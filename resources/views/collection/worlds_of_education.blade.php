@extends('collection.base_landing')

@section('collection_header')
    <h2>{{ $collection->content->title ?? '' }}</h2>
@endsection

@section('before_collection_introduction')
    @if(!empty($collection->content->subtitle))
        <h3>{{ $collection->content->subtitle ?? '' }}</h3>
    @endif
@endsection

@section('article_header_class', 'detect-sticky')

@section('collection_introduction_additional')
    <x-newsletter-signup-carousel></x-newsletter-signup-carousel>
@endsection 

@section('collection_content')
	<main id="collection_main" class="collection_default {{ $collection->layout ? 'collection_layout_'.$collection->layout : '' }}">
		
        @php 
            $series = \App\Models\Collection::withoutGlobalScopes()
                ->find(config('eiie.collection.worlds_of_education_thematic_series', 0));
        @endphp 
        @if ($series)
            <h3>{{ __('eiie.Thematic Series') }}</h3>
            <ul class="subcollections_list detect_sticky">
				@foreach ($series->subCollections as $sub)
					<li>
						<x-link :collection="$sub" />
					</li>
				@endforeach
			</ul>
        @endif 

        <h3>{{ __('eiie.Recent Posts') }}</h3>
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
