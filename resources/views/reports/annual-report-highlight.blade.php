@extends('main')

@section('title', $highlight->content->title)

@section('content')
    <x-figure type="lead" :item="$highlight->allImages()->first()" class-not-found="no_lead_image" includeCaption />
    <x-annual-report.back-to-report-button />
    <article class="article_main article_single">
        <header>
            <x-figure type="portrait" :item="$highlight->content" preset="portrait" />
            <h2>{{ $highlight->content->title ?? '' }}</h2>
            <p>{{ Carbon\Carbon::now()->startOfMonth()->set('month', $highlight->month)->set('year', $highlight->year)->isoFormat('MMMM YYYY') }}</p>
        </header>
    <main>
        <x-render-content :content="$highlight->content" />
    </main>    
</article>

<section id="highlight_related_items" class="collection_content related_collection">
    <h3 class="collectionHeader">{{ __('eiie.Related Items') }}</h3>
    @if(count($highlight->items) > 0)
    <ol class="collection_content">
        @foreach($highlight->items as $item)
            <li>
                @include('shared.card')
            </li>
        @endforeach
    </ol>
    @endif
</section>
@endsection