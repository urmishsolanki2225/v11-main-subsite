<!DOCTYPE html>
<html lang="{{ App::getLocale() }}">

@section('title', isset($title) ? $title : '')

@section('pageclass')
    @php
        $route = Route::currentRouteName();
        $class = '';
        if($route ==  "subsite.newsletter"){
            $class = "route-contact-newsletter";
        }

        if($route=="subsite.resources.coop_projects.overview"){
            $class = "route-subsite-coop_projects-overview";
        }
        if($route=="subsite.resources.coop_projects.index"){
            $class = "route-subsite-coop_projects-index";
        }
        if ($route) {
            if($route == "subsite.affiliates"){
                $route = "affiliates";
            }
            if($route == "subsite.search"){
                $route = "search";
            }
            echo 'route-'.str_replace('.','-', $route);
        }
    @endphp
@endsection
@php
    $lang = \App::currentLocale();
    $primary_color = '#0079b4';
    if($subsitedata->primary_color!=''){
        $primary_color = $subsitedata->primary_color;
    }
@endphp

@include('shared.socials')

<head>
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="HandheldFriendly" content="true">
    <title>@yield('title')</title>
    <link rel="preload" href="https://use.typekit.net/scu0unl.css" as="style">
    <link rel="canonical" href="{{ str_replace('acc2021.', 'www.', url()->current()) }}" />

    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('icons/apple-touch-icon.png')}}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('icons/favicon-32x32.png')}}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('icons/favicon-16x16.png')}}">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <link rel="stylesheet" href="https://use.typekit.net/scu0unl.css">
    @php
        $subdomain=getSubdomain();
        $pathSegments = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

    @endphp
    @if($subdomain == "accrs" && $pathSegments[0]== "ar")
        <html xmlns="http://www.w3.org/1999/xhtml" dir="rtl" lang="ar" class="arablang">
    @endif

    @vite('resources/sass/style-subsite.scss')
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        var cookieControlLocale = '{{ App::getLocale() }}';
    </script>
    @yield('head')
    @vite('resources/js/subsite-script.js')
    @stack('scripts')
    <style>
        :root {
            --primary: {{ $primary_color }};
        }
    </style>
    @if(config('eiie.google-tag-manager-id'))
        {{-- Google Tag Manager --}}
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','{{ config('eiie.google-tag-manager-id') }}');</script>
        {{-- End Google Tag Manager --}}
    @endif
