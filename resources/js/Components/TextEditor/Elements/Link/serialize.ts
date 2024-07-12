import { serializeGenericAttributes } from "../../serialize";
import { SerializeFunction } from "../types";

const serializeLink: SerializeFunction = (el, children) => {
    if (el.type !== "link") {
        return "";
    }
    const { url, linkType } = el;
    const className = linkType ? ` class="${linkType}"` : "";
    const rel =
        linkType !== "internal-item" && linkType !== "internal-collection"
            ? ' rel="noopener"'
            : "";
    return `<a href="${url}"${className}${serializeGenericAttributes(
        el
    )}${rel}>${children}</a>`;
};

export default serializeLink;
