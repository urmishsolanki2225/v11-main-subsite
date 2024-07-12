import React, { useRef, useState } from "react";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import clipboardCopy from "clipboard-copy";

interface IProps {
    text: string;
    label?: string;
}
const PreviewTextCopy: React.FC<IProps> = ({ text, label }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);

    const onCopy = () => {
        clipboardCopy(text).then(() => {
            setShowTooltip(true);
        });
    };

    return (
        <TextField
            label={label}
            value={text}
            InputProps={{
                readOnly: true,
                disableUnderline: true,
                endAdornment: (
                    <InputAdornment position="end">
                        <Tooltip
                            title="Copied!"
                            open={showTooltip}
                            leaveDelay={1500}
                            placement="top"
                            onClose={() => setShowTooltip(false)}
                        >
                            <IconButton
                                onClick={onCopy}
                                size="small"
                                color="primary"
                            >
                                <FileCopyIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                ),
            }}
            inputRef={inputRef}
            onClick={() => inputRef.current?.setSelectionRange(0, text.length)}
            fullWidth
            variant="standard"
            margin="none"
        />
    );
};

export default PreviewTextCopy;
