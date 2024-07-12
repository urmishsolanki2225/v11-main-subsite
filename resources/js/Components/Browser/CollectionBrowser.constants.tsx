import React from "react";

import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkareaIcon from "@mui/icons-material/Bookmarks";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ListIcon from "@mui/icons-material/ListAlt";
import TagIcon from "@mui/icons-material/LocalOffer";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CountryIcon from "@mui/icons-material/Public";

import { CollectionType } from "../../Config";
import { IMenuOption, MenuOptionDivider } from "../General/SimpleMenu";

export type CollectionBrowserMenu = IMenuOption<CollectionType[]>[];

export const AuthorPicker: CollectionBrowserMenu = [
    { value: ["author"], label: "Author", icon: <PersonAddIcon /> },
];

export const ArticlesPicker: CollectionBrowserMenu = [
    { value: ["articles"], label: "Articles", icon: <EventNoteIcon /> },
];

export const ContactsPicker: CollectionBrowserMenu = [
    { value: ["contacts"], label: "Contacts", icon: <PersonAddIcon /> },
];

export const CountryPicker: CollectionBrowserMenu = [
    { value: ["country"], label: "Country", icon: <CountryIcon /> },
    { value: ["region"], label: "Region", icon: <CountryIcon /> },
];

export const DossierPicker: CollectionBrowserMenu = [
    {
        value: ["dossier", "dossier_sub"],
        label: "Dossier",
        icon: <AssignmentIcon />,
    },
];

export const LibraryPicker: CollectionBrowserMenu = [
    {
        value: ["library"],
        label: "Library",
        icon: <MenuBookIcon />,
    },
];

export const WorkareaPicker: CollectionBrowserMenu = [
    {
        value: ["sdi_group", "workarea"],
        label: "Priorities",
        icon: <WorkareaIcon />,
    },
];

export const TagPicker: CollectionBrowserMenu = [
    { value: ["tag", "theme"], label: "Tag & Theme", icon: <TagIcon /> },
];

export const PersonsPicker: CollectionBrowserMenu = [
    { value: ["persons"], label: "Persons listings", icon: <WorkareaIcon /> },
];

export const StructurePicker: CollectionBrowserMenu = [
    {
        value: ["listing", "structure"],
        label: "Structural",
        icon: <ListIcon />,
    },
];

export const CollectionPicker: CollectionBrowserMenu = [
    ...StructurePicker,
    ...ArticlesPicker,
    MenuOptionDivider,
    ...LibraryPicker,
    MenuOptionDivider,
    ...DossierPicker,
    ...WorkareaPicker,
    MenuOptionDivider,
    ...AuthorPicker,
    ...ContactsPicker,
    ...PersonsPicker,
    MenuOptionDivider,
    ...CountryPicker,
    MenuOptionDivider,
    ...TagPicker,
];
