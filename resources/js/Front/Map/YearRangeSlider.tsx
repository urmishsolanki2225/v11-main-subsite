import React, { useState } from "react";

import Slider from "@mui/material/Slider";

interface IProps {
    min?: number;
    max?: number;
    onChange: (from?: number, to?: number) => void;
}
export const YearRangeSlider: React.FC<IProps> = ({
    min = 2000,
    max = new Date().getFullYear(),
    onChange,
}) => {
    const [value, setValue] = useState([min, max]);

    return (
        <>
            <Slider
                min={min}
                max={max}
                value={value}
                valueLabelDisplay="auto"
                onChange={(evt, val) => {
                    const range = val as number[];
                    setValue(range);
                }}
                onChangeCommitted={(evt, val) => {
                    const range = val as number[];
                    onChange(range.at(0), range.at(1));
                }}
            />
        </>
    );
};
