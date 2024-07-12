import { Htmlparser2TreeAdapterMap } from "parse5-htmlparser2-tree-adapter";
import { jsx } from "slate-hyperscript";

import { getGenericAttributes } from "../../deserialize";
import { CanDeserializeFunction, DeserializeFunction } from "../types";

type Element = Htmlparser2TreeAdapterMap["element"];

export const canDeserializeVideo: CanDeserializeFunction = (el) => {
    return Boolean(
        (el.tagName === "figure" &&
            (el.attribs.class?.includes("video") ||
                el.childNodes.find(
                    (node) => (node as Element).name === "iframe"
                ))) ||
            (el.tagName === "p" &&
                el.childNodes.find(
                    (node) => (node as Element).name === "iframe"
                )) ||
            el.tagName === "iframe"
    );
};
const deserializeVideo: DeserializeFunction = (el) => {
    const iframe =
        el.tagName === "iframe"
            ? el
            : (el.childNodes.find(
                  (node) => (node as Element).name === "iframe"
              ) as Element);
    let url;
    if (iframe) {
        url = iframe.attribs.src as string;
    }

    return jsx("element", { ...getGenericAttributes(el), type: "video", url }, [
        jsx("element", { type: "caption" }, [{ text: "" }]),
    ]);
};

export default deserializeVideo;
