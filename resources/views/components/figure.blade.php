<figure {!! $class !!} {!! $style !!}>
    @isset ($sizeResponsive['srcset'])
        <img srcset="{{ $sizeResponsive['srcset'] }}"
             {{-- sizes="{{ $sizeResponsive['sizes'] }}" --}}
             src="{{ $url }}" 
             alt="{{ $caption }}" />
    @else
        <img src="{{ $url }}" alt="{{ $caption }}" />
    @endisset
    @if ($caption) 
        <figcaption>{{ $caption }}</figcaption>
    @endif
</figure>
