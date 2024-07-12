@extends('subsite-main')

@php
if (!isset($show_blurb)) {
    $show_blurb = false;
}
@endphp

@section('content')
   <div class="no_lead_image"></div>

    <article class="article_main collection_introduction">
	    <header>
	        <h2>
                @if($title=="Video Resources")
                    {{__('eiie.Video')}} {{__('eiie.Resources')}}
                @endif
            </h2>
            <x-breadcrumbs />
	    </header>
    </article>

    <main id="collection_main" class="collection_default">
        @if($items->count() > 0 )
        <ol class="collection_content">
            @foreach ($items as $item)
                <li>
                    @include('shared.subsite-card', ['show_blurb' => $show_blurb])
                </li>
            @endforeach
        </ol>
        {{ $items->links() }}
        @else
        <ol class="collection_content">
            <h3>{{__('eiie.No record found')}}</h3>
        </ol>
        @endif
    </main>

@endsection
