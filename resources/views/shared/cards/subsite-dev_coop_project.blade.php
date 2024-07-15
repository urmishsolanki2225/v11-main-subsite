@php
$itemContent = $item->contents()->withoutGlobalScopes()->first();
@endphp
<article class="card-item card-{{ $item->type }} {{ $stickyClass ?? '' }}">


    <div class="dev_coop_project_card_countries">
        @foreach($itemContent->devCoopProject->partnerBenefittingCountries as $country)
            <span>{{ $country->content->title }}@if (!$loop->last), @endif</span>
        @endforeach
    </div>

    <x-figure class=" " :item="$item" preset="card" classNotFound="dev_coop_project_card_no_lead_image" />

    <h{{ $header_level ?? '3'}}>{{ $itemContent->title ?? '' }}</h{{ $header_level ?? '3'}}>

    <div class="dev_coop_project_card_period">
        {{ $itemContent->devCoopProject->year_start }}
        {{ $itemContent->devCoopProject->year_end
                && $itemContent->devCoopProject->year_end != $itemContent->devCoopProject->year_start
            ? " - ".$itemContent->devCoopProject->year_end
            : "" }}
    </div>

    @isset($itemContent->devCoopProject->description)
        <div class="dev_coop_project_card_description">
            <x-render-content :content="$itemContent->devCoopProject->description" mode="text" wordLimit="{{ config('eiie.blurb-word-limit', 50) }}" />
        </div>
    @endisset

    <x-link-subsite :item="$item" />

</article>
