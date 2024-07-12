import React from "react";

import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    MARK_BOLD,
    MARK_ITALIC,
    getPluginType,
    useEditorState,
    ELEMENT_UL,
    ELEMENT_OL,
} from "@udecode/plate";
import { Editor } from "slate";

import { ListToolbarButton } from "./ListToolbarButton";
import { MarkToolbarButton } from "./MarkToolbarButton";

export const BasicToolbar: React.FC = () => {
    const editor = useEditorState() as any;
    const str = Editor.string(editor, []);

    return (
        <Box display="flex" gap={0.5} width={1}>
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<FormatBold />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<FormatItalic />}
            />
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_UL)}
                icon={<FormatListBulleted />}
            />
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_OL)}
                icon={<FormatListNumbered />}
            />
            <Typography variant="caption" marginLeft="auto">
                {str.length || ""}
            </Typography>
        </Box>
    );
};
