import React from "react";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
    ContentLayoutStyles,
    CONTENT_LAYOUT_STYLE_LABELS,
} from "../../../Config";

interface IProps {
    value: ContentLayoutStyles;
    onChange: (value: ContentLayoutStyles) => void;
}
const LayoutSelect: React.FC<IProps> = ({ value = "", onChange }) => {
    return (
        <FormControl variant="outlined" fullWidth error={false}>
            <InputLabel>Layout</InputLabel>
            <Select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value as ContentLayoutStyles)
                }
                label="Layout"
                fullWidth
            >
                {Object.entries(CONTENT_LAYOUT_STYLE_LABELS).map(
                    ([value, label], idx) => (
                        <MenuItem key={idx} value={value}>
                            {label}
                        </MenuItem>
                    )
                )}
            </Select>
            <FormHelperText></FormHelperText>
        </FormControl>
    );
};

export default LayoutSelect;
