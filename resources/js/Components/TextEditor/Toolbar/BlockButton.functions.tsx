import { Editor, Element as SlateElement, Transforms } from "slate";

import { BlockElementTypes } from "./BlockButton";

const LIST_TYPES = ["ordered-list", "unordered-list"];

const matchAttributes = (
    n: SlateElement,
    attributes?: Partial<SlateElement>
) => {
    if (!attributes) {
        return true;
    }
    for (const [key, value] of Object.entries(attributes)) {
        if ((n as any)[key] !== value) {
            return false;
        }
    }
    for (const [key, value] of Object.entries(n)) {
        if (key === "type" || key === "children") {
            continue;
        }
        if ((attributes as any)[key] !== value) {
            return false;
        }
    }
    return true;
};

export const isBlockActive = (
    editor: Editor,
    format: BlockElementTypes,
    attributes?: Partial<SlateElement>
) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === format &&
            matchAttributes(n, attributes),
    });

    return !!match;
};
export const isBlockActiveMulti = (
    editor: Editor,
    formats: BlockElementTypes[],
    attributes?: Partial<SlateElement>
) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            formats.includes(n.type as BlockElementTypes) &&
            matchAttributes(n, attributes),
    });

    return !!match;
};
export const toggleBlock = (
    editor: Editor,
    format: BlockElementTypes,
    attributes?: Partial<SlateElement>,
    removeBlockFunction?: (editor: Editor) => void
) => {
    const isActiveBase = isBlockActive(editor, format);
    const isActiveAttributes = isBlockActive(editor, format, attributes);

    if (isActiveAttributes && removeBlockFunction) {
        removeBlockFunction(editor);
        return;
    }

    // only allow turning paragraphs into blocks
    if (!isActiveBase) {
        const [...paragraphs] = Editor.nodes(editor, {
            match: (n) => SlateElement.isElement(n) && n.type === "paragraph",
        });
        if (!paragraphs.length) {
            return;
        }
    }

    Editor.withoutNormalizing(editor, () => {
        const isList = LIST_TYPES.includes(format);

        // always unwrap lists
        Transforms.unwrapNodes(editor, {
            match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                LIST_TYPES.includes(n.type as string),
            split: true,
        });

        // very verbose, but makes it all explicit
        if (!attributes) {
            // format-only button (without attributes)
            if (isActiveBase) {
                // clicked on element of that type
                // remove the format
                Transforms.setNodes(editor, { type: "paragraph" });
            } else {
                // different element type
                if (isList) {
                    // make current node a list-item
                    Transforms.setNodes(editor, { type: "list-item" });
                    // wrap in list
                    Transforms.wrapNodes(editor, {
                        type: format,
                        children: [],
                    } as SlateElement);
                } else {
                    // not a list, simply apply the format
                    Transforms.setNodes(editor, { type: format });
                }
            }
        } else {
            // format+attributes button
            if (!isActiveBase) {
                // base format not active, apply it
                if (isList) {
                    // make current node a list-item
                    Transforms.setNodes(editor, { type: "list-item" });
                    // wrap in list
                    Transforms.wrapNodes(editor, {
                        ...attributes,
                        type: format,
                        children: [],
                    } as SlateElement);
                } else {
                    // not a list, simply apply the format
                    Transforms.setNodes(editor, {
                        ...attributes,
                        type: format,
                    });
                }
            } else {
                // base format is the same
                if (!isActiveAttributes) {
                    // base format already the same but attributes differ
                    // keep the format but apply the properties
                    if (isList) {
                        // keep current node a list-item
                        Transforms.setNodes(editor, { type: "list-item" });
                        // apply the attributes to the wrapping node
                        Transforms.wrapNodes(editor, {
                            ...attributes,
                            type: format,
                            children: [],
                        } as SlateElement);
                    } else {
                        Transforms.setNodes(editor, {
                            ...attributes,
                            type: format,
                        });
                    }
                } else {
                    // base format the same and attributes also the same
                    // remove the entire format or only the attributes??
                    // choice: only remove the attributes
                    // this was wrong choice, for heading it doesn't work
                    if (isList) {
                        // wrap in a new list, without the attributes
                        Transforms.wrapNodes(editor, {
                            type: format,
                            children: [],
                        } as SlateElement);
                    } else {
                        // unset the attributes
                        Transforms.unsetNodes(editor, Object.keys(attributes));
                        // and reset the base type to paragraph
                        Transforms.setNodes(editor, { type: "paragraph" });
                    }
                }
            }
        }
        // let newProperties: Partial<SlateElement> = {
        //     type: isActive ? "paragraph" : isList ? "list-item" : format,
        // };
        // if (attributes && !isActive && !isList) {
        //     newProperties = {
        //         ...newProperties,
        //         ...attributes,
        //     } as Partial<SlateElement>;
        // }
        // Transforms.setNodes(editor, newProperties);

        // if (
        //     !isActive &&
        //     (format === "ordered-list" || format === "unordered-list")
        // ) {
        //     let block: SlateElement = { type: format, children: [] };
        //     if (attributes) {
        //         block = { ...block, ...attributes } as SlateElement;
        //     }
        //     Transforms.wrapNodes(editor, block);
        // }
    });
};
