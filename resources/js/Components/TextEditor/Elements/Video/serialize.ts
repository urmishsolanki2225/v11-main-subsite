import clsx from "clsx";

import { serializeGenericAttributes } from "../../serialize";
import { SerializeFunction } from "../types";

const serializeVideo: SerializeFunction = (el) => {
    if (el.type !== "video") {
        return "";
    }
    const { url, float } = el;
    const floatClass = float ? `float-${float}` : undefined;

    return `<figure class="${clsx(
        "video",
        floatClass
    )}"${serializeGenericAttributes(
        el
    )}><iframe src="${url}" allow="fullscreen; picture-in-picture" allowfullscreen="true"></iframe></figure>`;
};

export default serializeVideo;
