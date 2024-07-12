@extends('main')

@section('head')
    @parent 
    @routes
    @viteReactRefresh
    @vite('resources/js/Front/Newsletter/NewsletterSubscribeForm.tsx')
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            window.setupForm({
                newsletters: [
                    'newsletter_ei',
                    'newsletter_woe',
                    'newsletter_solidarity'
                ],
                lang: {{ Illuminate\Support\Js::from($lang) }},
                translations: {{ Illuminate\Support\Js::from([
                    "First name" => __("eiie.First name"),
                    "Last name" => __("eiie.Last name"),
                    "Select your subscriptions" => __("eiie.Select your subscriptions"),
                    "Your information" => __("eiie.Your information"),
                    "Email" => __("eiie.Email"),
                    "Country" => __("eiie.Country"),
                    "Union" => __("eiie.Your union"),
                    "Organisation" => __("eiie.Your organisation (if you are not a union member)"),
                    "Country Prefix" => __("eiie.Country Prefix"),
                    "Phone number" => __("eiie.Phone number"),
                    "Policy" => __("eiie.newsletter_agree"),
                    "data_protection_policy_available_here" => trans('eiie.data_protection_policy_available_here', ['link' => route('contact.data-protection-policy')]),
                    "Stay up-to-date" => __("eiie.Stay up-to-date"),
                    "Subscribe" => __("eiie.Stay up-to-date"),
                    "newsletter_ei_header" => __("eiie.newsletter_ei_header"),
                    "newsletter_ei_intro" => __("eiie.newsletter_ei_intro"),
                    "newsletter_woe_header" => __("eiie.newsletter_woe_header"),
                    "newsletter_woe_intro" => __("eiie.newsletter_woe_intro"),
                    "newsletter_solidarity_header" => __("eiie.newsletter_solidarity_header"),
                    "newsletter_solidarity_intro" => __("eiie.newsletter_solidarity_intro"),
                ]) }}
            });
        });
    </script>
@endsection

@section('content')

<article class="article_main collection_introduction newsletters_introduction">
	<header>
            <h2>{{ $newsletters_item->content->title ?? __('eiie.Our Newsletters') }}</h2>            
	</header>
    @isset ($newsletters_item)
        <x-render-content :content="$newsletters_item->content" blurbOnly />
    @endisset
</article>

<section>
    @if($status)
        <h2 class="newsletter_status">{{ $status }}</h2>
    @endif
    {{-- the form is constructed in js-land and injected at form_root--}}
    {{-- 
    <form method="post" action="{{ config(
            'eiie.newsletter_signup_url_clickdimensions',
            'https://analytics-eu.clickdimensions.com/forms/h/ah59JE4EL00Gguwqp9QqgJ'
        ) }}" > 
    --}}
    <form method="post" action="{{ route('contact.newsletter-subscribe') }}" >
        @csrf
        <div id="form_root"></div>
    </form>
</section>

@endsection 
