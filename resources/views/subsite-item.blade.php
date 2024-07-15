@extends('subsite-main')

@section('title')
{{ $item->content->title ?? __('eiie.Education International') }}
@endsection

@section('pageclass')
    @parent

    page_item
    page_item_type_{{ $item->type }}
    @if ($item->subtype)
        page_item_subtype_{{ $item->subtype }}
    @endif

    @if (!empty($worldsOfEducation['main']))
        woe_article
    @endif
    <x-render-content :content="$item->content" mode="pageclass" />
@endsection

@section('head')
    @parent
    {{-- Go to www.addthis.com/dashboard to customize your tools --}}
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4e6a028c1148864a"></script>
@endsection

@section('collections_nav')
<nav id="collections">
    @foreach ($item->collections as $collection)
        <x-link-subsite :collection="$collection" />
    @endforeach

    @foreach ($item->collectionsByGroup() as $type => $collGroup)
        <div class="collection_group collection_group_{{ $type }}">
            <h4>{{ __("eiie.group_$type") }}</h4>
            <ol>
                @foreach ($collGroup as $collection)
                    @if(isset($collection->content))
                        <li><a>{{$collection->content->title}}</a></li>
                    @endif
                @endforeach
            </ol>
        </div>
    @endforeach
</nav>
@endsection

@section('related_items')
@if (isset($relatedItems) && count($relatedItems))
<section id="related_items" class="collection_content related_collection">
    <h3 class="collectionHeader">{{ __('eiie.Related Items') }}</h3>
    <ol class="collection_content">
        @foreach ($relatedItems as $relatedItem)
            <li>
            	@include('shared.subsite-card', [
                    'item' => $relatedItem,
                    'header_level' => '4',
                ])
            </li>
        @endforeach
    </ol>
</section>
@endif
@endsection


@section('content')
<x-figure type="lead"
        :item="$item"
        class-not-found="no_lead_image"
        includeCaption
        preset="{{ $item->subtype == 'file' ? 'coverpage' : 'lead' }}"
        />
<article class="article_main collection_introduction home_introduction">
    <header class="pb-20">
        <x-figure type="portrait" :item="$item" preset="portrait" />
        <h2>{{ $item->content->title ?? '' }}</h2>
        @if (isset($item->content) && $item->content->subtitle)
            <h3 class="subtitle">{{ $item->content->subtitle }}</h3>
        @endif
        <x-breadcrumbs :item="$item"/>
        <section id="article_header_meta">
            @if($item->publish_at)
			    @include('shared.date', ['date' => $item->publish_at, 'label' => __('eiie.published'), 'class' => 'date-published'])
            @endif

            @isset($item->updated_at)
			    @include('shared.date', ['date' => $item->updated_at, 'label' => __('eiie.updated'), 'class' => 'date-updated'])
			@endisset
        </section>

         @if ($item->authors_count > 0)
            <section id="article_authors">
                <span class="label">{{ __('eiie.written by') }}:</span>
                @foreach ($item->authors as $author)
                    <div class="article_author">
                        @if ($author->portraitImages()->count())
                            <x-figure :item="$author" type="portrait" class="article_author_portrait" />
                        @else
                            <figure class="author_fallback_portrait article_author_portrait">
                                <img src="/images/author_fallback.svg" alt="Fallback portrait authors" />
                            </figure>
                        @endisset
                        <span>
                            {{ $author->content->title ?? '' }}
                        </span>
                    </div>
                @endforeach
            </section>
        @endif

    </header>
    <a class="link_subscribe_newsletters" href="{{ route('subsite.newsletter') }}">{{ __('eiie.Subscribe to Our Newsletters') }}</a>
</article>
<article class="article_main article_single ">
    <main>
        <x-render-content :content="$item->content" />
        @if ($item->type !== 'dcproject' && empty($item->content) && empty($item->content->content_json) && empty($item->content->blurb_json))
            <p class="translation_unavailable">{{ __('eiie.translation_not_available') }}</p>
            <p class="translation_unavailable">{{ __('eiie.switch_to_language') }}
                @foreach ($item->contents as $content)
                    @if (!$loop->first)
                        {{ __('eiie.or') }}
                    @endif
                    <a href="/{{ $content->lang == '*' ? 'en' : $content->lang }}/item/{{ $item->id }}:{{ $content->slug ?? '_' }}">{{ config('app.locales')[$content->lang == '*' ? 'en' : $content->lang] }}</a>
                @endforeach
                {!! __('eiie.home_in_current_language', ['url' => '/'.App::getLocale()] ) !!}
        @endif

        @yield('content_additional')
    </main>

    @if (isset($showOpinionDisclaimer) && $showOpinionDisclaimer)
        <section class="opinion_disclaimer">
            <p>{{ __('eiie.opinion_disclaimer') }}</p>
        </section>
    @endif

    <footer>
        {{-- <div id="footnotes"></div> --}}
        @if (!empty($item->attachmentGroups[0]) || !empty($item->content->files[0]))
        <div id="attachments">
            @include('shared.attachments')
        </div>
        @endif
        @yield('collections_nav')
    </footer>

</article>
@yield('related_items')

@endsection

@php
unset($collection);
@endphp