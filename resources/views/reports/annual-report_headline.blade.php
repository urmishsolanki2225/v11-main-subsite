<article class="timeline_article">
    @include('shared.date', ['date' => $headline->publish_at])
    <h{{ $headlineLevel ?? '4'}}>{{ $headline->content->title }}</h{{ $headlineLevel ?? '4'}}>
    {{-- 
    <p>
        <x-render-content :content="$headline->content" mode="text" blurbOnly sentenceLimit="1"  XwordLimit="{{ config('eiie.blurb-word-limit', 50) }}" />
    </p>
    --}}
    <x-link :item="$headline" :query="$backLinkQuery"><span>{{ __('eiie.Read more') }}</span></x-linke>
</article>