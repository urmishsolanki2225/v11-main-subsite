import clsx from "clsx";

import { SerializeFunction } from "../types";

const serializeQuote: SerializeFunction = (el, children) => {
    if (el.type !== "quote") {
        return "";
    }
    const { float } = el;
    const floatClass = float ? `float-${float}` : "";
    return `<figure class="${clsx("quote", floatClass)}">${children}</figure>`;
};

export default serializeQuote;
