<article class="resource_type_{{ $resource->type }}{{ 
        isset($resource->subtype) && $resource->subtype ? ' resource_subtype_'.$resource->subtype : '' }}">
    <h{{ $header_level ?? '4'}}>{{ $resource->content->title ?? $resource->id }}</h{{ $header_level ?? '4'}}>
    <div class="resource_item">
    <span class="date">@include('shared.date', ['date' => $resource->created_at])</span>
    <span class="type">
        @php 
        $firstColl = \App\Actions\PrimaryCollection::get($resource->collections, ['variant' => 'typology']);
        if (isset($firstColl->content->title)) {
            echo $firstColl->content->title;
        }
        @endphp 
    </span>
    <span class="links">
        @if ($resource->type != 'resource')
            <x-link :item="$resource" title="{{ __('eiie.Read more') }}"/>
        @else 
            @isset($resource->content->resources)
                @foreach ($resource->content->resources as $res)
                    {{ $res['pre'] ?? '' }}
                    <a href="{{ $res['url'] }}"  rel="noopener">{{ $res['label'] ?? $res['url'] }}</a>
                    {{ $res['post'] ?? '' }}
                @endforeach
            @endisset
        @endif
    </span>
    </div>
</article>
