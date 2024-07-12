import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { FileResource } from "../../Models";

import { RendererProps } from "./Sorter";

export const FileResourceSorterRenderer: React.FC<
    RendererProps<FileResource>
> = ({ item: file, dragHandle, removeHandle, onChange }) => {
    const [label, setLabel] = useState(file.label || "");

    const onBlur = () => {
        onChange && onChange({ ...file, label });
    };

    return (
        <Box
            sx={{
                display: "flex",
                whiteSpace: "pre",
                alignItems: "baseline",
                borderRadius: 1,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "divider",
                paddingLeft: dragHandle ? 0 : 1,
                paddingRight: 1,
                margin: 0.5,
            }}
        >
            {dragHandle}
            <Box
                sx={{
                    flexBasis: "25%",
                    flexShrink: 0,
                    flexGrow: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "pre",
                }}
            >
                <TextField
                    value={label}
                    placeholder="Label"
                    onChange={(evt) => setLabel(evt.target.value)}
                    fullWidth
                    margin="dense"
                    variant="standard"
                    onBlur={onBlur}
                    size="small"
                />
            </Box>
            <Typography
                variant="body2"
                sx={{
                    flexBasis: "25%",
                    flexShrink: 0,
                    flexGrow: 4,
                    overflow: "hidden",
                    marginLeft: 1,
                    marginRight: 1,
                }}
            >
                {file.original_filename}
            </Typography>
            {removeHandle}
        </Box>
    );
};

export default FileResourceSorterRenderer;
