<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Mail;
use App\Mail\ContactUs;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\{Collection, Item, Subsite, SubsiteContactUs, CollectionCollection, CollectionContent};
use App\Models\ItemContent;
use App\Actions\ApplyCollectionRules;
use App\Sorts\CollectionContentTitleSort;
use App\Filters\SearchTitleFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedFilter;

class SubsiteUserController extends Controller
{
    public function __construct()
    {
        $subdomain = getSubdomain();
        $region_data = Subsite::where('aliase_name', $subdomain)->first();
        if (!empty($region_data) && $region_data->is_active == 'active') {
            $this->subsites['subsites'] = $region_data;
        } else {
            throw new \App\Exceptions\SubdomainInactiveException;
        }
    }
    public function index()
    {
        //Home Page Intro
        $homeIntro = config('eiie.item.home-subsite');   
        $homeIntoID = $homeIntro[$this->subsites['subsites']->aliase_name] ?? '';            
        $homeItem = Item::withoutGlobalScopes()->find($homeIntoID);        
        
        $featuredItems = config('eiie.collection.featured-subsite');
        $featuredItemID = $featuredItems[$this->subsites['subsites']->aliase_name] ?? '';
        $featured = Collection::with([
            'items',
            'items.collections.content:id,title,slug,collection_id,lang',
        ])->find($featuredItemID);

        $news_id = config("eiie.collection.news");
        $collection = Collection::with([
            'images.content.images',
        ])
            ->withCount([
                'subCollections',
            ])->findOrFail($this->subsites['subsites']->region_id);

        $items = $collection
            ->subsite_items()
            ->with([
                'content',
                'images',
                'images.content.images',
                'collections',
                'collections.content:id,title,slug,collection_id,lang',
                'collections.parentCollections',
            ])->where('type', 'article');
        $items = $items->whereHas(
            "collections.content",
            function ($query) use ($news_id) {
                $query->where("collection_id", $news_id);
            },
        )->take(6)->get();
        //echo '<pre>'; print_r($office->get()); exit;


        return view('subsite-home', [
            'featured' => $featured,
            "home_item" => $homeItem,
            'updates' => $items,
            'collection' => $collection,
            'subsitedata' => $this->subsites['subsites']
        ]);
    }

    public function news_list(string $locale, $id)
    {
        $collection = Collection::with([
            'images.content.images',
        ])
            ->withCount([
                'subCollections',
            ])->findOrFail($id);

        $showBlurb = in_array($collection->id, [
            config('eiie.collection.news'),
            config('eiie.collection.opinion'),
            config('eiie.collection.take-action'),
            config('eiie.collection.statements'),
            config('eiie.collection.publications-and-research')
        ]);
        $showBlurb = $showBlurb ||
            (isset($collection->parentCollections[0])
                && in_array($collection->parentCollections[0]->id, [
                    config('eiie.collection.opinion')
                ])
            );
        $items = $collection
            ->subsite_items()
            ->with([
                'content',
                'images',
                'images.content.images',
                'collections:id',
                'collections.content:id,title,slug,collection_id,lang',
                'affiliate'
            ])->where('type', 'article');
        $id = $this->subsites['subsites']->region_id;
        $items = $items->whereHas(
            "collections.content",
            function ($query) use ($id) {
                $query->where("collection_id", $id);
            },
        );

        if ($collection->layout == 'persons') {
            $collection->loadMissing([
                'subCollections.content',
            ]);
        }

        if ($collection->layout == 'dossier') {
            $collection->loadMissing([
                'items.content.videos',
                'items.content.links',
                'subCollections' => fn($q) => $q->where('type', 'dossier_sub'),
                'subCollections.content',
            ]);
        }
        $groupedItems = $collection->itemsByType();
        return view()->first(
            ["collection.subsite-" . $collection->layout, "collection.subsite-default"],
            [
                'collection' => $collection,
                'groupedItems' => $groupedItems,
                'show_blurb' => $showBlurb,
                'items' => $items->paginate(config('eiie.pagination_size', 18)),
                'subsitedata' => $this->subsites['subsites'],
            ]
        );
    }

