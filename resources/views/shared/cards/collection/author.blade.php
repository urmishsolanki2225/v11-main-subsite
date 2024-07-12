<article class="card-author {{ $stickyClass ?? '' }}">
    @if (!isset($show_image) || $show_image == true)
        <x-figure type="portrait" :item="$item" preset="portrait" />
    @endif

    <header>
	    <!-- Added first collection title to item // tj -->
	    @isset ($item->collections[0])
            <span class="first-collection">{{ $item->collections[0]->content->title }}</span>
        @endisset
	    
        <h{{ $header_level ?? '3'}}>{{ $item->content->title ?? '' }}</h{{ $header_level ?? '3'}}>
       
    </header>

    @if (isset($show_blurb) && $show_blurb)
        <x-render-content :content="$item->content" mode="text" textTag="p" blurbOnly wordLimit="{{ config('eiie.blurb-word-limit', 50) }}" />
    @endif

    <x-link :collection="$item">{{ __('eiie.Read more')}}</x-link>
    
</article>
