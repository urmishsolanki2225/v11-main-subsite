import { BaseEditor, Text } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

import {
    BlockQuoteElementType,
    QuoteElementType,
    ImageElementType,
    LinkElementType,
    VideoElementType,
    ListItemElementType,
    OrderedListElementType,
    UnorderedListElementType,
    MapElementType,
} from "./Elements";
import {
    FootnoteAnchorElementType,
    FootnoteEditor,
    FootnoteElementType,
} from "./Elements/Footnote/type";
import { IFrameElementType } from "./Elements/IFrame";
import { ItemElementType } from "./Elements/Item";
import { OEmbedElementType } from "./Elements/OEmbed";

export type CaptionElementType = {
    type: "caption";
    children: (Text | CiteElementType)[];
};
export type CiteElementType = {
    type: "cite";
    children: Text[];
};
export type HeadingElementType = {
    type: "heading";
    level: 3 | 4 | 5 | 6;
    children: Text[];
};

export type ParagraphElementType = {
    type: "paragraph";
    children: Text[];
};

type ImportedElementTypes =
    | BlockQuoteElementType
    | FootnoteElementType
    | FootnoteAnchorElementType
    | IFrameElementType
    | ImageElementType
    | ItemElementType
    | LinkElementType
    | ListItemElementType
    | OEmbedElementType
    | OrderedListElementType
    | UnorderedListElementType
    | QuoteElementType
    | VideoElementType
    | MapElementType;

export type CustomElement =
    | ImportedElementTypes
    | CaptionElementType
    | CiteElementType
    | HeadingElementType
    | ParagraphElementType;

export type EditPaneElement =
    | IFrameElementType
    | ImageElementType
    | ItemElementType
    | LinkElementType
    | OEmbedElementType
    | VideoElementType
    | MapElementType;

export type CustomText = {
    bold?: boolean;
    italic?: boolean;
    quote?: boolean;
    text: string;
};

export type CustomEditor = BaseEditor &
    ReactEditor &
    HistoryEditor &
    FootnoteEditor;

declare module "slate" {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
