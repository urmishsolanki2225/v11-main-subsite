import { Htmlparser2TreeAdapterMap } from "parse5-htmlparser2-tree-adapter";
import { jsx } from "slate-hyperscript";

import { deserialize, getGenericAttributes } from "../../deserialize";
import { CanDeserializeFunction, DeserializeFunction } from "../types";

type Element = Htmlparser2TreeAdapterMap["element"];

export const canDeserializeQuote: CanDeserializeFunction = (el) => {
    return Boolean(
        el.tagName == "figure" &&
            (el.attribs.class?.includes("quote") ||
                el.childNodes.find(
                    (node) => (node as Element).name === "blockquote"
                ))
    );
};
const deserializeQuote: DeserializeFunction = (el) => {
    const children = [];
    // [0] = blockquote
    // [1] = figcaption
    const blockquote = el.childNodes.find(
        (node) => (node as Element).name === "blockquote"
    ) as Element;
    const caption = el.childNodes.find(
        (node) => (node as Element).name === "figcaption"
    ) as Element;
    if (blockquote) {
        children[0] = jsx(
            "element",
            { type: "blockquote" },
            blockquote.childNodes.map(deserialize)
        );
    }
    if (caption) {
        children[1] = jsx(
            "element",
            { type: "caption" },
            caption.childNodes.map(deserialize)
        );
    }
    return jsx(
        "element",
        { ...getGenericAttributes(el), type: "quote" },
        children
    );
};

export default deserializeQuote;
