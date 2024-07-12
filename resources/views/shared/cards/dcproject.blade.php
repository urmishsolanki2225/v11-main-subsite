<article class="card-item card-{{ $item->type }} {{ $stickyClass ?? '' }}">
    <x-figure class=" " :item="$item" preset="card" />

    <header>
	    {{-- Added first collection title to item // tj --}}
	    @isset ($firstColl->content)
            <span class="first-collection">{{ $firstColl->content->title }}</span>
        @endisset
	    
	    @includeWhen(
             $item->type == 'article' || $item->type == 'library', 
             'shared.date', 
             ['date' => $item->publish_at]
        )

        <h{{ $header_level ?? '3'}}>{{ $item->content->title ?? '' }}</h{{ $header_level ?? '3'}}>
        
        @if (isset($item->content->subtitle) && $item->content->subtitle)
            <h{{ $header_level  + 1 ?? '4'}}>
                {{ $item->content->subtitle }}
            </h{{ $header_level + 1 ?? '4'}}>
        @endif 
        
    </header>

    <dl>
        @if ($item->content->dcproject->host_orgs_str)
        <dt>{{ __('eiie.Host organizations') }}</dt>
        <dd>
            {{ $item->content->dcproject->host_orgs_str }}
        </dd>
        @endif

        @if ($item->content->dcproject->coop_orgs_str)
        <dt>{{ __('eiie.Cooperating organizations') }}</dt>
        <dd>
            {{ $item->content->dcproject->coop_orgs_str }}
        </dd>
        @endif

        @if ($item->content->dcproject->countries_str)
        <dt>{{ __('eiie.Countries') }}</dt>
        <dd>
            {{ $item->content->dcproject->countries_str }}
        </dd>
        @endif

        @if ($item->content->dcproject->started_at)
        <dt>{{ __('eiie.Start date') }}</dt>
        <dd>
            @include('shared.date', ['date' => $item->content->dcproject->started_at])
        </dd>
        @endif

        @if ($item->content->dcproject->ended_at)
        <dt>{{ __('eiie.End date') }}</dt>
        <dd>
            @include('shared.date', ['date' => $item->content->dcproject->ended_at])
        </dd>
        @endif
    </dl>
    
    <x-link :item="$item" />
    
</article>


    