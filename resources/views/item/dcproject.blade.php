@extends('item')

@section('content_additional')
@isset($item->content->dcproject)

@php 
$countries = $item->collections->where('type', 'country');
$regions = $item->collections->where('type', 'region');
@endphp

<section class="section_dcproject">
    <dl>
        {{--
        FOR NOW not nice way
        @isset($item->content->dcproject->hostOrganisations[0])
            <dt>{{ __('eiie.Host organizations') }}</dt>
            <dd>
                @foreach ($item->content->dcproject->hostOrganisations as $org)
                    {{ $org->affiliate->acronym }}
                @endforeach
            </dd>
        @endisset 
        --}}
    
        {{--
        @isset($item->content->dcproject->cooperatingOrganisations[0])
            <dt>{{ __('eiie.Cooperating organizations') }}</dt>
            <dd>
            @foreach ($item->content->dcproject->cooperatingOrganisations as $org)
                    {{ $org->affiliate->acronym }}
                @endforeach
            </dd>
        @endisset 
        --}}
    
        {{--
        @isset($countries)
            <dt>{{ __('eiie.Countries') }}</dt>
            <dd>
                @foreach($countries as $country)
                    <x-link :collection="$country" />
                @endforeach
            </dd>
        @endisset
        --}}
    
        {{--
        @isset($region)
            <dt>{{ __('eiie.Region') }}</dt>
            <dd>
                @foreach($regions as $region)
                    <x-link :collection="$region" />
                @endforeach
            </dd>
        @endisset
        --}}
    
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

        @if ($item->content->dcproject->topics_str)
        <dt>{{ __('eiie.Topics') }}</dt>
        <dd>
            {{ $item->content->dcproject->topics_str }}
        </dd>
        @endif

        @if ($item->content->dcproject->description)
        <dt>{{ __('eiie.Description') }}</dt>
        <dd>
            {!! $item->content->dcproject->description !!}
        </dd>
        @endif        

        @if ($item->content->dcproject->goals)
        <dt>{{ __('eiie.Goals') }}</dt>
        <dd>
            {!! $item->content->dcproject->goals !!}
        </dd>
        @endif

        @if ($item->content->dcproject->activity_type)
        <dt>{{ __('eiie.Activities') }}</dt>
        <dd>
            {!! $item->content->dcproject->activity_type !!}
        </dd>
        @endif

        @if ($item->content->dcproject->results)
        <dt>{{ __('eiie.Results') }}</dt>
        <dd>
            {!! $item->content->dcproject->results !!}
        </dd>
        @endif

        {{--
        <dt>{{ __('eiie.Contact') }}</dt>
        <dd>
            {{ $item->content->dcproject->contact_person_name }}
        </dd>
        --}}

        @if (isset($item->content->dcproject->url) && $item->content->dcproject->url)
            <dt>{{ __('eiie.Website') }}</dt>
            <dd>
                <a href="{{ $item->content->dcproject->url }}" class="external" rel="noopener">{{ $item->content->dcproject->url }}</a>
            </dd>
        @endif
    </dl>
</section>

@endisset
@endsection 

@section('related_items')
    {{--
    @isset($item->content->dcproject->organisations[0])
        <a name="affiliates"></a>
        <section class="affiliates_listing">                
            <h3 class="collectionHeader">{{ __('eiie.Affiliates') }}</h3>
            <ol class="collection_affiliates">
                @foreach ($item->content->dcproject->organisations as $affiliate)
                    <li>@include('shared.card', ['item' => $affiliate, 'header_level' => '4'])</li>
                @endforeach
            </ol>
        </section>
    @endisset 
    --}}
    @parent
@endsection 