@extends('main')

@section('title')

@section('head')
    @parent
    {{-- Go to www.addthis.com/dashboard to customize your tools --}}
    <script type='text/javascript' src="{{ url('js/sharethis.js') }}" async='async'></script>
    <div class="sharethis-sticky-share-buttons"></div>

    <!-- Add AOS library -->
    @vite('resources/sass/aos.scss')
    @vite('resources/sass/highlight.scss')
    <script src="{{ url('js/jquery.min.js') }}" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="{{ url('js/aos.js') }}"></script>
@endsection
@php
    $video = isset($annualreportVideo[0]) ? 'video-blank' : ''; // Define $video based on condition
@endphp
@section('content')
<article class="article_main article_single annual-report-page">
    <!-- Added by cyblance for print PDF report-section start -->
    <header class="full_container pdf-button">
        <div class="main_timeline_title">
        @if($year)
            <h1>{{ __('eiie.Activity Report') ." ". $year }}</h1>
        @else
            <h1> {{ __('eiie.- no title -') }} </h1>
        @endif
        </div>
        <div>
            @if(file_exists($filePath))
            <ol class="files pdf-file-button">
                <li>
                    <a href="{{ route('annual-report.download_pdf', ['year' => $year]) }}" class="a-tag-pdf-button" target="_blank">
                        {{ __('eiie.Print Report') }}
                    </a>
                </li>
            </ol>
            @endif
        </div>
    </header>
    <!-- Added by cyblance for print PDF report-section end -->
    @if(isset($annualreportVideo[0]->provider) !== '' || empty(isset($summary_data->contents)))
    <div class="timeline_section_group_inner main-div-vedio">
        <ol class="collection_content highlight {{$video}}">
            @if($annualreportVideo && isset($annualreportVideo[0]->provider) !== '' &&  isset($annualreportVideo[0]->provider_id))
                @if(isset($annualreportVideo[0]))
                <li>
                    <article class="card card-video card-video-youtube  no-first-collection ">
                        <div class="video-embed-container">
                            @if($annualreportVideo[0]->provider === 'youtube' &&  $annualreportVideo[0]->provider_id)
                                <iframe
                                    src="https://www.youtube.com/embed/{{ $annualreportVideo[0]->provider_id}}"
                                    allow="fullscreen; picture-in-picture"
                                    allowfullscreen=""
                                    frameborder="0"
                                    data-gtm-yt-inspected-5="true"
                                    id="890582418"
                                >
                                </iframe>
                            @elseif($annualreportVideo[0]->provider === 'vimeo' &&  $annualreportVideo[0]->provider_id)
                                <iframe src="https://player.vimeo.com/video/{{$annualreportVideo[0]->provider_id}}" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen="" data-gtm-yt-inspected-5="true" id="890582418"></iframe>
                            @endif
                        </div>
                    </article>
                </li>
                @endif
            @endif
            @isset($summary_data->contents)
                @foreach($summary_data->contents as $content)
                <li>
                    <div class="timeline_section_group_inner">
                        <div class="summary_content_description">
                            @if($content->blurb)
                                {!! $content->blurb !!}
                                <p><a href="javascript:void(0)" class="summary_read_more"> {{ __('eiie.Read More') }}</a></p>
                            @elseif($content->content)
                            {!! \Illuminate\Support\Str::words($content->content, 30, '...') !!}
                            @if (str_word_count($content->content) > 30)
                            <p><a href="javascript:void(0)" class="summary_read_more"> {{ __('eiie.Read More') }}</a></p>
                            @endif
                            @endif
                        </div>
                    </div>
                </li>
                @endforeach
            @endisset
        </ol>
    </div>
    @endif
    <main class="full_container">
        @foreach($month_full_name as $key=>$month)
        @php
            $annualreportInMonth = $annualreports->where('month', $key);
            $itemsInMonth = $items->filter(function ($item) use ($key) {
                return $item?->created_at->format('m') == $key;
            });
            $itemsPerHighlight = $annualreportInMonth->count() > 0 ? ceil($itemsInMonth->count() / $annualreportInMonth->count()) : 1;
        @endphp
        <div class="main_vertical_timeline">
            @if ($itemsInMonth->count() != 0 || $annualreportInMonth->count() != 0)
            <div id="{{$month}}" class="timeline_section_group">
                <div class="timeline_section_group_inner">
                    <div class="timeline_title">
                        <h3>{{__('eiie.' . $month)}}</h3>
                    </div>
                    <div class="timeline_section" data-aos="fade-in" data-aos-duration="10">
                        <div class="timeline_line">
                            <div class="timeline_line_progress" data-100p="height:0%;" data-_box-100p="height:100%"></div>
                        </div>
                        <div class="timeline_list">
                            @foreach($annualreportInMonth as $annualreport)
                            <div class="timeline_item">
                                <div class="timeline_item_inner">
                                    @foreach ($annualreport?->contents as $content)
                                    <div class="timeline_item_cart" data-aos="zoom-in">
                                        <a href="{{ route('annualreport.show', [
                                                        'id' => $annualreport->id,
                                                        'slug' => urlencode($annualreport->content->slug ? $annualreport->content->slug : '_')
                                                    ]) }}?month={{ $month }}&&year={{$year}}">
                                            <div class="timeline_item_cart_inner">
                                                @foreach ($annualreport->allImages as $image)
                                                    @isset($image->content->images->first()->path)
                                                        <div class="stratum-vertical-timeline-item__card-image">
                                                          <img src="{{ url('' . $image->content->images->first()->path .'/card.jpg') }}">
                                                        </div>
                                                    @endisset
                                                @endforeach
                                                <div class="timeline_item_cart_content">
                                                    <h4 class="timeline_item_cart_content_title">{{$content->title ?? __('eiie.- no title -') }}</h4>
                                                    <div class="timeline_item_cart_content_description">
                                                        {!! !empty($content->blurb) && strlen($content->blurb) > 100 ? substr($content->blurb, 0, 100) . '...' : $content->blurb !!}
                                                    </div>
                                                    <div class="timeline_item_cart_content_link">
                                                        <span>{{ __('eiie.Read More') }}</span>
                                                    </div>
                                                </div>
                                                <div class="timeline_item_cart_inner_arrow"></div>
                                            </div>
                                        </a>
                                    </div>
                                    @endforeach
                                    <div class="timeline_item_point">
                                        <div class="timeline_item_point_content">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                                <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="timeline_item_meta">
                                        <div class="sidebar__widget mb-40">
                                            @php
                                            $itemsForHighlight = $itemsInMonth->splice(0, $itemsPerHighlight);
                                            @endphp
                                            @foreach($itemsForHighlight as $item)
                                            <div class="sidebar__widget-content mb-20">
                                                <div class="sidebar__post" data-aos="zoom-in">
                                                    <div class="mb-10">
                                                        <a href="{{ route('item.show', [
                                                                'id' => $item->id,
                                                                'slug' => urlencode($item->content->title == '' ? '_' : $item->content->slug)
                                                            ]) }}?month={{ $month }}&&year={{$year}}" >
                                                            <div class="rc__post">
                                                                <div class="rc__post-content hover-text">
                                                                    <div class="rc__meta">
                                                                        <span>
                                                                            @if($item->created_at)
                                                                                {{ $item->created_at->locale(App::getLocale())->isoFormat('D MMMM YYYY') }}
                                                                            @endif
                                                                        </span>
                                                                    </div>
                                                                    <h3 class="rc__post-title">
                                                                        {{ optional($item->contents->first())->title ?: __('eiie.- no title -') }}
                                                                    </h3>
                                                                    <div class="rc_postreadmore "> {{ __('eiie.Read More') }}
                                                                    </div>
                                                                    {{--
                                                                    <div class="tooltip-text right">
                                                                        <div class="mb-0 d-flex align-items-start rc__post">
                                                                            <div class="rc__post-thumb mr-20">

                                                                                @if (isset($item->images) && count($item->images) > 0)
                                                                                @php
                                                                                    //echo '<pre>';print_r($item->images); exit;
                                                                                @endphp
                                                                                    @foreach($item->images as $images)
                                                                                        @if(isset($images) && !empty($images->content->images))
                                                                                        @foreach($images->content->images as $image)
                                                                                        <img src="{{ url('' . $image->path.'/card.jpg') }}" alt="Image Description">
                                                                                        @endforeach
                                                                                        @endif
                                                                                        @break
                                                                                    @endforeach
                                                                                @else
                                                                            <img src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg" alt="Image Description">
                                                                                @endif

                                                                            </div>
                                                                            <div class="rc__post-content">
                                                                                <h3 class="rc__post-title">
                                                                                    {{ optional($item->contents->first())->title ?: __('eiie.- no title -') }}
                                                                                </h3>
                                                                                <p class="truncated-blurb">{!! \Illuminate\Support\Str::limit(strip_tags(optional($item->contents->first())->blurb), 100) !!}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    --}}
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                    <div class='without-highlight' data-aos="fade-in" data-aos-duration="10">
                        @foreach($itemsInMonth as $item)
                        <div class="rc__post" data-aos="zoom-in">
                            <a href="{{ route('item.show', [
                                    'id' => $item->id,
                                    'slug' => urlencode($item->content->title == '' ? '_' : $item->content->slug ?? '_')
                                ]) }}?month={{ $month }}&&year={{$year}}" >
                                <div class="rc__post-content hover-text">
                                    <div class="rc__meta">
                                        <span>
                                            @if($item->created_at)
                                                {{ $item->created_at->locale(App::getLocale())->isoFormat('D MMMM YYYY') }}
                                            @endif
                                        </span>
                                    </div>
                                    <h3 class="rc__post-title">
                                        {{ $item->contents->first()->title ?: __('eiie.- no title -') }}
                                    </h3>
                                    <div class="rc_postreadmore ">
                                        {{ __('eiie.Read More') }}
                                    </div>
                                    <div class="tooltip-text right">
                                        <div class="mb-0 d-flex align-items-start">
                                            <div class="rc__post-thumb mr-20">
                                                @if (isset($item->images) &&  count($item->images) > 0)
                                                    @foreach($item?->images ?? [] as $images)
                                                        @foreach($images?->content?->images ?? [] as $image)
                                                        <img src="{{ url('' . $image->path.'/card.jpg') }}" alt="Image Description">
                                                        @endforeach
                                                        @break
                                                    @endforeach
                                                @else
                                                <img src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg" alt="Placeholder">
                                                @endif
                                            </div>
                                            <div class="rc__post-content">
                                                <h3 class="rc__post-title">
                                                    {{ optional($item->contents->first())->title ?: __('eiie.- no title -') }}
                                                </h3>
                                                <p class="truncated-blurb">{!! \Illuminate\Support\Str::limit(strip_tags(optional($item->contents->first())->blurb), 100) !!}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
            @endif
        </div>
        @endforeach
        <div id="timeline_nav" class="nav">
            <ul class="dot-nav">
                @foreach($month_full_name as $key => $month)
                @php
                $hasAnnualreportOrItems = ($annualreports->where('month', $key)->count() > 0) || ($items->filter(function ($item) use ($key) {
                    return $item?->created_at->format('m') == $key;
                })->count() > 0);
                @endphp

                @if ($hasAnnualreportOrItems)
                <li>
                    <a href="{{ route('annual-report', $year)}}#{{$month}}" scroll-data="{{$month}}"></a>
                    <span>{{__('eiie.' . $month_sort_name[$key])}}</span>
                </li>
                @endif
                @endforeach
            </ul>
        </div>
    </main>
