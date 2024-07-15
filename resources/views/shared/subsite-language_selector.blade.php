<section id="languageSelection{{ $suffix ?? '' }}">
    <ul id="languageSelection_list{{ $suffix ?? '' }}">
    @php
        $lang = get_subsite_lang();
        $locales = []; // Declare $locales variable outside the if block

        if (isset($lang->languages) && $lang->languages !== '' && $lang->languages != "*") {
            $langs = explode(',', $lang->languages);
            $subsiteLocales = config('app.subsite-locales');
            $locales = array_intersect_key($subsiteLocales, array_flip($langs));
        }else{
            $defaultLocales = config('app.locales');
                $locales = $defaultLocales;
        }
    @endphp
    @foreach ($locales as $localeKey => $locale)
        @if ($localeKey != app()->getLocale())
            @php
                $segs = Request::segments();
                $segs[0] = $localeKey;
            @endphp
            <li><a href="{{ url('/') }}/{{ implode('/', $segs) }}">
                {{ $localeKey }}
            </a></li>
        @else
            <li class="active"><span>{{ $localeKey }}</span></li>
        @endif
    @endforeach
    </ul>
</section>
