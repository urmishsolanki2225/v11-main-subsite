import React, { ReactNode, useEffect, useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface IProps {
    title: string;
    // icon?: ReactNode;
    summary?: ReactNode;
    open?: boolean;
    onOpen?: (open: boolean) => void;
    children?: React.ReactNode;
}
export const Section: React.FC<IProps> = ({
    title,
    // icon,
    summary,
    open,
    onOpen,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    useEffect(() => {
        onOpen && onOpen(!!isOpen);
    }, [isOpen, onOpen]);

    return (
        <Paper
            sx={{
                padding: 2,
                margin: 2,
            }}
        >
            <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
                m={-2}
                p={2}
                sx={
                    isOpen
                        ? {
                              paddingBottom: 1,
                              marginBottom: 1,
                              backgroundColor: "background.default",
                              cursor: "pointer",
                          }
                        : { cursor: "pointer" }
                }
            >
                <Typography variant="h5">{title}</Typography>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={!isOpen}>
                <Box onClick={() => setIsOpen(true)}>{summary}</Box>
            </Collapse>
            <Collapse in={isOpen}>{children}</Collapse>
        </Paper>
    );
};

export default Section;
