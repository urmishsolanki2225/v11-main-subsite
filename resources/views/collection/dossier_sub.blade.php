{{-- @extends('collection.dossier') --}}

@extends('collection.default')

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
    @php
    $parent = $collection->parentCollectionsOfType('dossier')->first();
    $siblings = false;
    if ($parent) {
        $siblings = $parent->subCollections;
    }
    @endphp

    @if ($siblings && count($siblings))
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
    @endif

@endsection

@section('article_main_class', 'detect_sticky')
