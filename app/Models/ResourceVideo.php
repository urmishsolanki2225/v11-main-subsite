<?php

namespace App\Models;


class ResourceVideo extends Model
{
    public $timestamps = false;
    
    public function content() {
        return $this->belongsTo(ItemContent::class);
    }

}
