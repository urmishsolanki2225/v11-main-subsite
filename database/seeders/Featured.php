<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\Item;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Builder;

class Featured extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $coll = Collection::create([
            'type' => 'structure',
            'layout' => 'featured',
            'ordering' => 'manual'
        ]);
        $coll->contents()->create([
            'lang' => '*',
            'title' => 'Featured',
            'slug' => 'featured'
        ]);
		Utils::writeConfigCollection('featured', $coll->id);

        $locale = 'en';
        // $coll->items()->saveMany(Item::where('type', 'article')->whereYear('created_at', '2020')->whereHas('content', function (Builder $query) use ($locale) {
        //     $query->where('lang', $locale);
        // })->inRandomOrder()->take(3)->get());
        $coll->items()->saveMany(Item::where('old_type', 'post_post')->whereIn('old_id', [17143, 17116, 17126])->get());
        $coll->items()->save(Item::where('subtype', 'video')->orderBy('created_at','desc')->first());
    }
}
