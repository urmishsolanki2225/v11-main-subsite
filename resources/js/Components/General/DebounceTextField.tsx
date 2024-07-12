import React, { useEffect, useState } from "react";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useDebounce } from "react-use";

import { TEXTEDIT_DEBOUNCE_MS } from "../../Config";

type IProps = TextFieldProps & {
    onChange?: (value: string) => void;
};
const DebounceTextField: React.FC<IProps> = (props) => {
    const [value, setValue] = useState<string>((props.value as string) || "");

    useEffect(() => {
        setValue(props.value as string);
    }, [props.value]);

    useDebounce(
        () => {
            props.onChange && props.onChange(value);
        },
        TEXTEDIT_DEBOUNCE_MS,
        [value]
    );

    return (
        <TextField
            fullWidth
            multiline
            maxRows={10}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...props}
            value={value || ""}
            onChange={(evt) => setValue(evt.target.value || "")}
        />
    );
};

export default DebounceTextField;
