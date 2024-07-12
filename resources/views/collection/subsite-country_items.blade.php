@extends('collection.subsite-country')

@section('title', $collection->content->title)

@section('collection_content')

    <main id="collection_main" class="collection_default xcollection_country">
            <h3 class="collection_header">{{ $title ?? '' }}</h3>
            <ol class="collection_content">
            @foreach ($items as $item)
                <li>
                    @include('shared.subsite-card', ['header_level' => '4', 'show_blurb' => $item->type === 'article'])
                </li>
            @endforeach
            </ol>
            {{ $items->links() }}
    </main>

@endsection
