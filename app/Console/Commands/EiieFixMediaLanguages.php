<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

use App\Models\Item;
use App\Models\ItemContent;

class EiieFixMediaLanguages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'eiie:medialang';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix media languages';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Should not be used anymore after first go');
        return;
        $langMap = \Database\Seeders\Utils::loadLangMap();
        
        DB::connection('current')
            ->table('post_media')
            ->select('media_id')
            ->distinct()
            ->groupBy('media_id')
            ->havingRaw('COUNT(*) = 1')
            ->orderBy('media_id')
            ->lazy()->each(function ($media) use ($langMap) {
                $oldMedia = DB::connection('current')
                    ->table('post_media')
                    ->where('media_id', $media->media_id)
                    ->first()
                    ;
                $lang = $langMap[$oldMedia->language_id];
                $oldMediaId = $oldMedia->media_id;
                $mediaItem = Item::where('old_id', $oldMediaId)
                    ->where('old_type', 'media')
                    ->withCount([
                        'contents'
                    ])
                    ->first()
                    ;
                if ($mediaItem && $mediaItem->contents_count == 1) {
                    $content = $mediaItem->contents[0];
                    if ($content->lang != $lang) {
                        $content->lang = $lang;
                        $content->timestamps = false;
                        echo "$mediaItem->id $content->lang $lang \n";
                        $content->save();
                    }
                }
            })
            ;
            			
        return 0;
    }
}
