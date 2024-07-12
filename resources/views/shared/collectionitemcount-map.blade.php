@php 
    $mapUniqId = uniqid();
@endphp 

@push("scripts")
    @viteReactRefresh
    @vite('resources/js/Front/Map/CollectionItemCountMap.tsx')
    <script>
        document.addEventListener('DOMContentLoaded', function (event) {
            window.renderCollectionItemCountMap(
                document.getElementById("map_container_{{ $mapUniqId }}"), {
                    collection_id: {{ $collection->id }},
                    lang: '{{ App::getLocale() }}',
                    translations: {{ Illuminate\Support\Js::from([
                            "article" => __('eiie.article'),
                            "articles" => __('eiie.articles')
                        ]) }},
                    title: '{{ $collection->content->title }}',
                    blurb: `<x-render-content :content="$collection->content" blurbOnly />`,
                    baseColor: '#{{ $collection->support_color ?? '' }}',
                    cutoffs: {{ Illuminate\Support\Js::from(optional($collection->meta)['item_count_map_cutoffs']) }} 
                }
            );
        });
    </script>
@endpush

<div id="map_container_{{ $mapUniqId }}" class="item_count_map_container"></div>
