<!DOCTYPE html>
<html lang="{{ App::getLocale() }}">

@section('title', isset($title) ? $title : '')

@section('pageclass')
    @php
        $route = Route::currentRouteName();
        if ($route) {
            echo 'route-'.str_replace('.','-', $route);
        }
    @endphp
@endsection

@include('shared.socials')

<head>
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="HandheldFriendly" content="true">
    <title>@yield('title')</title>
    <link rel="preload" href="https://use.typekit.net/scu0unl.css?v=20240528" as="style">
    <link rel="canonical" href="{{ str_replace('acc2021.', 'www.', url()->current()) }}" />

    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <link rel="stylesheet" href="https://use.typekit.net/scu0unl.css?v=20240528">
    @vite('resources/sass/style.scss')
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        var cookieControlLocale = '{{ App::getLocale() }}';
    </script>
    @yield('head')
    @include('scripts.load_externals')
    @if(config('eiie.google-tag-manager-id'))       
        {{-- Google Tag Manager --}}
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','{{ config('eiie.google-tag-manager-id') }}');</script>
        {{-- End Google Tag Manager --}}
    @endif
    @vite('resources/js/script.js')
    @stack('scripts')    
    <style type="text/css">
        body { --support-color: @yield('support_color', 'transparent'); }
    </style>
</head>
<body class="@yield('pageclass')">
    @if(config('eiie.google-tag-manager-id'))
        {{-- Google Tag Manager (noscript) --}}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ config('eiie.google-tag-manager-id') }}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        {{-- End Google Tag Manager (noscript) --}}
    @endif

    <div class="wrapper">
        <header id="header_page">
            <h1><a href="{{ route('home') }}">Ei-iE</a></h1>
            <div id="navToggle">

            	<span>&nbsp;</span>
            	<span>&nbsp;</span>
            	<span>&nbsp;</span>
            </div>
            <nav id="mainNav">
                <div id="searchBar-mobile">@include('shared.searchBar', ['suffix' => '-mobile'])</div>
                <div id="languageSelector-mobile">@include('shared.language_selector', ['suffix' => '-mobile'])</div>
                <x-primary-navigation />
                <div id="searchBar">@include('shared.searchBar', ['suffix' => ''])</div>
                <div id="memberNav-mobile"><a href="https://eiie.sharepoint.com/SitePages/HomePage.aspx" target="_blank">{{ __('eiie.Members only') }}</a></div>
            </nav>
            {{-- @yield('collections_nav') --}}
            <section id="headerside">
	            @include('shared.language_selector')
                <div id="memberNav"><a href="https://eiie.sharepoint.com/SitePages/HomePage.aspx" target="_blank">{{ __('eiie.Members only') }}</a></div>
            </section>
        </header>
		<section id="main_page">
	        @yield('content')
		</section>
        <footer id="footer_page">
            <div class="social-profiles">
                <a href="https://www.facebook.com/educationinternational" target="_blank" rel="noopener" class="social-profile-facebook">Facebook</a>
                <a href="https://twitter.com/eduint" target="_blank" rel="noopener" class="social-profile-twitter">Twitter</a>
                <a href="https://www.youtube.com/user/EduInternational" target="_blank"  rel="noopener" class="social-profile-youtube">YouTube</a>
                <a href="https://soundcloud.com/user-918336677-743440864" target="_blank" rel="noopener" class="social-profile-soundcloud">Soundcloud</a>
            </div>
            <p>
                {!! __('eiie.footer_licence') !!}
            </p>
            <p>
                <a href="{{ route('contact.legal-notice') }}">{{ __('eiie.Legal Notice') }}</a>
                <a href="{{ route('contact.data-protection-policy') }}">{{ __('eiie.Data Protection Policy') }}</a>
            </p>
        </footer>
    </div>
</body>
</html>

