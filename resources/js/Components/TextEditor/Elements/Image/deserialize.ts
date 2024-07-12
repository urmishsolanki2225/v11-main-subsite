import { Htmlparser2TreeAdapterMap } from "parse5-htmlparser2-tree-adapter";
import { jsx } from "slate-hyperscript";

import { deserialize, getGenericAttributes } from "../../deserialize";
import { CanDeserializeFunction, DeserializeFunction } from "../types";

type Element = Htmlparser2TreeAdapterMap["element"];

export const canDeserializeImage: CanDeserializeFunction = (el) => {
    return Boolean(
        el.tagName == "figure" &&
            (el.attribs.class?.includes("image") ||
                el.childNodes.find((node) => (node as Element).name === "img"))
    );
};
const deserializeImage: DeserializeFunction = (el) => {
    const img = el.childNodes.find(
        (node) => (node as Element).name === "img"
    ) as Element;
    let url;
    let caption;
    if (img) {
        url = img.attribs.src as string;
        caption = ""; //img.attribs.alt;
    }
    const children = [];
    const captionEl = el.childNodes.find(
        (node) => (node as Element).name === "figcaption"
    ) as Element;
    if (captionEl) {
        children[0] = jsx(
            "element",
            { type: "caption" },
            captionEl.childNodes.map(deserialize)
        );
    } else {
        children[0] = jsx("element", { type: "caption" }, [
            { text: caption ?? "" },
        ]);
    }
    return jsx(
        "element",
        { ...getGenericAttributes(el), type: "image", url },
        children
    );
};

export default deserializeImage;
