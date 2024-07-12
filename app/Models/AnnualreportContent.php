<?php

namespace App\Models;

use App\Scopes\LanguageScope;

class AnnualreportContent extends Model
{
    protected $table = "annual_report_contents";

    protected static function booted()
    {
        if (request()->is("admin/*")) {
            return;
        }
        static::addGlobalScope(new LanguageScope());
    }

    public function annualreport()
    {
        return $this->belongsTo("App\Models\Annualreport");
    }
}
