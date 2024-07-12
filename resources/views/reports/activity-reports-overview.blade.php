@extends('main')

@section('title', $collection->content->title ?? '')

@section('content')
    <x-figure :item="$collection" includeCaption preset="lead" />
    <div class="blendmask"></div>
    <header class="landing_header detect_sticky">
        <a name="top"></a>
        @section('collection_header')
            <h2>{{ $collection->content->title ?? '' }}</h2>
            <x-figure :item="$collection" type="icon" />
        @show
    </header>

    <section id="annual_reports_listing">
        <h3>{{ __('eiie.Annual Reports') }}</h3>
        {{-- <p>{{ __('eiie.Annual Reports Introduction') }}</p> --}}
        @foreach ($annualReports as $annualReport)
            @include('shared.card', ['item' => $annualReport, 'header_level' => 4])
        @endforeach
    </section>

    <section id="world_congress_reports_listing">
        @if(count($worldCongressReports))
            <h3>{{ __('eiie.Reports to the World Congress') }}</h3>
        @endif
        {{-- <p>{{ __('eiie.Reports to the World Congress Introduction') }}</p> --}}
        @foreach ($worldCongressReports as $worldCongressReport)
            @include('shared.card', ['item' => $worldCongressReport, 'header_level' => 4])
        @endforeach
    </section>


@endsection
