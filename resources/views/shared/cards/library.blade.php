<article class="card-item card-item-library {{ $stickyClass ?? '' }}">

    <header>
	    {{-- Added first collection title to item // tj --}}
	    @isset ($firstColl->content)
            <span class="first-collection">{{ $firstColl->content->title }}</span>
        @endisset
	    
	    @include('shared.date', 
             ['date' => $item->publish_at]
        )

        <h{{ $header_level ?? '3'}}><x-link :item="$item" /></h{{ $header_level ?? '3'}}>
        
         @if ($item->authors_count > 0)
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

    {{-- <x-link :item="$item" /> --}}
    
</article>
