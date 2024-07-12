<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attachment;
use App\Models\AttachmentGroup;
use App\Models\Collection;
use App\Models\Item;
use App\Models\CollectionSlot;
use App\Models\CollectionSlotItem;
use App\Models\ResourceLink;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Stevebauman\Purify\Facades\Purify;

class CountrySectionsMigration extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $langMap = Utils::loadLangMap();        
        $slotTemplateId = 1;

        $sections = DB::connection('current')->table('section')->get();
        $slots = [];
		foreach ($sections as $section) {
            $slot = new CollectionSlot;
            $slot->order = $section->position;
            $slot->template_id = $slotTemplateId;
            $slot->save();
            $slots[$section->id] = $slot;

			$langs = DB::connection('current')->table('section_language')->where('section_id', $section->id)->get();
        	if (count($langs) == 0) {
	        	echo "$section->id no languages\n";
	        }
        	foreach ($langs as $lang) {
        		$langName = $langMap[$lang->language_id];
        		$langName = $langName ? $langName : '*';
        		$slot->title()->updateOrCreate(
	        		['lang' => $langName],
	        		[
	        			'lang' => $langName,
                        'slug' => Utils::makeSlug($lang->section_name, '-'),
                        'title' => Utils::checkTitle($lang->section_name)
	        		]);
            }            
        }

        $profileSections = DB::connection('current')->table('country_profile_section')->get();
        foreach ($profileSections as $profileSection) {
            if (!isset($slots[$profileSection->section_id])) {
                // section not recognized
                // echo "Section not recognized $profileSection->section_id \n";
                continue;
            }
            $created_at = Utils::checkDate($profileSection->post_created);
            $updated_at = Utils::checkDate($profileSection->post_modified, $created_at);
            $items = [];
            $country = Collection::where('old_type', 'country')
                ->where('old_id', $profileSection->country_id)
                ->first();
            if (!$country) {
                echo "No country found for id: $profileSection->country_id \n";
                continue;
            }
            $subs = DB::connection('current')
                ->table('country_profile_sub_section')
                ->select('position', 'country_profile_section_id')
                ->where('country_profile_section_id', $profileSection->id)
                ->where('description', '>', '')
                ->where('status_flag', 'sub_title')
                ->where('status', 'active')
                ->groupBy('position')
                ->groupBy('country_profile_section_id')
                ->get();

            foreach ($subs as $sub) {
                // each section is exactly one slot
                $slotId = $slots[$profileSection->section_id]->id;
                $item = isset($items[$slotId]) ? $items[$slotId] : null;
                if (!$item) {
                    $item = new Item;
                    $item->type = 'slot';
                    $item->old_type = 'country_profile_section';
                    $item->old_id = $profileSection->id;
                    $item->created_at = $created_at;
                    $item->updated_at = $updated_at;
                    $item->save();
                    $items[$slotId] = $item;
                    $slotItem = new CollectionSlotItem;
                    $slotItem->slot_id = $slots[$profileSection->section_id]->id;
                    $slotItem->item_id = $item->id;
                    $slotItem->collection_id = $country->id;
                    // $slotItem->lang = $langName;
                    $slotItem->save();
                }
                // retrieve the languages for each subsection
                $langs = DB::connection('current')
                            ->table('country_profile_sub_section')
                            ->where('position', $sub->position)
                            ->where('country_profile_section_id', $sub->country_profile_section_id)
                            ->get();
                
                // the attached items should be the same for all languages
                // but there will be multiple per language, so we index by part-order
                $attachments = [];
                foreach ($langs as $langSub) {
                    $langName = $langMap[$langSub->language_id];
                    $langName = $langName ? $langName : '*';    
                    // each sub is an attachment group in the slotted item
                    if ($profileSection->section_id == 18) {
                        // development cooperation project
                        $existingContent = $item
                                            ->contents()
                                            ->where('lang', $langName)
                                            ->first()
                                            ;
                        if ($existingContent) {
                            $item->content()->updateOrCreate(
                                ['lang' => $langName],
                                [
                                    'lang' => $langName,
                                    'slug' => Utils::makeSlug($langSub->title, '-'),
                                    'title' => Utils::checkTitle($langSub->title),
                                    'content' => $existingContent->content
                                                    .'<hr />'
                                                    .$langSub->description,
                                ]
                            );
                        } else {
                            $item->content()->updateOrCreate(
                                ['lang' => $langName],
                                [
                                    'lang' => $langName,
                                    'slug' => Utils::makeSlug($langSub->title, '-'),
                                    'title' => Utils::checkTitle($langSub->title),
                                    'content' => $langSub->description,
                                ]
                            );
                        }
                    } else {
                        // make attachment group
                        $group = AttachmentGroup::firstOrCreate(
                            ['item_id' => $item->id, 'order' => $langSub->position],
                            [
                                'item_id' => $item->id, 
                                'order' => $langSub->position,
                                'created_at' => $created_at,
                                'updated_at' => $updated_at
                            ]
                        );
                        $attachGroupContent = $group->contents()->updateOrCreate(
                            ['lang' => $langName],
                            ['title' => $langSub->title, 'lang' => $langName]
                        );
                        $blurb = '';
                        $desc = \App\Actions\CleanHtml::clean($langSub->description);
                        if (Str::contains($desc, '<a')) {
                            // at least one link
                            $desc = Str::of($desc);
                            $parts = $desc->replace('<div>','<p>')
                                        ->replace('&nbsp;','')
                                        ->replace('</div>','')
                                        ->replace('</p>','')
                                        ->split('/\<p\>/');
                            $order = 0;
                            foreach ($parts as $part) {
                                $m = [];
                                $r = preg_match('/(.*)<a.+href=["\'](\S+)["\'][^>]*>(.*)<\/a>(.*)/', $part, $m);
                                if ($r) {
                                    // part is a link
                                    $pre = $m[1];
                                    $url = $m[2];
                                    $label = trim(strip_tags($m[3]));
                                    $itemTitle = $label ? $label : '_';
                                    $post = $m[4];
                                    $attachment;
                                    if (isset($attachments[$order])) {
                                        $attachment = $attachments[$order];
                                    } else {
                                        $attachedItem = new Item;
                                        $attachedItem->type = 'resource';
                                        $attachedItem->subtype = 'link';
                                        $attachedItem->old_type = 'country_subsection';
                                        $attachedItem->old_id = $langSub->id.'_'.$order;
                                        $attachedItem->created_at = $created_at;
                                        $attachedItem->updated_at = $updated_at;
                                        $attachedItem->save();
                                        $attachment = new Attachment;
                                        $attachment->attachment_group_id = $group->id;
                                        $attachment->item_id = $attachedItem->id;
                                        $attachment->order = $order;
                                        $attachment->created_at = $created_at;
                                        $attachment->updated_at = $updated_at;
                                        $attachment->save();
                                        $attachments[$order] = $attachment;
                                    }
                                    $order++;
                                    // $resItem = new Item;
                                    // $resItem->type = 'resource';
                                    // $resItem->subtype = 'link';
                                    // $resItem->old_type = 'country_subsection';
                                    // $resItem->old_id = $sub->id.'_'.$order;
                                    // $resItem->save();
                                    $strippedPart = trim(strip_tags($part));
                                    if ($strippedPart == $label) {
                                        $strippedPart = null;
                                    }
                                    $attachment->item->contents()->updateOrCreate(
                                        ['lang' => $langName],
                                        [
                                            'lang' => $langName,
                                            'title' => $itemTitle,
                                            'slug' => Utils::makeSlug($itemTitle),
                                            'blurb' => $strippedPart
                                        ]
                                    )->links()->create([
                                        'url' => $url,
                                        // 'pretext' => $pre,
                                        // 'posttext' => $post,
                                        'order' => 0,
                                        'label' => $label,
                                    ]);
                                    // $attachment = new Attachment;
                                    // $attachment->attachment_group_id = $group->id;
                                    // $attachment->item_id = $resItem->id;
                                    // $attachment->order = $order++;
                                    // $attachment->save();
                                } else {
                                    if (trim(strip_tags($part))) {
                                        $blurb .= '<p>'.trim($part).'</p>';
                                    }
                                }
                            }
                            $attachGroupContent->blurb = $blurb;
                        } else {
                            $attachGroupContent->blurb = $desc;
                        }
                        $attachGroupContent->save();
                    }
                }
            }

            // foreach ($subs as $sub) {
            //     // these have to be transformed to attachments, for now we just put first subsection as content
            //     $slotId = $slots[$profileSection->section_id]->id;
            //     $item = isset($items[$slotId]) ? $items[$slotId] : null;
            //     if (!$item) {
            //         $item = new Item;
            //         $item->type = 'static';
            //         $item->old_type = 'country_profile_section';
            //         $item->old_id = $profileSection->id;
            //         $item->save();
            //         $items[$slotId] = $item;
            //         $slotItem = new CollectionSlotItem;
            //         $slotItem->slot_id = $slots[$profileSection->section_id]->id;
            //         $slotItem->item_id = $item->id;
            //         $slotItem->collection_id = $country->id;
            //         // $slotItem->lang = $langName;
            //         $slotItem->save();
            //     }
            //     $langName = $langMap[$sub->language_id];
            //     $langName = $langName ? $langName : '*';    
            //     $item->content()->updateOrCreate(
            //         ['lang' => $langName],
            //         [
            //             'lang' => $langName,
            //             'slug' => Utils::makeSlug($sub->title, '-'),
            //             'title' => Utils::checkTitle($sub->title),
            //             'content' => $sub->description,
            //         ]);
            // }
        }
        // delete from collection_slots where id not in (select distinct slot_id from collection_slot_items )
    }
}
