<?php

namespace App\Actions;

class AllowedCollectionsLayouts
{
    public function execute(
        $canCreateLimited,
        $canCreate,
        $parentCollectionId = false
    ) {
        $allowed;
        if (!$canCreate && $canCreateLimited) {
            $allowed = [
                "types" => [
                    "author" => "Author",
                    "articles" => "Blog series",
                ],
                "layouts" => [
                    "articles" => ["default" => "Default"],
                    "author" => ["author" => "Author"],
                ],
            ];
        } elseif ($canCreate) {
            $allowed = [
                "types" => [
                    "articles" => "Blog series",
                    "dossier" => "Dossier",
                    "dossier_sub" => "Dossier subsection",
                    "author" => "Author",
                    "region" => "Region",
                    "country" => "Country",
                    "persons" => "Persons",
                    "contacts" => "Contact cards",
                    "library" => "Library",
                    // 'listing' => 'Listing',
                    // 'tag' => 'Tag',
                    // 'theme' => 'Theme',
                    "structure" => "Structure",
                    // 'workarea' => 'Workarea',
                ],
                "layouts" => [
                    "articles" => [
                        "default" => "Default",
                        "woe_series" => "Worlds of Education Series",
                    ],
                    "author" => ["author" => "Author"],
                    "contacts" => ["default" => "Default", "staff" => "Staff"],
                    "country" => ["country" => "Country"],
                    "dossier" => ["dossier" => "Dossier"],
                    "dossier_sub" => [
                        "dossier_sub" => "Normal subdossier",
                        "dossier_resources" => "Resources subdossier",
                        "dossier_resolutions" => "Resolutions subdossier",
                        "dossier_map" => "Article count map subdossier",
                    ],
                    "library" => [
                        "default" => "Default",
                        "publications" => "Publications",
                        "resolutions" => "Resolutions",
                    ],
                    "persons" => ["persons" => "Persons"],
                    "region" => ["region" => "Region"],
                    "structure" => [
                        "regions" => "Regions",
                        "items_inline" => "Items inlined",
                        "subcoll_cards" => "Subcollections as cards",
                        "subcoll_noitems" => "Subcollections only titles",
                    ],
                    "tag" => ["tag" => "Tag"],
                    "theme" => ["theme" => "Theme"],
                    "workarea" => ["workarea" => "Workarea"],
                ],
            ];
        } else {
            $allowed = ["types" => [], "layouts" => []];
        }
        return $allowed;
    }
}
