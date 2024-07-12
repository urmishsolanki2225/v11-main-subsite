<section id="languageSelection{{ $suffix ?? '' }}">
    <ul id="languageSelection_list{{ $suffix ?? '' }}">
    @foreach (config('app.locales') as $localeKey => $locale)
        @if ($localeKey != app()->getLocale())
            @php 
                $segs = Request::segments();
                $segs[0] = $localeKey;
            @endphp 
            <li><a href="/{{ implode('/', $segs) }}">
                {{ $localeKey }}
            </a></li>
        @else 
            <li class="active"><span>{{ $localeKey }}</span></li>
        @endif 
    @endforeach
    </ul>
</section>
