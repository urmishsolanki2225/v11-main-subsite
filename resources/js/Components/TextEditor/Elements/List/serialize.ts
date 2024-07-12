import { SerializeFunction } from "../types";

const serializeList: SerializeFunction = (el, children) => {
    if (el.type === "list-item") {
        return `<li>${children}</li>`;
    }
    if (el.type !== "ordered-list" && el.type !== "unordered-list") {
        return "";
    }
    const { variant } = el;
    const elName = el.type === "ordered-list" ? "ol" : "ul";
    return `<${elName}${
        variant ? ` class="${variant}"` : ""
    }>${children}</${elName}>`;
};

export default serializeList;
