<article class="card card_affiliate {{ $stickyClass ?? '' }}">

    @isset ($item->affiliate)
	    <header>
	        <h{{ $header_level ?? '3'}}>{{ $item->content->title }}</h{{ $header_level ?? '3'}}>
			@isset ($item->affiliate->acronym)
		    	<abbr>{{ $item->affiliate->acronym }}</abbr>
	    	@endisset

	    </header>
    	
    	<div class="affiliate_contact">
    	@isset ($item->affiliate->website)
    		<span class="affiliate_contact_web">
  	  			<a href="{{ $item->affiliate->website }}" target="_blank" rel="noopener" class="external">{{ $item->affiliate->website }}</a>
    		</span>
    	@endisset

    	@isset ($item->affiliate->email)
    	<span class="affiliate_contact_mail">
    		<a href="mailto:{{ $item->affiliate->email }}">{{ $item->affiliate->email }}</a>
    	</span>
    	@endisset

    	@if (isset($item->affiliate->phone_main) && $item->affiliate->phone_main)
    		<span class="affiliate_contact_fon contact_tel">
				<span class="contact_label">{{ __('eiie.contact_tel') }}</span> <a href="tel:{{ $item->affiliate->phone_main }}">{{ $item->affiliate->phone_main }}</a>
    		</span>
    	@endif

    	@if (isset($item->affiliate->phone_other) && $item->affiliate->phone_other)
    		<span class="affiliate_contact_fon contact_tel">
    			<span class="contact_label">{{ __('eiie.contact_tel') }}</span> <a href="tel:{{ $item->affiliate->phone_other }}">{{ $item->affiliate->phone_other }}</a>
    		</span>
    	@endif

    	@if (isset($item->affiliate->fax_main) && $item->affiliate->fax_main)
    		<span class="affiliate_contact_fon contact_fax">
    			<span class="contact_label">{{ __('eiie.contact_fax') }}</span> {{ $item->affiliate->fax_main }}
    		</span>
    	@endif

    	</div>
    	
    	<div class="affiliate_address">
	    @if($item->affiliate->street1)
	    	<span class="affiliate_contact_address">
	    		{{ $item->affiliate->street1 }}
	    	</span>
	    @endif
	    	
    	@if($item->affiliate->street2)
	    	<span class="affiliate_contact_address">
		    	{{ $item->affiliate->street2 }}
	    	</span>
	    @endif
		
		@if($item->affiliate->street3)
	    	<span class="affiliate_contact_address">
		    	{{ $item->affiliate->street3 }}
	    	</span>
	    @endif
	    <span class="affiliate_contact_address">
		@if ($item->affiliate->zip)
			{{-- We need the check because many zip codes are just '0' --}}
			{{ $item->affiliate->zip }}
			&nbsp;	
		@endif
    	{{ $item->affiliate->city }}	
	    </span>
    	<span class="affiliate_contact_address">
    	{{ $item->affiliate->state }}	
    	</span>
    	<span class="affiliate_contact_address">
    	{{-- $item->affiliate->country --}}	
    	</span>
    	</div>
    	
    @endisset

</article>
