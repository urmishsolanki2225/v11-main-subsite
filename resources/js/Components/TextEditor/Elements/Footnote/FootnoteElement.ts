import { IElement } from "../types";

import FootnoteRender, { FootnoteAnchorRender } from "./Render";
import FootnoteToolbarButton from "./ToolbarButton";
import { typeFootnote, typeFootnoteAnchor } from "./type";
import withFootnote from "./withEditor";

export const FootnoteElement: IElement = {
    type: typeFootnote,
    serialize: () => "",
    deserialize: () => undefined,
    canDeserialize: () => false,
    Render: FootnoteRender,
    ToolbarButton: FootnoteToolbarButton,
    withEditor: withFootnote,
};

export const FootnoteAnchorElement: IElement = {
    type: typeFootnoteAnchor,
    serialize: () => "",
    deserialize: () => undefined,
    canDeserialize: () => false,
    Render: FootnoteAnchorRender,
    ToolbarButton: FootnoteToolbarButton,
    withEditor: (editor) => editor,
};

export default FootnoteElement;
