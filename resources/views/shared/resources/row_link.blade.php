<article class="resource_subtype_{{ $resource->subtype }}">
    <h{{ $header_level ?? '4'}}>{{ $resource->content->title ?? '' }}</h{{ $header_level ?? '4'}}>
    <div class="resource_item">
    <span class="date">@include('shared.date', ['date' => $resource->publish_at])</span>
    <span class="type">{{ $resource->subtype }}</span>
    @if(false && !empty($resource->content->blurb))
        <p class="description">{!! $resource->content->blurb !!}</p>
    @endif 
    <span class="links">
        @isset($resource->content->links)
            @foreach ($resource->content->links as $link)
                <a href="{{ $link->url }}" rel="noopener" target="_blank">{{ __('eiie.Visit website') }}</a>
            @endforeach
        @endisset
    </span>
    </div>
</article>
