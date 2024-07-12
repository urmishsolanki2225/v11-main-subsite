<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;
use App\Models\CollectionContent;
use App\Models\Item;
use App\Models\DCProject;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\Actions\CleanHtml;

class DCProjectsImport extends Seeder
{
    /**
     * Run the database seeds.
     * Resource to Item
     *
     * @return void
     */
    public function run()
    {
        $this->makeMapping();
        $file = file_get_contents('dcprojects.csv');
        $lines = explode("\r\n", $file);

        if (count($lines) > 200) {
            echo "About to import ".count($lines)." lines, probably an error, check line endings\n";
            return;
        }
        $count = 0;
        for ($i = 1; $i < count($lines); ++$i) {
            $csv = str_getcsv($lines[$i], ';', '');
            if (count($csv) < 3) {
                continue;
            }
            $item = Item::create([
                'type' => 'dcproject',
                'created_at' => Carbon::parse(trim($csv[13])),
                'updated_at' => Carbon::parse(trim($csv[13])),
            ]);
            $content = $item->contents()->create([
                'lang' => '*',
                'title' => trim($csv[8]),
                'slug' => Utils::makeSlug(trim($csv[8]))
            ]);
            $dcproject = $content->dcproject()->create([
                'contact_person_name' => trim($csv[7]),
                'started_at' => Carbon::parse(trim($csv[13])),
                'ended_at' => Carbon::parse(trim($csv[14])),
                'description' => $this->makeText(trim($csv[15])),
                'goals' => $this->makeText(trim($csv[16])),
                'activity_type' => $this->makeText(trim($csv[17])),
                'results' => $this->makeText(trim($csv[18])),
                'funding' => trim($csv[19]),
                'budget' => trim($csv[20]),
                'url' => trim($csv[21]),
                // fallback because broken data
                'host_orgs_str' => trim($csv[11]),
                'coop_orgs_str' => trim($csv[10]),
                'countries_str' => trim($csv[9]),
                'topics_str' => trim($csv[12]),
            ]);
            echo "\nContextualizing $item->id:$content->title \n";
            $hosts = preg_split('#\s*[\(\),;\-\:]\s*#', trim($csv[11]));
            $this->attachAffiliates($dcproject, $hosts, 'host');
            $coops = preg_split('#\s*[\(\),;\-\:]\s*#', trim($csv[10]));
            $this->attachAffiliates($dcproject, $coops, 'cooperating');

            // $countries = preg_split('/\s*[,;-]\s*/', trim($csv[5]));
            // $this->attachCollections($item, $countries);
            $countries = preg_split('/\s*[,;\-:]\s*/', trim($csv[9]));
            $this->attachCollections($item, $countries);
            // $topics = preg_split('/\s*[,;\-:]\s*/', trim($csv[12]));
            // $this->attachCollections($item, $topics);
        }
    }

    protected function attachAffiliates($dcproject, $orgs, $role) {
        foreach ($orgs as $org) {
            $org = trim($org);
            if (!$org) {
                continue;
            }
            $affiliate = \App\Models\Affiliate::where('official_name', 'like', $org)
                            ->orWhere('acronym', 'like', $org)
                            ->first()
                            ;
            if (!$affiliate) {
                echo "$org not found for org\n";
                continue;
            }
            $item = $affiliate->item;
            $dcproject->organisations()->attach($item, ['role' => $role]);
        }
    }

    protected function attachCollections($item, $searches, $types = []) {
        foreach ($searches as $search) {
            $this->attachCollection($item, $search, $types);
        }
    }

