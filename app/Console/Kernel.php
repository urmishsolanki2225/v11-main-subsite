<?php

namespace App\Console;

use App\Actions\BatchResizeAllImages;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\MySqlDump::class,
        BatchResizeAllImages::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command("eiie:syncaffiliates")->dailyAt("2:22");
        $schedule->command("eiie:share:check_schedule")->everyMinute();
        $schedule
            ->command(
                "queue:work --memory=512M --timeout=1200 --stop-when-empty"
            )
            ->everyMinute()
            ->withoutOverlapping();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . "/Commands");

        require base_path("routes/console.php");
    }
}
