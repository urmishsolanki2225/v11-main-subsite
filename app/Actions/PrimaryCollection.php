<?php

namespace App\Actions;

class PrimaryCollection
{
    /* 
        $options['variant'] = 'workarea' (default) | 'typology' | not set
     */
    public static function get($collections, $options = [])
    {
        // default case: get workarea
        if (!isset($collections[0])) {
            return;
        }
        if (!isset($options["variant"]) || $options["variant"] != "typology") {
            $workarea = $collections->where("type", "workarea")->first();
            if ($workarea) {
                return $workarea;
            }
            // fallback: check dossiers/subdossiers
            $dossier = $collections->where("type", "dossier")->first();
            if ($dossier) {
                return $dossier;
            }
            $subdossier = $collections->where("type", "dossier_sub")->first();
            if ($subdossier) {
                $dossier = $subdossier->parentCollections
                    ->where("type", "dossier")
                    ->first();
                if ($dossier) {
                    return $dossier;
                }
            }
        }
        $typologyCollections = [
            config("eiie.collection.news"),
            config("eiie.collection.opinion"),
            config("eiie.collection.take-action"),
            config("eiie.collection.statements"),
            config("eiie.collection.publications"),
            config("eiie.collection.research"),
        ];
        $selfTypology = $collections
            ->whereIn("id", $typologyCollections)
            ->first();
        if ($selfTypology) {
            return $selfTypology;
        }
        // check parent collections, e.g. blog series
        $parentTypology = $collections
            ->where(
                "parentCollection",
                fn($q) => $q->whereIn("id", $typologyCollections)
            )
            ->first();
        if ($parentTypology) {
            return $parentTypology;
        }
    }

    public static function all($collectionsRelation, $lang)
    {
        // if (!isset($collections[0])) {
        //     return [];
        // }
        $typologyCollections = [
            config("eiie.collection.news"),
            config("eiie.collection.opinion"),
            config("eiie.collection.take-action"),
            config("eiie.collection.statements"),
            config("eiie.collection.publications"),
            config("eiie.collection.research"),
        ];
        return $collectionsRelation
            ->where(
                fn($q) => $q
                    ->where("type", "workarea")
                    ->orWhereIn("collections.id", $typologyCollections)
            )
            ->with([
                "contents" => fn($q) => $q->where("lang", $lang),
            ])
            ->get();
    }
}
