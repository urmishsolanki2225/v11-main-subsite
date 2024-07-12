<?php

namespace App\Actions;

use Illuminate\Http\Request;
use App\Models\Subsite;

class FetchSubsite {

    public static function execute(Request $request) {
        $subsite_data = array();
        if(isset($request->user()->role) && $request->user()->role == "subsiteadmin"){
            $subsite_data = Subsite::select('aliase_name','languages')->where('id',$request->user()->subsite_id)->first();
        }
        return $subsite_data;
    }

}