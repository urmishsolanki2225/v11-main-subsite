import React from "react";

import { Editor } from "slate";

import { FootnoteAnchorElement, FootnoteElement } from "./Footnote";
import IFrameElement from "./IFrame";
import ImageElement from "./Image";
import LinkElement from "./Link";
import { OrderedListElement, UnorderedListElement } from "./List";
import MapElement from "./Map";
import OEmbedElement from "./OEmbed";
import QuoteElement from "./Quote";
import { IElement } from "./types";
import VideoElement from "./Video";

export const ElementTemplate: Partial<IElement> = {
    serialize: () => "",
    canDeserialize: () => false,
    Render: () => <></>,
    ToolbarButton: () => <></>,
    withEditor: (editor: Editor) => editor,
};

export const loadElements = () => {
    return {
        [QuoteElement.type]: QuoteElement,
        [LinkElement.type]: LinkElement,
        [ImageElement.type]: ImageElement,
        [VideoElement.type]: VideoElement,
        [OEmbedElement.type]: OEmbedElement,
        [OrderedListElement.type]: OrderedListElement,
        [UnorderedListElement.type]: UnorderedListElement,
        [FootnoteElement.type]: FootnoteElement,
        [FootnoteAnchorElement.type]: FootnoteAnchorElement,
        [IFrameElement.type]: IFrameElement,
        [MapElement.type]: MapElement,
    };
};

export const withElements = (editor: Editor) => {
    const elements = loadElements();
    for (const elPlugin of Object.values(elements)) {
        editor = elPlugin.withEditor ? elPlugin.withEditor(editor) : editor;
    }
    return editor;
};
