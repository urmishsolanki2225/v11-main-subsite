import { WithEditorFunction } from "../types";

const withVideo: WithEditorFunction = (editor) => {
    const { isVoid } = editor;
    editor.isVoid = (el) => {
        return el.type === "video" ? false : isVoid(el);
    };
    return editor;
};

export default withVideo;
