@if (isset($item->content->videos) && count($item->content->videos))
<article class="card card-video card-video-youtube {{ $stickyClass ?? '' }}">
    <header>
        @isset ($firstColl->content)
            <span class="first-collection">{{ $firstColl->content->title }}</span>
        @else 
            <span class="first-collection">{{ __('eiie.Video') }}</span>
        @endisset
        <h{{ $header_level ?? '3'}}>{{ $item->content->title }}</h{{ $header_level ?? '3'}}>

        @include('shared.date', ['date' => $item->publish_at])
    </header>    

    <div class="video-embed-container">
        @if ($item->content->videos[0]->provider == 'youtube')
            <iframe title="{{ $item->content->title ?? '' }}" src="https://www.youtube.com/embed/{{ 
                $item->content->videos[0]->provider_id
            }}?enablejsapi=1" allow="fullscreen; picture-in-picture" allowfullscreen frameborder="0"></iframe>
        @elseif ($item->content->videos[0]->provider == 'vimeo')
            <iframe src="https://player.vimeo.com/video/{{ 
                $item->content->videos[0]->provider_id
            }}" allow="fullscreen; picture-in-picture" allowfullscreen frameborder="0"></iframe>
        @endif
     </div>
    
    @if (!empty($item->content->blurb_json) && $item->content->blurb_json != '[]')
	<div class="card-blurb">
        <x-render-content :content="$item->content" mode="text" textTag="p" blurbOnly wordLimit="{{ config('eiie.blurb-word-limit', 50) }}" />
	</div>
	@endisset
	
</article>
@endif