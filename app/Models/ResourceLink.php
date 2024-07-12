<?php

namespace App\Models;


class ResourceLink extends Model
{
    public $timestamps = false;
    
    public function content() {
        return $this->belongsTo(ItemContent::class);
    }

}
