<?php
// Add By cyblance For sharing start
use App\Models\SocialMedia;
use GuzzleHttp\Client;
use Abraham\TwitterOAuth\TwitterOAuth;
use Carbon\Carbon;
// Add By cyblance For sharing end
//Added by Cyblance for Subsite section start
use App\Models\{Subsite, Collection};
//Added by Cyblance for Subsite section end

//Added code separated success messege for each type  by Cyblance start
function item_success_message($type, $subtype = null)
{
    if ($type == "article") {
        $getCreateMsg = "Article";
    } elseif ($type == "static") {
        $getCreateMsg = "Page";
    } elseif ($type == "resource") {
        if (
            $subtype == "image.icon" ||
            $subtype == "image.square" ||
            $subtype == "image.portrait" ||
            $subtype == "image"
        ) {
            $getCreateMsg = "Image";
        } else {
            $getCreateMsg = ucfirst($subtype);
        }
    } elseif ($type == "dcproject") {
        $getCreateMsg = "DC Project";
    } elseif ($type == "articles") {
        $getCreateMsg = "Article List";
    } elseif ($type == "dossier_sub") {
        $getCreateMsg = "Dossier Subsections";
    } elseif ($type == "contacts" || $type == "persons") {
        $getCreateMsg = "Contact lists";
    } elseif ($type == "workarea" || $type == "sdi_group") {
        $getCreateMsg = "Priorities";
    } elseif ($type == "tag" || $type == "theme") {
        $getCreateMsg = "Tags & Themes";
    } elseif ($type == "person" || $type == "contact") {
        $getCreateMsg = "Persons & Contacts";
    } else {
        $getCreateMsg = ucfirst($type);
    }
    return $getCreateMsg;
}
//Added code separated success messege for each type  by Cyblance end

/* Add By cyblance For sharing start */
// For LinkedInShare
function linkedinShare($postData)
{
    $token = SocialMedia::where("name", "linkedin")->first();

    if ($token->access_token_expires_at <= Carbon::now()->subDay()) {
        // access token almost expired, attempt to refresh it
        $tokensResponse = Http::asForm()->post(
            "https://www.linkedin.com/oauth/v2/accessToken",
            [
                "grant_type" => "refresh_token",
                "refresh_token" => $token->refresh_token,
                "client_id" => config("services.linkedin.client_id"),
                "client_secret" => config("services.linkedin.client_secret"),
            ]
        );
        $token->update([
            "access_token" => Arr::get($tokensResponse, "access_token"),
            "refresh_token" => Arr::get($tokensResponse, "refresh_token"),
            "token_issued_at" => Carbon::now(),
            "access_token_expires_at" => Carbon::now()->addSeconds(
                Arr::get($tokensResponse, "expires_in") - 10
            ),
            "token_expires_at" => Carbon::now()->addSeconds(
                Arr::get($tokensResponse, "refresh_token_expires_in") - 10
            ),
        ]);
        $token->refresh(); //
    }

    $response = Http::withHeaders([
        "Linkedin-Version" => "202211",
        "X-Restli-Protocol-Version" => "2.0.0",
    ])
        ->withToken($token->access_token)
        ->post("https://api.linkedin.com/rest/posts", [
            "author" => config("services.linkedin.organization_urn"),
            "commentary" => Arr::get(
                $postData,
                "blurb",
                Arr::get($postData, "title", "")
            ),
            "visibility" => "PUBLIC",
            "distribution" => [
                "feedDistribution" => "MAIN_FEED",
                "targetEntities" => [],
                "thirdPartyDistributionChannels" => [],
            ],
            "content" => [
                "article" => [
                    "source" => Arr::get($postData, "url"),
                    "title" => $postData["title"],
                    "description" => Arr::get($postData, "blurb", ""),
                ],
            ],
            "contentLandingPage" => Arr::get($postData, "url"),
            "contentCallToActionLabel" => "LEARN_MORE",
            "lifecycleState" => "PUBLISHED",
            "isReshareDisabledByAuthor" => false,
        ]);
    if ($response->status() !== 201) {
        // it's an error
        $message = Arr::get(
            $response,
            "message",
            "Unknown error sharing to LinkedIn"
        );
        throw new Exception($message);
    }
    clock($response->json());
    $postUrn = $response->header("x-restli-id");
    return "https://linkedin.com/feed/update/" . $postUrn;
}

