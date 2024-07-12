<?php

namespace App\Models;


class ResourceFile extends Model
{
    public $timestamps = false;
    
    public function content() {
        return $this->belongsTo(ItemContent::class);
    }

}
