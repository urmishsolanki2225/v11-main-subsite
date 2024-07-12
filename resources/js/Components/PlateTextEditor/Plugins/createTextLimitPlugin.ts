import {
    createPluginFactory,
    // getEditorString,
    WithOverride,
    deleteBackward,
} from "@udecode/plate";
import { Editor } from "slate";

export interface TextLimitPluginOptions {
    textLimit?: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const withTextLimit: WithOverride<TextLimitPluginOptions> = (
    editor,
    { options: { textLimit } }
) => {
    const { normalizeNode } = editor;
    editor.normalizeNode = (entry) => {
        if (textLimit) {
            // remove text from end
            // const strLen = getEditorString(editor, null).length;
            const strLen = Editor.string(editor as any, []).length;
            if (strLen > textLimit) {
                deleteBackward(editor, {
                    unit:
                        strLen - textLimit > 100
                            ? "word"
                            : strLen - textLimit > 10
                            ? "word"
                            : "character",
                });
                // returning here will trigger another normalizing pass
                return;
            }
        }
        return normalizeNode(entry);
    };
    return editor;
};

export const createTextLimitPlugin =
    createPluginFactory<TextLimitPluginOptions>({
        key: "textLimit",
        withOverrides: withTextLimit,
    });
