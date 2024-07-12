import { WithEditorFunction } from "../types";

const withLink: WithEditorFunction = (editor) => {
    const { isInline } = editor;

    editor.isInline = (el) => {
        return el.type === "link" ? true : isInline(el);
    };

    return editor;
};

export default withLink;
