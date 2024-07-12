@extends('main')

@php 
    $query = request()->query();
@endphp

@section('title')
{{ __('eiie.Cooperation Projects') ?? __('eiie.Education International') }}
@endsection

@section('head')
    @parent 
    @routes
    @viteReactRefresh
    @vite(['resources/js/Front/CoopProject/SearchForm.tsx'])
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            window.setupForm(
                {{ Illuminate\Support\Js::from($filters) }},
                {{ Illuminate\Support\Js::from([
                    "Hide advanced filters" => __("eiie.Hide advanced filters"),
                    "Show advanced filters" => __("eiie.Show advanced filters"),
                    "Search" => __("eiie.Search"),
                    "Show all projects" => __("eiie.Show all projects"),
                ])}}
            );
        });
    </script>
@endsection 

@section('content')
<header>
    <h2>
        <a href="{{ route('coop_projects.overview') }}">
            {{__('eiie.Cooperation Projects') }}
        </a>
    </h2>   
</header>

<section class="filter_form">
    {{-- the form is constructed in js-land and injected at form_root--}}
    <div id="form_root"></div>

    <div class="form_filter_description">
        @if(!count($active_filters))
            <h3>{{ trans_choice('eiie.Showing All total Projects', $total_count, ['total' => $total_count]) }}</h3>
        @else 
            <h3>{{ trans_choice('eiie.Showing count Projects Filtered by', $total_count, ['total' => $total_count]) }}:</h3>
            @foreach($active_filters as $filter)
                <div class="filter_block">
                <span class="filter_label">{{ $filter['label'] }}:</span>
                <span class="filter_values">
                    @foreach($filter['options'] as $option)
                        <span class="filter_value">{{ $option['label'] }}</span>
                        @if(!$loop->last)
                            <em>{{ __('eiie.or') }}</em>
                        @endif
                    @endforeach
                </span>
                </div>
            @endforeach
        @endempty
    </div>

    <div class="form_sorting">
        <label>{{ __("eiie.Order By") }}:</label>
        @foreach($sorting as $sort) 
            @php 
            $sortLink = url()->current()
                ."?".Arr::query(
                    data_set($query, 'sort', $sort['name'] === $active_sort ? "-".$sort['name'] : $sort['name'])
                );
            $sortActive = $sort['name'] === $active_sort || "-".$sort['name'] === $active_sort;
            @endphp 
            <a href="{{ $sortLink }}" @class(['sort_active' => $sortActive])>{{ $sort['label'] }}</a>
        @endforeach
    </div>
</section>

