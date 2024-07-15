<?php

namespace App\Models;

use App;
use Laravel\Scout\Searchable;
use Stevebauman\Purify\Facades\Purify;
use App\Scopes\LanguageScope;
use App\View\Components\RenderContent;
use Carbon\Carbon;
use Illuminate\Support\Str;
use OwenIt\Auditing\Contracts\Auditable;

class ItemContent extends Model implements Auditable
{
    use Searchable;
    use \OwenIt\Auditing\Auditable;

    protected $casts = [
        // 'resources' => 'array',
        "footnotes" => "array",
        "meta" => "array",
    ];
    // re-enable touches after seeding!
    // protected $touches = ['item'];
    // protected $withCount = ['images', 'videos'];

    protected static function booted()
    {
        if (request()->is("admin/*")) {
            return;
        }
        static::addGlobalScope(new LanguageScope());
    }

    public function setTitleAttribute($val)
    {
        $this->attributes["title"] = $val;
        // always override slug
        $this->attributes["slug"] = Str::slug($val);
    }

    public function item()
    {
        return $this->belongsTo("App\Models\Item");
    }

    public function images()
    {
        return $this->hasMany(ResourceImage::class, "content_id");
    }
    public function image()
    {
        return $this->images()->first();
    }

    public function videos()
    {
        return $this->hasMany(ResourceVideo::class, "content_id");
    }
    public function video()
    {
        return $this->videos()->first();
    }
    
    //Added by Cyblance for Annual-Reports section start
    public function embeds()
    {
        return $this->hasMany(ResourceEmbed::class, "content_id");
    }
    //Added by Cyblance for Annual-Reports section end

    public function links()
    {
        return $this->hasMany(ResourceLink::class, "content_id");
    }

    public function files()
    {
        return $this->hasMany(ResourceFile::class, "content_id")->orderBy(
            "resource_files.order"
        );
    }

    public function contact()
    {
        return $this->hasOne(Contact::class, "item_content_id");
    }
    public function contacts()
    {
        return $this->hasMany(Contact::class, "item_content_id");
    }

    public function dcprojects()
    {
        return $this->hasMany("App\Models\DCProject", "content_id");
    }
    public function dcproject()
    {
        return $this->hasOne("App\Models\DCProject", "content_id");
        // return $this->dcprojects()->first();
    }
    public function devCoopProject()
    {
        return $this->hasOne(CoopProject::class, "content_id");
    }

    /*
     * Scout/Algolia indexing
     */
    //Added by Cyblance for Subsite section start
    public function searchableAs()
    {
        return 'item_contents_cybl'; // Use a unique identifier for the new index
    }
    //Added by Cyblance for Subsite section end
    public function shouldBeSearchable()
    {
        return $this->item &&
            $this->item->status == "published" &&
            ($this->item->type == "article" ||
                $this->item->type == "static" ||
                $this->item->type == "library" ||
                $this->item->subtype == "file");
    }

    public function toSearchableArray()
    {
        $lang = $this->lang;
        $locale = App::getLocale();
        App::setLocale($lang);
        $array = $this->toArray();

        unset($array["item"]);
        unset($array["content_json"]);
        unset($array["blurb_json"]);
        $renderContent = new RenderContent(
            $this,
            "text",
            null,
            null,
            false,
            false
        );
        $array["content"] = $renderContent->output;
        $array["created_at"] = $this->item->created_at->format("Y-m-d");
        $array["updated_at"] = $this->item->updated_at->format("Y-m-d");
        $array["publish_at"] = $this->item->publish_at->format("Y-m-d");
        // $array['collections'] = array_map(fn($coll) => $coll->content $this->item->collections;
        $collections = $this->item
            ->collections()
            ->with([
                "content" => fn($q) => $q
                    ->whereIn("lang", [$lang, "*"])
                    ->orderBy("lang", "desc"),
            ])
            ->get();
        $colls = \App\Actions\PrimaryCollection::all(
            $this->item->collections(),
            $lang
        );
        $collTitles = [];
        foreach ($colls as $coll) {
            if (!empty($coll->content->title)) {
                $collTitles[] = $coll->content->title;
            }
        }
        $array["collections"] = $collTitles;
        $array["countries"] = $collections
            ->where("type", "country")
            ->map(
                fn($country) => [
                    "id" => $country->id,
                    "title" =>
                        $country->content->title ??
                        ($country->contents[0]->title ?? ""),
                ]
            )
            ->values()
            ->all();
        $array["authors"] = $collections
            ->where("type", "author")
            ->map(
                fn($author) => [
                    "id" => $author->id,
                    "title" =>
                        $author->content->title ??
                        ($author->contents[0]->title ?? ""),
                ]
            )
            ->values()
            ->all();
        //Added by Cyblance for Subsite section start
        $array["is_site"] = $this->item->is_site;
        $array["regions"] = $collections
            ->where("type", "region")
            ->map(
                fn($region) => [
                    "id" => $region->id,
                    "title" =>
                        $region->content->title ??
                        ($region->contents[0]->title ?? ""),
                ]
            )
            ->values()
            ->all();
        //Added by Cyblance for Subsite section end
        $array["categories"] = [];
        if ($this->item->type === "article") {
            $array["categories"][] = __("eiie.Articles");
        }
        if (
            $collections
                ->where("id", config("eiie.collection.research"))
                ->count() > 0
        ) {
            $array["categories"][] = __("eiie.EI Research");
        }
        if (
            $collections
                ->where("id", config("eiie.collection.publications"))
                ->count() > 0
        ) {
            $array["categories"][] = __("eiie.Other Publications");
        }
        if (
            $collections
                ->where("id", config("eiie.collection.congress-resolutions"))
                ->count() > 0
        ) {
            $array["categories"][] = __("eiie.World Congress resolutions");
        }
        $array["year"] = $this->item->publish_at->year;
        App::setLocale($locale);
        return $array;
    }

    protected function makeAllSearchableUsing($query)
    {
        // return $query->with('author');
        // search only published items
        // return $query->with(['item' => ]);
        $query->withoutGlobalScopes()->with([
            "item" => fn($q) => $q->without("collections"),
            // "item.collections" => fn($q) => $q->with([
            //     "content" => fn($q) => $q
            //         ->withoutGlobalScopes()
            //         ->where("lang", "item_contents.lang"),
            // ]),
            // "item.collections.contents" => fn($q) => $q
            //     ->withoutGlobalScopes()
            //     ->select("id", "lang", "title")
            //     ->where("lang", "item_contents.lang"),
        ]);
    }
}
