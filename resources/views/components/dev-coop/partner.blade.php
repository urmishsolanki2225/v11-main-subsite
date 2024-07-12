@isset($partner->country)
    <span class="dev_coop_partner_country">{{ $partner->country->content->title }}</span> - 
@endisset
{{ $partner->name }}
@isset($partner->acronym)
    ({{ $partner->acronym }})
@endisset
