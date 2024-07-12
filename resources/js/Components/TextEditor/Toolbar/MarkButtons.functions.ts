import { Editor } from "slate";

import { MarkElementTypes } from "./MarkButtons";

export const toggleMark = (editor: Editor, format: MarkElementTypes) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export const isMarkActive = (editor: Editor, format: MarkElementTypes) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};
