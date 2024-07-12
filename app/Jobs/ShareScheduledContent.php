<?php

namespace App\Jobs;

use App\Console\Commands\LinkedinShare;
use App\Models\CollectionContent;
use App\Models\SocialShareSchedule;
use App\View\Components\Figure;
use App\View\Components\Link;
use App\View\Components\RenderContent;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ShareScheduledContent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var SocialShareSchedule
     */
    public $socialShareSchedule;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(SocialShareSchedule $socialShareSchedule)
    {
        $this->socialShareSchedule = $socialShareSchedule;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->socialShareSchedule->done) {
            Log::info(
                "Skipping social share because it is already done, id #" .
                    $this->socialShareSchedule->id
            );
            return;
        }
        $content = $this->socialShareSchedule
            ->content()
            ->withoutGlobalScopes()
            ->first();

        \App::setLocale($content->lang);

        // re-use the Link component to generate the url
        // ToDo refactor that component into a service + component
        $linkComponent =
            $content instanceof CollectionContent
                ? new Link(null, $content->collection)
                : new Link($content->item);
        $url = $linkComponent->href;

        $parent =
            $content instanceof CollectionContent
                ? $content->collection
                : $content->item;
        $figure = new Figure($parent);

        $renderContent = new RenderContent($content, "text", null, null, true);
        $blurb = $renderContent->output;

        $postData = [
            "title" => $content->title,
            "subtitle" => $content->subtitle,
            "url" => $url,
            "image_url" => $figure->url,
            "blurb" => $blurb,
            "image_path" => $figure->path,
        ];
        try {
            if ($this->socialShareSchedule->platform === "twitter") {
                $url = twitterShare($postData);
            } elseif ($this->socialShareSchedule->platform === "facebook") {
                $url = fbShare($postData);
            } elseif ($this->socialShareSchedule->platform === "linkedin") {
                $url = linkedinShare($postData);
            }
            $this->socialShareSchedule->url = $url;
        } catch (Exception $ex) {
            $this->socialShareSchedule->error = $ex->getMessage();
            Log::alert(
                "Social Sharing error to {$this->socialShareSchedule->platform} #{$this->socialShareSchedule->id} with message: " .
                    $ex->getMessage()
            );
        }
        $this->socialShareSchedule->done = true;
        $this->socialShareSchedule->save();
    }
}
