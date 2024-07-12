<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Item;
use Illuminate\Http\Request;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\App;

class HomeController extends BaseController
{
    public function show()
    {
        $featured = Collection::with([
            "items",
            "items.collections.content:id,title,slug,collection_id,lang",
        ])->find(config("eiie.collection.featured"));

        $homeItem = Item::withoutGlobalScopes()->find(config("eiie.item.home"));

        $updates = Item::whereIn("type", ["article"])
            ->has("content")
            ->with([
                "content",
                "images",
                "images.content.images",
                "collections",
                "collections.content:id,title,slug,collection_id,lang",
                "collections.parentCollections",
            ])
            ->orderByRaw("COALESCE(publish_at, created_at) desc")
            ->take(6)
            ->get();
        // $workareas = Collection::firstWhere('type', 'workareas')
        // 		->subCollections
        // 		;
        $sdis = Collection::firstWhere("type", "sdi");
        $prios = $sdis;
        if ($sdis) {
            $sdis = $sdis->subCollections;
        } else {
            $sdis = [];
        }

        return view("home", [
            "featured" => $featured,
            "home_item" => $homeItem,
            "updates" => $updates,
            "workareas" => $sdis,
            "priorities" => $prios,
        ]);
    }
}
