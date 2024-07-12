<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NewsletterController extends Controller
{
    public function show()
    {
        $newslettersItem = Item::withoutGlobalScopes()->find(
            config("eiie.item.newsletters")
        );

        $lang = 0;
        $locale = \App::getLocale();
        if ($locale == "es") {
            $lang = 2;
        } elseif ($locale == "fr") {
            $lang = 1;
        } else {
            $lang = 0;
        }

        return view("newsletter.clickdimensions", [
            "newsletters_item" => $newslettersItem,
            "lang" => ["ei_code" => $lang, "code" => $locale],
            "status" => request()->has("status")
                ? __("eiie.Thank you for subscribing")
                : "",
        ]);
    }

    public function subscribe(Request $request)
    {
        $url = config("eiie.newsletter_signup_url_clickdimensions");
        $data = $request->only([
            "lang",
            "newsletter_ei",
            "newsletter_woe",
            "newsletter_solidarity",
            "emailaddress",
            "firstname",
            "lastname",
            "organisation",
            "phone",
        ]);
        $data["ContactSource"] = "EI Web Subscription";
        $response = Http::asForm()->post($url, $data);

        $newslettersItem = Item::withoutGlobalScopes()->find(
            config("eiie.item.newsletters")
        );

        return view("newsletter.thankyou", [
            "newsletters_item" => $newslettersItem,
            "status" => __("eiie.Thank you for subscribing"),
            "status_code" => $response->status(),
        ]);
    }
}
