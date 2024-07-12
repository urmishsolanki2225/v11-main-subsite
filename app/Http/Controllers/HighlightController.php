<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Annualreport;
use App\Models\Item;
use App\Models\AnnualreportVideo;

class HighlightController extends Controller
{
    public function show(string $lang, $id)
    {
        $locale = ["*", $lang];
        $annualreport = Annualreport::with([
            "content" => function ($query) use ($locale) {
                $query->whereIn("lang", $locale);
            },
            "contents",
            "items.contents" => function ($query) use ($locale) {
                $query->whereIn("lang", $locale);
            },
            "items.images.content.images",
            "items.content.embeds",
            "items.content.videos",
            "items.content.files",
        ])->findOrFail($id);

        return view("annual-report-detail", [
            "annualreport" => $annualreport,
        ]);
    }
}
