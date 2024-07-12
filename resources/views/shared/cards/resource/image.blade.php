@isset($item->content->images[0])

<article class="card-resource card-resource-file card-resource-image {{ $stickyClass ?? '' }}">
    <x-figure class=" " :item="$item" preset="card" />

    <header>
	    @isset ($firstColl->content)
            <span class="first-collection">{{ $firstColl->content->title }}</span>
        @endisset

        @if (isset($item->content->subtitle) && $item->content->subtitle)
            <h{{ $header_level ?? '3'}}>
                {{ $item->content->subtitle }}
            </h{{ $header_level ?? '3'}}>
        @endif 
        @include('shared.date', ['date' => $item->publish_at])
        
    </header>

    @if (isset($showSocialLinks) && $showSocialLinks) 
        @php 
            $shareUrl = url()->current();

            $shareUrl = request()->fullUrlWithQuery([
                '_sharemg' => $item->id, '_h' => Hash::make($item->id, [ 'round' => 6])
            ]);
             $shareContent = new \App\View\Components\RenderContent(
                $item->content,
                'text',
                null,
                null,
                true // blurbOnly
            );
            $shareText = $shareContent->output;
            //$shareImg = url('/img/'.$item->content->images[0]->path);
        @endphp 
        <div class="social_share_links">
            <span class="social_share_invite">{{ __('eiie.Share this image') }}</span>
            <a class="social_share_link_twitter" target="_blank" href="https://twitter.com/intent/tweet?text={{ urlencode(Str::limit($shareText, 200).' '.$shareUrl) }}">twitter</a>
            <a class="social_share_link_facebook" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode($shareUrl) }}&display=page&quote={{ urlencode($shareText) }}">facebook</a>
            <a class="social_share_link_whatsapp" target="_blank" href="https://wa.me/?text={{ urlencode(Str::limit($shareText, 300).' '.$shareUrl) }}">whatsapp</a>
        </div>
    @endif

    <ol class="resource_images">
        @foreach ($item->content->images as $imageFile)
            <li>
                <a href="/img/{{ $imageFile->path }}" download>
                    {{ $imageFile->label ?? __('eiie.download') }}
                </a>
            </li>
        @endforeach
    </ol>

</article>
@else 
{{ $item->id }} has no images??
@endisset
