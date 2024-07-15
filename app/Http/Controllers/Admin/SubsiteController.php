<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ExportInquiry;
use App\Exports\ExportLatestItems;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use App\Models\{Subsite, Item, ItemContent, Collection, CollectionContent, Language};
use App\Filters\{CollectionMemberFilter, ItemsWithImageFilter, MissingTranslationsFilter, MissingFilesFilter, SearchTitleFilter, SubsiteCollectionFilter};
use App\Sorts\ItemContentTitleSort;
use Maatwebsite\Excel\Facades\Excel;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class SubsiteController extends Controller
{
    public function index(Request $request, Subsite $subsite)
    {
        if ($request->user()->cannot('view', $subsite)) {
            return Redirect::back()->withErrors(['error' => 'Not authorized']);
        }
        $subsites = QueryBuilder::for(Subsite::class)
            ->allowedFilters([
                AllowedFilter::partial('search', 'id')->partial('search', 'name')->partial('search', 'aliase_name'),
                AllowedFilter::exact('is_active'),
            ])
            ->allowedSorts([
                'id',
                'created_at',
                'updated_at',
                'name',
                'aliase_name',
                'is_active',
            ])->defaultSort('created_at');

        if ($request->user()->can('subsiteAdminAccess', Item::class)) {
            $subsiteid = auth()->user()->subsite_id;
            $subsites = $subsites->where('id', $subsiteid);
        }
        $subsites = $subsites->withoutGlobalScopes()->paginate(20);
        $result = [
            'subsites' => $subsites,
            'filter' => $request->all('filter'),
            'sort' => $request->get('sort'),
        ];
        return Inertia::render('Subsite/List', $result);
    }

    public function create(Request $request)
    {
        if ($request->user()->cannot('create', Subsite::class)) {
            return Redirect::back()->withErrors(['error' => 'Not authorized']);
        }
        $collection_region = CollectionContent::select(
            "collection_contents.id",
            "collection_contents.collection_id",
            "collection_contents.title"
        )
            ->join("collections", "collections.id", "collection_contents.collection_id")
            ->where("collections.type", "region")
            ->where("collections.status", "published")
            ->where("collections.deleted_at", NULL)
            ->get();
        $subsite_id = Subsite::get()->pluck('region_id')->toArray();
        $get_region_value = array();
        foreach ($collection_region as $key => $value) {
            $get_region_value[$value->collection_id] = $value->title;
        }
        $region_object = $get_region_value;
        $region_data = [
            'is_actives' => [
                'active' => 'active',
                'in-active' => 'in-active'
            ],
            'get_collection' => $region_object,
            'subsite_id' => $subsite_id,
        ];
        return Inertia::render('Subsite/Create', $region_data);
    }

    public function store(Request $request)
    {
        if ($request->user()->cannot('create', Subsite::class)) {
            return Redirect::back()->withErrors(['error' => 'Not authorized']);
        }
        $request->validate([
            'name' => 'required',
            'region_id' => 'required',
            'aliase_name' => 'required|regex:/^[a-z\-]+$/|unique:subsites',
            //'address' => 'required',
            // Added by cyblance for url validation start
            // 'phone' => 'filled|regex:/^(\+?\d{1,4}[- ]?)?\d{10}$/',
            // 'fax' => 'filled|regex:/^(\+?\d{1,4}[- ]?)?\d{10}$/',
            // 'email' => 'required|email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/|unique:subsites',
            'map_url' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('map_url')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            'facebookURL' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('facebookURL')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            'twitterURL' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('twitterURL')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            'youtubeURL' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('youtubeURL')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            'soundcloudURL' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('soundcloudURL')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            // Added by cyblance for url validation end
            'primary_color' => 'required',
            // 'secondary_color' => 'required',
            'is_active' => 'required',
            'tracking_code' => 'nullable|regex:/^[A-Z0-9]{10}$/i',
            'view_id' => 'nullable|numeric|digits:9',
        ]);
        $requestData = $request->all();
        $requestData['map_url'] = "https://" . $requestData['map_url'];
        $requestData['facebookURL'] = "https://" .  $requestData['facebookURL'];
        $requestData['twitterURL'] = "https://" .  $requestData['twitterURL'];
        $requestData['youtubeURL'] = "https://" .  $requestData['youtubeURL'];
        $requestData['soundcloudURL'] = "https://" .  $requestData['soundcloudURL'];
        $requestData['tracking_code'] = "G-" . $requestData['tracking_code'];
        $requestData['languages'] = implode(',', $requestData['languages']);
        $requestData['view_id'] = $requestData['view_id'];

        $subsite = Subsite::create($requestData);
        return Redirect::route('admin.subsites.edit', $subsite)->with(['info' => 'Subsite created']);
    }

    public function edit(Request $request, Subsite $subsite)
    {
        if ($request->user()->cannot('update', $subsite)) {
            return Redirect::back()->withErrors(['error' => 'Not authorized']);
        }
        $collection_region = CollectionContent::select(
            "collection_contents.id",
            "collection_contents.collection_id",
            "collection_contents.title"
        )
            ->join("collections", "collections.id", "collection_contents.collection_id")
            ->where("collections.type", "region")
            ->where("collections.status", "published")
            ->get();
        $get_region_value = array();
        foreach ($collection_region as $key => $value) {
            $get_region_value[$value->collection_id] = $value->title;
        }
        $region_object = (object) $get_region_value;
        $region_data = [
            'subsiteModel' => $subsite,
            'can' => [
                'is_active' => ['update' => 'updateIs_active', $subsite],
                'subsite' => ['delete' => 'delete', $subsite],
            ],
            'is_actives' => ['active' => 'active', 'in-active' => 'in-active'],
            'get_collection' => [$region_object],
        ];
        $sharedCan = Inertia::getShared('can');
        if ($sharedCan) {
            $region_data['can'] = array_merge_recursive($sharedCan, $region_data['can']);
        }
        return Inertia::render('Subsite/Edit', $region_data);
    }

    public function update(Request $request, Subsite $subsite)
    {
        if ($request->user()->cannot('update', $subsite) || ($request->aliase_name != $subsite->aliase_name)) {
            return Redirect::back()->withErrors(['error' => 'Not authorized']);
        }
        $request->validate([
            'name' => 'string|filled',
            //'address' => 'filled',
            // 'phone' => 'filled|regex:/^(\+?\d{1,4}[- ]?)?\d{10}$/',
            // 'fax' => 'filled|regex:/^(\+?\d{1,4}[- ]?)?\d{10}$/',
            'map_url' => [
                // Only apply the regex validation if the field is present and not empty
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('map_url')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            // 'email' => 'filled|email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/|unique:subsites,email,' . $subsite->id,
            'primary_color' => ['required', 'regex:/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/'],
            // 'secondary_color' => ['required', 'regex:/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/'],
            'is_active' => 'string|filled',
            'tracking_code' => 'nullable|regex:/^[A-Z0-9]{10}$/i',
            'view_id' => 'nullable|numeric|digits:9',
            'aliase_name' => 'string|filled|regex:/^[a-z\-]+$/|unique:subsites,aliase_name,' . $subsite->id,
            'tracking_code' => 'nullable|regex:/^[A-Z0-9]{10}$/i',
            'map_url' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('map_url')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            'facebookURL' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('facebookURL')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            'twitterURL' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('twitterURL')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            'youtubeURL' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('youtubeURL')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
            'soundcloudURL' => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->filled('soundcloudURL')) {
                        if (!preg_match('/^(https?:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}(\/\S*)?$/i', $value)) {
                            $fail('The '.$attribute.' format is invalid.');
                        }
                    }
                },
            ],
        ]);
        $requestData = $request->input();
        $requestData['map_url'] = "https://" . $requestData['map_url'];
        $requestData['tracking_code'] = "G-" . $requestData['tracking_code'];
        $requestData['view_id'] = $requestData['view_id'];
        $requestData['facebookURL'] = "https://" .  $requestData['facebookURL'];
        $requestData['twitterURL'] = "https://" .  $requestData['twitterURL'];
        $requestData['youtubeURL'] = "https://" .  $requestData['youtubeURL'];
        $requestData['soundcloudURL'] = "https://" .  $requestData['soundcloudURL'];
        $requestData['languages'] = implode(',', $requestData['languages']);
        $subsite->update($requestData);
        return Redirect::route('admin.subsites.edit', $subsite)->with(['info' => 'Subsite updated Successfully']);
    }

    public function destroy(Request $request, Subsite $subsite)
    {
        if ($request->user()->cannot('delete', $subsite)) {
            return Redirect::back()->withErrors(['error' => 'Not authorized']);
        }
        $status = '';
        if ($subsite->is_active == 'active') {
            Subsite::where('id', $subsite->id)->update(['is_active' => 'in-active']);
            $status = 'deactivated';
        } else {
            Subsite::where('id', $subsite->id)->update(['is_active' => 'active']);
            $status = 'activated';
        }
        return Redirect::route('admin.subsites.index')->with(['info' => 'Subsite ' . $status . ' successfully']);
    }

    public function getall_items_model(Request $request, Subsite $subsite)
    {

        if ($request->user()->cannot('view', $subsite)) {
            return Redirect::back()->withErrors(['error' => 'Not authorized']);
        }
        $items = QueryBuilder::for(Item::class)
            ->allowedFilters([
                AllowedFilter::exact('type'),
                AllowedFilter::exact('subtype'),
                AllowedFilter::exact('status'),
                AllowedFilter::exact('is_site'),
                AllowedFilter::custom('collection.id', new CollectionMemberFilter),
                AllowedFilter::custom('publication.id', new CollectionMemberFilter),
                AllowedFilter::custom('imageitem.id', new ItemsWithImageFilter),
                AllowedFilter::custom('missing_translations', new MissingTranslationsFilter),
                AllowedFilter::custom('missing_files', new MissingFilesFilter),
                AllowedFilter::custom('search', new SearchTitleFilter),
                AllowedFilter::callback(
                    'missing_workarea',
                    fn($q) => $q->whereDoesntHave(
                        'collections',
                        fn($q) => $q->where('type', 'workarea')
                    )
                ),
                AllowedFilter::trashed()->default("no"),
            ])
            ->allowedSorts([
                'id',
                'created_at',
                'updated_at',
                'type',
                'layout',
                "subtype",
                AllowedSort::custom('title', new ItemContentTitleSort, 'title')
            ])
            ->defaultSort('-created_at')
            ->with([
                'contents:id,item_id,title,lang',
                'collections',
            ])
            ->withoutGlobalScopes();
        if ($request->user()->role != "subsiteadmin") {
            $is_site = ['2', '3'];
            $items = $items->whereIn('is_site', $is_site);
        }
        $items = $items->jsonPaginate()->appends(request()->query());
        $result = [
            'user' => $request->user(),
            'items' => $items,
            'filter' => $request->all('filter'),
            'sort' => $request->get('sort'),
        ];
        if (isset($result['filter']['filter']['collection.id'])) {
            $collectionId = $result['filter']['filter']['collection.id'];
            $result['collection'] = Collection::where('collections.id', $collectionId)
                ->withoutGlobalScopes()
                ->with([
                    'contents:id,lang,title'
                ])->get();
        }
        return response()->json($result);
    }

    public function add_mainsite(Request $request)
    {
        $this->authorize("addMainsite", [Item::class]);
        $request->validate(["ids" => "required|array", "ids.*" => "numeric"]);
        $get_copied = Item::whereIn("id", $request->ids)->where('is_site', 3)->withoutGlobalScopes()->get()->toArray();
        $success = '';
        if (isset($get_copied) && $get_copied != '' && $get_copied != null) {
            $success = "Some Items already copied into mainsite.";
        } else {
            $success = "Items copied into mainsite successfully.";
        }
        Item::withoutGlobalScopes()
            ->whereIn("id", $request->ids)
            ->update(['is_site' => 3]);

        $get_itemtype = Item::whereIn("id", $request->ids)->withoutGlobalScopes()->get();
        foreach ($get_itemtype as $key => $value) {
            if ($value->type == "article") {
                // For update algolia searching also...
                ItemContent::withoutGlobalScopes()->where('item_id', $value->id)->searchable();
            }
        }
        return redirect()->back()->with(["info" => $success]);
    }

    public function getall_lang(Request $request){
        $languages = Language::where('is_active', 'active')->get();
        return $languages;
    }

    public function removed_publication(Request $request)
    {
        $request->validate([
            "id" => "required|numeric",
        ]);
        $item = Item::findOrFail($request->id);
        if ($item->is_site == 3) {
            $item->update(["is_site" => 2]);
            $status = "Item successfully hidden from the Mainsite";
        } else {
            $item->update(["is_site" => 3]);
            $status = "Item displayed successfully on the Mainsite";
        }
        return Redirect::back()->with(["info" => $status]);
    }
}
