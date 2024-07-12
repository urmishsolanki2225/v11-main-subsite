<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

use App\Models\Collection;
use App\Models\CollectionContent;
use App\Models\Item;

class MergeCollections extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$EIPubColl = Collection::where('old_type', 'record_type')
            ->where('old_id', '4')
            ->first()
            ;
        $PubColl = Collection::where('old_type', 'record_type')
            ->where('old_id', '5')
            ->first()
            ;
        $PubAndResearch = Collection::create([
            'type' => 'library',
            'layout' => 'library',
            'ordering' => 'date',
        ]);
        $PubAndResearch->contents()->create([
            'lang' => '*',
            'title' => 'Publications and Research',
            'slug' => Utils::makeSlug('Publications and Research')
        ]);
        $PubAndResearch->items()->saveMany($EIPubColl->items);
        $PubAndResearch->items()->saveMany($PubColl->items);
        Utils::writeConfigCollection('publications-and-research', $PubAndResearch->id);

        $countries = Collection::where('type', 'country')->get();
        $countries->each(function($country) {
            $name = $country->content->title;
            if ($name) {
                $tag = Collection::where('type', 'tag')
                            ->whereHas('contents', function (Builder $query) use ($name) {
                                $query->where('title', 'like', $name);
                            })
                            ->first()
                            ;
                if ($tag) {
                    // echo $name." ".$tag->id."\n";
                    $country->items()->syncWithoutDetaching($tag->items->pluck('id'));
                    $tag->delete();
                }
            }
        });
    }

}