<section class="dev_coop_listing">
    @php 
    $prevSubHeader = '';
    @endphp 

    @foreach($projects as $project)
        @php $subHeader = ''; @endphp
        @if($active_sort === 'period' || $active_sort === '-period')
            @php $subHeader = $project->year_start; @endphp
        @elseif($active_sort === 'country' || $active_sort === '-country')
            @php $subHeader = $project->country_name; @endphp
        @endif 
        
        @if($subHeader !== $prevSubHeader)
            <h3>{{ $subHeader }}</h3>
            @php $prevSubHeader = $subHeader; @endphp
        @endif
        <div class="dataset">
            <date>
                {{ $project->year_start }}
                @if ($project->year_start != $project->year_end)
                    &ndash; {{ $project->year_end }}
                @endif
            </date>
            <h4>
                @isset($project->content->title)
                    {{ $project->content->title }}
                @endisset
            </h4>
            
                @php 
                    $taxonomy = $project->content->item->devCoopTaxonomy()
                @endphp
                @isset($taxonomy->subCollections[0])
                    <div class="dcp_data_listing dcp_data_listing_themes">
                        <label>{{__("eiie.Themes")}}</label>
                        <ul>
                            @foreach ($taxonomy->subCollections[0]->subCollections as $theme) 
                                <li>{{ $theme->content->title ?? '' }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endisset
           
                @if ($project->partnersBenefitting->count())
                <div class="dcp_data_listing dcp_data_listing_benefitting">
                    <label>{{trans_choice("eiie.count_benefitting_organizations", $project->partnersBenefitting->count())}}</label>
                    <ul>
                        @if ($project->regional)
                            <li class="dev_coop_project_regional"><span>{{ __('eiie.Regional Project') }} 
                                @php
                                    $regions = \App\Models\Collection::where('type','region')->whereHas('subCollections', fn($q) => 
                                    $q->whereIn('sub_id', $project->partnersBenefitting->pluck('country_collection_id')))->get();
                                @endphp
                                @foreach ($regions as $region)
                                    {{ $region->content->title }}
                                    @if(!$loop->last)
                                    , 
                                    @endif
                                @endforeach
                            </span></li>
                        @endif
                        @if ($project->partnersBenefitting->count() < 10)
                            @php
                                $grouped = $project->partnersBenefitting->groupBy('country_name')
                            @endphp
                            @foreach ($grouped as $countryName => $partners)
                                @if ($countryName === '_' || $countryName === '')
                                    @foreach ($partners as $partner)
                                        <li>
                                            <span class="dev_coop_partner_nocountry non_member_partner">
                                                {{ $partner->name }}
                                                 @if ($partner->acronym)
                                                    <abbr title="{{ $partner->name }}">{{ $partner->acronym }}</abbr>
                                                @endif
                                            </span>                                           
                                        </li>
                                    @endforeach
                                @else
                                    <li>
                                        <span class="dev_coop_partner_country">
                                            {{ $countryName.":" }}
                                        </span>
                                        @foreach ($partners as $partner)
                                            @if ($partner->acronym)
                                                <abbr title="{{ $partner->name }}" @class([
                                                        'non_member_partner' => !$partner->affiliate_item_id
                                                    ])>{{ $partner->acronym }}</abbr>@if (!$loop->last), @endif
                                            @else 
                                                <span @class([
                                                        'dev_coop_partner_country_partner_name',
                                                        'non_member_partner' => !$partner->affiliate_item_id
                                                    ])>{{ $partner->name }}</span>@if (!$loop->last), @endif
                                            @endif
                                        @endforeach                                
                                    </li>
                                @endif
                            @endforeach
                        @else
                            <li><span class="dev_coop_many_partners_placeholder">{{ __('eiie.View project details to see all implementing organizations') }}</span></li>
                        @endif
                    </ul>
                    {{--
                    <span class="dcp_data_listing_totals">
                        {{ 
                            trans_choice(
                                "eiie.count_benefitting_organisations", 
                                $project->partnersBenefitting->count(),
                                ["value" => $project->partnersBenefitting->count()]
                            ) 
                        }}
                    </span>
                    --}}
                </div>
                @endif

                @if ($project->partnersDevCoop->count())
                <div class="dcp_data_listing dcp_data_listing_partners">
                    <label>{{trans_choice("eiie.count_cooperation_partners", $project->partnersDevCoop->count())}}</label>
                    <ul>
                        @php
                            $grouped = $project->partnersDevCoop->groupBy('country_name')
                        @endphp
                        @foreach ($grouped as $countryName => $partners)
                            @if ($countryName === '_' || $countryName === '')
                                @foreach ($partners as $partner)
                                    <li>
                                        <span class="dev_coop_partner_nocountry non_member_partner">
                                            {{ $partner->name }}
                                             @if ($partner->acronym)
                                                <abbr title="{{ $partner->name }}">{{ $partner->acronym }}</abbr>
                                            @endif
                                        </span>                                       
                                    </li>
                                @endforeach
                            @else
                                <li>
                                    <span class="dev_coop_partner_country">
                                        {{ $countryName.":" }}
                                    </span>
                                    @foreach ($partners as $partner)
                                        @if ($partner->acronym)
                                            <abbr title="{{ $partner->name }}" 
                                                @class([
                                                    'non_member_partner' => !$partner->affiliate_item_id
                                                ])
                                                >{{ $partner->acronym }}</abbr>@if (!$loop->last), @endif
                                        @else 
                                            <span @class([
                                                    'dev_coop_partner_country_partner_name',
                                                    'non_member_partner' => !$partner->affiliate_item_id
                                                ])>{{ $partner->name }}</span>@if (!$loop->last), @endif
                                        @endif
                                    @endforeach                                
                                </li>
                            @endif
                        @endforeach 
                    </ul>                    
                </div>
                @endif
                 @isset($project->content->item)
                    <span class="dev_coop_project_detail_link">
                        {{ __('eiie.View project details') }}
                    </span>
                @endisset

                @isset($project->content->item)
                    <x-link :item="$project->content->item">
                        {{ __('eiie.Cooperation Projects') }}:
                        {{ $project->content->title }}
                    </x-link>
                @endisset
            
        </div>
    @endforeach

    {{ $projects->links() }}
</section>

@endsection 
