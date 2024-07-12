import { jsx } from "slate-hyperscript";

import { deserialize, getGenericAttributes } from "../../deserialize";
import { CanDeserializeFunction, DeserializeFunction } from "../types";

export const canDeserializeLink: CanDeserializeFunction = (el) => {
    return el.tagName === "a";
};

const deserializeLink: DeserializeFunction = (el) => {
    const dataAttrs = getGenericAttributes(el);
    const linkType = el.attribs.class?.includes("internal-item")
        ? "internal-item"
        : el.attribs.class?.includes("internal-collection")
        ? "internal-collection"
        : dataAttrs.dataType === "link"
        ? "resource"
        : "external";

    return jsx(
        "element",
        {
            ...dataAttrs,
            type: "link",
            url: el.attribs.href,
            linkType,
        },
        Array.from(el.childNodes).map(deserialize)
    );
};

export default deserializeLink;
