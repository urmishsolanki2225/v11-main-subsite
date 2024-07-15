<div class="searchToggle">{{ __('eiie.Search') }}</div>
<form method="get" action="{{ route('subsite.search') }}" id="search_container{{ $suffix ?? '' }}">
    <h3>{{ __('eiie.Search Education International') }}</h3>
    <input name="{{ config('scout.prefix','') }}item_contents[query]" type="text" placeholder="{{ __('eiie.Enter search term(s)') }}" id="search_input{{ $suffix ?? '' }}"/>
    <button aria-label="{{ __('eiie.Show results') }}" id="search_button{{ $suffix ?? '' }}" type="submit">{{ __('eiie.Show results') }}</button>
    <button aria-label="{{ __('cancel') }} " type="reset" id="search_cancel_button{{ $suffix ?? '' }}">{{ '⨯' }}</button>
</form>
