@once 
    @php
        $countries = \App\Models\Collection::where("type", "country")
            ->get()
            ->map(
                fn($coll) => [
                    "id" => $coll->id,
                    "name" => $coll->content->title,
                    "country_code" => $coll->content->meta["country_code"],
                ]
            )
            ->all();
    @endphp
    @push("scripts")
        @viteReactRefresh
        @vite('resources/js/Front/Map/GeoDataMap.tsx')
        <script>
            countries = {{ Illuminate\Support\Js::from($countries) }}
        </script>
    @endpush
@endonce

@php 
    $map = \App\Models\GeodataMap::find($mapId);
    if (!$map) {
        return "! " . $mapId;
    }
    $map->loadMissing(["dataset", "dataset.columns", "dataset.columns.values"]);
    $mapUniqId = uniqid();    
@endphp 

@push("scripts")
    <script>
        document.addEventListener('DOMContentLoaded', function (event) {
            window.renderGeoDataMap(document.getElementById("map_container_{{ $mapUniqId }}"), {
                lang: '{{ App::getLocale() }}',
                map: {{ Illuminate\Support\Js::from($map) }},
                countries: countries
            });
        });
    </script>
@endpush

<div id="map_container_{{ $mapUniqId }}" class="geodata_map_container"></div>