</article>
<!-- Summary Content wirth popup Start -->
<div id="summary_content_popup" class="summary_content_popup summary_model_popup" style="display:none;">
    <div class="summary_model_popup_inner">
        @isset($summary_data->contents)
        @foreach($summary_data->contents as $content)
        <h3>{{$content->title ? $content->title : __('eiie.- no title -') }}</h3>
        <div class="summary_model_popup_colse"></div>
        <div class="summary_content_popup_body">
            <p>{!! $content->content !!}</p>
        </div>
        @endforeach
        @endisset
    </div>
</div>
<div id="dev_windowheight" class="dev_windowheight" style="position: fixed;height: 100%;width: 1px; left: 0;top: 0;"></div>
<!-- Summary Content wirth popup End -->
<script>
    jQuery(function() {
        jQuery('#timeline_nav li a').click(function() {
            var id = jQuery(this).attr('scroll-data');
            jQuery('body, html').animate({
                scrollTop: jQuery("#" + id).offset().top - 40
            });
        });

        jQuery('.summary_read_more').click(function() {
            jQuery('#summary_content_popup').show();
        });

        jQuery('.timeline_item_cart a').click(function() {
            jQuery('#summary_timeline_popup').show();
        });

        jQuery(window).click(function() {
            jQuery('#summary_content_popup').hide();
            jQuery('#summary_timeline_popup').hide();
        });

        jQuery('.summary_model_popup_inner, .summary_read_more, .timeline_item_cart a').click(function(event) {
            event.stopPropagation();
        });

        jQuery('.summary_model_popup_colse').click(function() {
            jQuery('#summary_content_popup').hide();
            jQuery('#summary_timeline_popup').hide();
        });
    });

    $(window).scroll(function() {
        var windowheight= $("#dev_windowheight").innerHeight() / 2;
        var windscroll = $(window).scrollTop() + windowheight;
        var topScroll = $('.main_vertical_timeline').offset().top;
        //console.log('windowheight', windowheight);
        if (windscroll >= topScroll) {
            $('.dot-nav').addClass('fixed');
            $('.main_vertical_timeline .timeline_section_group').each(function(i) {
                console.log("timeline_section_group");
                if ($(this).position().top <= windscroll) {
                    $('.dot-nav li.active').removeClass('active');
                    $('.dot-nav li').eq(i).addClass('active');
                }
            });

        } else {
            $('dot-nav').removeClass('fixed');
            $('dot-nav li.active').removeClass('active');
            $('dot-nav li:first').addClass('active');
        }
    }).scroll();
</script>
<script>
    $(document).ready(function() {
        var hash = window.location.hash.substring(1);
        console.log('hash',hash);
        if(hash){
            if (hash.length) {
                console.log(hash.length)
                jQuery('body, html').animate({
                    scrollTop: jQuery("#" + hash).offset().top - 80
                });
                setTimeout(function () {
                    jQuery('body, html').animate({
                        scrollTop: jQuery("#" + hash).offset().top - 80
                    });
				}, 1000);
            }
        }
    });
</script>
<script>
    AOS.init();
</script>
@endsection
