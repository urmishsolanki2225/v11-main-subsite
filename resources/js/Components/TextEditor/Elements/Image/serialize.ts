import clsx from "clsx";
import { Text, Node } from "slate";

import { serializeGenericAttributes } from "../../serialize";
import { SerializeFunction } from "../types";

const serializeImage: SerializeFunction = (el, children) => {
    if (el.type !== "image") {
        return "";
    }
    const { url, float } = el;
    const floatClass = float ? `float-${float}` : undefined;
    // serialize the children as caption
    const caption = children;
    const alt = el.children
        .map((n: Node) => (Text.isText(n) ? n.text : ""))
        .join(" ");

    return `<figure class="${clsx(
        "image",
        floatClass
    )}"${serializeGenericAttributes(el)}><img src="${url}" alt="${
        alt || ""
    }" />${caption || ""}</figure>`;
};

export default serializeImage;
