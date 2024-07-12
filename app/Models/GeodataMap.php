<?php

namespace App\Models;

use OwenIt\Auditing\Contracts\Auditable;

class GeodataMap extends Model
{
    protected $casts = ["config" => "array"];

    public function dataset()
    {
        return $this->belongsTo(GeodataSet::class);
    }
}
