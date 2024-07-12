<article class="card-item card-{{ $item->type }} {{ $stickyClass ?? '' }}">
    <x-figure class=" " :item="$item" preset="card" />

    <header>
	    {{-- Added first collection title to item // tj --}}
	    @if (isset($firstColl->content))
            <span class="first-collection first-collection-{{ $firstColl->content->slug }}">{{ $firstColl->content->title ?? '' }}</span>
        @endif
	    
	    @includeWhen(
             $item->type == 'article' || $item->type == 'library', 
             'shared.date', 
             ['date' => $item->publish_at]
        )

        <h{{ $header_level ?? '3'}}>{{ $item->content->title ?? '' }}</h{{ $header_level ?? '3'}}>
        
        

        @if ($item->authors_count > 0 && (!isset($hide_author) || !$hide_author))
            <h{{ $header_level  + 1 ?? '4'}} class="card_title_author">
            @foreach ($item->authors as $author)
                <span>
                    {{ $author->content->title ?? '' }}@if (!$loop->last), @endif                    
                </span> 
            @endforeach
            </h{{ $header_level + 1 ?? '4'}}>
        @elseif (isset($item->content->subtitle) && $item->content->subtitle)
            <h{{ $header_level  + 1 ?? '4'}}>
                {{ $item->content->subtitle }}
            </h{{ $header_level + 1 ?? '4'}}>
        @endif
        
    </header>

    @if (true || (isset($show_blurb) && $show_blurb))
        <x-render-content :content="$item->content" mode="text" textTag="p" blurbOnly wordLimit="{{ config('eiie.blurb-word-limit', 50) }}" />
        @if (isset($show_blurb_readmore) && $show_blurb_readmore)
            <span>{{ __('eiie.Read more') }}</span>
        @endif
    @endif

    <x-link :item="$item" />
    
</article>
