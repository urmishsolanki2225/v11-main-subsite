@php
$segment=Request::segment(1);
@endphp
@extends('subsite-main')

@section('title', __('eiie.Education International'))
@section('head')
@php
    $lang = \App::currentLocale();
    $primary_color = '#000000';
    if($subsitedata->primary_color!=''){
        $primary_color = $subsitedata->primary_color;
    }
@endphp
@parent
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <script>
        function onSubmit(token) {
            document.getElementById("subsite-contact-form").submit();
        }
    </script>
    <style type="text/css">
    .grecaptcha-badge {
        visibility: hidden;
    }
    </style>
@endsection

@section('content')
<div class="no_lead_image"></div>
<article class="article_main ">
    @if($subsitedata)
    <header>
        <h2>{{ __('eiie.Contact us') }}</h2>
        <x-breadcrumbs />
    </header>
    <main class="sidebar_page custom-contact-page">
        @if(session('success'))
        <div class="alert alert-success">
             <!-- Added by Cyblance for Thank you message match with theme Start -->
            <span style="color:{{ $primary_color }};">{{ session('success') }}</span>
             <!-- Added by Cyblance for Thank you message match with theme End -->
        </div>
        @endif
        <form id="subsite-contact-form" method="POST" action="{{ route('subsite.contactform-save') }}">
            @csrf
                <input type="hidden" name="subsite_id" value="{{ $subsitedata->id }}" />
                <label>
                    <span>{{ __('eiie.First name') }}
                        <em>*
                            @error('first_name')
                            <span class="_error-inner">{{ $errors->first('first_name') }}</span>
                            @enderror
                        </em>
                    </span>
                    <input type="text" name="first_name" value="{{ old('first_name') }}" />
                </label>

                <label>
                    <span>{{ __('eiie.Last name') }}
                        <em>*
                            @error('last_name')
                            <span class="_error-inner">{{ $errors->first('last_name') }}</span>
                            @enderror
                        </em>
                    </span>
                    <input type="text" name="last_name" value="{{ old('last_name') }}" />
                </label>

                <label>
                    <span>{{ __('eiie.Email') }}
                        <em>*
                            @error('email')
                            <span class="_error-inner">{{ $errors->first('email') }}</span>
                            @enderror
                        </em>
                    </span>
                    <input type="text" name="email" value="{{ old('email') }}" />

                </label>

                <label>
                    <span>{{ __('eiie.Phone number') }}</span>
                    <input type="text" name="phone" value="{{ old('phone') }}" />
                </label>

                <label>
                    <span>{{ __('eiie.Topic') }}</span>
                    <input type="text" name="subject" value="{{ old('subject') }}" />
                </label>

                <label>
                    <span>{{ __('eiie.Message') }}
                        <em>*
                            @error('message')
                            <span class="_error-inner">{{ $errors->first('message') }}</span>
                            @enderror
                        </em>
                    </span>

                    <textarea name="message">{{ old('message') }}</textarea>
                </label>

                <button class="g-recaptcha"
                {{-- data-sitekey="6Le0xT4lAAAAAKHqdUsGtpw68o-ua4GQ929uvUAl" --}}
                data-callback="onSubmit">
                    {{ __('eiie.Submit') }}
                </button>
                <div class="recaptcha-branding">
                    {!! __('eiie.recaptcha_attrib') !!}
                </div>
            </form>
    </main>
    <section class="contact-right-sidebar contact_us_offices affiliates-listing">
        <header><h3>{{ __('eiie.Offices') }}</h3></header>
        @php $items = officeAddress() @endphp
        
        @if(count($items) == 0)
            <p> {{ __('eiie.No address available.') }}</p>
        @else
            @foreach($items as $item)
            <article class="contact_us_office card card_affiliate">
                <header>
                    <h3>{{ $item->content->title }}</h3>
                </header>
                @if ($item->content->contact->street1 == "" && $item->content->contact->street2 == "" && $item->content->contact->street3 == "" && $item->content->contact->zip == "" && $item->content->contact->city == "" && $item->content->contact->state == "" && $item->content->contact->country == "")
                    <div class="affiliate_address">
                        @isset ($item->content->contact->email)
                            <span class="affiliate_contact_mail">
                            <a href="mailto:{{ $item->content->contact->email }}">{{ $item->content->contact->email }}</a>
                            </span>
                        @endisset
                    </div>
                @else
                    <div class="affiliate_contact">
                        @isset ($item->content->contact->website)
                            <span class="affiliate_contact_web">
                                <a href="{{ $item->content->contact->website }}" target="_blank" rel="noopener" class="external">{{ $item->content->contact->website }}</a>
                            </span>
                        @endisset
                        @isset ($item->content->contact->email)
                            <span class="affiliate_contact_mail">
                            <a href="mailto:{{ $item->content->contact->email }}">{{ $item->content->contact->email }}</a>
                            </span>
                        @endisset
                        @if (isset($item->content->contact->phone_main) && $item->content->contact->phone_main)
                            <span class="affiliate_contact_fon contact_tel">
                                <span class="contact_label"><b>{{ __('eiie.contact_tel') }}</b></span> <a href="tel:{{ $item->content->contact->phone_main }}">{{ $item->content->contact->phone_main }}</a>
                            </span>
                        @endif
                        @if (isset($item->content->contact->phone_other) && $item->content->contact->phone_other)
                            <span class="affiliate_contact_fon contact_tel">
                                <span class="contact_label"><b>{{ __('eiie.contact_tel') }}</b></span> <a href="tel:{{ $item->content->contact->phone_other }}">{{ $item->content->contact->phone_other }}</a>
                            </span>
                        @endif
                        @if (isset($item->content->contact->fax_main) && $item->content->contact->fax_main)
                            <span class="affiliate_contact_fon contact_fax">
                                <span class="contact_label"><b>{{ __('eiie.contact_fax') }} :</b></span> {{ $item->content->contact->fax_main }}
                            </span>
                        @endif
                    </div>
                @endif
                <div class="affiliate_address">
                        @if($item->content->contact->street1)
                            <span class="affiliate_contact_address">
                                {{ $item->content->contact->street1 }}
                            </span>
                        @endif

                        @if($item->content->contact->street2)
                            <span class="affiliate_contact_address">
                                {{ $item->content->contact->street2 }}
                            </span>
                        @endif

                        @if($item->content->contact->street3)
                            <span class="affiliate_contact_address">
                                {{ $item->content->contact->street3 }}
                            </span>
                        @endif
                        <span class="affiliate_contact_address">
                            @if ($item->content->contact->zip)
                                {{-- We need the check because many zip codes are just '0' --}}
                                {{ $item->content->contact->zip }}
                                &nbsp;
                            @endif
                            {{ $item->content->contact->city }}
                        </span>
                        <span class="affiliate_contact_address">
                            {{ $item->content->contact->state }}
                        </span>
                        <span class="affiliate_contact_address">
                            {{-- $item->content->contact->country --}}
                        </span>
                </div>
                </article>
            @endforeach
        @endif

        @if (!empty(trim($subsitedata->map_url)) && trim($subsitedata->map_url) !== 'https://')
            <article class="mt-10 pb-20">
                <iframe width="100%" height="368" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="{{$subsitedata->map_url}}" data-origwidth="100%" data-origheight="368" style="width: 100%;">
                </iframe>
            </article>
        @endif

    </section>
    @endif
</article>
@endsection