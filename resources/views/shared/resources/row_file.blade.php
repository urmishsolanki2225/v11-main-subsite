@php 
if (empty($header_level)) {
    $header_level = 4;
}
@endphp 
<article class="resource_subtype_{{ $resource->subtype }}">
    <h{{ $header_level ?? '4'}}>{{ $resource->content->title ?? '' }}</h{{ $header_level ?? '4'}}>
    @isset($resource->content->files[0])
        @foreach ($resource->content->files as $file)
            <div class="resource_item">
            @if (!empty($file->label))
                <h{{ ($header_level ?? 4) + 1 }}>{{ $file->label ?? '' }}</h{{ ($header_level ?? 4) + 1 }}>
            @endif
            <span class="date">@include('shared.date', ['date' => $resource->created_at])</span>
            <span class="type">{{ $resource->subtype }}</span>
            <span class="files">
                <a href="{{ route('file', $file) }}" download rel="noopener">
                    {{ __('eiie.download') }}
                </a>
            </span>
        </div>
        @endforeach
    @endisset
</article>
