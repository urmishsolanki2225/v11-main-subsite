<article class="card-resource card-resource-file {{ $stickyClass ?? '' }}">
    <x-figure class=" " :item="$item" preset="coverpage_card" />

    <header>
	    @isset ($firstColl->content)
            <span class="first-collection">{{ $firstColl->content->title }}</span>
        @endisset

        @isset ($item->content->title)
            <h{{ $header_level ?? '3'}}>
                {{ $item->content->title }}
            </h{{ $header_level ?? '3'}}>
        @endisset 
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
        @include('shared.date', ['date' => $item->publish_at])
        
    </header>

    @if (!empty($item->content->blurb_json) && $item->content->blurb_json != '[]')
	<div class="card-blurb">
        <x-render-content :content="$item->content" mode="text" textTag="p" blurbOnly wordLimit="{{ config('eiie.blurb-word-limit', 50) }}" />
	</div>
    <x-link :item="$item" class="resource-file-article-link"/>
	@endif

    @if(!empty($item->content->files))
        <ol class="files">
            @foreach ($item->content->files as $file)
                <li>
                    <a href="{{ route('file', $file) }}" download rel="noopener">
                        {{ $file->label ? $file->label : __('eiie.download') }}
                    </a>
                </li>
            @endforeach        
        </ol>
    @endif 

</article>
