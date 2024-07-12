@extends('collection.annual-report-base')
@section('collection_header')
@parent
@endsection
@section('collection_content')
<main id="collection_main" class="collection_subcollections">
    <ol class="collection_content">
        @if($summary_data->isEmpty())
        <li>{{ __('eiie.No reports available.') }}</li>
        @else
        @foreach ($summary_data->reverse() as $year)
        @php
            $images = [];
        @endphp
            <li>
                <article class="card-collection card-library ">
                    <figure class="card_preview figure_preset_card">
                        @foreach ($images as $image)
                        <picture>
                            <img src="{{ url('' . $image->path .'/card.jpg') }}">
                        </picture>
                        @endforeach
                    </figure>
                    <header>
                        <h3>{{ __('eiie.Activity Report')}} {{ $year}}</h3>
                    </header>
                    <a href="{{ route('annual-report', ['year' => $year]) }}" rel="noopener">{{ __('eiie.Activity Report')}} {{ $year}}</a>
                </article>
            </li>
        @endforeach
    </ol>
    @endif
</main>
@endsection