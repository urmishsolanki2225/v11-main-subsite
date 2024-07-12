<?php

namespace App\Models;

use OwenIt\Auditing\Contracts\Auditable;

class GeodataSet extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    public function columns()
    {
        return $this->hasMany(GeodataColumn::class, "set_id");
    }
}
