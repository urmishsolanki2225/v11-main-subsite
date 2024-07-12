<article class="resource_subtype_{{ $resource->subtype }}">
    <h{{ $header_level ?? '4'}}>{{ $resource->content->title ?? '' }}</h{{ $header_level ?? '4'}}>
    <span class="date">@include('shared.date', ['date' => $resource->created_at])</span>
    <span class="files">
        @isset($resource->content->resources)
            @foreach ($resource->content->resources as $res)
                {{ $res['pre'] ?? '' }}
                <a href="{{ $res['url'] }}" download rel="noopener">
                @isset ($res['label'])
                    {{ $res['label'] }}
                @else
                    @include('shared.filename', ['path' => $res['url'] ])
                @endif
                </a>
                {{ $res['post'] ?? '' }}
            @endforeach
        @endisset
    </span>
</article>
