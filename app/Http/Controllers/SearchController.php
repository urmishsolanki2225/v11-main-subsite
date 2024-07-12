<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemContent;
use Illuminate\Http\Request;
use Algolia\ScoutExtended\Facades\Algolia;

class SearchController extends Controller
{
    public function show()
    {
        // $searchKey = Algolia::searchKey(Article::class);
        return view("search-adv");
    }

    public function search($keyword)
    {
        return view("search-adv");
        // $locale = \App::getLocale();
        // $search = ItemContent::search($keyword);
        // // echo $search->getTotalCount();
        // // echo '<hr />';
        // $contents = $search
        //                 ->paginate(config('eiie.pagination_size', 18))
        //                 ;
        // echo $contents->count();
    }
}
