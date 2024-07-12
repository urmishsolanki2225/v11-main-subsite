<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;
use App\Models\Item;
use App\Models\ResourceVideo;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Stevebauman\Purify\Facades\Purify;

class DossierMigration extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$langMap = Utils::loadLangMap();

        $dossiers = new Collection;
    	$dossiers->type = 'structure';
        $dossiers->old_type = 'post_type_category';
        $dossiers->old_id = '10';
    	$dossiers->layout = 'subcoll_cards';
        $dossiers->ordering = 'manual';
    	$dossiers->save();
        $dossiers->contents()->createMany([
            [ 'lang' => 'en', 'title' => 'Spotlight', 'slug' => 'spotlight'],
            [ 'lang' => '*', 'title' => 'Spotlight', 'slug' => 'spotlight']
        ]);
		Utils::writeConfigCollection('spotlight', $dossiers->id);

        $campaigns = Collection::create([
            'type' => 'structure',
            'layout' => 'subcoll_cards',
            'ordering' => 'manual'
        ]);
        $campaigns->contents()->create([
            'lang' => 'en', 'title' => 'Campaigns', 'slug' => 'campaigns',
            'lang' => '*', 'title' => 'Campaigns', 'slug' => 'campaigns'
        ]);
		Utils::writeConfigCollection('campaigns', $campaigns->id);
        /*
            all: posts.post_type_category = 10

            parents:
            posts.id = 16670  
                 .dossier_type = 'parent'
            
            groups in dossiers:
            posts.dossier_type = 'child'
                 .position 
            post_contents.parent_id = 16670

            subitems: 
            post_contents.dossier_type = article (media, gallery)
                         .dossier_type_ids = '16927, ... , ..'
         */
		$oldDossiers = DB::connection('current')->table('posts')
                            ->where('post_type_category', '=', 10)
                            ->where('dossier_type', '=', 'parent')
                            ->get();
        foreach ($oldDossiers as $oldDossier) {
            $dossier = $this->make($oldDossier, $langMap);
            $dossier->parentCollections()->save($dossiers, [
                'sub_order' => $oldDossier->position, 
                'parent_order' => 0
            ]);
            if ($oldDossier->id == 15893) {
                $dossier->parentCollections()->save($campaigns, [
                    'sub_order' => $oldDossier->position, 
                    'parent_order' => 0
                ]);
            }
            
            $parentId = $oldDossier->id;
            $oldSubGroups = DB::connection('current')->table('post_contents')
                            ->leftJoin('posts', 'post_contents.post_id', '=', 'posts.id')
                            ->where('post_contents.language_id', 1)
                            ->where('post_contents.parent_id', $parentId)
                            ->get();
            foreach ($oldSubGroups as $oldSubGroup) {
                $group = $dossier;
                if ($oldSubGroup->post_type_category == 10) {
                    if ($parentId == 15247) {
                        // echo "left joined ";
                    }
                    // means the left join has content;
                    $group = $this->make($oldSubGroup, $langMap);
                    $group->parentCollections()->save($dossier, [
                        'sub_order' => $oldSubGroup->position ? $oldSubGroup->position : 10, 
                        'parent_order' => 0
                    ]);
                }
                // subitems
                $subItemIds = explode(',', $oldSubGroup->dossier_type_ids);
                $order = 0;
                foreach ($subItemIds as $subItemId) {
                    // echo $oldSubGroup->dossier_type.':'.$subItemId.' ';
                    $item = Item::where('old_id', $subItemId)
                                ->first()
                                ;
                    if ($item) {
                        $group->items()->save($item, ['order' => $order++]);
                    }
                }
            }
        }
    }

    function make($oldDossier, $langMap) {
        $dossier = Collection::create([
            'type' => $oldDossier->dossier_type == 'child' ? 'dossier_sub' : 'dossier',
            'layout' => $oldDossier->dossier_type == 'child' ? 'dossier_sub' : 'dossier',
            'old_type' => 'post_dossier_'.$oldDossier->dossier_type,
            'old_id' => $oldDossier->id,
            'created_at' => Utils::checkDate($oldDossier->post_created),
            'updated_at' => Utils::checkDate($oldDossier->post_modified, Utils::checkDate($oldDossier->post_created)),
            'status' => $oldDossier->post_status == 'publish' ? 'published' : 'draft',
            'ordering' => $oldDossier->dossier_type == 'child' ? 'date' : 'manual'
        ]);
        $contents = DB::connection('current')->table('post_contents')
                            ->where('post_id', $oldDossier->id)
                            ->get();
        foreach ($contents as $content) {
            $langName = $langMap[$content->language_id];
            $langName = $langName ? $langName : '*';
            
            $title = trim($content->title);
            $subtitle = trim($content->subtitle);
            $blurb = trim($content->teaser);
            if ($blurb == '-') {
                $blurb = null;
            }
            if ($subtitle == $blurb) {
                $subtitle = null;
            }
            if ($title == $subtitle) {
                $subtitle = null;
            }
            if ($title == $blurb) {
                $blurb = null;
            }
            if ($content->text) {
                if (!$blurb) {
                    $blurb = $content->text;
                } else {
                    $blurb = '<p>'.$blurb.'</p>'.$content->text;
                }
            }
            if ($blurb) {
                $blurb = \App\Actions\CleanHtml::clean($blurb, true);
                $blurb = Str::of($blurb)
                        ->replace('<div>', '<p>')
                        ->replace('</div>', '</p>')
                        ->replace('<p><strong>', '<h3>')
                        ->replace('</strong></p>', '</h3>')
                        ;
            }
            $dossier->contents()->create([
                'lang' => $langName,
                'title' => Utils::checkTitle($title),
                'slug' => Utils::makeSlug($title),
                'subtitle' => $subtitle,
                'blurb' => $blurb,
            ]);   
        }
        self::addCollections($dossier, $oldDossier->region_id, 'region');
        self::addCollections($dossier, $oldDossier->country_id, 'country');
        self::addCollections($dossier, $oldDossier->author_id, 'user');
        self::addCollections($dossier, $oldDossier->theme_id, 'theme');
        self::addCollections($dossier, $oldDossier->tag_id, 'tag');
        if ($oldDossier->record_type_id) {
            self::addCollections($dossier, $oldDossier->record_type_id, 'record_type');
        }
        // echo "make $oldDossier->id ";
        $medias = DB::connection('current')->table('post_media')->where('post_id', $oldDossier->id)->get();
        $order = 0;
        foreach ($medias as $media) {
            // echo $media->type;
            if ($media->type == 'file') {
                // if (!$attachGroup) {
                //     $attachGroup = $this->makeAttachmentGroup($item);
                // }
                // $attachedItem = Item::where('subtype', 'file')
                //                 ->where('old_id', $media->media_id)
                //                 ->first();
                // if ($attachedItem) {
                //     $this->makeAttachment($attachGroup, $attachedItem, $attachOrder++);
                // } else {
                //     echo "Old post_media not found ".$media->media_id."\n";
                // }
            } else if ($oldDossier->id != 16670) {
                $image = Item::where('old_type', 'media')
                            ->where('old_id', $media->media_id)
                            ->first();
                if ($image) {
                    $dossier->images()->save($image, ['order' => $order++]);
                }
            }
        }
        if ($oldDossier->id == 16670) {
            Utils::attachImage($dossier, 'COVID19-collection.jpg');
        }
        // echo "\n";
        if ($oldDossier->id == 15779) {
            // Education and copyright dossier, show how it can work
            $item = Item::where('old_id', 14702)->where('old_type', 'post_post')->first();
            $dossier->items()->save($item);
            $links = [
                ["https://www.csee-etuce.org/en/news/archive/2496-save-the-date-eu-copyright-conference-in-higher-education-11th-april-brussels?highlight=WyJjb3B5cmlnaHQiXQ", "ETUCE Copyright Conference page"],
                ["https://www.csee-etuce.org/en/news/archive/1969-etuce-statement-on-copyright-in-the-digital-single-market", "ETUCE Statement on Copyright in the Digital Single Market"],
                ["https://download.ei-ie.org/Docs/WebDepot/Copyrighteducation_communia_prof.NOBRE.pdf", "Copyright and education, by Professor Teresa Nobre/COMMUNIA"],
                ["https://www.communia-association.org/wp-content/uploads/2018/01/FINAL-180115-Communia-Joint-Letter-Educators-ask-for-a-better-copyright-1.pdf", "Why educators ask for a better Copyright reform?, by COMMUNIA"],
                ["https://medium.com/copyright-untangled/dear-teacher-copyright-concerns-you-829b2f33174c", "Dear teacher: copyright concerns you, by Lisette Kalshoven/COMMUNIA"],
                ["https://medium.com/copyright-untangled/5-outrageous-things-educators-can-t-do-because-of-copyright-ac447dcc6e09", "5 outrageous things educators can’t do because of copyright, by Lisette Kalshoven/COMMUNIA"],
                ["https://medium.com/copyright-untangled/4-approaches-for-teachers-on-how-to-work-with-copyright-in-the-classroom-387a48eb1e03", "4 approaches for teachers on how to work with copyright in the classroom, by Lisette Kalshoven/COMMUNIA"]
            ];
            foreach ($links as $link) {
                $linkItem = Item::create([
                    'type' => 'resource',
                    'subtype' => 'link',                    
                ]);
                $linkItem->contents()->create([
                    'lang' => '*',
                    'title' => $link[1],
                    'slug' => Utils::makeSlug($link[1])
                ])->links()->create([
                    'url' => $link[0],
                    'label' => $link[1],
                    'order' => 0
                ]);
                $dossier->items()->save($linkItem);
            }
            $dossier->contents[0]->blurb = preg_replace('/<ul.*ul>/s', '', $dossier->contents[0]->blurb);
            $dossier->contents[0]->save();
        } else if ($oldDossier->id == 16670) {
            // Covid-19 
            // Hq5zjsvELIo
            $video = ResourceVideo::firstWhere('provider_id', 'Hq5zjsvELIo');
            $videoItem;
            if ($video) {
                $videoItem = $video->content->item;
            } else {
                $videoItem = Item::create([
                    'type' => 'resource',
                    'subtype' => 'video'
                ]);
                $videoItem->contents()->create([
                    'lang' => '*',
                    'title' => 'Solidarity in Covid-19 times and beyond: together for a better future for all',
                    'slug' => Utils::makeSlug('Solidarity in Covid-19 times and beyond: together for a better future for all')
                ])->videos()->create([
                    'provider_id' => 'Hq5zjsvELIo',
                    'provider' => 'youtube'
                ]);
            }
            $dossier->items()->save($videoItem);
        }
        return $dossier;
    }

    function addCollections($dossier, $idsString, $oldType) {
		$order = 10;
		$ids = explode(',', $idsString);
		foreach ($ids as $id) {
			$collection = Collection::where('old_type', $oldType)
							->where('old_id', $id)
							->first();
			if ($collection) {
				$dossier->subCollections()->save($collection, [
                    'parent_order' => $order, 'sub_order' => $order
                ]);
                $order++;
			}
		}
	}
}
