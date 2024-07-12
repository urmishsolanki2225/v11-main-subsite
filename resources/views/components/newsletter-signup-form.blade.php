<form action="{{ $action }}" method="post" id="{{ $formId }}">
    <input type="hidden" name="newsletter_woe" value="on" />
    <input type="hidden" name="ContactSource" value="EI Web Subscription" />
    <input type="hidden" name="lang" value="{{ $lang }}" />
    <label>
        <span>{{ __('eiie.First name') }} <em>{{ __('eiie.required') }}</em></span>
        <input type="text" name="firstname" required />
    </label>
    <label>
        <span>{{ __('eiie.Last name') }} <em>{{ __('eiie.required') }}</em></span>
        <input type="text" name="lastname" required />
    </label>
    <label>
        <span>{{ __('eiie.Email') }} <em>{{ __('eiie.required') }}</em></span>
        <input type="email" name="emailaddress" required />
    </label>
    <button type="submit">{{ __('eiie.Submit') }}</button>
    <a class="data-protection-policy-formlink" href="{{ route('contact.data-protection-policy') }}">{{ __('eiie.Data Protection Policy') }}</a>
</form>
