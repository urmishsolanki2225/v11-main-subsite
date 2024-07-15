{{--
    Generates the layout for a carousel of Items.
    skipCollectionId = skip this collection Id in the primary collection view
--}}

@php
$count = count($items);
@endphp

<div class="carousel">
<div class="carousel_items">
@foreach ($items as $item)
    @if ($item->subtype == 'video')
        @include('shared.subsite-card', ['header_level' => 2, 'skip_collection' => $skipCollectionId])
    @else
        <article>
            <header>
                @php
                    $firstColl = \App\Actions\PrimaryCollection::get(
                        $item->collections,
                        ['variant' => 'typology']
                    );
                @endphp
                @if ($firstColl)
                    @isset($firstColl->content)
                    <span class="first-collection first-collection-{{ $firstColl->content->slug }}">{{ $firstColl->content->title ?? '' }}</span>
                    @endisset
                @endif
                <x-link-subsite :item="$item">
                    <h2>{{ $item->content->title ?? '' }}</h2>
                </x-link-subsite>
                @if ($item->isOpinion() && count($item->authors))
                    <h3 class="author-names">
                        <span class="author-names-label">{{ __('eiie.written by') }}: </span>
                        @foreach ($item->authors as $author)
                            <span class="author-name">
                                {{ $author->content->title ?? '' }}@if (!$loop->last), @endif
                            </span>
                        @endforeach
                    </h3>
                @endif
            </header>
            <x-figure :item="$item" type="lead" class="figure-feature" preset="lead" />
            @include('shared.date', ['date' => $item->created_at])
        </article>
    @endif
@endforeach
</div>

<div class="carousel_controls">
    @for ($i = 0; $i < $count; ++$i)
        <span data-carousel-control-idx="{{ $i }}">{{ $i + 1 }}</span>
    @endfor
</div>

<div class="carousel_blocker" style="position:absolute;left:0;right:0;top:0;bottom:0;">

</div>

</div>
