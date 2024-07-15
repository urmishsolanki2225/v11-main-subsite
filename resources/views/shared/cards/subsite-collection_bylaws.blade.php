<article class="card-collection card-{{ $collection->type }} {{ $stickyClass ?? '' }}">
    <x-figure :item="$collection" class="card_preview" preset="card" />

    <header>
	    {{-- Added first collection title to item // tj --}}
        @if (isset($hideFirstCollection) && !$hideFirstCollection)
            @php
                if (isset($skipCollectionId)) {
                    $firstColl = $collection->parentCollections->firstWhere('id', '!=', $skipCollectionId);
                } else {
                    $firstColl = $collection->parentCollections->first();
                }
            @endphp
            @isset ($firstColl->content)
                <span class="first-collection">{{ $firstColl->content->title }}</span>
            @endisset
	    @endif

        <h{{ $header_level ?? '3'}}>{{ $collection->content->title ?? '' }}</h{{ $header_level ?? '3'}}>
        @yield('subtitle')

    </header>
    @if (isset($show_blurb) && $show_blurb)
        <x-render-content :content="$collection->content" mode="text" textTag="p" blurbOnly wordLimit="{{ config('eiie.blurb-word-limit', 50) }}" />
    @endif

    <x-link-subsite :collection="$collection" />

</article>
