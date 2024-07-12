<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;

use App\Models\Item;
use App\Models\ItemContent;
use App\Models\CollectionContent;
use App\Models\Collection;
use App\Models\SocialMedia;

use Facebook;
use Illuminate\Support\Arr;
use Abraham\TwitterOAuth\TwitterOAuth;

use App\Classes\FacebookSdk\MyLaravelPersistentDataHandler;
use App\Jobs\ShareScheduledContent;
use App\Models\SocialShareSchedule;
use App\View\Components\Link;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class ShareController extends Controller
{
    public function status()
    {
        $accounts = [
            "twitter" => [
                "name" => "twitter",
                "status" => "invalid",
                "authorize_url" => route("admin.share.authorize.twitter"),
            ],
            "linkedin" => [
                "name" => "linkedin",
                "status" => "invalid",
                "authorize_url" => route("admin.share.authorize.linkedin"),
            ],
            "facebook" => [
                "name" => "facebook",
                "status" => "invalid",
                "authorize_url" => route("admin.share.authorize.facebook"),
            ],
        ];
        SocialMedia::each(function ($account) use (&$accounts) {
            if (!empty($accounts[$account->name])) {
                $result = &$accounts[$account->name];
                $result["status"] = $account->status;
                if ($account->token_expires_at) {
                    $result["token_expires_at"] = $account::serializeDate(
                        $account->token_expires_at
                    );
                }
            }
        });
        return Inertia::render("Settings/SocialMediaAccounts", [
            "accounts" => array_values($accounts),
        ]);
    }

    // Share Record Functionality
    public function share(Request $request)
    {
        $request->validate([
            "share_typedata" => "required",
            "social" => "required",
            "type" => "required",
            "id" => "required",
            "language" => "required",
            "schedule_date" => "",
        ]);

        $id = $request->input("id");
        $share_type = $request->input("share_typedata");
        $social_media = $request->input("social");
        $record_language = $request->input("language");
        $record_type = $request->input("type");

        if ($record_type == "collection") {
            $content = CollectionContent::withoutGlobalScopes()
                ->where("collection_id", $id)
                ->whereIn("lang", ["*", $record_language])
                ->orderBy("lang", "desc")
                ->first();
        } else {
            $content = ItemContent::withoutGlobalScopes()
                ->where("item_id", $id)
                ->whereIn("lang", ["*", $record_language])
                ->orderBy("lang", "desc")
                ->first();
        }

        if (!empty($content)) {
            $schedule = new SocialShareSchedule(["platform" => $social_media]);
            $schedule->content()->associate($content);
            if ($share_type === "share") {
                // execute it now
                $schedule->share_at = Carbon::now();
                $schedule->save();
                ShareScheduledContent::dispatchSync($schedule);
                $schedule->refresh();
                if ($schedule->error) {
                    return Redirect::back()->withErrors([
                        "error" => "Error sharing: " . $schedule->error,
                    ]);
                } else {
                    return Redirect::back()->with([
                        "info" => "Sharing successful to {$schedule->platform} with url {$schedule->url}",
                        "url" => $schedule->url,
                    ]);
                }
            } else {
                // save it for scheduling
                $schedule->share_at = Carbon::parse($request->schedule_date);
                $schedule->save();
            }
        } else {
            return Redirect::back()->withErrors([
                "error" => " This Record is not Translated",
            ]);
        }
    }

    public function linkedinAuthorize(Request $request)
    {
        /* @var \Laravel\Socialite\Two\LinkedInProvider */
        return Socialite::driver("linkedin")
            ->setScopes([
                "r_basicprofile",
                "w_organization_social",
                "r_organization_admin",
            ])
            ->redirect();
    }

    public function linkedinCallback(Request $request)
    {
        if ($request->has("error")) {
            return Redirect::route("admin.share.status")->withErrors([
                "error" => "LinkedIn returned an error: " . $request->error,
            ]);
        }

        try {
            $response = Socialite::driver("linkedin")->getAccessTokenResponse(
                $request->input("code")
            );
            $accessToken = Arr::get($response, "access_token");
            $orgsResponse = Http::withToken($accessToken)
                ->withHeaders([
                    "Linkedin-Version" => "202211",
                    "X-Restli-Protocol-Version" => "2.0.0",
                ])
                ->get(
                    "https://api.linkedin.com/rest/organizationAcls?q=roleAssignee"
                )
                ->json();
            $orgs = Arr::pluck(
                Arr::get($orgsResponse, "elements", []),
                "organization"
            );
            if (
                !in_array(config("services.linkedin.organization_urn"), $orgs)
            ) {
                throw new Exception(
                    "The user is not authorized for the correct LinkedIn organization"
                );
            }
        } catch (Exception $ex) {
            return Redirect::route("admin.share.status")->withErrors([
                "error" =>
                    "Error validating LinkedIn access. " . $ex->getMessage(),
            ]);
        }

        SocialMedia::updateOrCreate(
            ["name" => "linkedin"],
            [
                "access_token" => $accessToken,
                "refresh_token" => Arr::get($response, "refresh_token"),
                "token_issued_at" => Carbon::now(),
                "access_token_expires_at" => Carbon::now()->addSeconds(
                    Arr::get($response, "expires_in") - 10
                ),
                "token_expires_at" => Carbon::now()->addSeconds(
                    Arr::get($response, "refresh_token_expires_in") - 10
                ),
            ]
        );
        return redirect()
            ->route("admin.share.status")
            ->with([
                "info" => "Linkedin authorized",
            ]);
    }

    // Facebook Login
    public function facebookAuthorize(Request $request)
    {
        $fb = new \Facebook\Facebook([
            "app_id" => config("services.facebook.app_id"),
            "app_secret" => config("services.facebook.app_secret"),
            "default_graph_version" => "v15.0",
        ]);
        $helper = $fb->getRedirectLoginHelper();
        $permissions = ["email", "pages_manage_posts"]; // Optional permissions
        $url = $helper->getLoginUrl(
            route("admin.share.authorize.facebook.callback"),
            $permissions
        );
        return redirect()->away($url);
    }

    // For Generate new Facebook Token
    public function facebookCallback(Request $request)
    {
        $fb = new Facebook\Facebook([
            "app_id" => config("services.facebook.app_id"),
            "app_secret" => config("services.facebook.app_secret"),
            "default_graph_version" => "v15.0",
        ]);
        //Use one of the helper classes to get a Facebook\Authentication\AccessToken entity.
        $helper = $fb->getRedirectLoginHelper();
        try {
            if (isset($_GET["state"])) {
                $helper
                    ->getPersistentDataHandler()
                    ->set("state", $request->input("state"));
                $accessToken = $helper->getAccessToken();
            }
        } catch (Facebook\Exception\ResponseException $e) {
            // When Graph returns an error
            return Redirect::route("admin.share.status")->withErrors([
                "error" => "Graph returned an error: " . $e->getMessage(),
            ]);
        } catch (Facebook\Exception\SDKException $e) {
            // When validation fails or other local issues
            return Redirect::route("admin.share.status")->withErrors([
                "error" =>
                    "Facebook SDK returned an error: " . $e->getMessage(),
            ]);
        }

        if (!isset($accessToken)) {
            if (
                $helper->getError() &&
                $helper->getError() == "access_denied" &&
                $helper->getErrorCode() == "200"
            ) {
                return Redirect::route("admin.share.status")->withErrors([
                    "error" => "First login with facebook page and try again",
                ]);
            } else {
                return Redirect::route("admin.share.status")->withErrors([
                    "error" => "Facebook login Failed!! Try after some time.",
                ]);
            }
        }

        // Logged in
        // The OAuth 2.0 client handler helps us manage access tokens
        $oAuth2Client = $fb->getOAuth2Client();

        // Get the access token metadata from /debug_token
        $tokenMetadata = $oAuth2Client->debugToken($accessToken);

        // Validation (these will throw FacebookSDKException's when they fail)
        $tokenMetadata->validateAppId(config("services.facebook.app_id"));

        $tokenMetadata->validateExpiration();
        if (!$accessToken->isLongLived()) {
            // Exchanges a short-lived access token for a long-lived one
            try {
                $accessToken = $oAuth2Client->getLongLivedAccessToken(
                    $accessToken
                );
            } catch (Facebook\Exception\SDKException $e) {
                return Redirect::route("admin.share.status")->withErrors([
                    "error" =>
                        "Error getting long-lived access token: " .
                        $e->getMessage(),
                ]);
            }
        }
        $fb_user_access_token = (string) $accessToken;
        try {
            // Returns a `FacebookFacebookResponse` object
            $response = $fb->get(
                "/me/accounts?fields=name,access_token",
                $fb_user_access_token
            );
        } catch (Facebook\Exception\ResponseException $e) {
            // When Graph returns an error
            return Redirect::route("admin.share.status")->withErrors([
                "error" => "Graph returned an error: " . $e->getMessage(),
            ]);
        } catch (Facebook\Exception\SDKException $e) {
            // When validation fails or other local issues
            return Redirect::route("admin.share.status")->withErrors([
                "error" =>
                    "Facebook SDK returned an error: " . $e->getMessage(),
            ]);
        }
        $graphEdge = $response->getGraphEdge();
        // Iterate over all the GraphNode's returned from the edge
        foreach ($graphEdge as $graphNode) {
            if (
                $graphNode->getField("name") ===
                config("services.facebook.page_name")
            ) {
                $fb_page_access_token = $graphNode->getField("access_token");
                $pageTokenMeta = $oAuth2Client->debugToken(
                    $fb_page_access_token
                );
                SocialMedia::updateOrCreate(
                    ["name" => "facebook"],
                    [
                        "access_token" => $fb_page_access_token,
                        "token_issued_at" => Carbon::now(),
                        "token_expires_at" => $pageTokenMeta->getExpiresAt()
                            ? $pageTokenMeta->getExpiresAt()
                            : null,
                    ]
                );
                return Redirect::route("admin.share.status")->with([
                    "info" => "Facebook login Succesfully",
                ]);
            }
        }
        return Redirect::route("admin.share.status")->withErrors([
            "error" =>
                "No permission found for Facebook page named " .
                config("services.facebook.page_name", "??") .
                ", make sure to authorize the access to the proper page.",
        ]);
    }

    public function twitterAuthorize()
    {
        $twitter = new TwitterOAuth(
            config("services.twitter.api_key"),
            config("services.twitter.api_key_secret")
        );
        $request_token = $twitter->oauth("oauth/request_token", [
            "oauth_callback" => route("admin.share.authorize.twitter.callback"),
        ]);
        session()->put("twitter.oauth_token", $request_token["oauth_token"]);
        session()->put(
            "twitter.oauth_token_secret",
            $request_token["oauth_token_secret"]
        );
        $url = $twitter->url("oauth/authorize", [
            "oauth_token" => $request_token["oauth_token"],
        ]);
        return redirect()->away($url);
    }

    public function twitterCallback(Request $request)
    {
        if (
            $request->input("oauth_token") !==
            session()->get("twitter.oauth_token")
        ) {
            abort(500);
        }
        $twitter = new TwitterOAuth(
            config("services.twitter.api_key"),
            config("services.twitter.api_key_secret"),
            session()->get("twitter.oauth_token"),
            session()->get("twitter.oauth_token_secret")
        );
        $access_token = $twitter->oauth("oauth/access_token", [
            "oauth_verifier" => $request->input("oauth_verifier"),
        ]);
        SocialMedia::updateOrCreate(
            ["name" => "twitter"],
            [
                "access_token" => $access_token["oauth_token"],
                "access_token_secret" => $access_token["oauth_token_secret"],
                "token_issued_at" => Carbon::now(),
                "token_expires_at" => null, // won't expire
            ]
        );
        session()->remove("twitter.oauth_token");
        session()->remove("twitter.oauth_token_secret");
        return redirect()
            ->route("admin.share.status")
            ->with([
                "info" => "Twitter account '{$access_token["screen_name"]}' authorized",
            ]);
    }
}
