<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;
use App\Models\Attachment;
use App\Models\AttachmentGroup;
use App\Models\Item;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PostMigration extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$langMap = Utils::loadLangMap();
		
		$boardCollection = new Collection;
		$boardCollection->type = 'persons';
		$boardCollection->layout = 'persons';
		$boardCollection->old_type = 'Executive Board';
		$boardCollection->ordering = 'manual';
		$boardCollection->save();
		$boardCollection->contents()->create([
			'lang' => '*',
			'title' => Utils::checkTitle('Executive Board'),
			'slug' => Utils::makeSlug('Executive Board'),
			'blurb' => '<p>The World Congress is the highest governing body of Education International. Every four years it elects the Executive Board that runs the organisation and ensures the implementation of decisions taken at Congress.</p>'
		]);
		Utils::writeConfigCollection('executive-board', $boardCollection->id);
		Utils::attachImage($boardCollection, 'Exbo.jpg');

		$regionalCommitteeCollection = new Collection;
		$regionalCommitteeCollection->type = 'structure';
		$regionalCommitteeCollection->layout = 'items_inline';
		$regionalCommitteeCollection->ordering = 'manual';
		$regionalCommitteeCollection->old_type = 'Regional Committees';
		$regionalCommitteeCollection->save();
		$regionalCommitteeCollection->contents()->create([
			'lang' => '*',
			'title' => Utils::checkTitle('Regional Committees'),
			'slug' => Utils::makeSlug('Regional Committees'),
			'blurb' => '<p>Education International includes five regions: Africa, Asia Pacific, Europe, Latin America, and North America and the Caribbean. Each region elects a Regional Committee that helps Education International steer programmes and activities from a regional perspective and develops positions in relation to education policies from regional intergovernmental organisations.</p>'
		]);
		Utils::writeConfigCollection('regional-committees', $regionalCommitteeCollection->id);
		Utils::attachImage($regionalCommitteeCollection, 'Exbo.jpg');

		$leadersCollection = Collection::create([
			'type' => 'structure', 'layout' => 'subcoll_noitems', 'ordering' => 'manual'
		]);
		$leadersCollection->contents()->create([
			'lang' => '*',
			'title' => Utils::checkTitle('Executive Board and Regional Committees'),
			'slug' => Utils::makeSlug('Executive Board and Regional Committees')
		]);
		$leadersCollection->subCollections()->attach($regionalCommitteeCollection, ['sub_order' => 1]);
		$leadersCollection->subCollections()->attach($boardCollection, ['sub_order' => 0]);
		Utils::writeConfigCollection('our-leaders', $leadersCollection->id);

		$staffContactsCollection = new Collection;
		$staffContactsCollection->type = 'contacts';
		$staffContactsCollection->layout = 'staff';
		$staffContactsCollection->ordering = 'manual';
		$staffContactsCollection->old_type = 'Staff';
		$staffContactsCollection->save();
		$staffContactsCollection->contents()->create([
			'lang' => '*',
			'title' => Utils::checkTitle('Staff'),
			'slug' => Utils::makeSlug('Staff')
		]);
		Utils::writeConfigCollection('staff', $staffContactsCollection->id);
		Utils::attachImage($staffContactsCollection, 'Our-Team.jpg');

		$jobsCollection = Collection::create([
			'type' => 'listing', 'layout' => 'jobs', 'ordering' => 'date'
		]);
		// $jobsCollection->contents()->create([
		// 	'lang' => '*',
		// 	'title' => Utils::checkTitle('Jobs'),
		// 	'slug' => Utils::makeSlug('Jobs')
		// ]);
		Utils::writeConfigCollection('jobs', $jobsCollection->id);

		$teamCollection = Collection::create([
			'type' => 'structure', 'layout' => 'subcoll_noitems', 'ordering' => 'manual'
		]);
		$teamCollection->contents()->create([
			'lang' => '*',
			'title' => Utils::checkTitle('Our team'),
			'slug' => Utils::makeSlug('Our team')
		]);
		$teamCollection->subCollections()->attach($staffContactsCollection, ['sub_order' => 0]);
		$teamCollection->subCollections()->attach($jobsCollection, ['sub_order' => 1]);
		Utils::writeConfigCollection('team', $teamCollection->id);
		Utils::attachImage($teamCollection, 'Our-Team.jpg');

		// $blogCollection = Collection::where('old_type', 'post_type_category')->where('old_id','7')->first();
		// $newsCollection = Collection::where('old_type', 'post_type_category')->where('old_id','1')->first();

		$postStatusMapping = [
			'publish' => 'published',
			'draft' => 'draft',
			'trash' => 'archived',
			'private' => 'unpublished',
			'future' => 'draft'
		];

		$staffCategories = [];
		$staff_categories = DB::connection('current')
								->table('staff_categories')
								->where('type', 2)
								->get();
		foreach ($staff_categories as $cat) {
			$coll = new Collection;
			$coll->type = 'persons';
			$coll->layout = 'persons';
			$coll->ordering = 'manual';
			$coll->old_type = 'staff_categories';
			$coll->old_id = $cat->id;
			$coll->save();
			$staffCategories[$cat->id] = $coll;
			$langs = DB::connection('current')->table('staff_categories_languages')
						->where('staff_category_id', $cat->id)->get();
			foreach ($langs as $lang) {
        		$langName = $langMap[$lang->language_id];
        		$langName = $langName ? $langName : '*';
				$coll->contents()->create([
					'lang' => $langName,
        			'title' => Utils::checkTitle($lang->name),
        			'slug' => Utils::makeSlug($lang->name),
				]);
			}
			if ($cat->type == 2) {
				$boardCollection->subCollections()->save(
					$coll, 
					['sub_order' => $cat->position, 'parent_order' => 0]
				);
			}
		}

		/* 

			$post_type_categories = [
            1=> 'News',
            2=> 'Articles',
            3=> 'Take action!',
            4=> 'Events',
            5=> 'Documents',
            6=> 'Library',
            7=> 'Opinion',
            8=> 'Magazines',
            9=> 'ilo', // doesn't exist?
            // 10=> 'Dossiers',  // created in DossierMigration
            // 11=> 'StaffProfiles',
            13=> 'Reports'
        ];
		
		*/

		/*
			Executive Board
			external_slide
			page
			post
			project
			Staff Profiles
		 */
		// $posts = Post::whereIn('post_type',['page', 'post'])->get();
		$postTypes = ['page', 'post', /*'Staff Profiles',*/ 'Executive Board'];
		// $postTypes = ['Executive Board'];
		$posts = DB::connection('current')->table('posts')
					->whereIn('post_type', $postTypes)
					->where('post_type_category', '!=', 10)
					->get();
		foreach ($posts as $post) {
			$isPerson = $post->post_type == 'Staff Profiles' || $post->post_type == 'Executive Board';
			$item = new Item;
			$item->type = $post->post_type == 'post' ? 'article' : ($isPerson ? 'person' : 'static');
			$item->old_type = 'post_'.$post->post_type;
			$item->old_id = $post->id;
			$item->created_at = Utils::checkDate($post->post_created);
			$item->publish_at = Utils::checkDate($post->post_date.' '.$post->post_time, $item->created_at);
			$item->updated_at = Utils::checkDate($post->post_modified, $item->created_at);
			$item->status = $postStatusMapping[$post->post_status];
			$item->save();
			
			self::addCollections($item, $post->region_id, 'region');
			self::addCollections($item, $post->country_id, 'country');
			self::addCollections($item, $post->author_id, 'user', 200);
			self::addCollections($item, $post->theme_id, 'theme');
			self::addCollections($item, $post->tag_id, 'tag');
			if ($post->record_type_id) {
				self::addCollections($item, $post->record_type_id, 'record_type');
			}
			if ($post->post_type_category) {
				self::addCollections($item, $post->post_type_category, 'post_type_category');
				if (in_array($post->post_type_category, [5, 6, 8, 13])) {
					$item->type = 'library';
					// $item->subtype = 'document';
				} else if ($post->post_type_category == 2) {
					// blog
					$item->type = 'article'; 
				}
			}
			if ($post->post_type == 'Staff Profiles') {
				$item->collections()->save($staffCategories[$post->staff_category_id], ['order' => 0, 'item_order' => $post->position]);
			} else if ($post->post_type == 'Executive Board') {
				if ($post->active_staff == '1') {
					$item->collections()->save(
						$boardCollection, 
						['order' => 0, 'item_order' => $post->position]
					);
					$item->collections()->save(
						$staffCategories[$post->staff_category_id], 
						['order' => 1, 'item_order' => $post->position]
					);
				}
			}

			// $resources = $post->post_resource;
			$resources = DB::connection('current')
							->table('post_resources')
							->join('post_contents', 'post_resources.post_content_id', '=', 'post_contents.id')
							->where('post_resources.post_id', $post->id)							
							->get();
			$attachGroup = false;
			$order = 0;
			$attachOrder = 0;
			foreach ($resources as $res) {
				if (!$attachGroup) {
					$attachGroup = $this->makeAttachmentGroup($item);
				}
				$attachedItem = Item::where('old_type', 'resource')
								->where('old_id', $res->resource_id)
								->first();
				if ($attachedItem) {
					$this->makeAttachment($attachGroup, $attachedItem, $attachOrder++);
				} else {
					// echo "Old resource not found ".$res->id."\n";
				}
			}
			
			// $medias = $post->post_media;
			$medias = DB::connection('current')
						->table('post_media')
						->where('post_id', $post->id)
						->get()
						;
			$order = 0;
			foreach ($medias as $media) {
				if ($media->type == 'file') {
					if (!$attachGroup) {
						$attachGroup = $this->makeAttachmentGroup($item);
					}
					$attachedItem = Item::where('subtype', 'file')
									->where('old_id', $media->media_id)
									->first();
					if ($attachedItem) {
						$this->makeAttachment($attachGroup, $attachedItem, $attachOrder++);
					} else {
						// echo "Old post_media not found ".$media->media_id."\n";
					}
				} else {
					$image = Item::where('old_type', 'media')
								->where('old_id', $media->media_id)
								->first();
					if ($image) {
						if (!$item->images()->find($image->id)) {
							$item->images()->save($image, ['order' => $order++]);
						} else {
							// ToDo? check languages added in content?
						}
					}
				}
			}

			// also do post->media_id ?
			if ($post->media_id) {
				$image = Item::where('old_type', 'media')
							->where('old_id', $post->media_id)
							->first();
				if ($image) {
					if (!$item->images()->find($image->id)) {
						$item->images()->save($image, ['order' => $order++]);
					} else {
						// ToDo? check languages added in content?
					}
				}
			}
			
			/* Some posts have an image referenced in staff_profile_picture */
			if ($post->staff_profile_picture) {
				$image = new Item;
				$image->old_type = 'staff_profile_picture';
				$image->old_id = $post->id;
				$image->type = 'resource';
				$image->subtype = 'image.portrait';
				$image->created_at = Utils::checkDate($post->post_created);
				$image->updated_at = Utils::checkDate($post->post_modified, $post->post_created);
				$image->save();
				$resource = [
					'url' => 'https://www.ei-ie.org/public/img/user_profile_pictures/'.$post->staff_profile_picture
				];
				$content = $image->content()->create(
	        		[
	        			'lang' => '*',
						'title' => $post->alias_name,
						'slug' => Str::slug($post->alias_name),
	        			// 'resources' => [$resource]
	        		]);
				$content->images()->create([
					'path' => 'https://www.ei-ie.org/public/img/user_profile_pictures/'.$post->staff_profile_picture
				]);
				$item->images()->save($image, ['order' => $order]);
			}
			
			/* ToDo names are in subtitle and teaser */
			// $contents = $post->post_contents;
			$contents = DB::connection('current')->table('post_contents')->where('post_id', $post->id)->get();
			foreach ($contents as $content) {
        		$langName = $langMap[$content->language_id];
				$langName = $langName ? $langName : '*';
				
				$title = $content->title;
				$subtitle = $content->subtitle;
				$blurb = $content->teaser;
				if ($isPerson) {
					$title = $content->teaser.', '.$content->subtitle;
					$blurb = '';
					$subtitle = $content->title;
				}
        		$item->content()->create([
        			'lang' => $langName,
        			'title' => Utils::checkTitle($title),
        			'slug' => Utils::makeSlug($title),
        			'subtitle' => $subtitle,
        			'blurb' => $blurb,
        			'content' => $content->text,
					'footnotes' => ['footnote' => $content->footnote]
        		]);
			}
		}
    }
	
	function addCollections($item, $idsString, $oldType, $order = 0) {
		$ids = explode(',', $idsString);
		foreach ($ids as $id) {
			$collection = Collection::where('old_type', $oldType)
							->where('old_id', $id)
							->first();
			if ($collection) {
				if ($collection->type == 'author' 
					|| in_array($collection->id, [
								config('eiie.collection.news'), 
								config('eiie.collection.opinion'), 
								config('eiie.collection.spotlight'), 
								config('eiie.collection.reports'), 
								config('eiie.collection.library'), 
								config('eiie.collection.documents'), 
								config('eiie.collection.publications'), 
								config('eiie.collection.ei-publications'), 
						])
					) 
				{
					$item->collections()->save($collection, ['order' => 1000, 'item_order' => $order]);
				} else {
					$item->collections()->save($collection, ['order' => $order++, 'item_order' => $order]);
				}
			}
		}
	}

	function makeAttachmentGroup($item) {
		$attachGroup = new AttachmentGroup;
		$attachGroup->order = 0;
		$attachGroup->item()->associate($item);
		$attachGroup->save();
		$item->attachmentGroups()->save($attachGroup);
		return $attachGroup;
	}
	
	function makeAttachment($attachGroup, $attachedItem, $order = 0) {
		$attachment = new Attachment;
		$attachment->order = $order;
		$attachment->item()->associate($attachedItem);
		$attachment->attachmentGroup()->associate($attachGroup);
		$attachment->save();
		$attachGroup->attachments()->save($attachment);
	}

}

