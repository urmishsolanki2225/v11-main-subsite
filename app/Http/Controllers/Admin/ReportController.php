<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Support\Str;
use App\View\Components\RenderContent;
use Inertia\Inertia;
use App\Models\{Item, Annualreport, AnnualreportVideo};
use Illuminate\Support\Facades\Redirect;
use App\Actions\Patch;
use Illuminate\Support\Facades\Storage;
use App\Filters\SearchTitleFilter;
use App\Jobs\GenerateAnnualReportPDF;
use App\Sorts\ItemContentTitleSort;
use Spatie\QueryBuilder\AllowedSort;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\App;
// use JobStatus\Models\JobStatus;
use App\Sorts\DateSort;
use Spatie\QueryBuilder\Enums\SortDirection;
use romanzipp\QueueMonitor\Models\Monitor;

class ReportController extends Controller
{
    public function index($tabid, Request $request)
    {
        $year = $request->filled("year") ? $request->year : date("Y");

        $month = $request->input("month");
        //Highlight
        $highlight = Annualreport::with("content")
            ->where("type", "highlight")
            ->where("year", $year);
        $main_published_date = Annualreport::select()
            ->where("type", "highlight")
            ->where("year", $year)
            ->first();

        $status = 0;
        if ($request->filled("trashed")) {
            if ($request->input("trashed") == "only") {
                $highlight->onlyTrashed();
                $status = 1;
            }
        }
        $annualreport = $highlight->get();

        //Summary
        $isInertia = $request->input("_format") != "json";
        $query = QueryBuilder::for(Annualreport::class)
            ->with(["contents:id,annualreport_id,title,lang,content"])
            ->where("type", "summary")
            ->where("year", "=", $year)
            ->withoutGlobalScopes();

        $summary = $query->jsonPaginate();

        $dateSort = AllowedSort::custom(
            "publish_at",
            new DateSort(),
            "publish_at"
        )->defaultDirection(SortDirection::ASCENDING);

        //Headlines(Typs of Items)
        $items = QueryBuilder::for(Item::class)
            ->where("status", "published")
            ->where(
                fn($q) => $q
                    ->whereIn("type", ["library", "article"])
                    ->orWhere("subtype", "file")
            )
            ->withoutTrashed()
            ->when(
                $year,
                fn($query) => $query->whereRaw(
                    "YEAR(COALESCE(publish_at, created_at)) = ?",
                    [$year]
                )
            )
            ->when(
                $request->has("month"),
                fn($query) => $query->whereRaw(
                    "MONTH(COALESCE(publish_at, created_at)) = ?",
                    [$request->input("month")]
                )
            )
            ->allowedFilters([
                AllowedFilter::exact("type"),
                AllowedFilter::custom("search", new SearchTitleFilter()),
            ])
            ->allowedSorts([
                "id",
                "created_at",
                "updated_at",
                "type",
                AllowedSort::custom(
                    "title",
                    new ItemContentTitleSort(),
                    "title"
                ),
                $dateSort,
            ])
            ->defaultSort($dateSort, "id")
            ->with(["contents:id,item_id,title,lang"])
            ->withoutGlobalScopes();

        if ($isInertia) {
            $items = $items->paginate(16)->appends(request()->query());
        } else {
            $items = $items->jsonPaginate()->appends(request()->query());
        }

        $summary_video = AnnualreportVideo::where("year", $year)->get();
        $videos = ["youtube", "vimeo"];

        // pdf jobs
        $pdfStatus = [];
        foreach (config("app.locales") as $lang => $label) {
            // $busy = JobStatus::whereAlias("generate-annual-report-pdf")
            //     ->whereTags(["year" => $year, "lang" => $lang])
            //     ->whereNotFinished()
            //     ->exists();
            $running = "0";
            $busy = Monitor::where("year", $year)
                ->where("lang", $lang)
                ->where("status", $running)
                ->exists();
            $exists = Storage::disk("local")->exists(
                "annual-reports-pdf/Annual-Report-$year-$lang.pdf"
            );
            $link = $exists
                ? route("governance.reports.annual-report.download-pdf", [
                    "locale" => $lang,
                    "year" => $year,
                ])
                : null;
            $pdfStatus[$lang] = [
                "exists" => $exists,
                "busy" => $busy,
                "link" => $link,
            ];
        }

        $result = [
            "main_published_date" => $main_published_date,
            "summary_video" => $summary_video,
            "videos" => $videos,
            "tabid" => $tabid,
            "annualreport" => $annualreport,
            "month" => $month,
            "year" => $year,
            "status" => $status,
            "pdf_status" => $pdfStatus,
            "summary" => $summary,
            "items" => $items,
            "filter" => $request->all("filter"),
            "sort" => $request->get("sort"),
        ];
        return Inertia::render("Annualreport/List", $result);
    }

