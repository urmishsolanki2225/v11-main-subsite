<?php

namespace App\Http\Controllers;

use App\Actions\FetchActivityReport;
use App\Models\Annualreport;
use App\Models\Collection;
use App\Models\Item;
use Illuminate\Http\Request;
use Storage;

class ActivityReportController extends Controller
{
    public function overview(Request $request)
    {
        $collection = Collection::find(
            config("eiie.collection.annual-reports")
        );

        $annualReports = Annualreport::with([
            "allImages" => fn($q) => $q->where("subtype", "image"),
        ])
            ->where("type", "summary")
            ->where("status", "published")
            ->orderBy("year", "DESC")
            ->get();

        $worldCongressReports = Item::with([
            "images",
            "images.content.images",
            "activityReportCongress",
        ])
            ->where("type", "activityreport_congress")
            ->get()
            ->sortByDesc("activityReportCongress.year_from");

        return view("reports.activity-reports-overview", [
            "collection" => $collection,
            "annualReports" => $annualReports,
            "worldCongressReports" => $worldCongressReports,
        ]);
    }

    public function annual(Request $request, string $lang, string $year)
    {
        if (!$year || !is_numeric($year)) {
            $year = date("Y");
        }
        $summary = Annualreport::with([
            "content",
            "allImages",
            "videoItem",
            "videoItem.content",
            "videoItem.content.videos",
        ])
            ->where("type", "summary")
            ->where("year", $year)
            ->where("status", "published")
            ->has("content")
            ->first();
        $report = FetchActivityReport::fetch($year);

        $pdfExists = Storage::disk("local")->exists(
            "annual-reports-pdf/Annual-Report-$year-$lang.pdf"
        );

        return view("reports.annual-report", [
            "title" => __("eiie.Annual report :year", ["year" => $year]),
            "summary" => $summary,
            "report" => $report,
            "pdfLink" => $pdfExists
                ? route("governance.reports.annual-report.download-pdf", [
                    "locale" => $lang,
                    "year" => $year,
                ])
                : null,
        ]);
    }

    public function highlight(Request $request, $locale, $year, $id, $slug)
    {
        $highlight = Annualreport::findOrFail($id);
        $highlight->loadMissing(["items" => fn($q) => $q->has("content")]);

        return view("reports.annual-report-highlight", [
            "highlight" => $highlight,
        ]);
    }

    public function worldCongress(
        Request $request,
        string $lang,
        string $yearFrom,
        string $yearTo
    ) {
        if (
            !$yearFrom ||
            !is_numeric($yearFrom) ||
            !$yearTo ||
            !is_numeric($yearTo)
        ) {
            abort(404);
        }

        $worldCongressReport = Item::where("type", "activityreport_congress")
            ->whereRelation("activityReportCongress", "year_from", $yearFrom)
            ->whereRelation("activityReportCongress", "year_to", $yearTo)
            ->first();
        if (!$worldCongressReport) {
            abort(404);
        }

        $summary = $worldCongressReport;

        $report = FetchActivityReport::fetch($yearFrom, $yearTo);
        return view("reports.annual-report", [
            "title" => $worldCongressReport->content->title ?? "",
            "summary" => $summary,
            "report" => $report,
            "pdfLink" => null,
            "showYears" => true,
            "yearFrom" => $yearFrom,
            "yearTo" => $yearTo,
        ]);
    }

    public function downloadPDF(string $lang, string $year)
    {
        return Storage::disk("local")->download(
            "annual-reports-pdf/Annual-Report-$year-$lang.pdf",
            __("eiie.Annual-Report-:year-:lang.pdf", [
                "year" => $year,
                "lang" => $lang,
            ])
        );
    }
}
