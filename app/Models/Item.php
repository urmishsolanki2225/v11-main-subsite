<?php

namespace App\Models;

use App;
use App\Actions\StoreResizedImages;
use App\Scopes\PublishedScope;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;
use OwenIt\Auditing\Contracts\Auditable;
//Added By Cyblance for delete functionality start
use Illuminate\Database\Eloquent\SoftDeletes;
//Added By Cyblance for delete functionality end

class Item extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use SoftDeletes;

    protected $dates = ["publish_at", "deleted_at"];
    protected $withCount = ["authors"];

    public function getPublishAtAttribute($date)
    {
        if ($date) {
            return new Carbon($date);
        } else {
            return $this->created_at;
        }
    }

    protected static function booted()
    {
        static::addGlobalScope(new PublishedScope());
        static::saved(function ($item) {
            // if item has a support color update the associated images
            if ($item->isDirty("support_color")) {
                $item
                    ->allImages()
                    ->withoutGlobalScopes()
                    ->each(function ($imgItem) use ($item) {
                        $imgItem
                            ->contents()
                            ->each(function ($content) use ($item) {
                                foreach ($content->images as $img) {
                                    StoreResizedImages::dispatchSync(
                                        $img->path,
                                        $item->support_color
                                    );
                                }
                            });
                    });
            }
        });
    }

    public function isPublished()
    {
        return $this->status == "published" &&
            (!$this->publish_at || $this->publish_at < Carbon::now());
    }

    public function content()
    {
        // $locale = App::getLocale() ?? 'en';
        return $this->hasOne("App\Models\ItemContent"); //->whereIn('lang', [$locale, '*']);
    }

    public function contents()
    {
        return $this->hasMany("App\Models\ItemContent")
            ->withoutGlobalScopes()
            ->orderBy("lang");
    }

    public function images()
    {
        return $this->belongsToMany(
            "App\Models\Item",
            "item_imageitems",
            "item_id",
            "imageitem_id"
        )
            ->where("subtype", "image")
            ->withPivot("order")
            ->orderBy("order");
    }

    public function icons()
    {
        return $this->belongsToMany(
            "App\Models\Item",
            "item_imageitems",
            "item_id",
            "imageitem_id"
        )
            ->where("subtype", "image.icon")
            ->withPivot("order")
            ->orderBy("order");
    }
    public function icon()
    {
        return $this->icons()->first();
    }

    public function portraitImages()
    {
        return $this->belongsToMany(
            "App\Models\Item",
            "item_imageitems",
            "item_id",
            "imageitem_id"
        )
            ->where("subtype", "image.portrait")
            ->withPivot("order")
            ->orderBy("order");
    }
    public function squareImages()
    {
        return $this->belongsToMany(
            "App\Models\Item",
            "item_imageitems",
            "item_id",
            "imageitem_id"
        )
            ->where("subtype", "image.square")
            ->withPivot("order")
            ->orderBy("order");
    }

    public function allImages()
    {
        return $this->belongsToMany(
            "App\Models\Item",
            "item_imageitems",
            "item_id",
            "imageitem_id"
        )
            ->withPivot("order")
            ->orderBy("order");
    }

    public function imageForItems()
    {
        return $this->belongsToMany(
            "App\Models\Item",
            "item_imageitems",
            "imageitem_id",
            "item_id"
        );
    }

    public function imageForCollections()
    {
        return $this->belongsToMany(
            "App\Models\Collection",
            "collection_imageitems",
            "imageitem_id",
            "collection_id"
        );
    }

    public function collections()
    {
        return $this->belongsToMany("App\Models\Collection", "item_collection")
            // ->withCount('items')
            // ->withPivot('order', 'item_order')
            ->withPivot("order")
            ->withTimestamps()
            ->orderBy("order");
    }

    public function collectionsOfType($type)
    {
        return $this->collections->where("type", $type);
    }

    protected static $CollectionMapping = [
        "articles" => "articles",
        "library" => "library",
        "structure" => "structure",
        "author" => "persons",
        "tag" => "tag",
        "theme" => "tag",
        "region" => "geo",
        "country" => "geo",
        "persons" => "persons",
        "contacts" => "structure",
        "listing" => "structure",
        "dossier" => "dossier",
        "dossier_sub" => "dossier",
        "workarea" => "workarea",
        "sdi" => "workarea",
        "sdi_group" => "workarea",
    ];

    public function collectionsByGroup()
    {
        // $groupedCollections = $this->collections->groupBy('type');
        $groups = collect(["workarea" => [], "dossier" => [], "geo" => []]);
        foreach ($this->collections as $collection) {
            $mapped = isset(self::$CollectionMapping[$collection->type])
                ? self::$CollectionMapping[$collection->type]
                : "structure";
            if (!$groups->has($mapped)) {
                $groups->put($mapped, []);
            }
            $mappedColl = $groups->get($mapped);
            $mappedColl[] = $collection;
            $groups->put($mapped, $mappedColl);
        }
        // $groups = array_filter($groups, fn($group) => count($group) > 0);
        $groups = $groups->filter(function ($group, $name) {
            if ($name == "tag") {
                return false;
            }
            return count($group) > 0;
        });
        return $groups;
    }

    public function relatedItems()
    {
        // related collections
        $items = [];
        $ids = [$this->id];
        foreach ($this->collections as $coll) {
            $item = $coll
                ->items()
                ->whereIn("type", ["article", "static"])
                ->whereNotIn("items.id", $ids)
                ->first();
            if (!$item) {
                continue;
            }
            // $items[] = $item;
            $ids[] = $item->id;
            if (count($ids) > 6) {
                break;
            }
        }
        $ids = array_slice($ids, 1);
        $items = Item::whereIn("id", $ids)
            ->with([
                "content:id,title,slug,item_id,lang",
                "images.content.images",
                "collections",
                "collections.content:id,title,slug,collection_id,lang",
            ])
            ->orderByRaw("COALESCE(publish_at, created_at) desc")
            ->get();
        return $items;
    }

    public function authors()
    {
        return $this->collections()->where("type", "author");
    }

    public function attachmentGroups()
    {
        // $locale = App::getLocale();
        return $this->hasMany("App\Models\AttachmentGroup")
            // ->where(function($q) use ($locale) {
            //     $q->whereIn('lang', [$locale, '*'])
            //       ->orWhereNull('lang');
            // })
            ->orderBy("order");
    }

    public function affiliate()
    {
        return $this->hasOne("App\Models\Affiliate");
    }

    public function member()
    {
        return $this->hasOne("App\Models\Member");
    }

    public function isOpinion()
    {
        return $this->collections()
            ->where("collections.id", config("eiie.collection.opinion", 0))
            ->count() > 0;
    }

    public function devCoopTaxonomy()
    {
        $collectionIds = $this->collections->pluck("id");
        $taxonomy = Collection::with([
            // "subCollections",
            "subCollections.subCollections" => fn($q) => $q->whereIn(
                "collections.id",
                $collectionIds
            ),
        ])->find(config("eiie.collection.coop-projects-taxonomy"));

        return $taxonomy;
        // return $this->collections()->whereHas(
        //     "parentCollections",
        //     fn($q) => $q->whereHas(
        //         "parentCollections",
        //         fn($q) => $q->where(
        //             "collections.id",
        //             config("eiie.collection.coop-projects-taxonomy")
        //         )
        //     )
        // );
    }

    public function permalink(): Attribute
    {
        return new Attribute(
            get: fn() => url(
                route("item.show", [
                    "id" => $this->id,
                    "slug" => !empty($this->content)
                        ? $this->content->slug
                        : "_",
                ])
            )
        );
    }

    public function scopePublishedAfter($q, $publishedAfter)
    {
        $q->where(
            fn($q) => $q
                ->where("items.publish_at", ">=", $publishedAfter)
                ->orWhere(
                    fn($q) => $q
                        ->whereNull("items.publish_at")
                        ->where("items.created_at", ">=", $publishedAfter)
                )
        );
    }

    public function scopePublishedBefore($q, $publishedBefore)
    {
        $q->where(
            fn($q) => $q
                ->where("items.publish_at", "<=", $publishedBefore)
                ->orWhere(
                    fn($q) => $q
                        ->whereNull("items.publish_at")
                        ->where("items.created_at", "<=", $publishedBefore)
                )
        );
    }
    public function highlights()
    {
        return $this->belongsToMany("App\Models\Highlight", "highlight_item")
            ->withPivot("order")
            ->orderBy("pivot_order");
    }

    public function activityReportCongress()
    {
        return $this->hasOne(ActivityReportCongress::class);
    }
    // Subsite section start
    public function relatedItemsSubsite()
    {
        // related collections
        $is_site = ["2", "3"];
        $items = [];
        $ids = [$this->id];
        $subdomain = getSubdomain();
        $hostName = \Request::segment(2);
        $region_data = Subsite::select("region_id")
            ->where("aliase_name", $subdomain)
            ->first();
        $recordsAll = $this->collections->where(
            "id",
            "=",
            $region_data->region_id
        );

        foreach ($recordsAll as $coll) {
            $item = $coll
                ->items()
                ->whereIn("type", ["article", "static"])
                ->whereIn("is_site", $is_site)
                ->whereNotIn("items.id", $ids)
                ->get();
            foreach ($item as $itemVal) {
                $ids[] = $itemVal->id;
            }
            if (!$item) {
                continue;
            }
            if (count($ids) > 6) {
                break;
            }
        }

        $ids = array_slice($ids, 1);
        $items = Item::whereIn("id", $ids)
            ->with([
                "content:id,title,slug,item_id,lang",
                "images.content.images",
                "collections",
                "collections.content:id,title,slug,collection_id,lang",
            ])
            ->orderByRaw("COALESCE(publish_at, created_at) desc")
            ->get();
        return $items;
    }
    // Subsite section end
}
