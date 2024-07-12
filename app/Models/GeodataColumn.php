<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;

class GeodataColumn extends Model
{
    public $timestamps = false;
    protected $appends = ["label"];

    protected function label(): Attribute
    {
        return Attribute::make(
            get: function () {
                $locale = \App::getLocale() ?? "en";
                $lbl = $this->labels()
                    ->whereIn("lang", [$locale, "*"])
                    ->orderBy("lang", "desc")
                    ->first();
                if ($lbl) {
                    return $lbl->label;
                } else {
                    return "";
                }
            }
        );
    }

    public function labels()
    {
        return $this->hasMany(GeodataColumnLabel::class, "column_id");
    }

    public function values()
    {
        if ($this->data_type === "string") {
            return $this->hasMany(GeodataStringValue::class, "column_id");
        } else {
            return $this->hasMany(GeodataNumericValue::class, "column_id");
        }
    }
}
