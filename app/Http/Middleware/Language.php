<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class Language
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Subsite section start
        $lang = get_subsite_lang();
        $locales = [];

        if (
            isset($lang->languages) &&
            $lang->languages != "" &&
            $lang->languages != "*"
        ) {
            $langs = explode(",", $lang->languages);
            $subsiteLocales = config("app.subsite-locales");
            $locales = array_intersect_key($subsiteLocales, array_flip($langs));
        } else {
            $defaultLocales = config("app.locales");
            $locales = $defaultLocales;
        }
        // Subsite section end

        // Check if the first segment matches a language code
        if (!array_key_exists($request->segment(1), $locales)) {
            // Store segments in array
            $segments = $request->segments();

            if ($request->segment(1) == "spa") {
                $segments[0] = "es"; // hardcoded redirect from spa to es
            } else {
                // Set the default language code as the first segment
                $segments = \Arr::prepend(
                    $segments,
                    config("app.fallback_locale")
                );
            }
            // Redirect to the correct url
            URL::defaults(["locale" => $segments[0]]);
            // Subsite section start
            $languages = explode(",", $lang->languages);
            $firstLanguage = $languages[0];
            return redirect()->to($firstLanguage);
            // Subsite section end
        } else {
            App::setLocale($request->segment(1));
        }
        URL::defaults(["locale" => App::getLocale()]);

        return $next($request);
    }
}
