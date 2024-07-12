@extends('main')

@section('title', __('eiie.Education International'))

@section('head')
    @parent 
    @routes
    @viteReactRefresh
    @vite('resources/js/Front/Search/SearchPage.tsx')
    <script defer>
        document.addEventListener('DOMContentLoaded', (event) => {
            window.renderSearchPage({
                algolia: {
                    appId: "{{ config('scout.algolia.id') }}",
                    apiKey: "{{ Algolia\ScoutExtended\Facades\Algolia::searchKey(App\Models\ItemContent::class) }}",
                    indexName: "{{ config('scout.prefix') }}item_contents"
                },
                language: "{{ \App::getLocale() }}",
                translations: {{ trans2js('eiie') }}
            });
        });
    </script>
@endsection 

