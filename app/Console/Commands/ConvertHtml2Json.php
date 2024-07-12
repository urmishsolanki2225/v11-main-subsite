<?php

namespace App\Console\Commands;

use App\Models\ItemContent;
use App\Models\CollectionContent;
use App\Actions\CleanHtml;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ConvertHtml2Json extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'eiie:convertcontent';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Converts html content to json objects';

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
        $start = time();
        $this->line('start ' . time());

        $this->line('ItemContent.content');
        $this->processContents(
            ItemContent::withoutGlobalScopes()
                ->whereNotNull('content')
                ->where('content', '!=', '')
                // ->where(fn($q) => 
                //     $q->whereNull('content_json')
                //         ->orWhere('content_json', '[]')
                // )
                ,
            function($content) {
                $this->processContent($content);
            }
        );

        $this->line('ItemContent.blurb');
        $this->processContents(
            ItemContent::withoutGlobalScopes()
                ->whereNotNull('blurb')
                ->where('blurb', '!=', '')
                // ->where(fn($q) => 
                //     $q->whereNull('blurb_json')
                //         ->orWhere('blurb_json', '[]')
                //         // ->orWhere('item_id', 23641)
                // )
                ,
            function($content) {
                $this->processBlurb($content);
            }
        );
        $this->line('CollectionContent.blurb');
        $this->processContents(
            CollectionContent::withoutGlobalScopes()
                ->whereNotNull('blurb')
                ->where('blurb', '!=', '')
                // ->where(fn($q) => 
                //     $q->whereNull('blurb_json')
                //         ->orWhere('blurb_json', '[]')
                // )
                ,
            function($content) {
                $this->processBlurb($content);
            }
        );
        $this->line('end '. time() - $start);
        return 0;
    }

    private function processContents($contents, $processFn) {
        $count = $contents->count();
        $bar = $this->output->createProgressBar($count);
        $this->line('Going to do '.$count.' runs');
        $bar->start();
        $contents->chunk(100, function($contents) use ($processFn, $bar) {
            foreach ($contents as $content) {
                $processFn($content);
                $bar->advance();
            }
            return true;
        });
        $bar->finish();
        $bar->clear();
    }

    private function processContent($content) {
        try {
            if ($content->content) {
                $content->timestamps = false;
                $resp = Http::withBody(CleanHtml::clean($content->content)->__toString(), 'text/plain')
                    ->post('http://127.0.0.1:8200/');
                $content->content_json = $resp->body() ?? null;
                $content->saveQuietly();
            }
        } catch (\Exception $ex) {
            $this->line("Error in content #$content->id", 'fg=red');
            echo $this->cnt++;
        }
    }
    private function processBlurb($content) {
        try {
            if ($content->blurb) {
                $content->timestamps = false;
                $resp = Http::withBody(CleanHtml::clean($content->blurb)->__toString(), 'text/plain')
                    ->post('http://localhost:8200/');
                $content->blurb_json = $resp->body() ?? null;
                $content->saveQuietly();
                $resp->close();
            }
        } catch (\Exception $ex) {
            $this->line("Error in content #$content->id", 'fg=red');
        }
    }
}
