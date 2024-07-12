@if (isset($item->content->embeds) && count($item->content->embeds))
    @php 
    $postUrl = $item->content->embeds[0]->post_url;
    $embedData = App\Actions\OEmbed::load($postUrl);
    clock($postUrl);
    clock($embedData);
    @endphp
    @isset($embedData->code->html)
        <article class="card card-socialembed card-socialembed-{{ $embedData->providerName }} {{ $stickyClass ?? '' }}">
            {!! $embedData->code->html !!}
        </article>
    @endif
@endif