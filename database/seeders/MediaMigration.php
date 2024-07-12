<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Collection;
use App\Models\Item;

class MediaMigration extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		
        $langMap = Utils::loadLangMap();

        //
		// $images = App\Models\Media::whereIn('type',['image'])->get();
		$images = DB::connection('current')
					->table('media_gallery')
					->whereIn('type', ['image'])
					->get();
        foreach ($images as $image) {
        	$item = new Item;
        	$item->old_type = 'media';
        	$item->old_id = $image->id;
        	$item->type = 'resource';
			$item->subtype = 'image';
			$item->created_at = Utils::checkDate($image->created_date);
			$item->updated_at = Utils::checkDate($image->modified_date, $image->created_date);
        	$item->save();
        	$resource = [
        		'url' => $image->image
        	];
        	if ($image->size) {
        		$resource['size'] = $image->size;
        	}
        	if (rand() > 0.5) {
        		$resource['thumburl'] = $image->image;
        	}
			// $langs = $image->media_languages;
			$langs = DB::connection('current')->table('media_gallery_languages')->where('media_gallery_id', $image->id)->get();
        	if (count($langs) == 0) {
	        	echo "$image->id ".count($langs)."\n";
	        }
        	foreach ($langs as $lang) {
/*         		echo "   $lang\n"; */
        		$langName = $langMap[$lang->language_id];
				$langName = $langName ? $langName : '*';
				$title = $lang->title ? $lang->title : $image->image;
        		$content = $item->content()->updateOrCreate(
	        		['lang' => $langName],
	        		[
	        			'lang' => $langName,
						'title' => $title,
						'slug' => Str::slug($title),
	        			'subtitle' => $lang->caption,
	        			'blurb' => strip_tags($lang->description),
	        			// 'resources' => [$resource]
	        		]);
				$content->images()->create(['path' => $image->image]);
        	}
        	// $tags = $image->mediatags;
        	// foreach ($tags as $tag) {
        		// find collection for the tag and associate
        		// the item to it
        	// }
        	// author ?
        }
    }
}
