import React from "react";

import {
    createTheme,
    ThemeProvider,
    StyledEngineProvider,
} from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiFormControl: {
            defaultProps: {
                margin: "normal",
            },
        },
        MuiTextField: {
            defaultProps: {
                margin: "normal",
                InputLabelProps: { shrink: true },
                fullWidth: true,
                variant: "outlined",
            },
        },
    },
});

export const Themed: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Themed;
