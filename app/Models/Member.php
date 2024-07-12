<?php

namespace App\Models;


class Member extends Model
{
    //
	protected $primaryKey = 'ID';
	
    public $timestamps = false;    
    protected $table = 'members';    
    protected $guarded = [];
    
    public function item() {
    	return $this->belongsTo('App\Models\Item');
    }
    
}
