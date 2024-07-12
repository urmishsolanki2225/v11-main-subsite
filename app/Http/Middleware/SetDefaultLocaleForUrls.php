<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class SetDefaultLocaleForUrls
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
        $locale = "en";
        if ($request->is("/es/*")) {
            $locale = "spa";
        } elseif ($request->is("/fr/*")) {
            $locale = "fr";
        }
        App::setLocale($locale);
        setlocale(LC_TIME, $locale);
        Carbon::setLocale($locale);

        URL::defaults(["locale" => $locale]);

        return $next($request);
    }
}
