import { SerializeFunction } from "../types";

const serializeOEmbed: SerializeFunction = (el) => {
    if (el.type !== "oembed") {
        return "";
    }
    const { url } = el;
    return `<section class="social-embed" data-url="${url}">&nbsp;</section>`;
};

export default serializeOEmbed;
