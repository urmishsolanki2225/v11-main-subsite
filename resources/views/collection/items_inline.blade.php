@extends('collection.base')

@include('collection.sections.sibling_navigation')

@section('collection_content')

    <main id="collection_main" class="collection_items_inline">
        <ol class="collection_content"> 
            @foreach ($collection->items as $item) 
                <article class="inline_item inline_item_hide_content">
                    <header>
                        <h3>{{ $item->content->title ?? '' }}</h3>
                    </header>
                    <div class="blurb">
                        <x-render-content :content="$item->content" blurbOnly />    
                    </div>
                    <a class="inline_item_do_show_content">{{ __('eiie.Show Committee Members') }}</a>
                    <div class="content">
                        <x-render-content :content="$item->content" contentOnly />    
                    </div>
                    <a class="inline_item_do_hide_content">{{ __('eiie.Hide Committee Members') }}</a>
                </article>
            @endforeach
        </ol>

    </main>
@endsection

