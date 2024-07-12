<?php

namespace App\Models;

// use App;
//use AjCastro\EagerLoadPivotRelations\EagerLoadPivotTrait;
use App\Scopes\PublishedScope;
use Illuminate\Support\Carbon;
//Added By Cyblance for delete functionality start
use Illuminate\Database\Eloquent\SoftDeletes;
//Added By Cyblance for delete functionality end

class Collection extends Model
{
    use SoftDeletes;

    protected $with = ["content"];
    protected $dates = ["deleted_at"];
    protected $casts = ["meta" => "array"];

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
    }

    public function isPublished()
    {
        return $this->status == "published" &&
            (!$this->publish_at || $this->publish_at < Carbon::now());
    }

    // for frontend load only the given content
    public function content()
    {
        // $locale = App::getLocale() ?? 'en';
        return $this->hasOne("App\Models\CollectionContent"); //->whereIn('lang', [$locale, '*']);
    }

    public function contents()
    {
        return $this->hasMany("App\Models\CollectionContent")
            ->withoutGlobalScopes()
            ->orderBy("lang");
    }

    public function images()
    {
        return $this->belongsToMany(
            "App\Models\Item",
            "collection_imageitems",
            "collection_id",
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
            "collection_imageitems",
            "collection_id",
            "imageitem_id"
        )
            ->where("subtype", "image.icon")
            ->withPivot("order")
            ->orderBy("order");
    }

    public function portraitImages()
    {
        return $this->belongsToMany(
            "App\Models\Item",
            "collection_imageitems",
            "collection_id",
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
            "collection_imageitems",
            "collection_id",
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
            "collection_imageitems",
            "collection_id",
            "imageitem_id"
        )
            ->withPivot("order")
            ->orderBy("order");
    }

    public function items()
    {
        $items = $this->belongsToMany("App\Models\Item", "item_collection")
            ->withTimestamps()
            ->whereHas("content")
            ->with([
                "content",
                "images.content.images",
                "collections.content:id,collection_id,title,lang,slug",
            ]);
        if ($this->ordering == null) {
            $this->fresh();
        }
        if ($this->ordering == "manual") {
            // order manual
            $items = $items
                ->withPivot("item_order")
                ->orderByRaw(
                    "item_order ASC, COALESCE(items.publish_at, items.created_at) desc"
                );
        } elseif ($this->ordering == "alphabet") {
            $items = $items
                // ->with(['content'])
                ->orderBy(
                    ItemContent::select("title")
                        ->whereColumn("item_id", "items.id")
                        ->orderBy("title", "asc")
                        ->limit(1)
                );
        } elseif ($this->ordering == "partial_date") {
            $items = $items
                ->withPivot("item_order")
                ->orderByRaw(
                    "item_order ASC, COALESCE(items.publish_at, items.created_at) desc"
                );
        } else {
            $items = $items->orderByRaw(
                "COALESCE(items.publish_at, items.created_at) desc"
            );
        }
        return $items;
    }

    public function firstNItems($n = 3)
    {
        return $this->items->take($n);
    }

    public function itemsByType()
    {
        return $this->items()
            ->with([
                "collections",
                "collections.content:id,title,lang,slug,collection_id",
            ])
            ->limit(config("eiie.pagination_size", 18))
            ->get()
            ->groupBy("type");
        // return $this->items->groupBy('type');
    }

    public function itemsOfType($type, $subtype = false)
    {
        if ($subtype) {
            return $this->items
                ->where("type", $type)
                ->where("subtype", $subtype);
        }
        return $this->items->where("type", $type);
    }

    // public function slots() {
    //     $locale = App::getLocale() ?? 'en';
    //     return $this->hasMany('App\Models\CollectionSlotItem')
    //                 ->whereHas('item', function (Builder $query) use ($locale) {
    //                     return $query->where('lang', $locale);
    //                 });
    // }

    public function slotItems()
    {
        return $this->hasMany("App\Models\CollectionSlotItem");
    }

    public function parentCollections()
    {
        return $this->belongsToMany(
            "App\Models\Collection",
            "collection_collection",
            "sub_id",
            "parent_id"
        )
            ->withPivot("parent_order")
            ->withTimestamps()
            ->orderBy("parent_order");
    }

    public function parentCollectionsOfType($type)
    {
        return $this->parentCollections->where("type", $type);
    }

    public function subCollections()
    {
        $collections = $this->belongsToMany(
            "App\Models\Collection",
            "collection_collection",
            "parent_id",
            "sub_id"
        )
            ->using("App\Models\CollectionCollection")
            ->withPivot("sub_order")
            ->withTimestamps();
        // ->with('subCollections.pivot.content')
        // ->orderBy('sub_order');
        if ($this->ordering == "manual") {
            // order manual
            $collections = $collections
                ->withPivot("sub_order")
                ->orderBy("sub_order");
        } elseif ($this->ordering == "alphabet") {
            $collections = $collections
                ->with(["content"])
                // ->orderBy('content.title')
                ->orderBy(
                    CollectionContent::select("title")
                        ->whereColumn("collection_id", "collections.id")
                        ->orderBy("title", "asc")
                        ->limit(1)
                );
        } else {
            $collections = $collections
                ->withPivot("sub_order")
                ->orderBy("sub_order");
        }
        // always order by date as well
        $collections = $collections->orderByRaw(
            "COALESCE(collections.publish_at, collections.created_at) desc"
        );
        return $collections;
    }

    public function countryCoopProjects()
    {
        return $this->belongsToMany(
            CoopProject::class,
            "coop_project_partners",
            "country_collection_id",
            "coop_project_id"
        );
    }
}
