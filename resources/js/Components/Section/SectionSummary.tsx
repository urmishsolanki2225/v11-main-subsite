import React, { ReactNode } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export type SectionSummaryContent = {
    title: string;
    text?: ReactNode | string;
    component?: ReactNode;
};
interface IProps {
    contents: SectionSummaryContent[];
}
export const SectionSummary: React.FC<IProps> = ({ contents }) => {
    return (
        <Grid container>
            {contents.map(({ title, text, component }, i) => (
                <Grid item xs={4} key={i}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography variant="subtitle2">{title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {text}
                        </Typography>
                        {component}
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default SectionSummary;
