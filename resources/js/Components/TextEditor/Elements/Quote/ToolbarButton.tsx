import React, { useCallback } from "react";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Editor, Transforms, Element as SlateElement } from "slate";

import BlockButton from "../../Toolbar/BlockButton";

const QuoteToolbarButton: React.FC = () => {
    const removeBlockFunction = useCallback((editor: Editor) => {
        // select top level
        Editor.withoutNormalizing(editor, () => {
            const path = editor.selection!.anchor.path.slice(0, 1);

            // remove the caption
            Transforms.removeNodes(editor, {
                match: (n) => {
                    return (
                        !Editor.isEditor(n) &&
                        SlateElement.isElement(n) &&
                        n.type === "caption"
                    );
                },
                mode: "highest",
                at: [...path, 1],
            });

            // unwrap quote and blockquote, leaving the paragraphs
            Transforms.unwrapNodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    (n.type === "blockquote" || n.type === "quote"),
                mode: "all",
                at: path,
            });
        });
    }, []);

    return (
        <BlockButton format="quote" removeBlockFunction={removeBlockFunction}>
            <FormatQuoteIcon />
        </BlockButton>
    );
};

export default QuoteToolbarButton;
