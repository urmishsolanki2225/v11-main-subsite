import { Htmlparser2TreeAdapterMap } from "parse5-htmlparser2-tree-adapter";
import { jsx } from "slate-hyperscript";

import { deserialize, getGenericAttributes } from "../../deserialize";
import { CanDeserializeFunction, DeserializeFunction } from "../types";

import { ListVariantAttributes } from "./type";

type Element = Htmlparser2TreeAdapterMap["element"];

export const canDeserializeList: CanDeserializeFunction = (el) => {
    return Boolean(
        el.tagName === "ul" || el.tagName === "ol" || el.tagName === "li"
    );
};

const getListVariantAttr = (el: Element): ListVariantAttributes => {
    if (el.attribs.class?.includes("variant-a")) {
        return { variant: "variant-a" };
    } else if (el.attribs.class?.includes("variant-b")) {
        return { variant: "variant-b" };
    } else {
        return {};
    }
};

const deserializeList: DeserializeFunction = (el) => {
    if (el.tagName === "li") {
        return jsx(
            "element",
            { type: "list-item" },
            [...el.childNodes].map(deserialize)
        );
    }
    const children = [...el.children]
        .filter((child) => (child as Element).name === "li") // only keep proper lists
        .map(deserialize);
    const type = el.tagName === "ol" ? "ordered-list" : "unordered-list";

    return jsx(
        "element",
        { ...getGenericAttributes(el), ...getListVariantAttr(el), type },
        children
    );
};

export default deserializeList;
