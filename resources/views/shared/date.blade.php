@if (!empty($date))
    <span class="date {{ $class ?? '' }}">
        @isset($label)
            <span class="label">{{ $label }}</span>
        @endisset
        {{ $date->locale(App::getLocale())->isoFormat('D MMMM YYYY') }}
    </span>
@endif