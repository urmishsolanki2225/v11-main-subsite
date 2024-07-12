import { WithEditorFunction } from "../types";

const withItem: WithEditorFunction = (editor) => {
    const { isVoid } = editor;
    editor.isVoid = (el) => {
        return el.type === "item" ? true : isVoid(el);
    };
    return editor;
};

export default withItem;
