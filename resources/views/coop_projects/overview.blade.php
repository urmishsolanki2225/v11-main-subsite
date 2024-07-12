@extends('main')

@section('title')
{{ __('eiie.Cooperation Projects') ?? __('eiie.Education International') }}
@endsection

@section('head')
    @parent 
    @routes
    @viteReactRefresh
    @vite(['resources/js/Front/CoopProject/Map.tsx', 'resources/js/Front/CoopProject/SearchForm.tsx'])

    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            window.renderMap(
                document.getElementsByClassName('dev_coop_map_container')[0], 
                document.getElementsByClassName('dev_coop_map_details_container')[0],
            {
                mapData: {{ Illuminate\Support\Js::from($map_data) }},
                translations: {{ Illuminate\Support\Js::from([
                    "Current Projects" => __("eiie.Current Projects"),
                    "Total Projects" => __("eiie.Total Projects"),
                    "EI Members from this country involved in Cooperation Projects" => __("eiie.EI Members from this country involved in Cooperation Projects"),
                    "Selected country" => __("eiie.Selected country"),
                    "Partner countries" => __("eiie.Partner countries"),
                    "Partner Countries" => __("eiie.Partner Countries"),
                    "View all Cooperation Projects involving partners from" => __('eiie.View all Cooperation Projects involving partners from'),
                    "map_intro_headline" => __("eiie.map_intro_headline"),
                    "map_intro_text" => __("eiie.map_intro_text")
                ]) }}
            });

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
<header class="detect_sticky">
    <h2>{{ __('eiie.Cooperation Projects') }}</h2>
    {{--
    @isset ($intro_item)
        <article class="dev_coop_landing_intro">
            <x-render-content :content="$intro_item->content" blurbOnly />
        </article>
    @else 
        <article class="dev_coop_landing_intro"></article>
    @endisset
    --}}
</header>

<section class="dev_coop_map_header">


<div class="dev_coop_map_container">

</div>
<div class="dev_coop_map_details_container">

</div>

</section>

{{-- 
    <x-figure 
        :item="$intro_item"
        includeCaption
        class-not-found="no_lead_image" 
        preset="lead" />
--}}


<section class="filter_form">
    {{-- the form is constructed in js-land and injected at form_root--}}
    <div id="form_root"></div>   
</section>

<section class="dev_coop_listing">
    <h3>
        {{ __('eiie.Current Cooperation Projects') }}
    </h3>
    <ol>
    @foreach($projects as $project)
        <li>
            @include('shared.card', [
                'item' => $project->content->item, 
                'header_level' => '4', 
                'show_blurb' => true,
                'show_blurb_readmore' => true
            ])
        </li>
    @endforeach
    </ol>
</section>

@endsection 
