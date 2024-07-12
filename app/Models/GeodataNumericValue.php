<?php

namespace App\Models;

class GeodataNumericValue extends Model
{
    public $timestamps = false;
    protected $casts = ["value" => "float"];

    public function country()
    {
        return $this->belongsTo(Collection::class);
    }
}
