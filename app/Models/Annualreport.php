<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Annualreport extends Model implements \OwenIt\Auditing\Contracts\Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;
    use SoftDeletes;
    protected $table = "annual_reports";
    protected $fillable = [
        "type",
        "year",
        "month",
        "status",
        "published_reports",
        "main_publish_at",
    ];

    protected $dates = ["publish_at", "deleted_at", "main_publish_at"];
    public $timestamps = true;

    public function getPublishAtAttribute($date)
    {
        if ($date) {
            return new Carbon($date);
        } else {
            return $this->created_at;
        }
    }

    public function content()
    {
        return $this->hasOne("App\Models\AnnualreportContent");
    }

    public function contents()
    {
        return $this->hasMany("App\Models\AnnualreportContent")
            ->withoutGlobalScopes()
            ->orderBy("lang");
    }

    public function items()
    {
        return $this->belongsToMany("App\Models\Item", "annual_report_item")
            ->withPivot("order")
            ->orderBy("pivot_order");
    }

    public function images()
    {
        return $this->belongsToMany(
            "App\Models\Annualreport",
            "annualreport_imageitems"
        );
    }

    public function allImages()
    {
        return $this->belongsToMany(
            "App\Models\Item",
            "annual_report_imageitems",
            "annual_report_id",
            "imageitem_id"
        );
    }

    public function videoItem()
    {
        return $this->belongsTo(Item::class, "video_item_id");
    }
}
