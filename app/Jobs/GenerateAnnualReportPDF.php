<?php

namespace App\Jobs;

use App\Models\Annualreport;
use App\Models\Item;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
// use JobStatus\Concerns\Trackable;
use romanzipp\QueueMonitor\Models\Monitor;
use romanzipp\QueueMonitor\Traits\IsMonitored; // <---

class GenerateAnnualReportPDF implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable,
        InteractsWithQueue,
        Queueable,
        SerializesModels,
        IsMonitored; // <---
    // Trackable;

    public $timeout = 600;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(public string $year, public string $lang)
    {
        //
    }

    public function uniqueId(): string
    {
        return $this->year . "-" . $this->lang;
    }

    public function tags(): array
    {
        return [
            "year" => $this->year,
            "lang" => $this->lang,
        ];
    }

    public function alias(): string
    {
        return "generate-annual-report-pdf";
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->queueProgress(0);
        $this->updateMonitorRecord();
        set_time_limit($this->timeout);
        App::setLocale($this->lang);
        Item::disableAuditing();

        $month_full_name = array_combine(
            range(1, 12),
            array_map(function ($month) {
                return date("F", mktime(0, 0, 0, $month, 1));
            }, range(1, 12))
        );

        $month_sort_name = array_combine(
            range(1, 12),
            array_map(function ($month) {
                return date("M", mktime(0, 0, 0, $month, 1));
            }, range(1, 12))
        );

        $annualreports = Annualreport::with([
            "content",
            "items",
            "items.content",
            "allImages",
        ])
            ->where("type", "highlight")
            ->where("status", "published")
            ->where("published_reports", "1")
            ->whereNull("deleted_at")
            ->has("content")
            ->where("year", $this->year)
            ->orderBy("order_index", "ASC")
            ->get();

        $summary_data = Annualreport::with(["content"])
            ->where("type", "summary")
            ->where("status", "published")
            ->where("year", $this->year)
            ->has("content")
            ->first();

        $items = Item::with(["images", "images.content.images", "content"])
            ->where("annual_headline", "1")
            ->whereYear("created_at", $this->year)
            ->has("content")
            ->get();

        $pdf = PDF::loadView("pdf.annual-report-pdf", [
            "year" => $this->year,
            "annualreports" => $annualreports,
            "items" => $items,
            "month_sort_name" => $month_sort_name,
            "month_full_name" => $month_full_name,
            "summary_data" => $summary_data,
        ]);

        $domPdf = $pdf->getDomPDF();
        $canvas = $domPdf->getCanvas();
        $width = $canvas->get_width();
        $height = $canvas->get_height();
        $this->queueProgress(30);
        $canvas->page_script(
            '
                if ($PAGE_NUM > 1) {
                    // Correctly set the image path for DOMPDF
                    $imagePath = "' .
                str_replace("\\", "/", public_path("images/eiie_icon_2.svg")) .
                '";
                    $this->image($imagePath, 10, 5, 40, 40);

                    // Define the footer content
                    $adjusted_page_num = $PAGE_NUM - 1;
                    $font = $fontMetrics->get_font("helvetica", "bold");
                    $this->text(' .
                ($width - 80) .
                ", " .
                ($height - 20) .
                ', "' .
                __("eiie.Page") .
                ' " . $adjusted_page_num . " of " . ($PAGE_COUNT-1), $font, 10, array(255, 255, 255));
                }
            '
        );
        $this->queueProgress(50);
        Storage::disk("local")->put(
            "annual-reports-pdf/Annual-Report-$this->year-$this->lang.pdf",
            $pdf->output()
        );
        $this->queueProgress(100);
        
    }
    protected function updateMonitorRecord(): void
    {
        // Get the monitor record for this job
        $monitor = Monitor::where("job_id", $this->job->getJobId())->first();

        if ($monitor) {
            $monitor->update([
                "year" => $this->year,
                "lang" => $this->lang,
            ]);
        }
    }
}
