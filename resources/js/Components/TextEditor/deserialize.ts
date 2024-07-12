import { parse as parse5 } from "parse5";
import {
    Htmlparser2TreeAdapterMap,
    adapter as htmlparser2Adapter,
} from "parse5-htmlparser2-tree-adapter";
import { Text as SlateText, Element as SlateElement } from "slate";
import { jsx } from "slate-hyperscript";

import deserializeImage, {
    canDeserializeImage,
} from "./Elements/Image/deserialize";
import { typeImage } from "./Elements/Image/type";
import deserializeLink, {
    canDeserializeLink,
} from "./Elements/Link/deserialize";
import { typeLink } from "./Elements/Link/type";
import deserializeList, {
    canDeserializeList,
} from "./Elements/List/deserialize";
import { typeOrderedList } from "./Elements/List/type";
import deserializeOEmbed, {
    canDeserializeOEmbed,
} from "./Elements/OEmbed/deserialize";
import { typeOEmbed } from "./Elements/OEmbed/type";
import deserializeQuote, {
    canDeserializeQuote,
} from "./Elements/Quote/deserialize";
import { typeQuote } from "./Elements/Quote/type";
// import { loadElements } from "./Elements";
import { DataAttributes, FloatAttribute } from "./Elements/types";
import deserializeVideo, {
    canDeserializeVideo,
} from "./Elements/Video/deserialize";
import { typeVideo } from "./Elements/Video/type";

type Element = Htmlparser2TreeAdapterMap["element"];
type Node = Htmlparser2TreeAdapterMap["node"];
type TextNode = Htmlparser2TreeAdapterMap["textNode"];

export const getDataAttrs = (el: Element): DataAttributes => {
    const dataType = el.attribs["data-type"];
    const dataId = el.attribs["data-id"];
    const result: any = {};
    if (dataType) {
        result.dataType = dataType;
    }
    if (dataId) {
        result.dataId = dataId;
    }
    return result;
};

const getFloatAttrs = (el: Element): FloatAttribute => {
    const float = el.attribs.class?.includes("float-left")
        ? "left"
        : el.attribs.class?.includes("float-right")
        ? "right"
        : undefined;
    if (float) {
        return { float };
    } else {
        return {};
    }
};

export const getGenericAttributes = (el: Element) => {
    return {
        ...getDataAttrs(el),
        ...getFloatAttrs(el),
    };
};

const ELEMENT_TAGS = {
    blockquote: () => ({ type: "blockquote" }),
    cite: () => ({ type: "cite" }),
    // FIGCAPTION: (el: Element) => ({ type: "caption" }),
    // IFRAME: (el: Element) => ({ type: "iframe" }),
    // h1: () => ({ type: "heading-one" }),
    // h2: () => ({ type: "heading-two" }),
    h3: () => ({ type: "heading", level: 3 }),
    h4: () => ({ type: "heading", level: 4 }),
    h5: () => ({ type: "heading", level: 5 }),
    h6: () => ({ type: "heading", level: 6 }),
    // header: () => ({ type: "header" }),
    p: () => ({ type: "paragraph" }),
    // section: () => ({ type: "section" }),
} as any;

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
    // CODE: () => ({ code: true }),
    // DEL: () => ({ strikethrough: true }),
    em: () => ({ italic: true }),
    i: () => ({ italic: true }),
    // s: () => ({ strikethrough: true }),
    strong: () => ({ bold: true }),
    // u: () => ({ underline: true }),
    q: () => ({ quote: true }),
    span: () => ({}),
} as any;

const Elements = {
    [typeQuote]: {
        type: typeQuote,
        deserialize: deserializeQuote,
        canDeserialize: canDeserializeQuote,
    },
    [typeLink]: {
        type: typeLink,
        deserialize: deserializeLink,
        canDeserialize: canDeserializeLink,
    },
    [typeImage]: {
        type: typeImage,
        deserialize: deserializeImage,
        canDeserialize: canDeserializeImage,
    },
    [typeVideo]: {
        type: typeVideo,
        deserialize: deserializeVideo,
        canDeserialize: canDeserializeVideo,
    },
    [typeOEmbed]: {
        type: typeOEmbed,
        deserialize: deserializeOEmbed,
        canDeserialize: canDeserializeOEmbed,
    },
    [typeOrderedList]: {
        type: typeOrderedList,
        deserialize: deserializeList,
        canDeserialize: canDeserializeList,
    },
};

export const deserialize = (node: Node): any => {
    if (!node) {
        return;
    }
    if (node.nodeType === 3) {
        return (node as TextNode).data.trim();
        // ? decodeCharacters(node.textContent)
        // : node.textContent;
    } else if (node.nodeType !== 1) {
        return null;
    } else if (node.name === "br") {
        return "\n";
    }
    const el = node as Element;

    for (const plugin of Object.values(Elements)) {
        if (plugin.canDeserialize(el)) {
            return plugin.deserialize(el);
        }
    }

    const { tagName } = el;
    const children = Array.from(el.childNodes)
        .map(deserialize)
        .flat()
        .filter((child) => child);

    if (tagName === "body") {
        // clean up a bit
        const kids = children
            .map((child) =>
                child.type
                    ? child
                    : child.text
                    ? jsx("element", { type: "paragraph" }, child)
                    : undefined
            )
            .filter((child) => child);

        // no text only, in that case make it a paragraph
        return jsx("fragment", {}, kids);
    }

    if (ELEMENT_TAGS[tagName]) {
        const attrs = ELEMENT_TAGS[tagName](el);
        return jsx(
            "element",
            attrs,
            children?.length ? children : [{ text: "" }]
        );
    }

    if (TEXT_TAGS[tagName]) {
        const attrs = TEXT_TAGS[tagName](el);
        return children.map((child) => {
            if (SlateElement.isElement(child)) {
                child.children.forEach((grandChild: any) =>
                    SlateText.isText(grandChild)
                        ? { ...grandChild, ...attrs }
                        : grandChild
                );
                return child;
            } else {
                return jsx("text", attrs, child);
            }
        });
    }

    // return jsx("element", { type: "paragraph" }, children);
    return children;
};

export const parse = (html: string) => {
    // Elements = loadElements();
    const parsed = parse5(html, { treeAdapter: htmlparser2Adapter });
    const body = (parsed.firstChild as Element).lastChild as Element;
    return deserialize(body);
};
