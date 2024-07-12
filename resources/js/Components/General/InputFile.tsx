import React, { ChangeEventHandler, forwardRef } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";

interface IProps {
    label?: string;
    accept?: string;
    multiple?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}
const InputFile = forwardRef<HTMLInputElement, IProps>(
    ({ label, onChange, multiple, accept }, ref) => {
        const _onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
            onChange(e);
        };

        return (
            <OutlinedInput
                type="file"
                inputRef={ref}
                label={label}
                onChange={_onChange}
                inputProps={{ accept, multiple }}
                fullWidth
                notched
                sx={{ "& input": { opacity: 1 } }}
            />
        );
    }
);

export default InputFile;