    public function getBylaws(string $locale,$id)
    {
        // $id = $gov[$this->subsites['subsites']->aliase_name];

        $collection = Collection::with(["images.content.images"])
        ->withCount(["subCollections"])
        ->findOrFail($id);

        if (isset($collection->content->title)) {
            $subdomain = getSubdomain();
            $titles = [
                'africa' => __("eiie.Africa Region By Laws"),
                'asia-pacific' => __("eiie.Asia-pacific Region By Laws"),
                'northamerica' => __("eiie.Northamerica Region By Laws"),
                'accrs' => __("eiie.ACCRS Region By Laws"),
                'latin-america' => __("eiie.Latin-america Region By Laws")
            ];

            $collection->content->title = $titles[$subdomain] ?? $collection->content->title;
        }

        $items = $collection->subsite_items()->with([
            "content",
            "images",
            "images.content.images",
            "collections",
            "collections.content:id,title,slug,collection_id,lang",
            "affiliate",
        ]);

        $items = $items->whereHas(
            "collections.content",
            function ($query){
                $query->where("collection_id", $this->subsites['subsites']->region_id);
            },
        );

        return view()->first(
            ["collection.subsite-default"],
            [
                "collection" => $collection,

                "items" => $items
                    ->paginate(config("eiie.pagination_size", 18))
                    ->onEachSide(config("eiie.pagination_oneachside", 1)),

                "subsitedata" => $this->subsites['subsites'],
            ]
        );
    }

    public function listPublications(string $locale, int $id)
    {
        $collection = Collection::with([
            'images.content.images',
        ])
            ->withCount([
                'subCollections',
            ])->findOrFail($id);

        $showBlurb = in_array($collection->id, [
            config('eiie.collection.news'),
            config('eiie.collection.opinion'),
            config('eiie.collection.take-action'),
            config('eiie.collection.statements'),
            config('eiie.collection.publications-and-research')
        ]);
        $showBlurb = $showBlurb ||
            (isset($collection->parentCollections[0])
                && in_array($collection->parentCollections[0]->id, [
                    config('eiie.collection.opinion')
                ])
            );
        $items = $collection
            ->subsite_items()
            ->with([
                'content',
                'images',
                'images.content.images',
                'collections:id',
                'collections.content:id,title,slug,collection_id,lang',
                'affiliate'
            ]);
        $id = $this->subsites['subsites']->region_id;
        $items = $items->whereHas(
            "collections.content",
            function ($query) use ($id) {
                $query->where("collection_id", $id);
            },
        );
        if ($collection->layout == 'persons') {
            $collection->loadMissing([
                'subCollections.content',
            ]);
        }

        if ($collection->layout == 'dossier') {
            $collection->loadMissing([
                'items.content.videos',
                'items.content.links',
                'subCollections' => fn($q) => $q->where('type', 'dossier_sub'),
                'subCollections.content',
            ]);
        }

        $groupedItems = $collection->itemsByType();
        return view()->first([
            'collection.subsite-default',
        ], [
            'collection' => $collection,
            'groupedItems' => $groupedItems,
            'show_blurb' => $showBlurb,
            'items' => $items->paginate(config('eiie.pagination_size', 18)),
            'subsitedata' => $this->subsites['subsites'],
        ]);
    }
    public function getCampaigns(string $locale, $id, ApplyCollectionRules $rules)
    {
        $collection = Collection::with([
            "images.content.images",
            "subCollections.parentCollections",
        ])
        ->withCount(["subCollections"])
        ->findOrFail($id);

        $showBlurb = in_array($collection->id, [
            config("eiie.collection.news"),
            config("eiie.collection.opinion"),
            config("eiie.collection.take-action"),
            config("eiie.collection.statements"),
            config("eiie.collection.publications-and-research"),
        ]);

        $showBlurb = $showBlurb ||(isset($collection->parentCollections[0]) && in_array($collection->parentCollections[0]->id, [config("eiie.collection.opinion"),]));

        $filteredSubCollections = $collection->subCollections->filter(function ($subCollection) {
            return $subCollection->parentCollections->contains('id', $this->subsites['subsites']->region_id);
        });

        if (isset($collection->parentCollections[2]->content->title)) {
            $collection->parentCollections[2]->content->title = __("eiie.Campaigns");
        }

        $items = $collection->subsite_items()->with([
            "content",
            "images",
            "images.content.images",
            "collections",
            "collections.content:id,title,slug,collection_id,lang",
            "affiliate",
        ]);

        $items = $items->whereHas(
            "collections.content",
            function ($query){
                $query->where("collection_id", $this->subsites['subsites']->region_id);
            },
        );

        if ($collection->layout == "persons") {
            $collection->loadMissing([
                "subCollections.content",
            ]);
        }

        if ($collection->layout == "dossier") {
            $collection->loadMissing([
                "items.content.videos",
                "items.content.links",
                "subCollections" => fn($q) => $q->where("type", "dossier_sub"),
                "subCollections.content",
            ]);
        }
        $groupedItems = $collection->itemsByType();
        $rulesItems = $rules->execute($collection, $items, $groupedItems);
        return view()->first(
            ["collection.subsite-" . $collection->layout, "collection.subsite-default"],
            [
                "collection" => $collection,
                "groupedItems" => $groupedItems,
                "show_blurb" => $showBlurb,
                "items" => $items
                    ->paginate(config("eiie.pagination_size", 18))
                    ->onEachSide(config("eiie.pagination_oneachside", 1)),
                    "special" => $rulesItems,
                "subsitedata" => $this->subsites['subsites'],
            ]
        );
    }

