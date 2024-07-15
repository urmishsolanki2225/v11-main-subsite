import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { AppBarHeader, ContentScroll } from "../../Layout";

const NotAuthorize= () => {
    return (
        <>
            <AppBarHeader title="DC Projects" />
            <ContentScroll>
                <Paper sx={{ m: 1, p: 1 }}>
                    <Typography variant="body1" color="warning">
                        You are not authorized to access this page.
                    </Typography>
                </Paper>
            </ContentScroll>
        </>
    );
};
export default NotAuthorize;