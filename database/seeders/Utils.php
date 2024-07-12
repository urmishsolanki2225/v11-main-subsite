<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\ResourceImage;

class Utils {

    static function loadLangMap() {
        $languages = DB::connection('current')->table('languages')->get();
    	$langMap = [];
    	foreach ($languages as $lang) {
    		$langMap[$lang->id] = $lang->alias_name;
        }
        $langMap[3] = 'es';
        return $langMap;
    }

    static function checkDate($date, $fallback = '2021-01-01 12:00:00') {
        if (!$date) {
            return $fallback;
        }
        if (preg_match('/0000/', $date)) {
            return $fallback;
        }
        return $date;
    }

    static function checkTitle($title, $fallback = '-') {
        return $title ? $title : $fallback;
    }

    static function makeSlug($title, $fallback = '_') {
        return $title ? Str::slug($title) : $fallback;
    }

    static function writeConfigCollection($name, $id) {
        $name = str_replace('!', '', $name);
        $lcName = str_replace(' ', '-', strtolower($name));
        $ucName = str_replace('-', '_', strtoupper($lcName));
        file_put_contents(
            'config-eiie.php', 
            "        '$lcName' => env('EIIE_COLLECTION_$ucName', $id),\n", 
            FILE_APPEND
        );
        config(['eiie.collection.'.$lcName => $id]);
    }

    static function attachImage($item, $path, $type = false) {
        $imgResource = ResourceImage::where('path', $path)->first();
        if ($imgResource && $imgResource->content->item) {
            $item->images()->attach($imgResource->content->item, ['order' => 0]);
            return $imgResource->item;
        }
        $imgItem = $item->images()->create([
            'type' => 'resource',
            'subtype' => 'image'.($type ? ".$type" : ''),
        ], [            
            'order' => 0
        ]);
        $imgItem->contents()->create([
            'lang' => '*',
            'title' => $path,
            'slug' => Utils::makeSlug($path)
        ])->images()->create([
            'path' => $path,
        ]);
        return $imgItem;
    }

    const Lorem = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</p> <p>Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.</p>';

}