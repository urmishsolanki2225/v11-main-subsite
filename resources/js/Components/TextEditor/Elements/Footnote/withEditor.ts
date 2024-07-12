import uniqBy from "lodash/uniqBy";
import { Editor, Transforms, Element, Node, NodeEntry } from "slate";
import { v4 as uuidv4 } from "uuid";

import { WithEditorFunction } from "../types";

import { FootnoteAnchorElementType, FootnoteElementType } from "./type";

const withFootnote: WithEditorFunction = (editor) => {
    const { isInline, isVoid, normalizeNode } = editor;

    editor.isInline = (el) => {
        return el.type === "footnote-anchor" ? true : isInline(el);
    };

    editor.isVoid = (el) => {
        return el.type === "footnote-anchor" ? true : isVoid(el);
    };

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;
        // make sure footnotes have only paragraphs in them, turn everything that's not a parent into a paragraph
        if (Element.isElement(node) && node.type === "footnote") {
            for (const [child, childPath] of Node.children(editor, path)) {
                if (!Element.isElement(child)) {
                    // wrap it
                    Transforms.wrapNodes(
                        editor,
                        { type: "paragraph", children: [] },
                        { at: childPath }
                    );
                }
                if (Element.isElement(child) && child.type !== "paragraph") {
                    Transforms.unwrapNodes(editor, { at: childPath });
                    Transforms.wrapNodes(
                        editor,
                        { type: "paragraph", children: [] },
                        { at: childPath }
                    );
                }
            }
        }
        const footnoteUuids = editor.footnotes().map(([{ uuid }]) => uuid);
        Transforms.removeNodes(editor, {
            at: path,
            match: (anchor) =>
                Element.isElement(anchor) &&
                anchor.type === "footnote-anchor" &&
                !footnoteUuids.includes(anchor.ref),
        });
        normalizeNode(entry);
    };

    editor.footnoteOrder = (uuid) => {
        let [...footnoteAnchors] = Editor.nodes(editor, {
            at: [],
            match: (node) =>
                Element.isElement(node) && node.type === "footnote-anchor",
        });
        footnoteAnchors = uniqBy(
            footnoteAnchors as NodeEntry<FootnoteAnchorElementType>[],
            ([{ ref }]) => ref
        ) as NodeEntry<FootnoteAnchorElementType>[];
        const order =
            (
                footnoteAnchors as NodeEntry<FootnoteAnchorElementType>[]
            ).findIndex(([{ ref }]) => ref === uuid) + 1;
        if (order) {
            // check that the footnote indeed exists
            return order;
        }
        return -1;
    };

    editor.footnotes = () => {
        const [...footnotes] = Editor.nodes(editor, {
            at: [],
            match: (node) =>
                Element.isElement(node) && node.type === "footnote",
        });
        return footnotes as NodeEntry<FootnoteElementType>[];
    };

    editor.insertFootnote = (at) => {
        Editor.withoutNormalizing(editor, () => {
            const uuid = uuidv4();
            Transforms.insertNodes(
                editor,
                [
                    {
                        type: "footnote-anchor",
                        ref: uuid,
                        children: [{ text: "" }],
                    },
                ],
                { at }
            );
            Transforms.insertNodes(
                editor,
                [
                    {
                        type: "footnote",
                        uuid: uuid,
                        children: [
                            {
                                type: "paragraph",
                                children: [{ text: "A footnote" }],
                            },
                        ],
                    },
                ],
                { at: [editor.children.length] }
            );
        });
    };

    return editor;
};

export default withFootnote;
