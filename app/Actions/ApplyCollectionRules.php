<?php

namespace App\Actions;

use App\Models\Collection;

class ApplyCollectionRules
{
    public function execute(Collection $collection, &$items, &$groupedItems)
    {
        $result = [];
        if (
            $collection->type == "dossier" ||
            $collection->type == "region" ||
            $collection->type === "workarea"
        ) {
            // take first 'contact' or 'link' item, to be used as 'contact link/campaign banner'
            $contactOrLink = $collection
                ->items()
                ->where(
                    fn($q) => $q
                        ->where("type", "contact")
                        ->orWhere("subtype", "link")
                )
                ->first();
            if ($contactOrLink) {
                $result["top_link"] = $contactOrLink;
                if (isset($groupedItems["resource"])) {
                    $groupedItems["resource"] = $groupedItems[
                        "resource"
                    ]->except($contactOrLink->id);
                }
                if (isset($groupedItems["contact"])) {
                    $groupedItems["contact"] = $groupedItems["contact"]->except(
                        $contactOrLink->id
                    );
                }
                $items = $items->where("items.id", "!=", $contactOrLink->id);
            }
        }
        if ($collection->type == "dossier") {
            $video = $collection
                ->items()
                ->where(fn($q) => $q->where("subtype", "video"))
                ->first();
            if ($video) {
                $result["top_video"] = $video;
                if (isset($groupedItems["resource"])) {
                    $groupedItems["resource"] = $groupedItems[
                        "resource"
                    ]->except($video->id);
                }
                $items = $items->where("items.id", "!=", $video->id);
            }
        }
        return $result;
    }
}