    public function contactus($addressId)
    {
        return view()->first([
            'subsite-contactus'
        ], [
            'subsitedata' => $this->subsites['subsites'],
        ]);
    }

    public function item_detail(string $locale, int $id, $slug = null)
    {
        $item = Item::with([
            'images.content.images',
            'collections.content',
            'attachmentGroups',
            'attachmentGroups.attachments' => fn($q) => $q->whereHas('item.content'),
        ])
            ->findOrFail($id);

        $showOpinionDisclaimer = $item->collections->find(config('eiie.collection.opinion')) ? true : false;

        return view()->first(
            ["subsite-item." . $item->type, "subsite-item"],
            [
                'item' => $item,
                'relatedItems' => $item->relatedItemsSubsite(),
                'showOpinionDisclaimer' => $showOpinionDisclaimer,
                'subsitedata' => $this->subsites['subsites'],
            ]
        );
    }

    public function getNewsletter(string $locale)
    {
        return view()->first([
            'newsletter.subsite-activecampaign_' . $locale,
            'newsletter.subsite-activecampaign_en'
        ], ['subsitedata' => $this->subsites['subsites']]);
    }

    public function listAffiliates(Request $request)
    {
        $searchAffiliate = $request->input("filter.affiliate");

        $affiliatePlaceholderCollection = Collection::find(
            $this->subsites['subsites']->region_id
        );
        $titleSort = AllowedSort::custom(
            "title",
            new CollectionContentTitleSort(),
            "title"
        );
        $getSubCollection = CollectionCollection::where('parent_id', $this->subsites['subsites']->region_id)->pluck('sub_id');

        $countries = QueryBuilder::for(Collection::class)
            ->where("type", "country")
            ->whereHas(
                "items",
                fn($query) => $query->where("type", "affiliate")
            )
            ->allowedFilters([
                AllowedFilter::partial("country", "content.title"),
                // AllowedFilter::custom('affiliate', new SearchTitleFilter),
                AllowedFilter::callback(
                    "affiliate",
                    fn($query, $search) => $query->whereHas(
                        "items",
                        fn($query) => $query
                            ->where("type", "affiliate")
                            ->where(
                                fn($query) => $query
                                    ->whereHas(
                                        "content",
                                        fn($query) => $query->where(
                                            "title",
                                            "like",
                                            "%$search%"
                                        )
                                    )
                                    ->orWhereHas(
                                        "affiliate",
                                        fn($query) => $query->where(
                                            "acronym",
                                            "like",
                                            "%$search%"
                                        )
                                    )
                            )
                    )
                ),
            ])
            ->allowedSorts([$titleSort])
            ->defaultSort($titleSort)
            ->with([
                "items" => function ($query) use ($searchAffiliate) {
                    $query->where("type", "affiliate");
                    if ($searchAffiliate) {
                        $query->where(
                            fn($query) => $query
                                ->whereHas(
                                    "content",
                                    fn($query) => $query->where(
                                        "title",
                                        "like",
                                        "%$searchAffiliate%"
                                    )
                                )
                                ->orWhereHas(
                                    "affiliate",
                                    fn($query) => $query->where(
                                        "acronym",
                                        "like",
                                        "%$searchAffiliate%"
                                    )
                                )
                        );
                    }
                    $query->reorder();
                    $query->orderBy(
                        ItemContent::select("title")
                            ->whereColumn("item_id", "items.id")
                            ->orderBy("title", "asc")
                            ->limit(1)
                    );
                },
                "items.content",
                "items.affiliate",
            ])
            ->whereHas("content", function ($query) use ($getSubCollection) {
                $query->whereIn("collection_id", $getSubCollection);
            })
            ->paginate(config("eiie.pagination_size", 12))
            ->onEachSide(config("eiie.pagination_oneachside", 1));
        return view()->first([
            'collection.subsite-affiliates'
        ], [
            "collection" => $affiliatePlaceholderCollection,
            'collections' => $countries,
            'subsitedata' => $this->subsites['subsites'],
            "filters" => [
                [
                    "name" => "country",
                    "value" => $request->input("filter.country"),
                    "label" => __("eiie.Filter by country"),
                ],
                [
                    "name" => "affiliate",
                    "value" => $request->input("filter.affiliate"),
                    "label" => __("eiie.Filter by member"),
                ],
            ],
        ]);
    }

