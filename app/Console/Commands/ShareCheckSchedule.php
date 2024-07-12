<?php

namespace App\Console\Commands;

use App\Jobs\ShareScheduledContent;
use App\Models\SocialShareSchedule;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ShareCheckSchedule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "eiie:share:check_schedule";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Check the schedule and dispatches the jobs to run them";

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $scheduled = SocialShareSchedule::where("done", false)
            ->whereRaw("`share_at` <= NOW()")
            ->get();
        foreach ($scheduled as $schedule) {
            ShareScheduledContent::dispatchSync($schedule);
        }
        return 0;
    }
}
