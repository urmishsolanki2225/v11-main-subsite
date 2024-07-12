import { Element, Transforms, Path } from "slate";

import { WithEditorFunction } from "../types";

const withIFrame: WithEditorFunction = (editor) => {
    const { isVoid, normalizeNode } = editor;

    editor.isVoid = (el) => {
        return el.type === "iframe" ? true : isVoid(el);
    };

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;
        if (Element.isElement(node) && node.type === "iframe") {
            // make sure it is top level
            if (!Path.isParent([], path)) {
                Transforms.liftNodes(editor, { at: path, mode: "highest" });
                return;
            }
        }
        normalizeNode(entry);
    };

    return editor;
};

export default withIFrame;
