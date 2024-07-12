@extends('collection.base')

@section('collection_header')
    @parent 

    @foreach ($collection->parentCollectionsOfType('region') as $region)
        <x-link :collection="$region" class="link_back" />
    @endforeach

@endsection

@section('collection_subnavigation')
    @include('collection.country_subnavigation', ['activeSlotId' => false])
@endsection

@section('collection_content')

    <main id="collection_main" class="collection_country">
        @isset ($groupedItems['article'])
            <section class="collection_content articles-listing">
                <h3 class="collectionHeader">{{ __('eiie.Articles')}}</h3>
                <ol class="collection_content">
                @for ($i = 0; $i < min(6, count($groupedItems['article'])); ++$i)
                    <li>
                    @include('shared.card', ['item' => $groupedItems['article'][$i], 'header_level' => '4', 'show_blurb' => true])
                    </li>
                @endfor
                </ol>
                <a href="{{ route('country.articles', ['id' => $collection->id, 'slug' => $collection->content->slug]) }}" class="archive_link">{{ __('eiie.All articles')}}: {{ $collection->content->title }}</a>
            </section>
        @endisset

        @isset ($groupedItems['dcproject'])
            <section class="collection_content dcprojects-listing">
                <h3 class="collectionHeader">{{ __('eiie.Development Cooperation Projects') }}</h3>
                <ol class="collection_content">
                @for ($i = 0; $i < min(6, count($groupedItems['dcproject'])); ++$i)
                    <li>
                    @include('shared.card', ['item' => $groupedItems['dcproject'][$i], 'header_level' => '4'])
                    </li>
                @endfor
                </ol>
				<a href="{{ route('country.dcprojects', ['id' => $collection->id, 'slug' => $collection->content->slug]) }}" class="archive_link">{{ __('eiie.All Development Cooperation Projects') }}: {{ $collection->content->title }}</a>
            </section>
        @endisset

        @isset ($groupedItems['static'])
            <section class="collection_content generic-items-listing">
                <h3 class="collectionHeader">{{ __('eiie.Other content') }}</h3>
                <ol class="collection_content">
                @for ($i = 0; $i < min(4, count($groupedItems['static'])); ++$i)
                    <li>
                    @include('shared.card', ['item' => $groupedItems['static'][$i], 'header_level' => '4'])
                    </li>
                @endfor
                </ol>
				<a href="#" class="archive_link">{{ __('eiie.All other content') }}: {{ $collection->content->title }}</a>
            </section>
        @endisset

        @isset ($groupedItems['resource'])
            <a name="resources"></a>
            <section class="collection_content resources-listing">
                <h3 class="collectionHeader">{{ __('eiie.Resources') }}</h3>
                @include('shared.resources_table', ['resources' => $groupedItems['resource']])
            </section>
        @endisset

        @isset ($groupedItems['affiliate'])
            @php 
                // sort affiliates alphabetically
                $affiliates = $groupedItems['affiliate']->sortBy('content.title');
            @endphp 
            <a name="affiliates"></a>
            <section class="affiliates-listing">                
                <h3 class="collectionHeader">{{ __('eiie.Affiliates') }}</h3>
                <ol class="collection_affiliates">
                    @foreach ($affiliates as $item)
                        <li>@include('shared.card', ['header_level' => '4'])</li>
                    @endforeach
                </ol>
            </section>
        @endisset

    </main>
@endsection
