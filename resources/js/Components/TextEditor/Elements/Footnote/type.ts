import { Location, NodeEntry } from "slate";

import { CustomText, ParagraphElementType } from "../../custom-types";

export const typeFootnote = "footnote";
export const typeFootnoteAnchor = "footnote-anchor";

export type FootnoteId = string;

export type FootnoteAttributes = {
    uuid: FootnoteId;
};

export type FootnoteElementType = FootnoteAttributes & {
    type: typeof typeFootnote;
    children: ParagraphElementType[];
};

export type FootnoteAnchorAttributes = {
    ref: FootnoteId; // reference by uuid
};

// void
export type FootnoteAnchorElementType = FootnoteAnchorAttributes & {
    type: typeof typeFootnoteAnchor;
    children: CustomText[];
};

export type FootnoteEditor = {
    footnoteOrder: (uuid: FootnoteId) => number;
    footnotes: () => NodeEntry<FootnoteElementType>[];
    insertFootnote: (at?: Location) => void;
};
