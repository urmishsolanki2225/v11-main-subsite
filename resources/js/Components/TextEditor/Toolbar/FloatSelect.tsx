import React from "react";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { FIGURE_FLOAT_STYLE_LABELS, FigureFloatStyles } from "../../../Config";

interface IProps {
    value: FigureFloatStyles;
    onChange: (value: FigureFloatStyles) => void;
}
const FloatSelect: React.FC<IProps> = ({ value = "", onChange }) => {
    return (
        <FormControl variant="outlined" fullWidth error={false}>
            <InputLabel>Float</InputLabel>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value as FigureFloatStyles)}
                label="Float"
                fullWidth
            >
                {Object.entries(FIGURE_FLOAT_STYLE_LABELS).map(
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

export default FloatSelect;
