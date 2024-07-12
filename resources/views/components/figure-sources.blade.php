<figure {!! $class !!}>
    <picture>
        @foreach ($sources as $source)
            <source media="{{ $source['media'] }}" srcset="{{ $source['url'] }}" />
        @endforeach 
        <img src="{{ $url }}" alt="{{ $caption }}" />
    </picture>
    @if ($caption) 
        <figcaption>{{ $caption }}</figcaption>
    @endif
</figure>
