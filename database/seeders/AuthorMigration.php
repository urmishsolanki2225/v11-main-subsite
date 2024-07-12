<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Collection;
use App\Models\Item;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
// use App\User;

class AuthorMigration extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $langMap = Utils::loadLangMap();
		// $users = User::all();
		$users = DB::connection('current')->table('users')->get();
        foreach ($users as $user) {
        	$author = new Collection;
        	$author->type = 'author';
        	$author->layout = 'author';
        	$author->old_type = 'user';
			$author->old_id = $user->id;
			$author->created_at = Utils::checkDate($user->created);
			$author->updated_at = Utils::checkDate($user->modified, $user->created);
        	$author->save();
        	
			// $bios = $user->user_bio;
    		// for now img full url
    		// https://www.worldsofeducation.org/img/user_profile_pictures/8d777f385d3dfec8815d20f7496026dc4741.png
			$imgName = $user->profile_picture;
			if ($imgName) {
				$img = 'https://www.worldsofeducation.org/img/user_profile_pictures/'.$imgName;
				$name = $user->firstname;
				$imgItem = new Item;
				$imgItem->type = 'resource';
				$imgItem->subtype = 'image.portrait';
				$imgItem->old_type = 'user.profile_picture';
				$imgItem->old_id = $user->id;
				$imgItem->created_at = $author->created_at;
				$imgItem->updated_at = $author->updated_at;
				$imgItem->save();
				$content = $imgItem->contents()->create([
					'lang' => '*',
	//     			'resources' => [[ 'url' => '/user_profile_pictures/'.$user->profile_picture]]
					// 'resources' => [[ 'url' => $img]],
					'title' => $imgName,
					'slug' => Str::slug($imgName)
				]);
				$content->images()->create([
					'path' => $img
				]);
				$author->images()->save($imgItem, ['order' => 0]);
			}

			$bios = DB::connection('current')->table('author_users')->where('user_id', $user->id)->get();
        	foreach ($bios as $bio) {
        		if ($bio->name) { 
        			$name = $bio->name; 
        		}
        		$author->content()->create([
        			'lang' => $langMap[$bio->language_id],
        			'slug' => Utils::makeSlug($name),
        			'blurb' => $bio->bio,
        			'title' => Utils::checkTitle($name)
        		]);
			}
			// fallback for empty language
    		$author->content()->updateOrCreate(
    			['lang' => '*'], 
    		[
    			'slug' => Utils::makeSlug($name),
    			'title' => Utils::checkTitle($name, 'unnamed')
    		]);
    		if (!$name) {
    			// echo "No name for id: ".$user->id."\n";
    		}
/*         	$author = new Collection();
        	$author->save();
			$author->content()->create(['']) */
        }
    }
}
