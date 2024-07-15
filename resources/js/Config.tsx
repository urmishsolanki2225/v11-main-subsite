import { ReactNode } from "react";

export const AvailableLanguages: [string, string][] = [
    ["en", "English"],
    ["fr", "French"],
    ["es", "Spanish"],
    //Added by Cyblance for Subsite section start
    ["ar", "Arabic"], // Add Arabic
    ["pt", "Portuguese"], // Add Portuguese
    //Added by Cyblance for Subsite section end
    ["*", "-all-"],
];

export const LanguageNames = {
    en: "English",
};

export const ITEM_TYPES = [
    "static",
    "article",
    "resource",
    "affiliate",
    "person",
    "library",
    "contact",
    "dcproject",
    "dev_coop_project",
    "activityreport_congress",
] as const;
export const ITEM_SUBTYPES = [
    "file",
    "image",
    "image.icon",
    "image.square",
    "image.portrait",
    "video",
    "link",
    "embed",
] as const;

export const COLLECTION_TYPES = [
    "articles",
    "author",
    "country",
    "contacts",
    "dossier",
    "dossier_sub",
    "library",
    "listing",
    "persons",
    "region",
    "sdi",
    "sdi_group",
    "structure",
    "tag",
    "theme",
    "workarea",
] as const;

export const ANNUALREPORTS_TYPES = ["highlight", "summary"] as const;
export type AnnualreportType = (typeof ANNUALREPORTS_TYPES)[number];

export type StatusType = "published" | "unpublished" | "draft" | "archived";
export type CollectionType = (typeof COLLECTION_TYPES)[number];
export type ItemType = (typeof ITEM_TYPES)[number];
export type ItemSubtype = (typeof ITEM_SUBTYPES)[number];

export const VIDEO_PROVIDERS = ["youtube", "vimeo"];
export const EMBED_PROVIDERS = ["Linkedin", "Twitter"];
export const IMAGE_SUBTYPES = {
    image: "Regular",
    "image.icon": "Icon",
    "image.portrait": "Portrait",
    "image.square": "Square",
};
export const COLLECTION_ORDERINGS = {
    date: "Date",
    manual: "Manual",
    alphabet: "Alphabetical",
    partial_date: "Date with pinned",
};

export const COLLECTION_NAMES: Record<CollectionType, string> = {
    author: "Author",
    articles: "Articles",
    contacts: "Contacts",
    country: "Country",
    dossier: "Dossier",
    dossier_sub: "Subdossier",
    library: "Library",
    listing: "Listing",
    persons: "Persons",
    region: "Region",
    sdi: "Strategic Direction",
    sdi_group: "Strategic Direction Grouping",
    structure: "Structure",
    tag: "Tag",
    theme: "Theme",
    workarea: "Workarea",
};

export const COLLECTION_ICONS: {
    [key: string]: { icon?: ReactNode; iconAdd?: ReactNode };
} = {
    // author: undefined,
    // country: undefined,
    // dossier: undefined,
    // dossier_sub: undefined,
    // listing: undefined,
    // persons: undefined,
    // region: undefined,
    // sdi: undefined,
    // sdi_group: undefined,
    // tag: undefined,
    // theme: undefined,
    // workarea: undefined,
};

export type FigureFloatStyles = "left" | "right" | "full";
export const FIGURE_FLOAT_STYLE_LABELS: Record<FigureFloatStyles, string> = {
    full: "Full width",
    left: "Left",
    right: "Right",
};
export type ContentLayoutStyles = "aside" | "full" | "left" | "right" | "page";
export const CONTENT_LAYOUT_STYLE_LABELS: Record<ContentLayoutStyles, string> =
    {
        aside: "Aside",
        full: "Full width",
        left: "Left",
        right: "Right",
        page: "Page width",
    };

export const TEXTEDIT_DEBOUNCE_MS = 400;

export const LOCALSTORAGE_KEYS = { ANNUALREPORT_YEAR: "ANNUALREPORT_YEAR" };
