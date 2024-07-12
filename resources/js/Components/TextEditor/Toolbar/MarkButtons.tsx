import React from "react";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import IconButton from "@mui/material/IconButton";
import { useSlate } from "slate-react";

import { isMarkActive, toggleMark } from "./MarkButtons.functions";

export type MarkElementTypes = "italic" | "bold" | "quote";

interface IMarkButtonProps {
    format: MarkElementTypes;
    children?: React.ReactNode;
}
export const MarkButton: React.FC<IMarkButtonProps> = ({
    format,
    children,
}) => {
    const editor = useSlate();
    const active = isMarkActive(editor, format);

    return (
        <IconButton
            color={active ? "primary" : undefined}
            sx={{
                borderRadius: "0.1em",
                backgroundColor: active ? "action.selected" : undefined,
            }}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
            size="small"
        >
            {children}
        </IconButton>
    );
};

export const ItalicButton: React.FC = () => (
    <MarkButton format="italic">
        <FormatItalicIcon />
    </MarkButton>
);

export const BoldButton: React.FC = () => (
    <MarkButton format="bold">
        <FormatBoldIcon />
    </MarkButton>
);

export const QuoteButton: React.FC = () => (
    <MarkButton format="quote">&apos;</MarkButton>
);
