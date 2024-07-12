<?php

namespace App\Models;

class Contact extends Model
{
    public $timestamps = false;
    
    public function content() {
        return $this->belongsTo(ItemContent::class);
    }

}
