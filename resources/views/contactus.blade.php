@extends('main')

@section('title', __('eiie.Education International'))

@section('head')
    @parent
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <script>
        function onSubmit(token) {
            document.getElementById("contact-form").submit();
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
    <header>
        <h2>{{ __('eiie.Contact Us') }}</h2>
    </header>

    <main>
        @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
        @endif

        <form id="contact-form" method="POST" action="{{ route('contact.form-post') }}">
            @csrf
            <label>
                <span>{{ __('eiie.First name') }}
                    <em>*
                        @error('first_name')
                            <span class="_error-inner">{{ $errors->first('first_name') }}</span>
                        @enderror
                    </em>
                </span>
                <input type="text" name="first_name" value="{{ old('first_name') }}" required />
            </label>

            <label>
                <span>{{ __('eiie.Last name') }}
                    <em>*
                        @error('last_name')
                            <span class="_error-inner">{{ $errors->first('last_name') }}</span>
                        @enderror
                    </em>
                </span>
                <input type="text" name="last_name" value="{{ old('last_name') }}" required />
            </label>

            <label>
                <span>{{ __('eiie.Email') }}
                    <em>*
                        @error('email')
                            <span class="_error-inner">{{ $errors->first('email') }}</span>
                        @enderror
                    </em>
                </span>
                <input type="email" name="email" value="{{ old('email') }}" required />

            </label>

            <label>
                <span>{{ __('eiie.Phone number') }}</span>
                <input type="text" name="phone" value="{{ old('phone') }}" />
            </label>

            {{-- <label>
                <span>{{ __('eiie.Addressee') }}</span>
                <select>
                    <optgroup label="EI Headquarters">
                        <option>Unit A</option>
                        <option>Unit B</option>
                    </optgroup>
                    <optgroup label="Region">
                        <option>ETUCE</option>
                        <option>ASIA</option>
                    </optgroup>
                </select>
            </label> --}}

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

                <textarea name="message" required >{{ old('message') }}</textarea>
            </label>

            <button
                class="g-recaptcha"
                data-sitekey="{{ recaptcha('score') }}"
                data-callback="onSubmit"
            >{{ __('eiie.Submit') }}</button>

            <div class="recaptcha-branding">
                {!! __('eiie.recaptcha_attrib') !!}
            </div>
        </form>
    </main>
    @isset($offices[0])
        <section class="contact_us_offices affiliates-listing">
            <header>
                <h3>{{ __('eiie.Offices') }}</h3>
            </header>
            @foreach ($offices as $office)
                @include('shared.card', ['item' => $office])
                {{--
                <article class="contact_us_office card card_affiliate">
                    <h4>{{ $office->content->title }}</h4>
                    @isset ($office->content->contact)
                        @include('shared.contact', ['contact' => $office->content->contact])
                    @endisset
                </article>
                --}}
            @endforeach
        </section>
    @endisset
</article>

@endsection
