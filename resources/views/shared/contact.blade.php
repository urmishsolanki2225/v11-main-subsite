
<div class="contact">

    <div class="contact_numbers">
        @isset ($contact->website)
            <span class="contact_web">
                <a href="{{ $contact->website }}" target="_blank" rel="noopener" class="external">{{ $contact->website }}</a>
            </span>
        @endisset

        @isset ($contact->email)
        <span class="contact_mail">
            {{ Html::mailto($contact->email) }}
        </span>
        @endisset

        @if ($contact->phone_main)
            <span class="contact_phone">
                <span class="contact_label">{{ __('eiie.contact_tel') }}</span> <a href="tel:{{ $contact->phone_main }}">{{ $contact->phone_main }}</a>
            </span>
        @endif

        @if ($contact->phone_other)
            <span class="contact_phone">
                <span class="contact_label">{{ __('eiie.contact_tel') }}</span> <a href="tel:{{ $contact->phone_other }}">{{ $contact->phone_other }}</a>
            </span>
        @endif

        @if ($contact->fax_main)
            <span class="contact_fax">
                <span class="contact_label">{{ __('eiie.contact_fax') }}</span> {{ $contact->fax_main }}
            </span>
        @endif
    </div>
    
    <div class="contact_address">
        @if($contact->street1)
            <span class="contact_address_street">
                {{ $contact->street1 }}
            </span>
        @endif
            
        @if($contact->street2)
            <span class="contact_address_street">
                {{ $contact->street2 }}
            </span>
        @endif
        
        @if($contact->street3)
            <span class="contact_address_street">
                {{ $contact->street3 }}
            </span>
        @endif
        
        @if ($contact->zip)
            <span class="contact_address_zip">
                {{ $contact->zip }}
                &nbsp;	
            </span>
        @endif

        @if ($contact->city)
            <span class="contact_address_city">
                {{ $contact->city }}
            </span>
        @endif

        @if ($contact->state)
            <span class="contact_address_state">
                {{ $contact->state }}
            </span>
        @endif

        @if ($contact->country)
            <span class="contact_address_country">
                {{ $contact->country }}
            </span>
        @endif

    </div>
</div>
