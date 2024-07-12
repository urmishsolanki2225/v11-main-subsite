import React from "react";

import Box from "@mui/material/Box";
import { useSlate } from "slate-react";

import { BlockElementTypes } from "./BlockButton";
import { isBlockActiveMulti } from "./BlockButton.functions";

interface IProps {
    baseButton: React.ReactNode;
    formats: BlockElementTypes[];
    children?: React.ReactNode;
}
const MultiButton: React.FC<IProps> = ({ formats, baseButton, children }) => {
    const editor = useSlate();
    const showOptions = isBlockActiveMulti(editor, formats);

    return (
        <>
            <Box display="flex" flexWrap="nowrap">
                {baseButton}
                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        boxSizing: "border-box",
                        position: "relative",
                        maxWidth: showOptions ? 150 : 0,
                        borderRight: showOptions
                            ? `1px solid transparent`
                            : undefined,
                        borderRightColor: "divider",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "nowrap",
                        transition: "all 0.2s linear",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
};

export default MultiButton;