</head>
<body class="@yield('pageclass') {{$class}}">
    @if(isset($subsitedata) && $subsitedata->tracking_code!='')
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $subsitedata->tracking_code }}"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '{{ $subsitedata->tracking_code }}');
        </script>
    @endif
    <div class="wrapper">
        <header id="header_page">
            <h1><a href="{{ route('subsite.home') }}">Ei-iE</a></h1>
            <div id="navToggle">
            	<span>&nbsp;</span>
            	<span>&nbsp;</span>
            	<span>&nbsp;</span>
            </div>
            <nav id="mainNav">
                <div id="searchBar-mobile">@include('shared.subsite-searchBar', ['suffix' => '-mobile'])</div>
                <div id="languageSelector-mobile">@include('shared.subsite-language_selector', ['suffix' => '-mobile'])</div>
                <x-primary-navigation-subsite />
                <div id="searchBar">@include('shared.subsite-searchBar', ['suffix' => ''])</div>
                <div id="memberNav-mobile"><a href="https://eiie.sharepoint.com/SitePages/HomePage.aspx" target="_blank">{{ __('eiie.Members only') }}</a></div>
            </nav>
            {{-- @yield('collections_nav') --}}
            <section id="headerside">
	            @include('shared.subsite-language_selector')
                <div id="memberNav"><a href="https://eiie.sharepoint.com/SitePages/HomePage.aspx" target="_blank">{{ __('eiie.Members only') }}</a></div>
            </section>
        </header>
		<section id="main_page">
	        @yield('content')
		</section>
        <footer id="footer_page">
            <div id="footer" class="footer">
                    <div class="w-container">
                        <div class="w-row">
                            <div class="w-col-3 w-col widgets widget_recent_news">
                                <h3>{{ __('eiie.Opinion and Stories') }}</h3>
                                <ul>
                                    @php $get_opinion = getOpinion_subsite(); @endphp
                                    @foreach ($get_opinion as $items_opinion)
                                    @if(isset($items_opinion->content['title']))
                                        <li>
                                            <a href="{{url('/') }}/{{$lang}}/item/{{ $items_opinion->content['item_id'] }}:{{$items_opinion->content['slug']}}">{{$items_opinion->content['title']}}</a>
                                        </li>
                                    @endif
                                    @endforeach
                                </ul>
                            </div>
                            <div class="w-col-3 w-col widgets widget_recent_tweets">
                                <h3>{{ __('eiie.Recent Tweets') }}</h3>
                                @php
                                    $getTweet = array();
                                    $pattern = '/@([A-Za-z0-9_\.]+)/';
                                    //if($subsitedata->aliase_name=='africa'){
                                    //    $getTweet = twitterGet('@EIRAFRICA');
                                    //}else if($subsitedata->aliase_name=='asia-pacific'){
                                    //    $getTweet = twitterGet('@eduintAP');
                                    //}else {
                                    //    $getTweet = twitterGet('@eduint');
                                    //}
                                @endphp
                                <ul>
                                    {{-- @foreach($getTweet as $key => $value)
                                        @php
                                        $string_with_links = preg_replace($pattern, '<a href="https://www.twitter.com/$1" target="_bl
                                        "><b>@$1</b></a>', $value['text']);
                                        @endphp
                                        <li>
                                        @php
                                           echo $string_with_links
                                        @endphp
                                        </li>
                                    @endforeach --}}
                                    <li>
                                        {{ __('eiie.Follow Us:') }}
                                        @if($subsitedata->aliase_name=='africa')
                                        <a href="https://twitter.com/EIRAFRICA" target="_blank"> @EIRAFRICA</a>
                                        @elseif($subsitedata->aliase_name=='asia-pacific')
                                           <a href="https://twitter.com/eduintAP" target="_blank"> @eduintAP</a>
                                        @else
                                            <a href="https://twitter.com/eduint" target="_blank"> @eduint</a>
                                        @endif
                                    </li>
                                </ul>
                            </div>
                            <div class="w-col-3 w-col widgets widget_facebook">
                                <h3>{{ __('eiie.Facebook') }}</h3>
                                <ul>
                                    <li>
                                        <!-- Added by Cyblance for W3CValidator Start -->
                                        <iframe name="f2f94f16009e158" width="300" height="241" data-testid="fb:page Facebook Social Plugin" title="fb:page Facebook Social Plugin" style="border: 0; overflow:hidden; visibility: visible; width: 241px; height: 130px;" allowfullscreen allow="encrypted-media" src="https://www.facebook.com/plugins/page.php?app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df16ea57cf8af1a%26domain%3Dregions.ei-ie.org%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fregions.ei-ie.org%252Ff2af58e1462b698%26relation%3Dparent.parent&amp;container_width=241&amp;height=241&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Feducationinternational%2F&amp;locale=en_US&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false&amp;tabs=&amp;width=300" class="" data-origwidth="300px" data-origheight="241px"></iframe>
                                        <!-- Added by Cyblance for W3CValidator End -->
                                    </li>
                                </ul>
                            </div>
                            <div class="w-col-3 w-col widgets widget_contact_info">
                                @php $office = officeAddress() @endphp
                                @foreach($office as $officeadd)
                                @if($loop->last)
                                <h3>{{ __('eiie.Contact Info') }}</h3>
                                <div class="textwidget">
                                @if ($officeadd->content->contact->street1 != "" && $officeadd->content->contact->street2 = "" &&$officeadd->content->contact->street3 == "" && $officeadd->content->contact->zip == "" || $officeadd->content->contact->city == "" ||$officeadd->content->contact->state == "" ||$officeadd->content->contact->country == "")
                                        <p>{{ __('eiie.Address') }}:
                                            {{ $officeadd->content->contact->street1}}
                                            {{ $officeadd->content->contact->street2}}
                                            {{ $officeadd->content->contact->street3}}
                                            {{ $officeadd->content->contact->zip}}
                                            <br>
                                            {{$officeadd->content->contact->city}}
                                            {{$officeadd->content->contact->state}}
                                            {{$officeadd->content->contact->country}}
                                            <br>
                                            @if (isset($officeadd->content->contact->phone_main) && $officeadd->content->contact->phone_main)
                                            <p>{{ __('eiie.Phone') }}:
                                                <a href="tel:{{ $officeadd->content->contact->phone_main }}">{{ $officeadd->content->contact->phone_main }}</a><br>
                                            @endif
                                            @if (isset($officeadd->content->contact->fax_main) && $officeadd->content->contact->fax_main)
                                            {{ __('eiie.Fax') }}:
                                            <a href="tel:{{ $officeadd->content->contact->fax_main }}"> {{ $officeadd->content->contact->fax_main }}</a><br>
                                            @endif

                                            @if (isset($officeadd->content->contact->email) && $officeadd->content->contact->email)
                                            {{ __('eiie.Email') }}: <a href="mailto:{{ $officeadd->content->contact->email }}">{{ $officeadd->content->contact->email }}</a>
                                            @endif
                                        </p>

                                    @endif
                                </div>
                                @endif
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
                <div class="social-profiles">
                @php
                    $socialLinks = [
                        'facebook' => $subsitedata->facebookURL ?? '',
                        'twitter' => $subsitedata->twitterURL ?? '',
                        'youtube' => $subsitedata->youtubeURL ?? '',
                        'soundcloud' => $subsitedata->soundcloudURL ?? '',
                    ];
                @endphp

                @foreach ($socialLinks as $platform => $url)
                    @if (!empty(trim($url)) && trim($url) !== 'https://' && trim($url) !== 'http://')
                        <a href="{{ $url }}" target="_blank" rel="noopener" class="social-profile-{{ $platform }}">{{ ucfirst($platform) }}</a>
                    @endif
                @endforeach
            </div>
            <p>
                {!! __('eiie.footer_licence') !!}
            </p>
            <p>
                <a href="{{ route('subsite.legal-notice') }}" target="_Blank">{{ __('eiie.Legal Notice') }}</a>
                <a href="{{ route('subsite.data-protection-policy') }}" target="_Blank">{{ __('eiie.Data Protection Policy') }}</a>
            </p>
        </footer>
    </div>
</body>
</html>

