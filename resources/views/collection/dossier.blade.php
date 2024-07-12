@extends('collection.base_landing')

@php 
    // $subDossiers = $collection->subCollections()->where('type','dossier_sub')->get(); 
    $subDossiers = $collection->subCollections;
@endphp

@section('collection_header')
    @parent 
    @foreach ($collection->parentCollectionsOfType('structure') as $dossier)
        <x-link :collection="$dossier" class="link_back" />
    @endforeach
   
@endsection

@section('collection_introduction_additional')
    @parent
    @include('shared.special.top_link')
@endsection 

@section('collection_content')

    @if (count($subDossiers) > 0)    
    <section id="dossier_subnavigation" class="collection_subnavigation detect_sticky">
        <ul class="subcollections_list">
            @foreach ($collection->subCollections as $sub)
                <li>
                    <a href="#sub_{{ $sub->id }}">{{ $sub->content->title ?? '' }}</a>
                </li>
            @endforeach 
        </ul>
    </section>
@endif 

<main id="collection_main" class="collection_sub">

    @include('shared.special.top_video')

    @if (count($subDossiers) > 0)    

    @foreach ($subDossiers as $sub)
        @if ($sub->layout === 'dossier_map')
            @include(
                'shared.collectionitemcount-map', 
                [
                    'collection' => $sub
                ]
            )
        @else 
            @php 
                $hasBlurb = '';
                // if (!empty($sub->content->blurb_json) && $sub->content->blurb_json != '[]') {
                //    $hasBlurb = 'subcollection-listing-has-blurb';
                //}
                $sub->loadCount('items');
                $itemCount = min($hasBlurb ? 4 : 5, $sub->items_count);
            @endphp 

            @if ($itemCount > 0)
                <section class="collection_content subcollection-listing subcollection-layout-{{ $sub->layout }} {{ $hasBlurb }} subcollection-listing-count-{{ $itemCount }} ">
                    <a name="sub_{{ $sub->id }}" class="subnavigation_anchor"></a>
                    @isset($sub->content->title)
                        <h3 class="collectionHeader">
                            <x-figure type="icon" :item="$sub" />
                            {{ $sub->content->title }}
                        </h3>
                    @endisset
                    <ol class="collection_content">
                        @if ($hasBlurb) 
                            <li>
                                <article class="subcollection-blurb">
                                    <x-render-content :content="$sub->content" blurbOnly />
                                </article> 
                            </li>
                        @endif 
                        @for ($i = 0; $i < $itemCount; ++$i)
                            @php 
                            $item = $sub->items[$i];
                            @endphp
                            <li>
                                @include('shared.card', [
                                    'item' => $item, 
                                    'collection' => $sub,
                                    'header_level' => '4', 
                                    'show_blurb' => true,
                                    'show_blurb_readmore' => true,
                                    'skipCollectionId' => $sub->id,
                                    'showSocialLinks' => ($item->type == 'resource' && Str::startsWith($item->subtype, 'image')),
                                ])
                            </li>
                        @endfor 
                    </ol>
                    @if ($itemCount < $sub->items_count)
                        <x-link :collection="$sub" :parent="$collection" class="subcollection_link">
                            {{ __('eiie.more') }}: {{ $sub->content->title ?? '-'}}
                        </x-link>               
                    @endif 
                </section>
            @endif 
        @endif
    @endforeach
    @endif

    @isset ($groupedItems['article'])
        <section class="collection_content articles-listing" id="articles">
            <h3 class="collectionHeader">{{ __('eiie.Articles')}}</h3>
            <ol class="collection_content">
            @for ($i = 0; $i < count($groupedItems['article']); ++$i)
                <li>
                    @include('shared.card', [
                        'item' => $groupedItems['article'][$i], 
                        'header_level' => '4', 
                        'show_blurb' => true,
                        'show_blurb_readmore' => true
                    ])
                </li>
            @endfor
            </ol>           
        </section>
    @endisset

    @isset ($groupedItems['static'])
        <section class="collection_content generic-items-listing">
            <h3 class="collectionHeader">{{ __('eiie.Other content') }}</h3>
            <ol class="collection_content">
            @for ($i = 0; $i < count($groupedItems['static']); ++$i)
                <li>
                    @include('shared.card', [
                        'item' => $groupedItems['static'][$i], 
                        'header_level' => '4', 
                        'show_blurb' => true,
                        'show_blurb_readmore' => true
                    ])
                </li>
            @endfor
            </ol>
        </section>
    @endisset
    
    @if (isset($groupedItems['resource']) && count($groupedItems['resource']))
            <a name="resources"></a>
            <section class="collection_content resources-listing">
                <h3 class="collectionHeader">{{ __('eiie.Resources') }}</h3>
                @include('shared.resources_table', ['resources' => $groupedItems['resource']])
            </section>
    @endisset

</main>

@endsection
