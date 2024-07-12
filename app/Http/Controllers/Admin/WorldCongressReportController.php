<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class WorldCongressReportController extends Controller
{
    public function index(Request $request)
    {
        $items = QueryBuilder::for(Item::class)
            ->where("type", "activityreport_congress")
            ->with(["contents:id,item_id,title,lang", "activityReportCongress"])
            ->withoutGlobalScopes()
            ->paginate(16)
            ->appends(request()->query());

        return Inertia::render("Annualreport/WorldCongressReports", [
            "items" => $items,
        ]);
    }
}
