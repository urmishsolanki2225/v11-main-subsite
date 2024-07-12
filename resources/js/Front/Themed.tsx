import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                margin: "dense",
                variant: "filled",
                // InputProps: { disableUnderline: true },
                // InputLabelProps: { shrink: true },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {},
            },
        },
        MuiFilledInput: {
            defaultProps: { disableUnderline: true },
            styleOverrides: {
                root: { borderRadius: 0, fontSize: "12px" },
            },
        },
        MuiInputLabel: {
            defaultProps: { shrink: true },
        },
        MuiFormControl: {
            defaultProps: { margin: "dense", sx: { marginBottom: 0 } },
        },
        MuiAutocomplete: {
            defaultProps: {
                componentsProps: {
                    paper: {
                        sx: {
                            // listbox + option needed for css specificity
                            "& .MuiAutocomplete-listbox .MuiAutocomplete-option":
                                {
                                    px: 1.5,
                                },
                            "& .MuiAutocomplete-listbox .MuiAutocomplete-groupLabel":
                                {
                                    px: 1.5,
                                },
                        },
                    },
                    popupIndicator: {
                        sx: { px: 0 },
                    },
                },
                sx: {},
            },
            styleOverrides: {
                groupLabel: {
                    textTransform: "lowercase",
                    fontVariant: "small-caps",
                    fontWeight: 700,
                    borderBottom: "1px #ddd solid",
                    borderTop: "1px #ddd solid",
                    lineHeight: "inherit",
                    paddingBottom: 6,
                    paddingTop: 12,
                },
                listbox: {
                    "li:first-of-type .MuiAutocomplete-groupLabel": {
                        borderTopWidth: 0,
                    },
                },
                option: {
                    textAlign: "start",
                    fontSize: "12px",
                    borderBottom: "1px #ddd solid",
                    "&:last-child": { borderBottom: "none" },
                },
                endAdornment: {
                    top: "12px",
                },
            },
        },
        MuiIconButton: {
            defaultProps: { disableRipple: true },
        },
        MuiListItemText: { styleOverrides: { root: { textAlign: "start" } } },
        MuiListSubheader: {
            styleOverrides: {
                root: { textAlign: "start" },
            },
        },
    },
    palette: {
        primary: {
            main: "rgb(0, 121, 180)",
        },
    },
    typography: {
        fontFamily: "titillium-web, sans-serif",
    },
});

export const Themed: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
