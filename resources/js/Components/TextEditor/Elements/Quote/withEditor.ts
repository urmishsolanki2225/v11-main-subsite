import { Element as SlateElement, Node as SlateNode, Transforms } from "slate";

import { WithEditorFunction } from "../types";

const withQuote: WithEditorFunction = (editor) => {
    const { normalizeNode, isInline } = editor;

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;
        if (SlateElement.isElement(node) && node.type === "quote") {
            // force first node to be a blockquote and second a caption, remove the rest
            if (node.children.length < 1) {
                Transforms.insertNodes(
                    editor,
                    {
                        type: "blockquote",
                        children: [
                            {
                                type: "paragraph",
                                children: [{ text: "Quote" }],
                            },
                        ],
                    },
                    { at: path.concat(0) }
                );
            }
            if (node.children.length < 2) {
                Transforms.insertNodes(
                    editor,
                    {
                        type: "caption",
                        children: [{ text: "" }],
                    },
                    { at: path.concat(1) }
                );
            }
            if (node.children.length > 2) {
                // Transforms.removeNodes(editor)
            }
            const bq = node.children[0];
            if (bq.type !== "blockquote") {
                Transforms.wrapNodes(
                    editor,
                    { type: "blockquote", children: [] },
                    { at: path.concat(0) }
                );
            }
            // normalizeNode([bq, path.concat(0)]);
            return;
        }

        if (SlateElement.isElement(node) && node.type === "blockquote") {
            for (const [child, childPath] of SlateNode.children(editor, path)) {
                // must all be paragraph

                if (
                    !SlateElement.isElement(child) ||
                    child.type !== "paragraph"
                ) {
                    // Transforms.unwrapNodes(editor, {
                    //     at: childPath,
                    // });
                    Transforms.wrapNodes(
                        editor,
                        { type: "paragraph", children: [] },
                        {
                            at: childPath,
                        }
                    );
                }
            }
            return;
        }

        normalizeNode(entry);
    };

    editor.isInline = (el) => (el.type === "cite" ? true : isInline(el));

    return editor;
};

export default withQuote;
