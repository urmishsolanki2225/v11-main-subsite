import React, { useEffect, useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import PaletteIcon from "@mui/icons-material/Palette";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import { BlockPicker } from "react-color";
interface IProps {
    label?: string;
    color?: string;
    onChange: (hex: string | undefined) => void;
}
const ColorPickerInput: React.FC<IProps> = ({
    label,
    color: _color,
    onChange,
}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const [color, setColor] = useState(_color);

    useEffect(() => {
        setColor(_color);
    }, [_color]);

    const onChangeColor = (color?: string) => {
        setColor(color);
        onChange(color);
    };

    return (
        <>
            <TextField
                label={label}
                value={color || ""}
                onChange={(evt) => onChangeColor(evt.currentTarget.value)}
                InputProps={{
                    startAdornment: (
                        <IconButton
                            onClick={(evt) => setAnchorEl(evt.currentTarget)}
                            size="large"
                        >
                            <PaletteIcon
                                style={{ color: color?.toString() }}
                                color="inherit"
                            />
                        </IconButton>
                    ),
                    endAdornment: (
                        <IconButton
                            onClick={() => onChangeColor(undefined)}
                            size="large"
                        >
                            <CancelIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
            {!!anchorEl && (
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    onClose={() => setAnchorEl(null)}
                >
                    <BlockPicker
                        color={color}
                        onChangeComplete={(color) => {
                            onChangeColor(color.hex);
                        }}
                        triangle="top"
                        colors={[
                            "#FAAF40",
                            "#1CB5A6",
                            "#99CC33",
                            "#00365E",
                            "#6E0C4E",
                            "#DD1B4A",
                            "#1CD7CB",
                            "#f25924",
                        ]}
                    />
                </Popover>
            )}
        </>
    );
};

export default ColorPickerInput;
