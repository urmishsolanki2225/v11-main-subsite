<?php

namespace App\Models;


class Affiliate extends Model
{
    //
    function item() {
        return $this->belongsTo('App\Models\Item');
    }
}
