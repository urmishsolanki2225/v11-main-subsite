<div class="subscribe-carousel">
    <div class="subscribe-carousel-start active">
        <h3>{{ __('eiie.Stay up-to-date') }}</h3>
        <p>{!! __('eiie.Sign up for the Worlds of Education newsletter.') !!}</p>
    </div>
    <div class="subscribe-carousel-form">
        <h3>{{ __('eiie.Stay up-to-date') }}</h3>
        <p>{!! __('eiie.Sign up for the Worlds of Education newsletter.') !!}</p>
        <x-newsletter-signup-form-subsite></x-newsletter-signup-form-subsite>
    </div>
    <div class="subscribe-carousel-result-success">
        <p>{{ __('eiie.Thank you for subscribing') }}</p>
    </div>
    <div class="subscribe-carousel-result-error">
        <p>{{ __('eiie.Something went wrong') }}</p>
        <button>{{ __('eiie.Try again') }}</button>
    </div>
</div>