    protected function attachCollection($item, $search, $types = [], $order = 0) {
        if (!trim($search)) {
            return;
        }
        $search = trim($search);
        $contents = CollectionContent::withoutGlobalScopes()
                        ->where('title', 'like', $search)
                        // ->whereIn('type', $types)
                        ->get();
                        ;
        if (!$contents || !count($contents)) {
            echo "$search not found\n";
            return 0;
        }
        $collIds = $contents->pluck('collection_id');
        $item->collections()->syncWithoutDetaching($collIds);
        $mapped = [];
        foreach ($collIds as $collId) {
            if (isset($this->mapping[$collId])) {
                $mapped[] = $this->mapping[$collId];
            }
        }
        if (count($mapped)) {
            $item->collections()->syncWithoutDetaching($mapped);
        }
    }

    protected function makeMapping() {
        $this->mapping = [];

        $workAreaThemeMapping = [
            'Achieving Sustainable Development Goal 4' => [35, 5, 24, 4, 29, 8, 30, 26, 28, 19],
            'Fighting the commercialisation of education' => [46, 45, 31, 54, 59, 6],
            'Climate action and literacy' => [23],
            'Standards and working conditions' => [57, 39, 14, 18, 25],
            'Leading the profession' => [37, 41, 12, 13],
            'Future of work in education' => [47, 53, 49, 38, 60],
            'Trade union rights are human rights' => [56, 16, 9, 10, 58],
            'Equity and inclusion' => [2, 34, 7, 11, 21, 22, 15, 33],
            'Democracy' => [55],
            // 'Growth' => [1, 32, 42, 20],
            'Union growth, renewal and development' => [3, 17, 1, 32, 42, 20],
            'Young members' => [27]
        ];

        // keys = strategic directions
        // values = id's pointing to old_id in new Collection with old_type tag
        $workAreaTagMapping = [
            'Climate action and literacy' => [531, 532],
            'Fighting the commercialisation of education' => [400, 393, 773],
            'Democracy' => [118],
            'Equity and inclusion' => [442, 599, 847],
            'Future of work in education' => [512, 124],
            // 'Growth' => [534],
            'Trade union rights are human rights' => [11, 4],
            'Leading the profession' => [841],
            'Achieving Sustainable Development Goal 4' => [52, 323, 468, 316],
            'Standards and working conditions' => [483],
            'Union growth, renewal and development' => [480, 704, 534],
            'Young members' => []
        ];

        foreach ($workAreaThemeMapping as $workarea => $oldIds) {
            $waColl = CollectionContent::where('title', 'like', $workarea)->first();
            if (!$waColl) {
                echo $workarea;
                die();
            }
            $waCollId = $waColl->collection_id;
            $colls = Collection::where('old_type', 'theme')
                            ->whereIn('old_id', $oldIds)
                            ->get()
                            ;
            foreach ($colls as $coll) {
                $this->mapping[$coll->id] = $waCollId;
            }
        }
        foreach ($workAreaTagMapping as $workarea => $oldIds) {
            $waColl = CollectionContent::where('title', 'like', $workarea)->first();
            if (!$waColl) {
                echo $workarea;
                die();
            }
            $waCollId = $waColl->collection_id;
            $colls = Collection::where('old_type', 'tag')
                            ->whereIn('old_id', $oldIds)
                            ->get()
                            ;
            foreach ($colls as $coll) {
                $this->mapping[$coll->id] = $waCollId;
            }
        }
    }

    protected function makeText($str) {
        $text = Str::of($str);
        if ($text->contains('•') 
                || $text->contains("\n-")
                || $text->contains("\n*")) {
            $text = $text->replace('•', '<li>')
                        ->replace('\n-', '<li>')
                        ->replace('\n*', '<li>')
                        ->replaceFirst('<li>', '<ul><li>')
                        ;
        }
        if ($text->contains("\nb)")) {
            $text = $text->replaceMatches('#\n\w\)#', '<li>')
                        ->replaceFirst('<li>', '<ol><li>')
                        ;
        }
        if ($text->contains("\n2.")) {
            $text = $text->replaceMatches('#\n\d\.#', '<li>')
                        ->replaceFirst('<li>', '<ol><li>')
                        ;
        }
        $str = CleanHtml::clean($text);
        return $str;
    }
}
