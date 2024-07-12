@extends('collection.dossier')

{{-- @extends('collection.default') --}}

@section('collection_header')
    @parent 

    @foreach ($collection->parentCollectionsOfType('dossier') as $dossier)
        <x-link :collection="$dossier" class="link_back">
            @foreach ($dossier->parentCollectionsOfType('structure') as $structureCollection)
                <em>{{ $structureCollection->content->title ?? '' }}</em>
            @endforeach        
            {{ $dossier->content->title ?? '' }}
        </x-link>
    @endforeach

@endsection


@section('collection_subnavigation')
 {{--
       @php
    $parent = $collection->parentCollectionsOfType('dossier')->first();
    $siblings = [];
    if ($parent) {
        $siblings = $parent->subCollections;
    }
    @endphp

    <section id="dossier_subnavigation" class="collection_subnavigation">
        <ul class="subcollections_list">
           
            @foreach ($siblings as $sub)
                <li class="{{ $sub->id === $collection->id ? 'current_sub' : '' }}">
                    <x-link :collection="$sub" :parent="$parent">
                        {{ $sub->content->title ?? '' }}
                    </x-link>               
                </li>
            @endforeach 
        </ul>
    </section>
--}}
@endsection

@section('article_main_class', 'detect_sticky')

@section('collection_content')
     <section id="dossier_subnavigation" class="collection_subnavigation detect_sticky">
        <ul class="subcollections_list">
            <li>
                <a href="#map_collection_count_items">{{ __('eiie.Map') }}</a>
            </li>
            @isset($groupedItems['article'])
                <li>
                    <a href="#articles">{{ __('eiie.Articles') }}</a>
                </li>
            @endif
        </ul>
    </section>

     <main id="collection_main" class="collection_sub">
        <section class="collection_content articles-listing" id="articles">
            <h3 class="collectionHeader">{{ __('eiie.Articles')}}</h3>
            <ol class="collection_content" id="articles">
                @php
                $items = isset($items) ? $items : $collection->items()->paginate(config('eiie.pagination_size', 18))->onEachSide(config('eiie.pagination_oneachside',1));
                @endphp
                @foreach ($items as $item) 
                    <li>
                        @include('shared.card', [
                            'item' => $item, 
                            'header_level' => '4', 
                            'show_blurb' => true,
                            'show_blurb_readmore' => true])
                    </li>
                @endforeach
		    </ol>
		    {{-- pagination --}}
		    {{ $items->links() }}
        </section>
    </main>
@endsection

@section('content')
    @once 
        @push('scripts') 
            @viteReactRefresh
            @vite('resources/js/Front/Map/SolidarityMap.tsx')
            <script>
                document.addEventListener('DOMContentLoaded', function (event) {
                    window.renderSolidarityMap(document.getElementById("map_collection_count_items"), {
                        collection_id: {{ $collection->id }},
                        lang: '{{ App::getLocale() }}',
                        translations: {{ Illuminate\Support\Js::from([
                            "article" => __('eiie.article'),
                            "articles" => __('eiie.articles'),
                            "solidarity_across_borders_title" => __('eiie.solidarity_across_borders_title'),
                            "solidarity_across_borders_intro_text" => __('eiie.solidarity_across_borders_intro_text'),
                            "solidarity_across_borders_time_range" => __('eiie.solidarity_across_borders_time_range'),
                            "solidarity_across_borders_activity_title" => __('eiie.solidarity_across_borders_activity_title'),
                            "solidarity_across_borders_activity_high" => __('eiie.solidarity_across_borders_activity_high'),
                            "solidarity_across_borders_activity_medium" => __('eiie.solidarity_across_borders_activity_medium'),
                            "solidarity_across_borders_activity_low" => __('eiie.solidarity_across_borders_activity_low'),
                            "solidarity_across_borders_activity_none" => __('eiie.solidarity_across_borders_activity_none')
                        ]) }}
                    });
                });
            </script>
        @endpush
    @endonce
    <div id="map_collection_count_items"></div>
    
     <div class="blendmask"></div>
    <header class="landing_header detect_sticky">
        <a name="top"></a>
            @section('collection_header')
                <h2>{{ $collection->content->title ?? '' }}</h2>
                <x-figure :item="$collection" type="icon" />
            @show
	</header>
    <article class="article_main collection_introduction">
	    
        <x-figure :item="$collection" type="portrait" preset="portrait" />
        @yield('collection_subnavigation')

        @yield('before_collection_introduction')

        <x-render-content :content="$collection->content" />

        @yield('collection_introduction_additional')

    </article>

    @yield('collection_content')
    
@endsection
