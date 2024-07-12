import { Editor, Element as SlateElement } from "slate";

export const isBlockActive = (editor: Editor, type: string) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === type,
    });

    return Boolean(match);
};

export const activeBlock = (editor: Editor, type: string) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === type,
    });

    return match;
};
