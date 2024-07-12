import { parse } from "parse5";
import {
    Htmlparser2TreeAdapterMap,
    adapter as htmlparser2Adapter,
} from "parse5-htmlparser2-tree-adapter";
import {
    Editor,
    Transforms,
    Element as SlateElement,
    Path,
    Node,
    Range,
} from "slate";

type Element = Htmlparser2TreeAdapterMap["element"];

import { deserialize } from "./deserialize";

const withHtml = (editor: Editor) => {
    const {
        insertData,
        normalizeNode,
        insertBreak,
        deleteBackward,
        deleteForward,
    } = editor;

    editor.insertData = (data) => {
        const html = data.getData("text/html");

        if (html) {
            // const parsed = new DOMParser().parseFromString(html, "text/html");
            const parsed = parse(html, { treeAdapter: htmlparser2Adapter });
            const body = (parsed.firstChild as Element).lastChild as Element;
            const fragment = deserialize(body);
            Transforms.insertFragment(editor, fragment);
            return;
        }

        insertData(data);
    };

    editor.normalizeNode = ([node, path]) => {
        if (SlateElement.isElement(node)) {
            if (node.type === "paragraph") {
                // check for block elements as children
            }
            if (node.type === "list-item") {
                // has to be underneath a list, if not then unwrap it
                const parent = Node.parent(editor, path);
                if (
                    !SlateElement.isElement(parent) ||
                    (parent.type !== "ordered-list" &&
                        parent.type !== "unordered-list")
                ) {
                    Transforms.unwrapNodes(editor, { at: path });
                }
            }
            if (node.type === "caption" && Path.hasPrevious(path)) {
                // check whether previous node is also a caption,
                // if so transform this node to a paragraph
                const prevPath = Path.previous(path);
                const [prevNode] = Editor.node(editor, prevPath);
                if (
                    SlateElement.isElement(prevNode) &&
                    prevNode.type === "caption"
                ) {
                    // previous sibling is also a caption
                    Transforms.setNodes(
                        editor,
                        { type: "paragraph" },
                        { at: path }
                    );
                    Transforms.liftNodes(editor, { at: path, mode: "highest" });
                    return;
                }
            }

            // check for element nodes underneath a void, if so lift them up
            if (SlateElement.isElement(node)) {
                const parent = Node.parent(editor, path);
                if (
                    parent &&
                    SlateElement.isElement(parent) &&
                    Editor.isVoid(editor, parent)
                ) {
                    // parent of Element is a Void
                    const parentPath = Path.parent(path);
                    Transforms.moveNodes(editor, {
                        at: path,
                        to: parentPath,
                        mode: "highest",
                        voids: true,
                    });
                    return;
                }
            }
        }
        normalizeNode([node, path]);
    };

    /**
     * Fix from https://github.com/ianstormtaylor/slate/issues/3991#issuecomment-832160304
     *
     */
    editor.insertBreak = () => {
        if (!editor.selection || !Range.isCollapsed(editor.selection)) {
            return insertBreak();
        }

        const selectedNodePath = Path.parent(editor.selection.anchor.path);
        const selectedNode = Node.get(editor, selectedNodePath);
        if (
            SlateElement.isElement(selectedNode) &&
            Editor.isVoid(editor, selectedNode)
        ) {
            if (!Path.hasPrevious(selectedNodePath)) {
                Transforms.insertNodes(
                    editor,
                    {
                        type: "paragraph",
                        children: [{ text: "" }],
                    },
                    { at: selectedNodePath }
                );
                return;
            }
            Editor.insertNode(editor, {
                type: "paragraph",
                children: [{ text: "" }],
            });
            return;
        }

        insertBreak();
    };

    // if prev node is a void node, remove the current node and select the void node
    editor.deleteBackward = (unit) => {
        if (
            !editor.selection ||
            !Range.isCollapsed(editor.selection) ||
            editor.selection.anchor.offset !== 0
        ) {
            return deleteBackward(unit);
        }

        const parentPath = Path.parent(editor.selection.anchor.path);
        const parentNode = Node.get(editor, parentPath);
        const parentIsEmpty = Node.string(parentNode).length === 0;

        if (parentIsEmpty && Path.hasPrevious(parentPath)) {
            const prevNodePath = Path.previous(parentPath);
            const prevNode = Node.get(editor, prevNodePath);
            if (
                SlateElement.isElement(prevNode) &&
                Editor.isVoid(editor, prevNode)
            ) {
                return Transforms.removeNodes(editor);
            }
        }

        return deleteBackward(unit);
    };

    editor.deleteForward = (unit) => {
        if (
            !editor.selection ||
            !Range.isCollapsed(editor.selection) ||
            editor.selection.anchor.offset !== 0
        ) {
            return deleteForward(unit);
        }

        const parentPath = Path.parent(editor.selection.anchor.path);
        const parentNode = Node.get(editor, parentPath);
        const parentIsEmpty = Node.string(parentNode).length === 0;

        // if current element is empty
        if (parentIsEmpty) {
            const nextNodePath = Path.next(parentPath);
            const nextNode = Node.get(editor, nextNodePath);
            if (
                SlateElement.isElement(nextNode) &&
                Editor.isVoid(editor, nextNode)
            ) {
                return Transforms.removeNodes(editor);
            }
        }

        return deleteForward(unit);
    };

    return editor;
};

export default withHtml;
