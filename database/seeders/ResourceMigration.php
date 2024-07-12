<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;
use App\Models\Item;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ResourceMigration extends Seeder
{
    /**
     * Run the database seeds.
     * Resource to Item
     *
     * @return void
     */
    public function run()
    {
		$langMap = Utils::loadLangMap();
		$typeMap = [
			'video_url' => 'video', 
			'resource' => 'link',
			'document' => 'file',
			'pdf' => 'file'
		];
        // get all Resources and _languages
        // make Items for them
        // $oldResources = Resource::all();
		$oldResources = DB::connection('current')
						->table('media_gallery')
						->where('type', 'resource')
						->get();
		// $oldResources = [];
        foreach ($oldResources as $oldResource) {
        	$item = new Item;
        	$item->type = 'resource';
        	$item->subtype = $typeMap[$oldResource->type];
        	$item->old_type = 'resource';
			$item->old_id = $oldResource->id;
			$item->created_at = Utils::checkDate($oldResource->created_date);
			$item->updated_at = Utils::checkDate($oldResource->modified_date, $item->created_at);
        	$item->save();
        	
        	// $langs = $oldResource->resource_language;
			$langs = DB::connection('current')->table('resources_languages')->where('resource_id', $oldResource->id)->get();
        	foreach ($langs as $lang) {
        		$langName = $langMap[$lang->language_id];
        		$langName = $langName ? $langName : '*';
        		// $urlRes = ['url' => $lang->url];
        		$content = $item->content()->create([
        			'lang' => $langName,
        			'title' => Utils::checkTitle($lang->name),
        			'slug' => Utils::makeSlug($lang->name),
        			// 'resources' => [$urlRes]
        		]);
				$content->links()->create([
					'url' => $lang->url,
					'label' => $lang->name,
					'order' => 0
				]);
        	}
        }

		$oldMedias = DB::connection('current')
						->table('media_gallery')
						->whereIn('type', ['video_url', 'pdf', 'document'])
						->get();
        foreach ($oldMedias as $oldMedia) {
        	$item = new Item;
        	$item->type = 'resource';
        	$item->subtype = $typeMap[$oldMedia->type];
        	$item->old_type = $oldMedia->type;
			$item->old_id = $oldMedia->id;
			$item->created_at = Utils::checkDate($oldMedia->created_date);
			$item->updated_at = Utils::checkDate($oldMedia->modified_date, $item->created_at);
        	$item->save();
			
			$url = Str::of($oldMedia->image);
			$urlRes = [
				'url' => $oldMedia->image
			];
			// if ($item->subtype == 'video') {
			// 	$urlRes['video_provider'] = $url->contains('vimeo') ? 'vimeo' : 'youtube';
			// 	$urlRes['provider_id'] = (string) $url->match('/\W(\w+)$/');
			// } else {

			// }
        	// $langs = $oldMedia->resource_language;
			$langs = DB::connection('current')
						->table('media_gallery_languages')
						->where('media_gallery_id', $oldMedia->id)
						->get();
        	foreach ($langs as $lang) {
        		$langName = $langMap[$lang->language_id];
        		$langName = $langName ? $langName : '*';
        		// $urlRes = ['url' => $lang->url];
        		$content = $item->content()->create([
        			'lang' => $langName,
        			'title' => Utils::checkTitle($lang->title),
					'subtitle' => $lang->caption,
        			'slug' => Utils::makeSlug($lang->title),
					'content' => $lang->description,
        			// 'resources' => [$urlRes]
        		]);
				if ($item->subtype == 'video') {
					$content->videos()->create([
						'provider' => $url->contains('vimeo') ? 'vimeo' : 'youtube',
						'provider_id' => (string) $url->match('/\W(\w+)$/')
					]);
				} else if ($item->subtype == 'file') {
					$content->files()->create([
						'path' => $url
					]);
				}
        	}
        }

	}
}
