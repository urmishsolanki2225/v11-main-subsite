<script src="{{ url('js/jquery.min.js') }}" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
@extends('main')
@section('title')
@section('head')
@parent
<script async src="{{ url('js/twiiter-ifrme-embed.js') }}" charset="utf-8"></script>
    @vite('resources/sass/highlight.scss')
@endsection

@section('content')
<x-figure type="lead" :item="$annualreport->content" class-not-found="no_lead_image" includeCaption />
    <x-annual-report.back-to-report-button />
<article class="article_main article_single">
    <header>
        <x-figure type="portrait" :item="$annualreport->content" preset="portrait" />
        <h2>{{ $annualreport->content->title ?? '' }}</h2>
        @if (!empty($newsletterSubscribeForm))
        <x-newsletter-signup-carousel></x-newsletter-signup-carousel>
        @endif
        <section id="article_header_meta">
            @if(isset($annualreport->publish_at) || (isset($annualreport->created_at)))
            @include('shared.date', [
            'date' => $annualreport?->publish_at ?? $annualreport->created_at,
            'label' => __('eiie.published'),
            'class' => 'date-published'
            ])
            @endif
            @isset($annualreport->updated_at)
            @include('shared.date', [
            'date' => $annualreport->updated_at,
            'label' => __('eiie.updated'),
            'class' => 'date-updated'
            ])
            @endisset
        </section>
    </header>
    <main>
        <x-render-content :content="$annualreport->content" />
    </main>
    {{--
    @foreach($annualreport->items as $item)
    @if($item->type == 'resource' && $item->subtype == 'file')
    <footer>
        <div id="attachments">
            <div class="attachment_group">
                <article class="resource_subtype_file">
                    <h4>{{$item->content->title?? ''}}</h4>
                    @foreach($item->content->files as $file)
                    <div class="resource_item">
                        <span class="date ">
                            {{ $item->content?->publish_at ? $item->content->publish_at->format('j F Y') : $item->content->created_at->format('j F Y') }}
                        </span>
                        <span class="type">{{ $item->subtype }}</span>
                        <span class="files">
                            <a href="{{ url('storage/app/files/' . $file->path ) }}" download="" rel="noopener">
                                Download
                            </a>
                        </span>
                    </div>
                    @endforeach
                </article>
            </div>
        </div>
    </footer>
    @endif
    @endforeach
    --}}
</article>
<section id="annualreport_related_items" class="collection_content related_collection">
    <h3 class="collectionHeader">{{ __('eiie.Related Items') }}</h3>
    @if(count($annualreport->items) > 0)
    <ol class="collection_content">
        @foreach($annualreport->items as $item)
        @if($item->subtype === 'video' && !empty($item->content->videos))
            @foreach($item->content->videos as $video)
            <li>
                <article class=" card-item card-article ">
                    <figure class=" figure_preset_card">
                        <div class="video-embed-container">
                            @if($video->provider === 'youtube')
                            <iframe title="{{ $video->content->title }}" src="https://www.youtube.com/embed/{{ $video->provider_id }}" allow="fullscreen; picture-in-picture" allowfullscreen="" frameborder="0">
                            </iframe>
                            @else
                            <iframe title="{{ $video->content->title }}" src="https://player.vimeo.com/video/{{$video->provider_id}}" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen=""></iframe>
                            @endif
                        </div>
                    </figure>
                    <header>
                        <span class="first-collection">{{ __('eiie.Video') }}</span>
                        <span class="date">
                            {{ $video->content->created_at->format('j F Y') }}
                        </span>
                        <h3>{{ $video->content->title }}</h3>
                    </header>
                </article>
            </li>
            @endforeach
        @endif
        @if(($item->type === 'article' || $item->type === "library" || $item->subtype === "file" || $item->subtype === 'embed') && !empty($item->content))
        <li>
            @include('shared.card')
        </li>
        @endif
        @endforeach
    </ol>
    @else
    <ol class="collection_content">
        <p>{{__('eiie.No record found')}}</p>
    </ol>
    @endif
</section>
@endsection