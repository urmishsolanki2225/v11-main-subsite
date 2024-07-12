import { jsx } from "slate-hyperscript";

import { CanDeserializeFunction, DeserializeFunction } from "../types";

export const canDeserializeOEmbed: CanDeserializeFunction = (el) => {
    return (
        el.tagName === "section" && el.attribs.class?.includes("social-embed")
    );
};

const deserializeOEmbed: DeserializeFunction = (el) => {
    return jsx(
        "element",
        {
            type: "oembed",
            url: el.attribs["data-url"],
        },
        // ignore the children
        //Array.from(el.childNodes).map(deserialize)
        []
    );
};

export default deserializeOEmbed;
