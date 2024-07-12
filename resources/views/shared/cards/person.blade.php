
@section('subtitle')
@endsection


<article class="card-item card-{{ $item->type }} {{ $stickyClass ?? '' }}">
    @if (!isset($show_image) || $show_image == true)
        <x-figure type="portrait" :item="$item" preset="portrait" />
    @endif
    
    <header>
        <h{{ $header_level ?? '3'}}>{{ $item->content->title ?? '' }}</h{{ $header_level ?? '3'}}>
        @if (isset($item->content) && $item->content->subtitle) 
            <h{{ $header_level + 1 }}>{{ $item->content->subtitle }}</h{{ $header_level + 1}}>
        @endif
    </header>
    @isset ($item->content->contact)
        @include('shared.contact', ['contact' => $item->content->contact])
    @endisset
    @if (isset($show_blurb) && $show_blurb)
        <x-render-content :content="$item->content" mode="text" textTag="p" blurbOnly wordLimit="{{ config('eiie.blurb-word-limit', 50) }}" />
    @endif

    {{-- <x-link :item="$item" /> --}}
    
</article>
