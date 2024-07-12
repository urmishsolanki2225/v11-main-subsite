<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;
use App\Models\Item;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class TagsMigration extends Seeder
{
    /**
     * Run the database seeds.
     * Transform Tag and Theme to Collection
     *
     * @return void
     */
    public function run()
    {
		$langMap = Utils::loadLangMap();

        // Tags, Themes
		$tags = DB::connection('current')->table('tags')->get();
        foreach ($tags as $tag) {
        	$coll = new Collection;
        	$coll->old_type = 'tag';
        	$coll->old_id = $tag->id;
        	$coll->layout = 'tag';
        	$coll->type = 'tag';
        	$coll->save();
        	
			$langs = DB::connection('current')->table('tags_languages')->where('tag_id', $tag->id)->get();
        	foreach ($langs as $lang) {
        		$langName = $langMap[$lang->language_id];
        		$langName = $langName ? $langName : '*';
        		$coll->content()->create([
        			'lang' => $langName,
        			'title' => Utils::checkTitle($lang->name),
        			'slug' => Utils::makeSlug($lang->name)
        		]);
        	}
        }

		$themes = DB::connection('current')->table('themes')->get();
        foreach ($themes as $theme) {
        	$coll = new Collection;
        	$coll->old_type = 'theme';
        	$coll->old_id = $theme->id;
        	$coll->layout = 'theme';
        	$coll->type = 'theme';
        	$coll->save();
        	
			$langs = DB::connection('current')->table('theme_languages')->where('theme_id', $theme->id)->get();
        	foreach ($langs as $lang) {
        		$langName = $langMap[$lang->language_id];
        		$langName = $langName ? $langName : '*';
        		$coll->content()->create([
        			'lang' => $langName,
        			'title' => Utils::checkTitle($lang->name),
        			'slug' => Utils::makeSlug($lang->name)
        		]);
        	}
        }

    }
}
