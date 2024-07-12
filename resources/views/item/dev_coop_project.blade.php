@extends('item')

@php 

$countries = $item->collections->where('type', 'country');
$regions = $item->collections->where('type', 'region');

$itemContent = $item->content ?: $item->content()->withoutGlobalScopes()->first();

@endphp

@section('title')
{{ $itemContent->title ?? __('eiie.Education International') }}
@endsection

@section('content')

<article class="single item-dcprojects">
    
    <header>
        <h2>
            <a href="{{ route('coop_projects.overview') }}">
                {{__('eiie.Cooperation Projects') }}
            </a>
        </h2>
        <x-figure type="lead" 
        :item="$item" 
        class-not-found="no_lead_image" 
        includeCaption
        preset="{{ $item->subtype == 'file' ? 'coverpage' : 'lead' }}"
        />
        <h3>{{ $itemContent->title ?? '' }}</h3>
    </header>
    <section class="dev_coop_project_benefitting_countries dcprojects-meta">
        <dl>
            <dt>
                @if ($itemContent->devCoopProject->regional)
                    <span class="dev_coop_project_regional">{{ __('eiie.Regional Project') }}: 
                        @php
                            $regions = \App\Models\Collection::where('type','region')->whereHas('subCollections', fn($q) => 
                            $q->whereIn('sub_id', $itemContent->devCoopProject->partnersBenefitting->pluck('country_collection_id')))->get();
                        @endphp
                        @foreach ($regions as $region)
                            {{ $region->content->title }}
                            @if(!$loop->last)
                            , 
                            @endif
                        @endforeach
                    </span>
                @endif
                {{ trans_choice("eiie.Benefitting Countries", $itemContent->devCoopProject->partnerBenefittingCountries->count()) }}
            </dt>
           
                @foreach ($itemContent->devCoopProject->partnerBenefittingCountries as $country)
                <dd><a href='{{ route("coop_projects.index",["filter" => ["country" => $country->id]]) }}'>
                        {{ $country->content->title }}
                    </a></dd>
                @endforeach            
        </dl>
    </section>

<section class="dev_coop_project_content single-main">
    @isset($itemContent->devCoopProject->description)
        <div class="dev_coop_project_description {{ 
            !empty($itemContent->devCoopProject->objectives) ? 'has-next-step' : '' 
        }}">
            <h4>{{ __("eiie.Description") }}</h4>
            <x-render-content :content="$itemContent->devCoopProject->description" />
        </div>
    @endisset

    @isset($itemContent->devCoopProject->objectives)
        <div class="dev_coop_project_objectives {{ 
            !empty($itemContent->devCoopProject->activities) ? 'has-next-step' : '' 
        }}">
            <h4>{{ __("eiie.Objectives") }}</h4>
            <x-render-content :content="$itemContent->devCoopProject->objectives" />
        </div>
    @endisset

    @isset($itemContent->devCoopProject->activities)
        <div class="dev_coop_project_activities {{ 
            !empty($itemContent->devCoopProject->outcomes) ? 'has-next-step' : '' 
        }}">
            <h4>{{ __("eiie.Activities") }}</h4>
            <x-render-content :content="$itemContent->devCoopProject->activities" />
        </div>
    @endisset

    @isset($itemContent->devCoopProject->outcomes)
        <div class="dev_coop_project_outcomes">
            <h4>{{ __("eiie.Outcomes") }}</h4>
            <x-render-content :content="$itemContent->devCoopProject->outcomes" />
        </div>
    @endisset   
</section>


<section class="dev_coop_project_details single-side">
    <x-figure type="card" class="dev_coop_project_image" :item="$item" />
    <dl>
        <dt>{{ __('eiie.Period') }}</dt>
        <dd>{{ $itemContent->devCoopProject->year_start }}
            @if ($itemContent->devCoopProject->year_start != $itemContent->devCoopProject->year_end)
                    &ndash; {{ $itemContent->devCoopProject->year_end }}
                @endif
        </dd>
    </dl>
    @php 
    $allPartners = [
        [
            'grouped' => $itemContent->devCoopProject->partnersBenefitting->groupBy('country_name'),
            'label' => trans_choice('eiie.count_benefitting_organizations', $itemContent->devCoopProject->partnersBenefitting->count())
        ],
        [
            'grouped' => $itemContent->devCoopProject->partnersDevCoop->groupBy('country_name'),
            'label' => trans_choice('eiie.count_cooperation_partners', $itemContent->devCoopProject->partnersDevCoop->count())
        ]
    ];
    @endphp
    @foreach ($allPartners as $partners)
    @if (count($partners['grouped']))
    <dl>    
        <dt>{{ $partners['label'] }}</dt>
        <dd>
            @foreach ($partners['grouped'] as $countryName => $partners)
                @if ($countryName === '_' || $countryName === '')
                    @foreach ($partners as $partner)
                        <span class="dev_coop_partner_nocountry non_member_partner">
                            {{ $partner->name }}
                        </span>
                        <ul>
                            <li>
                                <a href='{{ route("coop_projects.index", ["filter" => ["partner" => $partner->name ]]) }}' class="non_member_partner">
                                    {{ $partner->name }}
                                    @if ($partner->acronym)
                                        <abbr title="{{ $partner->name }}">{{ $partner->acronym }}</abbr>
                                    @endif
                                </a>
                            </li>
                        </ul>
                    @endforeach
                @else
                    <span class="dev_coop_partner_country">
                        {{ $countryName }}
                    </span>
                    <ul>
                        @foreach ($partners as $partner)
                            <li>
                                <a href='{{ route("coop_projects.index", ["filter" => ["partner" => $partner->name ]]) }}' @class([
                                    'non_member_partner' => !$partner->affiliate_item_id
                                ])>
                                    {{ $partner->name }}
                                    @if ($partner->acronym)
                                        <abbr title="{{ $partner->name }}">{{ $partner->acronym }}</abbr>
                                    @endif
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @endif
            @endforeach
        </dd>
    </dl>
    @endif
    @endforeach
    
    @php 
    $taxonomy = $item->devCoopTaxonomy()
    @endphp
    @isset($taxonomy)
        @foreach ($taxonomy->subCollections as $taxonomySub)
            @if($taxonomySub->subCollections->count())
            <dl>
                <dt>{{ $taxonomySub->content->title ?? '' }}</dt>
                <dd>
                    <ul>
                        @foreach ($taxonomySub->subCollections as $collection)
                            <li>
                                <a href='{{ route("coop_projects.index",["filter" => ["taxonomy" => $collection->id]]) }}'>
                                    {{ $collection->content->title ?? '' }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </dd>
            </dl>
            @endif
        @endforeach
    @endisset
        
    @isset ($itemContent->devCoopProject->public_email)
        <dl>    
            <dt>{{ __('eiie.Contact') }}</dt>
            <dd>
                {{ Html::mailto($itemContent->devCoopProject->public_email) }}
            </dd>
        </dl>
    @endisset
    
    @isset ($itemContent->devCoopProject->url)
        <dl>
            <dt>{{ __('eiie.Website') }}</dt>
            <dd>
                {{ Html::a($itemContent->devCoopProject->url, $itemContent->devCoopProject->url)->target("_blank") }}
            </dd>
        </dl>
    @endisset

     @if($item->attachmentGroups()->count())
        <dl>
            <dt>{{ __('eiie.Attachments') }}</dt>
            <dd>
                <div id="attachments">
                    @include('shared.attachments')
                </div>
            </dd>
        </dl>
    @endif

</section>

</article>

@endsection 

