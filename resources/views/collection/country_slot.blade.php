@extends('main')

@section('title', $slotItem->slot->title->title)

@section('content')
    
<div class="no_lead_image"></div>
    
<article class="article_main article_single">
    <header>
	    <h2>{{ $collection->content->title ?? '' }}</h2>
        <h3>{{ $slotItem->slot->title->title }}</h3>
         <section id="article_header_meta">
	        @include('collection.country_subnavigation', ['activeSlotId' => $slotId])
         </section>
    </header>
    <main>
        
    @isset ($slotItem->item->content)
        {!! $slotItem->item->content->content !!}
    @endisset
         
    </main>
    <footer>
        <div id="footnotes"></div>
        <div id="attachments">
            @include('shared.attachments', ['item' => $slotItem->item])
        </div>
    </footer>
</article>



@endsection

