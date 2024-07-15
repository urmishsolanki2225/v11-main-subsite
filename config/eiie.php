<?php

use Illuminate\Support\Str;

return [
    "pagination_size" => 18,
    "pagination_size_xl" => 60,

    "collection" => [
        "news" => env("EIIE_COLLECTION_NEWS", 1),
        "articles" => env("EIIE_COLLECTION_ARTICLES", 2),
        "take-action" => env("EIIE_COLLECTION_TAKE_ACTION", 3),
        "events" => env("EIIE_COLLECTION_EVENTS", 4),
        "documents" => env("EIIE_COLLECTION_DOCUMENTS", 5),
        "library" => env("EIIE_COLLECTION_LIBRARY", 6),
        "opinion" => env("EIIE_COLLECTION_OPINION", 7),
        "magazines" => env("EIIE_COLLECTION_MAGAZINES", 8),
        "ilo" => env("EIIE_COLLECTION_ILO", 9),
        "reports" => env("EIIE_COLLECTION_REPORTS", 10),
        "statements" => env("EIIE_COLLECTION_STATEMENTS", 11),
        "governance" => env("EIIE_COLLECTION_GOVERNANCE", 12),
        "world-congress" => env("EIIE_COLLECTION_WORLD_CONGRESS", 13),
        "annual-reports" => env("EIIE_COLLECTION_ANNUAL_REPORTS", 14),
        "constitutional-documents" => env(
            "EIIE_COLLECTION_CONSTITUTIONAL_DOCUMENTS",
            15
        ),
        "congress-resolutions" => env(
            "EIIE_COLLECTION_CONGRESS_RESOLUTIONS",
            16
        ),
        "general-ei-declaration" => env(
            "EIIE_COLLECTION_GENERAL_EI_DECLARATION",
            17
        ),
        "ei-publications" => env("EIIE_COLLECTION_EI_PUBLICATIONS", 18),
        "publications" => env("EIIE_COLLECTION_PUBLICATIONS", 19),
        "policy-briefs" => env("EIIE_COLLECTION_POLICY_BRIEFS", 20),
        "posters-and-info" => env("EIIE_COLLECTION_POSTERS_AND_INFO", 21),
        "regions" => env("EIIE_COLLECTION_REGIONS", 1003),
        "other-regions" => env("EIIE_COLLECTION_OTHER_REGIONS", 1004),
        "regions-group" => env("EIIE_COLLECTION_REGIONS_GROUP", 1005),
        "executive-board" => env("EIIE_COLLECTION_EXECUTIVE_BOARD", 1242),
        "regional-committees" => env(
            "EIIE_COLLECTION_REGIONAL_COMMITTEES",
            1243
        ),
        "our-leaders" => env("EIIE_COLLECTION_OUR_LEADERS", 1244),
        "staff" => env("EIIE_COLLECTION_STAFF", 1245),
        "jobs" => env("EIIE_COLLECTION_JOBS", 1246),
        "team" => env("EIIE_COLLECTION_TEAM", 1247),
        "spotlight" => env("EIIE_COLLECTION_SPOTLIGHT", 1251),
        "campaigns" => env("EIIE_COLLECTION_CAMPAIGNS", 1252),
        //Added by Cyblance for Subsite section start        
        "campaign" => [
            "africa" => env("EIIE_COLLECTION_CAMPAIGNS_AFRICA", ),
            "accrs" => env("EIIE_COLLECTION_CAMPAIGNS_ACCRS", ),
            "northamerica" => env("EIIE_COLLECTION_CAMPAIGNS_NORTHAMERICA", ),
            "latin-america" => env("EIIE_COLLECTION_CAMPAIGNS_LATINAMERICA", ),
            "asia-pacific" => env("EIIE_COLLECTION_CAMPAIGNS_ASIAPACIFIC", ),
        ],
        //Added by Cyblance for Subsite section end
        "priorities" => env("EIIE_COLLECTION_PRIORITIES", 1322),
        "featured" => env("EIIE_COLLECTION_FEATURED", 1344),
        //Added by Cyblance for Subsite section start
        "featured-subsite" => [
            "africa" => env("EIIE_COLLECTION_FEATURED_AFRICA", ),
            "accrs" => env("EIIE_COLLECTION_FEATURED_ACCRS", ),
            "northamerica" => env("EIIE_COLLECTION_FEATURED_NORTHAMERICA", ),
            "latin-america" => env("EIIE_COLLECTION_FEATURED_LATINAMERICA", ),
            "asia-pacific" => env("EIIE_COLLECTION_FEATURED_ASIAPACIFIC", ),
        ],
        //Added by Cyblance for Subsite section end
        "contact-offices" => env("EIIE_COLLECTION_CONTACT_OFFICES", 1358),
        //Added by Cyblance for Subsite section start
        "contact-offices-subsite" => [
            "africa" => env("EIIE_COLLECTION_CONTACT_OFFICES_AFRICA", ),
            "accrs" => env("EIIE_COLLECTION_CONTACT_OFFICES_ACCRS", ),
            "northamerica" => env("EIIE_COLLECTION_CONTACT_OFFICES_NORTHAMERICA", ),
            "latin-america" => env("EIIE_COLLECTION_CONTACT_OFFICES_LATINAMERICA", ),
            "asia-pacific" => env("EIIE_COLLECTION_CONTACT_OFFICES_ASIAPACIFIC", ),
        ],
        //Added by Cyblance for Subsite section end
        "publications-and-research" => env(
            "EIIE_COLLECTION_PUBLICATIONS_AND_RESEARCH",
            1359
        ),
        "affiliates" => env("EIIE_COLLECTION_AFFILIATES", 1360),
        "coop-projects-taxonomy" => env(
            "EIIE_COLLECTION_COOP_PROJECTS_TAXONOMY",
            1478
        ),
        "research" => env("EIIE_COLLECTION_RESEARCH", 1359),
        "worlds_of_education_thematic_series" => env(
            "EIIE_COLLECTION_WORLDS_OF_EDUCATION_THEMATIC_SERIES",
            1536
        ),
    ],
    "old_item" => [
        "origins-and-history" => 15179,
        "principal-aims" => 4360,
        "global-unions" => 4355,
    ],
    "item" => [
        "who-we-are" => 24236,
        "home" => env("EIIE_HOME_ITEM", 25175),
        "dev_coop_project_intro" => ENV("EIIE_DEV_COOP_PROJECT_INTRO", 26527),
        "newsletters" => ENV("EIIE_NEWSLETTERS_ITEM", 27264),
        //Added by Cyblance for Subsite section start
        "who-we-are-subsite" => [
            "africa" => 28774,
            "accrs" => '',
            "northamerica" => '',
            "latin-america" => '',
            "asia-pacific" => '',
        ],
        "home-subsite" => [
            "africa" => env("EIIE_HOME_ITEM_AFRICA", 28775),
            "accrs" => env("EIIE_HOME_ITEM_ACCRS", ),
            "northamerica" => env("EIIE_HOME_ITEM_NORTHAMERICA", ),
            "latin-america" => env("EIIE_HOME_ITEM_LATINAMERICA", ),
            "asia-pacific" => env("EIIE_HOME_ITEM_ASIAPACIFIC", ),
        ],
        //Added by Cyblance for Subsite section end
    ],
    "google-analytics-tracking-id" => env(
        "GOOGLE_ANALYTICS_TRACKING_ID",
        false
    ),
    "civiccookie-api-key" => env("CIVICCOOKIE_API_KEY", false),
    "oembed-settings" => [
        "facebook:token" => env("FACEBOOK_TOKEN", ""),
        "twitter:token" => env("TWITTER_APP_TOKEN", ""),
    ],
    "image_background_fallback" => "353535", // don't put # in front,

    "contact_form_rcpt" => env(
        "EIIE_CONTACT_FORM_RCPT",
        "headoffice@ei-ie.org"
    ),

    "newsletter_signup_url_clickdimensions" => env(
        "EIIE_NEWSLETTER_SIGNUP_URL_CLICKDIMENSIONS",
        "https://analytics-eu.clickdimensions.com/forms/h/ah59JE4EL00Gguwqp9QqgJ"
    ),
    "google-tag-manager-id" => env("GOOGLE_TAG_MANAGER_ID"),
];
