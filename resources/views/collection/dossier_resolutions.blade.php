@extends('collection.dossier_sub')




@section('collection_content')

<main id="collection_main" class="collection_sub collection_layout_resolutions">

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
