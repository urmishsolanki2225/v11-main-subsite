import { WithEditorFunction } from "../types";

const withOEmbed: WithEditorFunction = (editor) => {
    const { isVoid } = editor;

    editor.isVoid = (el) => {
        return el.type === "oembed" ? true : isVoid(el);
    };

    return editor;
};

export default withOEmbed;
