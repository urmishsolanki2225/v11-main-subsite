import escapeHtml from "escape-html";
import { Descendant, Element as SlateElement, Node, Text } from "slate";

import { IElement, loadElements } from "./Elements";

let Elements: { [x: string]: IElement };

export const serialize = (node: Node): string => {
    if (!Elements) {
        Elements = loadElements();
    }
    if (Text.isText(node)) {
        let text = escapeHtml(node.text);
        text = node.text
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("&", "&amp;");
        if (node.bold) {
            text = `<strong>${text}</strong>`;
        }
        if (node.italic) {
            text = `<em>${text}</em>`;
        }
        if (node.quote) {
            text = `<q>${text}</q>`;
        }
        return text;
    }
    if (!SlateElement.isElement(node)) {
        return "";
    }
    const children = node.children
        .map((n: Descendant) => serialize(n))
        .join("");

    if (Elements[node.type]) {
        return Elements[node.type].serialize(node, children);
    }

    switch (node.type) {
        case "blockquote":
            return `<blockquote>${children}</blockquote>`;
        case "cite":
            return `<cite>${children}</cite>`;
        case "caption":
            return children ? `<figcaption>${children}</figcaption>` : "";
        case "heading":
            return `<h${node.level ?? 3}>${children}</h${node.level ?? 3}>`;
        // case "heading-3":
        //     return `<h3>${children}</h3>`;
        // case "heading-4":
        //     return `<h4>${children}</h4>`;
        // case "heading-5":
        //     return `<h5>${children}</h5>`;
        // case "heading-6":
        //     return `<h6>${children}</h6>`;
        case "list-item":
            return `<li>${children}</li>`;
        case "paragraph":
            return `<p>${children}</p>`;
        default:
            return children;
    }
};

export const serializeGenericAttributes = (el: SlateElement) => {
    if (!(el.type === "image" || el.type === "video" || el.type === "link")) {
        return "";
    }
    const { dataType, dataId } = el;

    let result = "";
    if (dataType && dataId) {
        result += ` data-type="${dataType}" data-id="${dataId}"`;
    }
    return result;
};

export const format = (nodes: Node[]): string => {
    return nodes
        .map((node) => serialize(node))
        .join("")
        .replace("<p></p>", "");
};

export default format;
