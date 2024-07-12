import React, { useMemo } from "react";

import Box from "@mui/material/Box";
import FormControl, { FormControlProps } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@mui/material/styles";
import {
    Plate,
    PlateContent,
    PlateProps,
    useEventEditorSelectors,
} from "@udecode/plate";

import { basicPlugins } from "./Config";
import { createTextLimitPlugin } from "./Plugins/createTextLimitPlugin";
import { BasicToolbar } from "./Toolbar";

interface IProps {
    label?: string;
    helperText?: string;
    error?: boolean;
    textLimit?: number;
    initialValueAsText?: string;

    FormControlProps?: FormControlProps;
}
export const PlateFormControl: React.FC<
    IProps & Omit<PlateProps, "editableProps" | "plugins" | "children">
> = ({
    id: _id,
    label,
    helperText,
    error,
    textLimit,
    initialValueAsText,
    FormControlProps,
    ...plateProps
}) => {
    const theme = useTheme();
    const plugins = useMemo(
        () => [
            ...basicPlugins,
            createTextLimitPlugin({ options: { textLimit } }),
        ],
        // : basicPlugins,
        [textLimit]
    );
    const initialValue = useMemo(() => {
        if (!initialValueAsText) {
            return [{ children: [{ text: "" }] }];
        }
        try {
            const result = JSON.parse(initialValueAsText);
            if (Array.isArray(result)) {
                return result;
            }
        } catch {
            //
        }
        return [{ children: [{ text: "" }] }];
    }, [initialValueAsText]);

    const focusedId = useEventEditorSelectors.focus();
    const id = _id || `plate-editor-${label}`;
    const focused = focusedId === id;

    return (
        <FormControl
            variant="filled"
            fullWidth
            error={error}
            focused={focused}
            {...FormControlProps}
        >
            <InputLabel shrink>{label}</InputLabel>
            <Plate
                id={id}
                plugins={plugins}
                {...plateProps}
                initialValue={initialValue}
            >
                <Box mt={3} px={1.5}>
                    <BasicToolbar />
                </Box>
                <PlateContent
                    spellCheck={false}
                    autoFocus={true}
                    // placeholder: "...",
                    style={{
                        paddingLeft: theme.spacing(1.5),
                        paddingRight: theme.spacing(1.5),
                        // paddingTop: theme.spacing(0.5),
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.06)",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
                        borderBottomWidth: focused ? "2px" : "1px",
                        marginBottom: focused ? "-1px" : 0,
                        borderBottomColor: focused
                            ? theme.palette.primary.main
                            : "rgba(0, 0, 0, 0.42)",
                        borderTopLeftRadius: theme.shape.borderRadius,
                        borderTopRightRadius: theme.shape.borderRadius,
                    }}
                ></PlateContent>
            </Plate>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};
