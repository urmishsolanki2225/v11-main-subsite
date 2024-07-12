<?php

namespace App\Actions;

use Illuminate\Http\Request;

class AllowedMembershipCollections
{
    public static function execute(Request $request)
    {
        $result = [
            "collection_types" => [],
            "collection_ids" => [], // add 'collection_ids' array for extra permissions by ID
        ];

        if ($request->user()->role === "admin") {
            $result["collection_types"] = ["*"]; // everything
        } else {
            $result["collection_types"] = [
                "dossier_sub",
                "workarea",
                "articles",
                "author",
                "region",
                "country",
                "library",
                "structure",
            ];
            $result["collection_ids"] = [
                config("eiie.collection.jobs"),
                config("eiie.collection.featured"),
            ];
        }
        return $result;
    }
}
