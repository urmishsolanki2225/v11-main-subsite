import React from "react";

import Box from "@mui/material/Box";

interface IProps {
    className?: string;
    children?: React.ReactNode;
}
export const ContentScroll: React.FC<IProps> = ({ children, className }) => {
    return (
        <Box
            className={className}
            sx={{
                paddingTop: "64px",
                height: "100vh",
                boxSizing: "border-box",
                overflowY: "auto",
            }}
        >
            {children}
        </Box>
    );
};

export default ContentScroll;
