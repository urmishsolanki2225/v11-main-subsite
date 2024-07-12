import React, { useEffect, useState } from "react";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// import { IconButton, InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useSearchBox } from "react-instantsearch-hooks-web";

export const SearchBox: React.FC = () => {
    const { t } = useTranslation();
    const { query, refine, clear } = useSearchBox();
    const [input, setInput] = useState(query);

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (!input) {
                clear();
            } else if (input.length >= 3) {
                refine(input);
            }
        }, 500);
        return () => clearTimeout(debounce);
    }, [clear, input, refine]);

    useEffect(() => {
        setInput(query);
    }, [query]);

    return (
        <TextField
            value={input}
            onChange={(evt) => setInput(evt.currentTarget.value)}
            variant="outlined"
            placeholder={t`Start typing to search...`}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            size="small"
                            disabled={!input}
                            onClick={() => setInput("")}
                        >
                            <CancelRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};
