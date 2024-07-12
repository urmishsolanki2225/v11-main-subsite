import React from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Editor, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";

import { isBlockActive, toggleBlock } from "./BlockButton.functions";

export type BlockElementTypes =
    | "paragraph"
    | "ordered-list"
    | "unordered-list"
    // | "list-item"
    | "quote"
    | "heading"
    // | "heading-3"
    // | "heading-4"
    // | "heading-5"
    // | "heading-6"
    | "footnote"
    | "footnote-anchor";

interface IBlockButtonProps {
    format: BlockElementTypes;
    attributes?: Partial<SlateElement>;
    removeBlockFunction?: (editor: Editor) => void;
    tooltip?: string;
    children?: React.ReactNode;
}
const BlockButton: React.FC<IBlockButtonProps> = ({
    format,
    removeBlockFunction,
    attributes,
    tooltip,
    children,
}) => {
    const editor = useSlate();
    const active = isBlockActive(editor, format, attributes);
    const activeBase = isBlockActive(editor, format);
    const isParagraph = isBlockActive(editor, "paragraph");

    const btn = (
        <IconButton
            color={active ? "primary" : undefined}
            sx={{
                borderRadius: "0.1em",
                backgroundColor: active ? "action.selected" : undefined,
            }}
            disabled={!isParagraph && !activeBase}
            onMouseDown={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                toggleBlock(editor, format, attributes, removeBlockFunction);
            }}
            size="small"
        >
            {children}
        </IconButton>
    );
    if (tooltip) {
        return (
            <Tooltip title={tooltip} placement="top">
                <span>{btn}</span>
            </Tooltip>
        );
    } else {
        return btn;
    }
};
export default BlockButton;
