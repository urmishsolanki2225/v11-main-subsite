<article class="card car_contact card_affiliate {{ $stickyClass ?? '' }}">

    <header>
        <h{{ $header_level ?? '3'}}>{{ $item->content->title }}</h{{ $header_level ?? '3'}}>
        @isset ($item->content->contact->acronym)
            <abbr>{{ $item->content->contact->acronym }}</abbr>
        @endisset

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
            <span class="contact_label">{{ __('eiie.contact_tel') }}</span> <a href="tel:{{ $item->content->contact->phone_main }}">{{ $item->content->contact->phone_main }}</a>
        </span>
    @endif

    @if (isset($item->content->contact->phone_other) && $item->content->contact->phone_other)
        <span class="affiliate_contact_fon contact_tel">
            <span class="contact_label">{{ __('eiie.contact_tel') }}</span> <a href="tel:{{ $item->content->contact->phone_other }}">{{ $item->content->contact->phone_other }}</a>
        </span>
    @endif

    @if (isset($item->content->contact->fax_main) && $item->content->contact->fax_main)
        <span class="affiliate_contact_fon contact_fax">
            <span class="contact_label">{{ __('eiie.contact_fax') }}</span> {{ $item->content->contact->fax_main }}
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
