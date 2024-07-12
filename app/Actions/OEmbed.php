<?php

namespace App\Actions;

use App;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

use Embed\Embed;
use Embed\Http\Crawler;
use Embed\Http\CurlClient;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use stdClass;

class OEmbed
{
    public static function embed($text)
    {
        $text = Str::of($text)->replaceMatches(
            '#<section\s+class="social-embed"\s+data-url="([^"]+)"[^>]*>[^>]*</section>#im',
            function ($match) {
                // $data = $embed->get($match[1]);
                $data = OEmbed::load($match[1]);
                if (empty($data)) {
                    return "";
                }
                $html = "";
                try {
                    $html = isset($data->code->html) ? $data->code->html : "";
                } catch (Exception $ex) {
                    Log::error($ex);
                }
                return $html
                    ? '<section class="social-embed social-embed-' .
                            $data->providerName .
                            '" data-url="' .
                            $match[1] .
                            '">' .
                            $html .
                            "</section>"
                    : "";
            }
        );

        return $text;
    }

    public static function load($url)
    {
        $key = "oembed_" . $url;
        $info = Cache::get($key);
        if ($info) {
            return $info;
        }
        $info = (function () use ($url) {
            if (Str::contains($url, "twitter.com")) {
                $url = Str::replace("twitter.com", "x.com", $url);
                clock("redirect url", $url);
            }
            if (Str::contains($url, "/x.com")) {
                $resp = Http::get("https://publish.x.com/oembed", [
                    "chrome" => "transparent",
                    "dnt" => true,
                    "url" => $url,
                    "lang" => App::getLocale(),
                ]);
                if ($resp->ok()) {
                    $html = $resp->json("html");
                    if ($html) {
                        clock($html);
                        $result = new stdClass();
                        $result->providerName = $resp->json("provider_name");
                        $result->code = new stdClass();
                        $result->code->html = $html;
                        return $result;
                    }
                }
                $client = new CurlClient();
                $client->setSettings([
                    // "follow_location" => false,
                ]);
                $embed = new Embed(new Crawler($client));
            } else {
                $embed = new Embed();
            }
            $embed->setSettings([
                "facebook:token" => config(
                    "eiie.oembed-settings.facebook:token"
                ),
                "instagram:token" => config(
                    "eiie.oembed-settings.facebook:token"
                ),
                "twitter:token" => config("eiie.oembed-settings.twitter:token"),
            ]);
            try {
                $info = $embed->get($url);
                clock($info);
                $result = new stdClass();
                $result->providerName = $info->providerName;
                $result->code = $info->code;
                if (!$result->code) {
                    clock("no embed code");
                    return null;
                }
                $oembed = $info->getOEmbed();
                $result->title = $oembed->str("title");
                $result->all = $oembed->all();
                clock($oembed);
                return $result;
            } catch (Exception $ex) {
                clock($ex);
                return null;
            }
        })();
        if ($info) {
            Cache::forever($key, $info);
        }
        return $info;
    }
}
