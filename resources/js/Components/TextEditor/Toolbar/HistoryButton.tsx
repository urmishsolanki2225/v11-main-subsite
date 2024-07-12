import React from "react";

import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import { useSlateStatic } from "slate-react";

interface UndoProps {
    undo: boolean;
    redo?: never;
}
interface RedoProps {
    redo: boolean;
    undo?: never;
}
const HistoryButton: React.FC<UndoProps | RedoProps> = ({ undo = false }) => {
    const editor = useSlateStatic();

    return (
        <IconButton
            sx={{ borderRadius: "0.1em" }}
            size="small"
            onMouseDown={(evt) => {
                evt.preventDefault();
                undo ? editor.undo() : editor.redo();
            }}
        >
            {undo ? <UndoIcon /> : <RedoIcon />}
        </IconButton>
    );
};

export default HistoryButton;
