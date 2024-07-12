<?php 

namespace App\Actions;

use App\Models\Item;
use Illuminate\Support\Str;

class UpdateItemContents {
    
    public function execute(Item $item, array $contents) {
        if (!isset($contents)) {
            return;
        }

        // delete the ones which are not in contents
        $ids = $item->contents()->pluck('id');
        $reqIds = \Arr::pluck($contents, 'id');
        $item->contents()->delete($ids->diff($reqIds));

        foreach ($contents as $_reqContent) {
            $reqContent = collect($_reqContent);
            $lang = $reqContent->get('lang');
            if (!$lang) {
                $lang = '*';
            }
            $create = $reqContent->only([
                'lang', 'title', 'slug', 'subtitle', 'blurb', 'content', 'footnotes', 'meta'
            ])->all();
            if (!isset($create['slug'])) {
                $create['slug'] = Str::slug($create['title'] ? $create['title'] : '-');
            }
            $content = $item->contents()->updateOrCreate([
                'lang' => $reqContent->get('lang')
            ], $create);
        }

        // resources 

    }

}