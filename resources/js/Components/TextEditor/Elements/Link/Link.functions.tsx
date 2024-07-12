import { Editor, Transforms, Element as SlateElement, Range } from "slate";

import { LinkElementType } from "./type";

export const insertLink = (editor: Editor, url: string) => {
    if (editor.selection) {
        wrapLink(editor, url);
    }
};
export const isLinkActive = (editor: Editor) => {
    const [link] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === "link",
    });
    return Boolean(link);
};

const unwrapLink = (editor: Editor) => {
    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === "link",
    });
};

const wrapLink = (editor: Editor, url: string) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor);
    }

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link: LinkElementType = {
        type: "link",
        url,
        children: isCollapsed ? [{ text: url }] : [],
    };

    if (isCollapsed) {
        Transforms.insertNodes(editor, link);
    } else {
        Transforms.wrapNodes(editor, link, { split: true });
        Transforms.collapse(editor, { edge: "end" });
    }
};