    public function showSubDossier(ApplyCollectionRules $rules, string $locale, $parentId, $parentSlug, $id)
    {
        return $this->getCampaigns($locale, $id, $rules);
    }

    public function showSearch()
    {
        $get_region_id = Collection::where('id', $this->subsites['subsites']->region_id)->withoutGlobalScopes()->first();
        $region_content = $get_region_id->contents()->first();
        return view('subsite-search-adv', ['subsitedata' => $this->subsites['subsites'], 'region' => $region_content]);
    }

    public function showByOldIdNews(string $locale, $oldId, $oldType = 'post_page')
    {
        $item = Item::where('old_id', '=', $oldId);
        if ($oldType) {
            $item = $item->where('old_type', $oldType);
        }
        $item = $item->where('status', 'published')
            ->firstOrFail();

        return view('subsite-item', ['item' => $item, 'relatedItems' => $item->relatedItems(), 'subsitedata' => $this->subsites['subsites'],]);
    }
    public function contactSave(Request $request)
    {
        $this->validate(
            $request,
            [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                "email" => "required|email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/",
                "message" => "required",
            ],
            [
                "email.required" => __("eiie.Email is required"),
                "message.required" => __("eiie.Message is required"),
                "first_name.required" => __("eiie.The first name field is required."),
                "last_name.required" => __("eiie.The last name field is required."),
            ]
        );
        if ($request->isRobot()) {
            abort(500);
        }
        $name = trim(
            $request->get("first_name") . " " . $request->get("last_name")
        );
        $mailData = $request->only("email", "phone");
        $mailData["name"] = $name;
        $mailData["subject"] = trim(
            "Website contact " . $request->get("subject")
        );
        $mailData["mailMessage"] = $request->get("message");
        //Mail::to($this->subsites['subsites']->email)->send(new ContactUs($mailData));
        SubsiteContactUs::create($request->all());
        return back()->with("success", __("eiie.contact_us_thanks"));
    }
    public function aboutus(string $locale)
    {
        $id = getprefix_id(config('eiie.item.who-we-are-subsite'));

        $item = Item::with([
            "images.content.images",
            "collections.content",
            "attachmentGroups",
            "attachmentGroups.attachments" => fn($q) => $q->whereHas(
                "item.content"
            ),
        ])->findOrFail($id);

        $region_id = $this->subsites['subsites']->region_id;

        return view()->first([
            'subsite-item'
        ], [
            'item' => $item,
            'subsitedata' => $this->subsites['subsites'],
        ]);
    }
    public function listResources(string $locale, $subtype = null)
    {
        return $this->list($locale, "resource", $subtype);
    }
    public function list(
        string $locale,
        $type = "resource",
        $subtype = null,
        $subLayout = "subsite-items",
        $title = "",
        $viewOptions = []
    ) {
        $items = Item::where("type", $type)
            ->whereHas("content")
            ->where(function ($query) {
                $query->whereIn("is_site", [2, 3]);
            })
            ->orderBy("created_at", "desc");
        $id = $this->subsites['subsites']->region_id;
        $items = $items->whereHas(
            "collections.content",
            function ($query) use ($id) {
                $query->where("collection_id", $id);
            },
        );

        if ($subtype) {
            $items = $items->where("subtype", $subtype);
            if (!$title) {
                $title = ucfirst($subtype) . " Resources";
            }
        }
        return view()->first([
            "collection." . $subLayout,
        ], [
            'subsitedata' => $this->subsites['subsites'],
            'items' => $items->paginate(config('eiie.pagination_size', 18))->onEachSide(config("eiie.pagination_oneachside", 1)),
            'title' => $title
        ]);
    }
    public function show(ApplyCollectionRules $rules, string $locale, $id)
    {
        $collection = Collection::with(["images.content.images"])
            ->withCount(["subCollections"])
            ->findOrFail($id);

        $items = $collection->items()->with([
            "content",
            "images",
            "images.content.images",
            "collections",
            "collections.content:id,title,slug,collection_id,lang",
            "affiliate",
        ]);
        $is_site = ['1', '3'];
        $items = $items->whereIn('is_site', $is_site);

        $showBlurb = in_array($collection->id, [
            config("eiie.collection.news"),
            config("eiie.collection.opinion"),
            config("eiie.collection.take-action"),
            config("eiie.collection.statements"),
            config("eiie.collection.publications-and-research"),
        ]);

        $showBlurb = $showBlurb || (isset($collection->parentCollections[0]) && in_array($collection->parentCollections[0]->id, [config("eiie.collection.opinion"),]));

        if ($collection->layout == "persons") {
            $collection->loadMissing([
                "subCollections.content",
            ]);
        }

        if ($collection->layout == "dossier") {
            $collection->loadMissing([
                "items.content.videos",
                "items.content.links",
                "subCollections" => fn($q) => $q->where("type", "dossier_sub"),
                "subCollections.content",
            ]);
        }
        $groupedItems = $collection->itemsByType();
        $rulesItems = $rules->execute($collection, $items, $groupedItems);
        $all_subsite = Subsite::where('is_active', 'active')->get();
        return view()->first(
            ["collection.subsite-" . $collection->layout, "collection.subsite-default"],
            [
                "collection" => $collection,
                "groupedItems" => $groupedItems,
                "show_blurb" => $showBlurb,
                "items" => $items
                    ->paginate(config("eiie.pagination_size", 18))
                    ->onEachSide(config("eiie.pagination_oneachside", 1)),
                "special" => $rulesItems,
                "subsite" => $all_subsite,
                'subsitedata' => $this->subsites['subsites'],
            ]
        );
    }
    public function showCountry(
        ApplyCollectionRules $rules,
        string $locale,
        $id
    ) {
        return $this->show($rules, $locale, $id);
    }
    public function listCountryArticles(string $locale, $id, $slug = null)
    {
        $country = Collection::findOrFail($id);
        $items = $country
            ->items()
            ->with([
                "content",
                "images",
                "images.content.images",
                "collections",
                "collections.content:id,title,slug,collection_id,lang",
            ])
            ->where("type", "article")
            ->paginate(config("eiie.pagination_size", 18))
            ->onEachSide(config("eiie.pagination_oneachside", 1));
        return view("collection.subsite-country_items", [
            "collection" => $country,
            "title" =>
                __("eiie.Articles from") . " " . $country->content->title,
            "items" => $items,
            'subsitedata' => $this->subsites['subsites'],
        ]);
    }
}