// For TwitterShare
function twitterShare($postData)
{
    if (empty($postData)) {
        return "error";
    }
    $token = SocialMedia::where("name", "twitter")->first();

    if (!empty($token)) {
        $connection = new TwitterOAuth(
            config("services.twitter.api_key"),
            config("services.twitter.api_key_secret"),
            $token->access_token,
            $token->access_token_secret
        );
    } else {
        throw new Exception("No authorization token found");
    }

    $postText = strip_tags(Str::limit($postData["title"], 100));
    if (empty($postData["image_path"])) {
        $result = $connection->post("statuses/update", [
            "status" => $postText . " " . $postData["url"],
        ]);
    } else {
        $tweet_image = $connection->upload("media/upload", [
            "media" => $postData["image_path"],
        ]);
        $result = $connection->post("statuses/update", [
            "status" => $postText . " " . $postData["url"],
            "media_ids" => $tweet_image->media_id_string,
        ]);
    }
    if (isset($result->errors[0])) {
        throw new Exception($result->errors[0]->message);
    }
    if (isset($result->entities->urls[0]->expanded_url)) {
        return $result->entities->urls[0]->expanded_url;
    }
}

// For FacebookShare
function fbShare($postData)
{
    $token = SocialMedia::where("name", "facebook")->first();
    if ($token) {
        $fb = new \Facebook\Facebook([
            "app_id" => config("services.facebook.app_id"),
            "app_secret" => config("services.facebook.app_secret"),
            "default_graph_version" => "v2.10",
            "beta_mode" => false,
        ]);

        // try {
        $title = $postData["title"];
        $blurb = $postData["blurb"];
        $url = $postData["url"];
        $response = $fb->post(
            "/me/feed",
            [
                "message" => $title . " " . $blurb,
                "published" => "1",
                "link" => $url,
                "fields" => "permalink_url",
            ],
            $token->access_token
        );
        return Arr::get($response->getDecodedBody(), "permalink_url");
        // } catch (Facebook\Exception\ResponseException $e) {
        //     $message = "Graph returned an error: " . $e->getMessage();
        //     // return response()->json(["error" => "1", "message" => $message]);
        //     return $message;
        // } catch (Facebook\Exception\SDKException $e) {
        //     $message = "Facebook SDK returned an error: " . $e->getMessage();
        //     // return response()->json(["error" => "1", "message" => $message]);
        //     return $message;
        // }
        // $graphNode = $response->getGraphNode();
    }
    // $message = "page access token not set";
}

// For GetToken From Database
function get_social_access_token($name)
{
    $get_token = SocialMedia::where("name", $name)->first();
    // if (empty($get_token)) {
    //     $get_token["token_expire_date"] = date("Y-m-d");
    // }
    return $get_token;
}
/* Add By cyblance For sharing end */

//Added by Cyblance for Subsite section start
function getSubdomain()
{
    $host = null;
    if (isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST'])) {
        $host = $_SERVER['HTTP_HOST'];
    }
    if ($host) {
        $subdomain = join('.', explode('.', $_SERVER['HTTP_HOST'], -2));
        return $subdomain;
    }
}
function get_subsite_lang(){
    $subdomain = getSubdomain();
    $lang = Subsite::select('languages','aliase_name')->where('aliase_name', $subdomain)->first();
    return $lang;
}
function getOpinion_subsite()
{
    $subdomain = getSubdomain();
    $region_data = Subsite::select('region_id')->where('aliase_name', $subdomain)->first();
    $collection = \App\Models\Collection::with([
        'images.content.images',
    ])
        ->withCount([
            'subCollections',
        ])->findOrFail($region_data->region_id);

    $items = $collection
        ->subsite_items()
        ->with([
            'content',
            'images',
            'images.content.images',
            'collections',
            'collections.content:id,title,slug,collection_id,lang',
            'collections.parentCollections',
        ])->where('type', 'article')->take( 3)->get();
    return $items;
}
function getprefix_id($values)
{
    $subdomain=getSubdomain();
    if (isset($values[$subdomain])) {
        $arrayValue = $values[$subdomain];
    }else{
        $arrayValue='';
    }
    return $arrayValue;
}

function officeAddress(){
    $getSubdomain = getSubdomain();
    $addressConfig = config("eiie.collection.contact-offices-subsite");

    if (isset($addressConfig[$getSubdomain])) {
        $addressId = $addressConfig[$getSubdomain];
    } else {
        $addressId = null;
    }

    if ($addressId !== null) {
        $collection = Collection::findOrFail($addressId);
        $office = $collection->subsite_items()->with([
            "collections",
            "collections.content:id,title,slug,collection_id,lang",
        ])->where('type', 'contact')->get();
    } else {
        $office = [];
    }

    return $office;
}
//Added by Cyblance for Subsite section end
