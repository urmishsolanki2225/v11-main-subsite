import clsx from "clsx";

import { serializeGenericAttributes } from "../../serialize";
import { SerializeFunction } from "../types";

const serializeItem: SerializeFunction = (el) => {
    if (el.type !== "item") {
        return "";
    }
    const { title, imageUrl, url, float } = el;
    const floatClass = float ? `float-${float}` : undefined;

    return `<section class="${clsx(
        "embed-item",
        floatClass
    )}"${serializeGenericAttributes(el)}><figure><img src="${imageUrl}" alt="${
        title || ""
    }" /></figure><header><h3>${title}</h3></header><a href="${url}">${title}</a></section>`;
};

export default serializeItem;