    public function create(Request $request)
    {
        if ($request->user()->cannot("create", Annualreport::class)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        $result = [
            "month" => $request->month,
            "year" => $request->year,
            "types" => [
                "highlight" => "Highlight",
                "summary" => "Summary",
            ],
            "selectedTypes" => $request->type,
        ];
        return Inertia::render("Annualreport/Create", $result);
    }
    public function store(Request $request)
    {
        if ($request->user()->cannot("create", Annualreport::class)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }
        $request->validate([
            "type" => "required",
            "selectedYear" => "integer",
        ]);

        if ($request->type == "summary") {
            $annualreport = Annualreport::where("type", "summary")
                ->where("year", $request->selectedYear)
                ->get();
            if (!$annualreport->isEmpty()) {
                return Redirect::route("admin.annualreports.tabbing", [
                    "id" => 3,
                    "year" => $request->selectedYear,
                ])->with(["info" => "Summary already generated"]);
            } else {
                $create = $request->only(["type"]);
                $create["status"] = "draft";
                $create["year"] = $request->selectedYear;
                $summary = Annualreport::create($create);
                $languages = ["en"];
                foreach ($languages as $lang) {
                    $summary->contents()->create(["lang" => $lang]);
                }
                $contentId = $summary->contents->first()->id;

                return Redirect::route(
                    "admin.annualreport.edit",
                    $summary
                )->with([
                    "info" => "Summary Generated successfully",
                ]);
                /*
                }
                */
            }
        }

        $create = $request->only(["type"]);
        $create["month"] = $request->selectedMonth;
        $create["year"] = $request->selectedYear;
        $create["status"] = "draft";

        $Annualreport = Annualreport::create($create);
        $languages = $request->input("languages");
        foreach ($languages as $lang) {
            $Annualreport->contents()->create(["lang" => $lang]);
        }
        $msg = "";
        if ($request->only(["type"]) == "highlight") {
            $msg = "Highlight created";
        }
        return Redirect::route("admin.annualreport.edit", $Annualreport)->with([
            "info" => $msg,
        ]);
    }

    public function edit($id, Request $request)
    {
        $annualreport = Annualreport::withoutGlobalScopes()->findOrFail($id);
        if ($request->user()->cannot("update", $annualreport)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }
        $annualreport = Annualreport::where("id", $id)
            ->with([
                "contents",
                "allImages",
                "allImages.contents",
                "allImages.contents.images",
                // "contents.images",
                "items.contents",
                "items.images.content.images",
                "videoItem",
                "videoItem.contents",
                "videoItem.contents.videos",
            ])
            ->without(["contents.updated_at", "contents.created_at"])
            ->withoutGlobalScopes()
            ->first();

        $data = [
            "annualreport" => $annualreport,
            "id" => $id,
        ];
        return Inertia::render("Annualreport/Edit", $data);
    }
    public function update(Request $request, Patch $patchAction, $id)
    {
        $annualreport = Annualreport::withoutGlobalScopes()->findOrFail($id);

        if ($request->user()->cannot("update", $annualreport)) {
            return Redirect::back()->withErrors(["error" => "Not authorized"]);
        }

        if ($annualreport->type === "summary") {
            if (isset($request->year[1])) {
                $annualreports = Annualreport::where("type", "summary")
                    ->where("year", $request->year[1])
                    ->get();
                if (!$annualreports->isEmpty()) {
                    return Redirect::route(
                        "admin.annualreport.edit",
                        $id
                    )->with([
                        "info" => "Summary already generated for selected year",
                    ]);
                }
            }
        }

        $patchAction->execute($annualreport, $request->all());
        $annualreport->refresh();

        foreach ($annualreport->contents as $content) {
            $content->slug = Str::slug($content->title ? $content->title : "-");
            $renderBlurb = new RenderContent(
                $content,
                "html",
                null,
                null,
                true
            );
            $renderContent = new RenderContent(
                $content,
                "html",
                null,
                null,
                false,
                true
            );
            $content->blurb = $renderBlurb->output;
            $content->content = $renderContent->output;
        }
        $annualreport->push();

        if ($annualreport->type === "highlight") {
            $msg = "Highlight updated";
        } else {
            $msg = "Summary updated";
        }
        return Redirect::route("admin.annualreport.edit", $annualreport)->with([
            "info" => $msg,
        ]);
    }

    public function destroy($id, $code)
    {
        $annualreport = Annualreport::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("forceDelete", $annualreport);
        $annualreport->forceDelete();
        if ($code == "0") {
            return Redirect::route("admin.annualreports.tabbing", [
                "id" => 1,
                "year" => $annualreport->selectedYear,
            ])->with(["info" => "Highlight has been permanently deleted"]);
        } else {
            $info = "Highlight has been permanently deleted";
            return redirect()
                ->back()
                ->with(["info" => $info]);
        }
    }

    public function trash($id)
    {
        $annualreport = Annualreport::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("delete", $annualreport);
        $annualreport->delete();
        return redirect()
            ->back()
            ->with(["info" => "Highlight has been moved to trash"]);
    }
    public function restore($id)
    {
        $annualreport = Annualreport::withoutGlobalScopes()
            ->withTrashed()
            ->findOrFail($id);
        $this->authorize("restore", $annualreport);
        $annualreport->restore();
        return redirect()
            ->back()
            ->with(["info" => "Highlight restored"]);
    }

    public function updateOrder(Request $request)
    {
        foreach ($request->orderUpdates as $update) {
            Annualreport::where("id", $update["id"])
                ->where("month", $update["month"])
                ->update(["order_index" => $update["orderIndex"]]);
        }

        return response()->json("Order updated successfully");
    }

    public function hideItem($id, Request $request)
    {
        $item = Item::findOrFail($id);
        if ($item->annual_headline == "1") {
            Item::where("id", $item->id)->update(["annual_headline" => "0"]);
            $status = "Item successfully hidden from the frontend";
        } else {
            Item::where("id", $item->id)->update(["annual_headline" => "1"]);
            $status = "Item Displayed Successfully on the frontend";
        }
        return Redirect::back()->with(["info" => $status]);
    }

    public function publishedreport(Request $request)
    {
        $affectedRows = Annualreport::where("type", "highlight")
            ->where("year", $request->year)
            ->where("status", "published")
            ->update([
                "published_reports" => "1",
                "main_publish_at" => Carbon::now(),
            ]);

        if ($affectedRows > 0) {
            $info = "Annual reports of the " . $request->year . " Published.";
        } else {
            $info =
                "No annual reports found for the year " . $request->year . ".";
        }

        return Redirect::back()->with(["info" => $info]);
    }

    public function savevideos(Request $request)
    {
        $request->validate([
            "year" => "required",
        ]);

        AnnualreportVideo::updateOrCreate(
            ["year" => $request->year],
            [
                "provider" => $request->provider,
                "provider_id" => $request->provider_id,
            ]
        );
        $info = "Video saved successfully";
        return Redirect::back()->with(["info" => $info]);
    }

    public function removevideos(Request $request)
    {
        $video = AnnualreportVideo::where("year", $request->year)->first();
        if ($video) {
            $video->delete();
        }
        $info = "Video has been removed successfully";
        return Redirect::back()->with(["info" => $info]);
    }

    public function generatePDF(Request $request)
    {
        $request->validate(["year" => "required"]);

        foreach (config("app.locales") as $lang => $label) {
            GenerateAnnualReportPDF::dispatch($request->year, $lang);
        }
    }

    public function printreport(Request $request)
    {
        set_time_limit(600);
        Item::disableAuditing();
        $langauge = ["en"];
        foreach ($langauge as $lang) {
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

            if ($request->year) {
                $year = $request->year;
            } else {
                $year = 2023;
            }

            $locale = ["*", $lang];
            $annualreports = Annualreport::with([
                "content" => function ($query) use ($locale) {
                    $query->whereIn("lang", $locale);
                },
                "items.content" => function ($query) use ($lang) {
                    $query->where("lang", $lang);
                },
                "contents" => function ($query) use ($lang) {
                    $query->where("lang", $lang);
                },
                "allImages",
            ])
                ->where("type", "highlight")
                ->where("status", "published")
                ->where("published_reports", "1")
                ->whereNull("deleted_at")
                ->where("year", $year)
                ->orderBy("order_index", "ASC")
                ->get();

            $summary_data = Annualreport::with([
                "contents",
                "contents" => function ($query) use ($locale) {
                    $query->whereIn("lang", $locale);
                },
            ])
                ->whereHas("contents", function ($query) use ($locale) {
                    $query->whereIn("lang", $locale);
                })
                ->where("type", "summary")
                ->where("status", "published")
                ->where("year", $year)
                ->first();

            $items = Item::with([
                "images",
                "images.content.images",
                "content" => function ($query) use ($lang) {
                    $query->where("lang", $lang);
                },
            ])
                ->whereHas("content", function ($query) use ($lang) {
                    $query->where("lang", $lang);
                })
                ->where("annual_headline", "1")
                ->where(function ($query) {
                    $query
                        ->where("type", "article")
                        ->orWhere("type", "library")
                        ->orWhere("subtype", "file");
                })
                ->whereYear("created_at", $year)
                ->get();

            App::setLocale($lang);

            $pdf = PDF::loadView("pdf.annual-report-pdf", [
                "year" => $year,
                "annualreports" => $annualreports,
                "items" => $items,
                "month_sort_name" => $month_sort_name,
                "month_full_name" => $month_full_name,
                "summary_data" => $summary_data,
            ]);

            // $pdf->output();
            $domPdf = $pdf->getDomPDF();
            $canvas = $domPdf->get_canvas();
            $width = $canvas->get_width();
            $height = $canvas->get_height();

            // $canvas->page_script(
            //     '
            //     if ($PAGE_NUM > 1) {
            //         // Correctly set the image path for DOMPDF
            //         $imagePath = "' .
            //         str_replace(
            //             "\\",
            //             "/",
            //             public_path("images/eiie_icon_2.svg")
            //         ) .
            //         '";
            //         $this->image($imagePath, 10, 5, 40, 40);

            //         // Define the footer content
            //         $adjusted_page_num = $PAGE_NUM - 1;
            //         $font = $fontMetrics->get_font("helvetica", "bold");
            //         $this->text(' .
            //         ($width - 80) .
            //         ", " .
            //         ($height - 20) .
            //         ', "' .
            //         __("eiie.Page") .
            //         ' " . $adjusted_page_num . " of " . ($PAGE_COUNT-1), $font, 10, array(255, 255, 255));
            //     }
            // '
            // );
            Storage::disk("local")->put(
                "annual-reports-pdf/Annual-Report-$year-$lang.pdf",
                $pdf->output(["compress" => 0])
            );
        }
        return Redirect::route("admin.annualreports.tabbing", [
            "id" => "1",
            "year" => $year,
        ])->with(["info" => "PDF generated Successfully."]);
    }
}
